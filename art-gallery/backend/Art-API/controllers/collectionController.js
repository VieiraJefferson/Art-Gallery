const { supabase, supabaseAdmin } = require('../db');

let cache = { data: null, timestamp: null, ttl: 60000 };

exports.getAll = async (req, res) => {
  try {
    if (cache.data && cache.timestamp && (Date.now() - cache.timestamp < cache.ttl)) {
      return res.status(200).json(cache.data);
    }

    const { data: collections, error: collectionsError } = await supabase
      .from('collections').select('*').order('created_at', { ascending: true });

    if (collectionsError) throw collectionsError;

    const collectionsWithSubs = await Promise.all(
      collections.map(async (collection) => {
        const { data: subcollections } = await supabase
          .from('subcollections').select('*')
          .eq('collection_id', collection.id).order('name', { ascending: true });

        const subsWithPictures = await Promise.all(
          (subcollections || []).map(async (sub) => {
            const { data: pictures } = await supabase
              .from('pictures').select('*')
              .eq('subcollection_id', sub.id).order('created_at', { ascending: true });

            let coverPicture = null;
            if (sub.cover_picture_id) {
              const { data: cover } = await supabase
                .from('pictures').select('*').eq('id', sub.cover_picture_id).single();
              coverPicture = cover ? { name: cover.name, src: cover.src } : null;
            } else if (pictures && pictures.length > 0) {
              const coverPic = pictures.find(p => p.is_cover) || pictures[0];
              coverPicture = { name: coverPic.name, src: coverPic.src };
            }

            return {
              _id: sub.id, id: sub.id, name: sub.name, subCollectionName: sub.name,
              description: sub.description, coverPicture,
              pictures: (pictures || []).map(p => ({
                _id: p.id, id: p.id, name: p.name, src: p.src, isCover: p.is_cover
              }))
            };
          })
        );

        return {
          _id: collection.id, id: collection.id, name: collection.name,
          collectionName: collection.name, description: collection.description,
          subCollections: subsWithPictures, createdAt: collection.created_at
        };
      })
    );

    cache.data = { collections: collectionsWithSubs };
    cache.timestamp = Date.now();
    res.status(200).json({ collections: collectionsWithSubs });
  } catch (error) {
    console.error('Erro ao buscar colecoes:', error);
    res.status(500).json({ message: "Erro ao buscar dados.", error: error.message });
  }
};

exports.getSubCollectionById = async (req, res) => {
  try {
    const { subCollectionId } = req.params;
    const { data: sub, error } = await supabase
      .from('subcollections').select('*').eq('id', subCollectionId).single();

    if (error || !sub) return res.status(404).json({ message: "Subcolecao nao encontrada" });

    const { data: pictures } = await supabase
      .from('pictures').select('*').eq('subcollection_id', subCollectionId);

    let coverPicture = null;
    if (sub.cover_picture_id) {
      const { data: cover } = await supabase.from('pictures').select('*').eq('id', sub.cover_picture_id).single();
      coverPicture = cover ? { name: cover.name, src: cover.src } : null;
    }

    res.json({
      _id: sub.id, id: sub.id, name: sub.name, subCollectionName: sub.name, coverPicture,
      pictures: (pictures || []).map(p => ({ _id: p.id, id: p.id, name: p.name, src: p.src, isCover: p.is_cover }))
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar subcolecao", error: error.message });
  }
};

exports.deleteSubCollection = async (req, res) => {
  try {
    const { subCollectionId } = req.params;
    const { error } = await supabaseAdmin.from('subcollections').delete().eq('id', subCollectionId);
    if (error) throw error;
    cache.data = null;
    res.status(200).json({ success: true, message: "Subcolecao deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao deletar subcolecao", error: error.message });
  }
};

exports.getSubCollectionByCover = async (req, res) => {
  try {
    const { pictureId } = req.params;
    const { data: sub, error } = await supabase.from('subcollections').select('*').eq('cover_picture_id', pictureId).single();
    if (error || !sub) return res.status(404).json({ message: "Subcolecao nao encontrada" });
    res.json(sub);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar subcolecao", error: error.message });
  }
};

exports.createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Nome obrigatorio" });
    const { data, error } = await supabaseAdmin.from('collections').insert({ name, description }).select().single();
    if (error) throw error;
    cache.data = null;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar colecao", error: error.message });
  }
};

exports.createSubCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Nome obrigatorio" });
    const { data, error } = await supabaseAdmin.from('subcollections').insert({ name, description, collection_id: collectionId }).select().single();
    if (error) throw error;
    cache.data = null;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar subcolecao", error: error.message });
  }
};

exports.clearCache = () => { cache.data = null; cache.timestamp = null; };
