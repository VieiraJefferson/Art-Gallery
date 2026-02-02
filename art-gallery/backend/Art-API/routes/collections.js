const express = require("express");
const router = express.Router();
const { supabase, supabaseAdmin } = require("../db");
const upload = require("../config/upload");
const { uploadToCloudinary } = require("../config/uploadToCloudinary");
const collectionController = require('../controllers/collectionController');
const auth = require('../middleware/auth');

// GET todas as colecoes
router.get('/get-all', collectionController.getAll);

// GET subcolecao por ID
router.get('/subcollection/:subCollectionId', collectionController.getSubCollectionById);

// POST criar colecao
router.post('/', auth.authenticate, collectionController.createCollection);

// POST criar subcolecao
router.post('/:collectionId/subcollections', auth.authenticate, collectionController.createSubCollection);

// POST adicionar imagem a subcolecao
router.post("/:collectionId/subcollections/:subCollectionId/pictures", upload.single("file"), async (req, res) => {
  try {
    const { subCollectionId } = req.params;
    const { name, isCover } = req.body;
    const file = req.file;

    if (!name || !file) {
      return res.status(400).json({ message: "Nome e arquivo sao obrigatorios!" });
    }

    const fileUrl = await uploadToCloudinary(file.path);

    const { data: picture, error } = await supabaseAdmin
      .from('pictures')
      .insert({ name, src: fileUrl, is_cover: isCover === 'true', subcollection_id: subCollectionId })
      .select()
      .single();

    if (error) throw error;

    if (isCover === 'true') {
      await supabaseAdmin.from('pictures').update({ is_cover: false })
        .eq('subcollection_id', subCollectionId).neq('id', picture.id);
      await supabaseAdmin.from('subcollections').update({ cover_picture_id: picture.id })
        .eq('id', subCollectionId);
    }

    collectionController.clearCache();
    res.status(201).json({ picture: { name, src: fileUrl, isCover: isCover === 'true' } });
  } catch (error) {
    console.error("Erro ao adicionar imagem:", error.message);
    res.status(500).json({ message: "Erro ao adicionar imagem", error: error.message });
  }
});

// PATCH definir imagem como capa
router.patch("/:collectionId/subcollections/:subCollectionId/pictures/:pictureId/set-cover", async (req, res) => {
  try {
    const { subCollectionId, pictureId } = req.params;
    const { action } = req.query;

    if (action === 'set') {
      await supabaseAdmin.from('pictures').update({ is_cover: false }).eq('subcollection_id', subCollectionId);
      await supabaseAdmin.from('pictures').update({ is_cover: true }).eq('id', pictureId);
      await supabaseAdmin.from('subcollections').update({ cover_picture_id: pictureId }).eq('id', subCollectionId);
    } else if (action === 'unset') {
      await supabaseAdmin.from('pictures').update({ is_cover: false }).eq('id', pictureId);
      await supabaseAdmin.from('subcollections').update({ cover_picture_id: null }).eq('id', subCollectionId);
    } else {
      return res.status(400).json({ message: "Acao invalida. Use 'set' ou 'unset'" });
    }

    collectionController.clearCache();
    res.json({ message: `Imagem ${action === 'set' ? 'definida como' : 'removida como'} capa!` });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar capa", error: error.message });
  }
});

// DELETE subcolecao
router.delete('/:collectionId/subcollections/:subCollectionId', auth.authenticate, collectionController.deleteSubCollection);

// DELETE imagem
router.delete("/:collectionId/subcollections/:subCollectionId/pictures/:pictureId", auth.authenticate, async (req, res) => {
  try {
    const { pictureId } = req.params;
    const { error } = await supabaseAdmin.from('pictures').delete().eq('id', pictureId);
    if (error) throw error;
    collectionController.clearCache();
    res.json({ success: true, message: "Imagem deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar imagem", error: error.message });
  }
});

// GET subcolecao por capa
router.get("/subcollections/by-cover/:pictureId", collectionController.getSubCollectionByCover);

module.exports = router;
