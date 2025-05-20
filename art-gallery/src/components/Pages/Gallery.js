// novo 04/04/2025

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Gallery = () => {
//   const [colecoes, setColecoes] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);

//   const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VlYzZmOTI5ZjEyNDIxMzY5NWEzNzgiLCJpYXQiOjE3NDM3MDE3NTMsImV4cCI6MTc0ODg4NTc1M30.UvMxJfZVY-wLSEGpZES5j3Pg_OAIKTaAiALXMR7hXAo";

//   useEffect(() => {
//     const buscarColecoes = async () => {
//       try {
//         const resposta = await axios.get(
//           "https://art-api-nine.vercel.app/collections/get-all",
//           { headers: { Authorization: `Bearer ${fixedToken}` } }
//         );
//         setColecoes(resposta.data.collections);
//         setCarregando(false);
//       } catch (error) {
//         console.error("Erro ao buscar coleções!");
//         setErro(error.response ? error.response.data.message : error.message);
//         setCarregando(false);
//       }
//     };
//     buscarColecoes();
//   }, []);

//   if (carregando) return <div>Carregando...</div>;
//   if (erro) return <div>Erro: {erro}</div>;

//   // Dividir subcoleções em grupos de 3
//   const chunkArray = (arr, size) =>
//     Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
//       arr.slice(i * size, i * size + size)
//     );

//   const todasSubColecoes = colecoes.flatMap(colecao =>
//     colecao.subCollections?.map(sub => ({
//       ...sub,
//       colecaoPaiUrl: `/colecao/${colecao._id}/subcolecao/${sub._id}`
//     })) || []
//   );

//   const groupedCollections = chunkArray(todasSubColecoes, 3);

//   return (
//     <div className="gallery-container">
//       <section className="hero-gallery-section">
//         <div className="hero-gallery-content">
//           <h1>Ethereal Chronicles: The Alchemy of Visionary Narratives</h1>
//           <p>"Where Visionary Art Meets Emotional Alchemy
// Surreal Dreams Dance with Symbolic Truths
// Whimsy Woven into Timeless Narratives
// Spaces Reimagined Through Collective Soul
// Step Into Stories That Transcend Canvas"</p>
//           <div className="hero-gallery-actions">
//             <Link to="/colecoes" className="hero-button">Browse Collection</Link>
//           </div>
//         </div>
//         <div className="hero-gallery-image">
//           <img
//             src="https://res.cloudinary.com/dpilz4p6g/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741212721/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/jlutboa4zaxhrq5wyrj2.jpg"
//             alt="Featured Artwork"
//             loading="lazy"
//           />
//         </div>
//       </section>

//       {groupedCollections.map((group, index) => (
//         <section key={`section-${index}`} className="collection-section">
//           <div className="collection-wrapper">
//             <div className="collection-grid">
//               {group.map((subColecao) => {
//                 const imagemCapa = subColecao.pictures?.find(pic => pic.isCover);
//                 const imagemSrc = imagemCapa?.src ||
//                                subColecao.pictures?.[0]?.src ||
//                                "/img/placeholder.jpg";

//                 return (
//                   <div key={subColecao._id} className="collection-card">
//                     <Link to={subColecao.colecaoPaiUrl} className="card-image-link">
//                       <img
//                         src={imagemSrc}
//                         alt={`Capa da subcoleção ${subColecao.subCollectionName}`}
//                         className="card-image"
//                         loading="lazy"
//                       />
//                     </Link>
//                     <h3 className="card-title">{subColecao.subCollectionName || "Sem nome"}</h3>
//                     <p className="card-description">
//                       {subColecao.description || "Descrição não disponível"}
//                     </p>
//                     <Link to={subColecao.colecaoPaiUrl} className="card-button">
//                       Ver Coleção
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default Gallery;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Mapeamento manual de descrições
const MANUAL_DESCRIPTIONS = {
  "67c61483144fe266bc51bdc3": "Exploring the Depths of Imagination through Light and Shadow",
  "67c61c700f53cc65352d1079": "Bold colors, raw Emotions, and Surreal Provocation",
  "67c6e70f57cd6dd3670664a7": "A Glimpse into Human Nature",
  "67c6ec7757cd6dd36706823a": "Raw, Real, and Uncomfortable",
  "67c6ed8a57cd6dd367068b40": "Simple Things, Subtle Stories",
  "67c6eeb457cd6dd3670693c8": "An Invitation to Escape from the Everyday",
};

const MANUAL_TITLES = {
  "67c61483144fe266bc51bdc3": "A Dream in Black and White",
  "67c61c700f53cc65352d1079": "Vivid Delirium",
  "67c6e70f57cd6dd3670664a7": "Moments in Paint",
  "67c6ec7757cd6dd36706823a": "Signs of the Times",
  "67c6ed8a57cd6dd367068b40": "The Ordinary Seen Anew ",
  "67c6eeb457cd6dd3670693c8": "Art in Action",
  
};

const Gallery = () => {
  const [colecoes, setColecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const fixedToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VlYzZmOTI5ZjEyNDIxMzY5NWEzNzgiLCJpYXQiOjE3NDM3MDE3NTMsImV4cCI6MTc0ODg4NTc1M30.UvMxJfZVY-wLSEGpZES5j3Pg_OAIKTaAiALXMR7hXAo";

  useEffect(() => {
    const buscarColecoes = async () => {
      try {
        const resposta = await axios.get(
          "https://art-api-nine.vercel.app/collections/get-all",
          { headers: { Authorization: `Bearer ${fixedToken}` } }
        );
        setColecoes(resposta.data.collections);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar coleções!");
        setErro(error.response ? error.response.data.message : error.message);
        setCarregando(false);
      }
    };
    buscarColecoes();
  }, []);

  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>Erro: {erro}</div>;

  // Mantido o método de busca original que funcionava
  const todasSubColecoes = colecoes.flatMap(
    (colecao) =>
      colecao.subCollections?.map((sub) => ({
        ...sub,
        // Alterado para usar a rota antiga que funcionava
        colecaoPaiUrl: `/subcolecao/${sub._id}`,
      })) || []
  );

  // Mantida a divisão em grupos de 3 para o layout
  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const groupedCollections = chunkArray(todasSubColecoes, 3);

  return (
    <div className="gallery-container">
      <section className="hero-gallery-section">
        <div className="hero-gallery-content">
          <h1>Ethereal Chronicles: The Alchemy of Visionary Narratives</h1>
          <p>
            Where Visionary Art Meets Emotional Alchemy
            <br />
            Surreal Dreams Dance with Symbolic Truths
            <br />
            Whimsy Woven into Timeless Narratives
            <br />
            Spaces Reimagined Through Collective Soul
            <br />
            Step Into Stories That Transcend Canvas
          </p>
          {/* <div className="hero-gallery-actions">
            <Link to="/colecoes" className="hero-button">Browse Collection</Link>
          </div> */}
        </div>
        <div className="hero-gallery-image">
          <img
            src="https://res.cloudinary.com/dpilz4p6g/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741212721/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/jlutboa4zaxhrq5wyrj2.jpg"
            alt="Featured Artwork"
            loading="lazy"
          />
        </div>
      </section>

      {groupedCollections.map((group, index) => (
        <section key={`section-${index}`} className="collection-section">
          <div className="collection-wrapper">
            <div className="collection-grid">
              {group.map((subColecao) => {
                // Mantido o método original de busca de imagens
                const imagemCapa = subColecao.pictures?.find(
                  (pic) => pic.isCover
                );
                const imagemSrc =
                  imagemCapa?.src ||
                  subColecao.pictures?.[0]?.src ||
                  "/img/placeholder.jpg";

                return (
                  <div key={subColecao._id} className="collection-card">
                    <Link
                      to={subColecao.colecaoPaiUrl}
                      className="card-image-link"
                    >
                      <img
                        src={imagemSrc}
                        alt={`Capa da subcoleção ${subColecao.subCollectionName}`}
                        className="card-image"
                        loading="lazy"
                      />
                    </Link>
                    {/* <h3 className="card-title">{subColecao.subCollectionName || "Sem nome"}</h3> */}
                    <h3 className="card-title">
                      {MANUAL_TITLES[subColecao._id] ||
                        subColecao.subCollectionName ||
                        "Sem nome"}
                    </h3>
                    <p className="card-description">
                      {MANUAL_DESCRIPTIONS[subColecao._id] ||
                        subColecao.description ||
                        "Descrição não disponível"}
                    </p>
                    {/* <p className="card-description">
                      {subColecao.description || "Descrição não disponível"}
                    </p> */}
                    {/* Mantido o link original */}
                    <Link to={subColecao.colecaoPaiUrl} className="card-button">
                     Start Exploring
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Gallery;
