// const mongoose = require("mongoose");

// const pictureSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   src: { type: String, required: true },
//   subCollectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" }, // Referência à Collection
// });

// module.exports = mongoose.model("Picture", pictureSchema);  



// models/Picture.js
const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
  isCover: { type: Boolean, default: false }, // Novo campo
  subCollectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" }, // Referência direta à coleção principal
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Usuário que fez upload
  createdAt: { type: Date, default: Date.now }
});

// Índice para melhorar buscas por imagens de capa
pictureSchema.index({ subCollectionId: 1, isCover: 1 });

module.exports = mongoose.model("Picture", pictureSchema);