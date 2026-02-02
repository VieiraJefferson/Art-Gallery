


// models/Collection.js
const mongoose = require("mongoose");
const upload = require("../config/upload");

const collectionSchema = new mongoose.Schema({
  collectionName: { type: String, required: true },
  subCollections: [
    {
      subCollectionName: { type: String, required: true },
      pictures: [
        {
          name: { type: String, required: true },
          src: { type: String, required: true },
          isCover: { type: Boolean, default: false } // Novo campo
        },
      ],
      coverPicture: { // Referência à imagem de capa
        name: String,
        src: String
      }
    },
  ],
  createdAt: { type: Date, default: Date.now } // Adicionando timestamp
});

// Middleware para garantir que apenas uma imagem seja marcada como capa
collectionSchema.pre('save', function(next) {
  this.subCollections.forEach(subCollection => {
    const coverPictures = subCollection.pictures.filter(pic => pic.isCover);
    
    // Se houver mais de uma imagem marcada como capa
    if (coverPictures.length > 1) {
      // Mantém apenas a primeira como capa
      subCollection.pictures.forEach((pic, index) => {
        pic.isCover = index === subCollection.pictures.findIndex(p => p.isCover);
      });
    }
    
    // Atualiza a referência da capa
    const coverPic = subCollection.pictures.find(pic => pic.isCover);
    if (coverPic) {
      subCollection.coverPicture = {
        name: coverPic.name,
        src: coverPic.src
      };
    }
  });
  next();
});

// models/Collection.js

collectionSchema.pre('deleteOne', { document: true, query: false }, async function() {
  await this.model('Picture').deleteMany({ collection: this._id });
});

module.exports = mongoose.model("Collection", collectionSchema);