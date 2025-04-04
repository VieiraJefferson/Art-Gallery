
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { IoColorPalette } from "react-icons/io5";

// const Gallery = () => {
//   const [colecoes, setColecoes] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);

//   // Função de posicionamento corrigida
//   const getPositionStyle = (index) => {
//     const positions = [
//       { x: 56, y: 31 }, // x e y em porcentagem
//       { x:41, y: 42 },
//       { x: 41.5, y: 60 },
//       { x: 47, y: 30.5 },
//       { x: 50, y: 70 },
//       { x: 62, y: 44 }
//     ];

//     return {
//       position: 'absolute',
//       left: `${positions[index].x}%`,
//       top: `${positions[index].y}%`,
//       transform: 'translate(-50%, -50%)',
//       width: '10vw',
//       height: '10vw',
//       maxWidth: '120px',
//       maxHeight: '120px'
//     };
//   };

//   useEffect(() => {
//     const cards = document.querySelectorAll('.gallery-card');
//     const handleMouseMove = (e) => {
//       const rect = e.currentTarget.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
//       e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
//     };

//     cards.forEach(card => card.addEventListener('mousemove', handleMouseMove));
//     return () => cards.forEach(card => card.removeEventListener('mousemove', handleMouseMove));
//   }, []);

//   const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndWVzdCIsImlhdCI6MTc0MjY0OTM5MCwiZXhwIjoxNzQ1MjQxMzkwfQ.HAOUcKQLxQpZ2b4ogcUiOGtUWh96tMe1PLtl-IXkI-o";

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

//   const todasSubColecoes = colecoes.flatMap(colecao => 
//     colecao.subCollections?.map(sub => ({ ...sub, colecaoPai: colecao._id })) || []
//   );

//   return (
//     <div className="gallery-container">
//       <div className="palette-svg-container">
//         <IoColorPalette className="palette-svg" />
//       </div>

//       <div className="gallery-grid">
//         {todasSubColecoes.slice(0, 6).map((subColecao, index) => {
//           const imagemSrc = subColecao.pictures?.[1]?.src || "/img/placeholder.jpg";
//           const nomeSubColecao = subColecao.subCollectionName || "Sem nome";

//           return (
//             <div 
//               key={`${subColecao._id}-${index}`}
//               className="gallery-card"
//               style={getPositionStyle(index)}  // Usando a função aqui
//             >
//               <Link to={`/subcolecao/${subColecao._id}`}>
//                 <div className="image-card">
//                   <img
//                     src={imagemSrc}
//                     alt={`Capa da subcoleção ${nomeSubColecao}`}
//                     className="alternative-fix" /* Adicione esta classe */
//         style={{
//           width: '100%', /* Força explicitamente */
//           height: '100%',
//           objectFit: 'cover',
//           objectPosition: 'center'
//         }}
//                     onError={(e) => e.target.src = "/img/placeholder.jpg"}
//                   />
//                 </div>
//                 <div className="overlay">
//                   <span>{nomeSubColecao}</span>
//                 </div>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Gallery;    




//04/04/2025




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { IoColorPalette } from "react-icons/io5";

// const Gallery = () => {
//   const [colecoes, setColecoes] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);

//   const getPositionStyle = (index) => {
//     const positions = [
//       { x: 56, y: 31 },
//       { x: 41, y: 42 },
//       { x: 41.5, y: 60 },
//       { x: 47, y: 30.5 },
//       { x: 50, y: 70 },
//       { x: 62, y: 44 }
//     ];

//     return {
//       position: 'absolute',
//       left: `${positions[index].x}%`,
//       top: `${positions[index].y}%`,
//       transform: 'translate(-50%, -50%)',
//       width: '10vw',
//       height: '10vw',
//       maxWidth: '120px',
//       maxHeight: '120px'
//     };
//   };

//   useEffect(() => {
//     const cards = document.querySelectorAll('.gallery-card');
//     const handleMouseMove = (e) => {
//       const rect = e.currentTarget.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
//       e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
//     };

//     cards.forEach(card => card.addEventListener('mousemove', handleMouseMove));
//     return () => cards.forEach(card => card.removeEventListener('mousemove', handleMouseMove));
//   }, []);

//   const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndWVzdCIsImlhdCI6MTc0MjY0OTM5MCwiZXhwIjoxNzQ1MjQxMzkwfQ.HAOUcKQLxQpZ2b4ogcUiOGtUWh96tMe1PLtl-IXkI-o";

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

//   const todasSubColecoes = colecoes.flatMap(colecao => 
//     colecao.subCollections?.map(sub => ({
//       ...sub,
//       colecaoPai: colecao._id,
//       colecaoPaiUrl: `/colecao/${colecao._id}/subcolecao/${sub._id}`
//     })) || []
//   );

//   return (
//     <div className="gallery-container">
//      <section class="hero-section">
//   <div class="hero-container">
//     {/* <!-- Conteúdo do lado esquerdo --> */}
//     <div class="hero-content">
//       <h1 class="hero-title">Good art changes lives</h1>
//       <p class="hero-description">Bring home your new art to view it in person. If a piece doesn't quite work in your space, return it within seven days of receiving your order and receive a full refund.*</p>
//       <div class="hero-actions">
//         <a href="/colecoes" class="hero-button">Browse Collection</a>
//         <a href="/garantia" class="hero-link">*Satisfaction Guaranteed</a>
//       </div>
//     </div>

//     {/* <!-- Imagem do lado direito --> */}
//     <div class="hero-image">
//       <img src="https://res.cloudinary.com/dpilz4p6g/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741212721/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/jlutboa4zaxhrq5wyrj2.jpg" alt="Descrição da obra de arte" loading="lazy"/>
//     </div>
//   </div>
// </section>
//       <div className="palette-svg-container">
//         <IoColorPalette className="palette-svg" />
//       </div>

//       <div className="gallery-grid">
//         {todasSubColecoes.slice(0, 6).map((subColecao, index) => {
//           // Modificação principal: Busca imagem com isCover: true
//           const imagemCapa = subColecao.pictures?.find(pic => pic.isCover);
//           const imagemSrc = imagemCapa?.src || 
//                          subColecao.pictures?.[0]?.src || 
//                          "/img/placeholder.jpg";

//           const nomeSubColecao = subColecao.subCollectionName || "Sem nome";

//           return (
//             <div 
//               key={`${subColecao._id}-${index}`}
//               className="gallery-card"
//               style={getPositionStyle(index)}
//             >
//               <Link to={subColecao.colecaoPaiUrl || '#'}>
//                 <div className="image-card">
//                   <img
//                     src={imagemSrc}
//                     alt={`Capa da subcoleção ${nomeSubColecao}`}
//                     className="alternative-fix"
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       objectPosition: 'center'
//                     }}
//                     onError={(e) => e.target.src = "/img/placeholder.jpg"}
//                   />
//                 </div>
//                 <div className="overlay">
//                   <span>{nomeSubColecao}</span>
//                 </div>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Gallery;   



// Gallery.jsx



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Gallery = () => {
//   const [colecoes, setColecoes] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);

//   const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndWVzdCIsImlhdCI6MTc0MjY0OTM5MCwiZXhwIjoxNzQ1MjQxMzkwfQ.HAOUcKQLxQpZ2b4ogcUiOGtUWh96tMe1PLtl-IXkI-o";

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

//   const todasSubColecoes = colecoes.flatMap(colecao => 
//     colecao.subCollections?.map(sub => ({
//       ...sub,
//       colecaoPaiUrl: `/colecao/${colecao._id}/subcolecao/${sub._id}`
//     })) || []
//   );

//   return (
//     <div className="gallery-container">
//       <section className="hero-gallery-section">
//         <div className="hero-gallery--content">
//           <h1>Good art changes lives</h1>
//           <p>Bring home your new art to view it in person. If a piece doesn't quite work in your space, return it within seven days of receiving your order and receive a full refund.*</p>
//           <div className="hero-gallery-actions">
//             <Link to="/colecoes" className="hero-button">Browse Collection</Link>
//             <Link to="/garantia" className="hero-link">*Satisfaction Guaranteed</Link>
//           </div>
//         </div> 
 
//          <div className="hero-image">
//           <img src="https://res.cloudinary.com/dpilz4p6g/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1741212721/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/jlutboa4zaxhrq5wyrj2.jpg" 
//                alt="Featured Artwork" 
//                loading="lazy" />
//         </div> 
//       </section>

//       <div className="gallery-grid">
//         {todasSubColecoes.map((subColecao) => {
//           const imagemCapa = subColecao.pictures?.find(pic => pic.isCover);
//           const imagemSrc = imagemCapa?.src || 
//                          subColecao.pictures?.[0]?.src || 
//                          "/img/placeholder.jpg";

//           return (
//             <Link 
//               key={subColecao._id}
//               to={subColecao.colecaoPaiUrl || '#'}
//               className="gallery-card"
//             >
//               <div className="image-container">
//                 <img
//                   src={imagemSrc}
//                   alt={`Capa da subcoleção ${subColecao.subCollectionName}`}
//                   loading="lazy"
//                 />
//               </div>
//               <div className="overlay">
//                 <span>{subColecao.subCollectionName || "Sem nome"}</span>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Gallery;  

// Gallery.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const [colecoes, setColecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndWVzdCIsImlhdCI6MTc0MjY0OTM5MCwiZXhwIjoxNzQ1MjQxMzkwfQ.HAOUcKQLxQpZ2b4ogcUiOGtUWh96tMe1PLtl-IXkI-o";

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

  // Dividir subcoleções em grupos de 3
  const chunkArray = (arr, size) => 
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  
  const todasSubColecoes = colecoes.flatMap(colecao => 
    colecao.subCollections?.map(sub => ({
      ...sub,
      colecaoPaiUrl: `/colecao/${colecao._id}/subcolecao/${sub._id}`
    })) || []
  );

  const groupedCollections = chunkArray(todasSubColecoes, 3);

  return (
    <div className="gallery-container">
      <section className="hero-gallery-section">
        <div className="hero-gallery-content">
          <h1>Ethereal Chronicles: The Alchemy of Visionary Narratives</h1>
          <p>"Where Visionary Art Meets Emotional Alchemy
Surreal Dreams Dance with Symbolic Truths
Whimsy Woven into Timeless Narratives
Spaces Reimagined Through Collective Soul
Step Into Stories That Transcend Canvas"</p>
          <div className="hero-gallery-actions">
            <Link to="/colecoes" className="hero-button">Browse Collection</Link>
            <Link to="/garantia" className="hero-link">*Satisfaction Guaranteed</Link>
          </div>
        </div>
        <div className="hero-image">
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
                const imagemCapa = subColecao.pictures?.find(pic => pic.isCover);
                const imagemSrc = imagemCapa?.src || 
                               subColecao.pictures?.[0]?.src || 
                               "/img/placeholder.jpg";

                return (
                  <div key={subColecao._id} className="collection-card">
                    <Link to={subColecao.colecaoPaiUrl} className="card-image-link">
                      <img
                        src={imagemSrc}
                        alt={`Capa da subcoleção ${subColecao.subCollectionName}`}
                        className="card-image"
                        loading="lazy"
                      />
                    </Link>
                    <h3 className="card-title">{subColecao.subCollectionName || "Sem nome"}</h3>
                    <p className="card-description">
                      {subColecao.description || "Descrição não disponível"}
                    </p>
                    <Link to={subColecao.colecaoPaiUrl} className="card-button">
                      Ver Coleção
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