const multer = require("multer");
const path = require("path");

// Configuração do Multer para salvar arquivos localmente
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Pasta onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo
  },
});

const upload = multer({ storage });

module.exports = upload;