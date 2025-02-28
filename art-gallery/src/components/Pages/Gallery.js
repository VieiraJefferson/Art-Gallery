import React from "react";
import { Link,useLocation  } from "react-router-dom";


const links = [
  {
      name:"All",
      path: "/",
     
  },
  {
      name:"Varna",
      path: "/about",
     
  },
  {
      name:"Instanbul",
      path: "/artistProfile",
     
  },
  {
      name:"Portugal",
      path: "/artistProfile",
     
  },
  {
      name:"Germany",
      path: "/artistProfile",
     
  },
  {
      name:"Over 18",
      path: "/artistProfile",
     
  }
]

const images = [
  "/img/Blume.jpg",
  "/img/Blumen.jpg",
  "/img/Blumenstrauß.jpg",
  "/img/Elefefant.jpg",
  "/img/Afrikakreis.jpg",
  "/img/Schnee.jpg",
  "/img/Stolz.jpg",
  "/img/Pferd.jpg",
  "/img/Muster.jpg",
  "/img/Stiefmütterchen.jpg",
  "/img/Mannes.jpg",
];

const Gallery = (location) => {

  return (
   
    <div className="gallery-container">
         <div className="gallery-links">
        { links.map(link=>(
                <Link Link to={link.path} className= {location.pathname === link.path ? " active" : ""}  key={link.name}>{link.name}</Link>
            ))}
      
        </div>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
             <div className="image-wrapper">
              <img src={src} alt={`Gallery ${index + 1}`} />
            </div>
            <div className="overlay">
              <span>Ver Imagem</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

