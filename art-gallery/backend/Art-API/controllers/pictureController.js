const Picture = require("../models/Picture");
const Collection = require("../models/Collection");


// Cria uma nova imagem
exports.create = async (req, res) => {
  try {
    const { name, subCollectionId } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }
    // Verifica se a subcoleção existe
    const collection = await Collection.findOne({
      "subCollections._id": subCollectionId,
    });
    if (!collection) {
      return res.status(404).json({ message: "Coleção não encontrada!" });
    }

    // Encontra a subcoleção específica
    const subCollection = collection.subCollections.id(subCollectionId);
    if (!subCollection) {
      return res.status(404).json({ message: "Subcoleção não encontrada!" });
    }

    // Cria a foto
    const picture = new Picture({
      name,
      src: file.path,
      subCollectionId,
    });

    await picture.save();

    // Adiciona a foto à subcoleção
    subCollection.pictures.push({ name, src: file.path });
    await collection.save();

    res.json({ picture, msg: "Imagem salva com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao salvar imagem.", error: error.message });
  }
};



// Busca todas as imagens
exports.findAll = async (req, res) => {
  try {
    const pictures = await Picture.find();
    res.json(pictures);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar imagens.", error: error.message });
  }
};



// Busca todas as coleções
exports.findAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar coleções.", error: error.message });
  }
};



// Busca todos os dados (coleções, subcoleções e imagens)
exports.getAll = async (req, res) => {
  try {
    const collections = await Collection.find();
    const pictures = await Picture.find();
    res.status(200).json({ collections, pictures });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar dados.", error: error.message });
  }
};


// Remove uma imagem
exports.remove = async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: "Imagem não encontrada!" });
    }

    // Remove a foto da subcoleção
    const subCollection = await Collection.findById(picture.subCollectionId);
    if (subCollection) {
      subCollection.pictures = subCollection.pictures.filter(
        (picId) => picId.toString() !== picture._id.toString()
      );
      await subCollection.save();
    }




    // Remove a foto do banco de dados
    await Picture.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Imagem excluída com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir a imagem!", error: error.message });
  }
};

