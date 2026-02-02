const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Função para upload para o Cloudinary
const uploadToCloudinary = async (imagePath, collectionName) => {
  try {

        // Define a pasta no Cloudinary com base no nome da coleção
    const folder = `galeria/${collectionName}`

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder, // Pasta dinâmica no Cloudinary
      transformation: [
        { width: 800, height: 600, crop: "limit" }, // Redimensiona a imagem
        { quality: "auto" }, // Ajusta a qualidade
        { fetch_format: "auto" }, // Formato ideal
      ],
    });
    return result.secure_url; // Retorna a URL da imagem carregada no Cloudinary
  } catch (error) {
    throw new Error("Erro ao enviar imagem para o Cloudinary: " + error.message);
  }
};

module.exports = { uploadToCloudinary };