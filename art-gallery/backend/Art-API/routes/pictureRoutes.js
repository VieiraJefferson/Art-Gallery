const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const upload = require("../config/upload");
const { uploadToCloudinary } = require("../config/uploadToCloudinary");
const { supabase, supabaseAdmin } = require("../db");
const collectionController = require('../controllers/collectionController');

// GET todas as imagens
router.get("/", async (req, res) => {
  try {
    const { is_cover, subcollection_id } = req.query;
    
    let query = supabase.from('pictures').select('*');
    
    if (is_cover !== undefined) {
      query = query.eq('is_cover', is_cover === 'true');
    }
    if (subcollection_id) {
      query = query.eq('subcollection_id', subcollection_id);
    }
    
    const { data, error } = await query.order('created_at', { ascending: true });
    if (error) throw error;
    
    res.json(data.map(p => ({
      _id: p.id, id: p.id, name: p.name, src: p.src, isCover: p.is_cover
    })));
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar imagens", error: error.message });
  }
});

// POST upload de imagem
router.post("/", authMiddleware.authenticate, upload.single("file"), async (req, res) => {
  try {
    const { name, subcollection_id, isCover } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    if (!subcollection_id) {
      return res.status(400).json({ message: "subcollection_id e obrigatorio." });
    }

    const fileUrl = await uploadToCloudinary(file.path);

    const { data: picture, error } = await supabaseAdmin
      .from('pictures')
      .insert({
        name: name || "Imagem sem nome",
        src: fileUrl,
        subcollection_id,
        is_cover: isCover === 'true'
      })
      .select()
      .single();

    if (error) throw error;

    if (isCover === 'true') {
      await supabaseAdmin.from('pictures').update({ is_cover: false })
        .eq('subcollection_id', subcollection_id).neq('id', picture.id);
      await supabaseAdmin.from('subcollections').update({ cover_picture_id: picture.id })
        .eq('id', subcollection_id);
    }

    collectionController.clearCache();

    res.status(201).json({
      message: "Imagem carregada com sucesso!",
      picture: { _id: picture.id, id: picture.id, name: picture.name, src: picture.src, isCover: picture.is_cover },
      imageUrl: fileUrl
    });
  } catch (error) {
    console.error("Erro no upload:", error.message);
    res.status(500).json({ message: "Erro ao processar imagem.", error: error.message });
  }
});

// PATCH definir capa
router.patch("/:id/cover", authMiddleware.authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.query;

    const { data: picture } = await supabase.from('pictures').select('*').eq('id', id).single();
    if (!picture) return res.status(404).json({ message: "Imagem nao encontrada!" });

    if (action === 'set') {
      await supabaseAdmin.from('pictures').update({ is_cover: false }).eq('subcollection_id', picture.subcollection_id);
      await supabaseAdmin.from('pictures').update({ is_cover: true }).eq('id', id);
      await supabaseAdmin.from('subcollections').update({ cover_picture_id: id }).eq('id', picture.subcollection_id);
    } else if (action === 'unset') {
      await supabaseAdmin.from('pictures').update({ is_cover: false }).eq('id', id);
      await supabaseAdmin.from('subcollections').update({ cover_picture_id: null }).eq('id', picture.subcollection_id);
    } else {
      return res.status(400).json({ message: "Acao invalida. Use 'set' ou 'unset'" });
    }

    collectionController.clearCache();
    res.json({ message: `Imagem ${action === 'set' ? 'definida como' : 'removida como'} capa!` });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar capa", error: error.message });
  }
});

// DELETE imagem
router.delete("/:id", authMiddleware.authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin.from('pictures').delete().eq('id', id);
    if (error) throw error;
    collectionController.clearCache();
    res.json({ success: true, message: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar imagem", error: error.message });
  }
});

module.exports = router;
