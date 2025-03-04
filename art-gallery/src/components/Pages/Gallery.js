// import React from "react";
// import { Link,useLocation  } from "react-router-dom";


// const links = [
//   {
//       name:"All",
//       path: "/",
     
//   },
//   {
//       name:"Varna",
//       path: "/about",
     
//   },
//   {
//       name:"Instanbul",
//       path: "/artistProfile",
     
//   },
//   {
//       name:"Portugal",
//       path: "/artistProfile",
     
//   },
//   {
//       name:"Germany",
//       path: "/artistProfile",
     
//   },
//   {
//       name:"Over 18",
//       path: "/artistProfile",
     
//   }
// ]

// const images = [
//   "/img/Blume.jpg",
//   "/img/Blumen.jpg",
//   "/img/Blumenstrauß.jpg",
//   "/img/Elefefant.jpg",
//   "/img/Afrikakreis.jpg",
//   "/img/Schnee.jpg",
//   "/img/Stolz.jpg",
//   "/img/Pferd.jpg",
//   "/img/Muster.jpg",
//   "/img/Stiefmütterchen.jpg",
//   "/img/Mannes.jpg",
// ];

// const Gallery = (location) => {

//   return (
   
//     <div className="gallery-container">
//          <div className="gallery-links">
//         { links.map(link=>(
//                 <Link Link to={link.path} className= {location.pathname === link.path ? " active" : ""}  key={link.name}>{link.name}</Link>
//             ))}
      
//         </div>
//       <div className="gallery-grid">
//         {images.map((src, index) => (
//           <div key={index} className="gallery-item">
//              <div className="image-wrapper">
//               <img src={src} alt={`Gallery ${index + 1}`} />
//             </div>
//             <div className="overlay">
//               <span>Ver Imagem</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Gallery;



import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
// import { useLocation, } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const [colecoes, setColecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  // const location = useLocation();

  // Função para buscar as coleções da API
  useEffect(() => {
    const buscarColecoes = async () => {
      try {
        const resposta = await axios.get('https://art-api-nine.vercel.app/collections/get-all');
        console.log(resposta.data.collections);

        setColecoes(resposta.data.collections);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar coleções!")
        setErro(error.message);
        setCarregando(false);
      }
    };

    buscarColecoes();
  }, []);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (erro) {
    return <div>Erro: {erro}</div>;
  }

  // return (
  //   <div className="gallery-container">
  //     <div className="gallery-links">
  //       {colecoes.map((colecao) => (
  //         <Link
  //           to={`/colecao/${colecao._id}`} // Rota dinâmica para cada coleção
  //           className={location.pathname === `/colecao/${colecao._id}` ? "active" : ""}
  //           key={colecao._id}
  //         >
  //           {colecao.collectionName}
  //         </Link>
  //       ))}
  //     </div>
  //     <div className="gallery-grid">
  //       {colecoes.map((colecao) => (
  //         <div key={colecao._id} className="gallery-item">
  //           <div className="image-wrapper">
  //             {/* Aqui você pode exibir uma imagem de capa da coleção, se disponível */}
  //             <img
  //               src={colecao.subCollections[0]?.pictures[0]?.src || "/img/placeholder.jpg"} 
  //               alt={`Capa da coleção ${colecao.collectionName}`}
  //             />
  //           </div>
  //           <div className="overlay">
  //             <div>{colecao.collectionName}</div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="gallery-container">
      <div className="gallery-links">
        {colecoes.map((colecao) =>
          colecao.subCollections.map((subColecao) => (
            <div key={subColecao._id} className="gallery-item">
              <Link to={`/subcolecao/${subColecao._id}`}>
                <div className="image-wrapper">
                  {/* Exibe a primeira imagem da subcoleção como capa */}
                  <img
                    src={subColecao.pictures[0]?.src || "/img/placeholder.jpg"}
                    alt={`Capa da subcoleção ${subColecao.subCollectionName}`}
                  />
                </div>
                <div className="overlay">
                  <span>{subColecao.subCollectionName}</span>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );






};

export default Gallery;