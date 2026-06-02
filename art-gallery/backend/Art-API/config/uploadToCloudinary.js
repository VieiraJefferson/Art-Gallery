const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Função para upload para o Cloudinary
const uploadToCloudinary = (buffer, collectionName) => {
  return new Promise((resolve, reject) => {
    const folder = collectionName ? `galeria/${collectionName}` : 'galeria';
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) reject(new Error("Erro ao enviar imagem para o Cloudinary: " + error.message));
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

module.exports = { uploadToCloudinary };