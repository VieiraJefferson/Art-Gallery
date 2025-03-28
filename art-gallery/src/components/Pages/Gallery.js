// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { IoColorPalette } from "react-icons/io5";

// const Gallery = () => {
//   const [colecoes, setColecoes] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);

//   // Posições relativas aos círculos do SVG (em porcentagem)
//   const positions = [
//     { top: "25%", left: "25%" },  // Círculo superior esquerdo
//     { top: "25%", left: "75%" },  // Círculo superior direito
//     { top: "50%", left: "15%" },  // Círculo meio esquerdo
//     { top: "50%", left: "85%" },  // Círculo meio direito
//     { top: "75%", left: "35%" },  // Círculo inferior esquerdo
//     { top: "75%", left: "65%" }   // Círculo inferior direito
//   ];

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

//   // Extrai todas as subcoleções de todas as coleções
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
//               style={{
//                 position: 'absolute',
//                 top: positions[index].top,
//                 left: positions[index].left,
//                 transform: 'translate(-50%, -50%)',
//                 width: '10vw',
//                 height: '10vw',
//                 maxWidth: '120px',
//                 maxHeight: '120px'
//               }}
//             >
//               <Link to={`/subcolecao/${subColecao._id}`}>
//                 <div className="image-card">
//                   <img
//                     src={imagemSrc}
//                     alt={`Capa da subcoleção ${nomeSubColecao}`}
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


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoColorPalette } from "react-icons/io5";

const Gallery = () => {
  const [colecoes, setColecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Função de posicionamento corrigida
  const getPositionStyle = (index) => {
    const positions = [
      { x: 56, y: 31 }, // x e y em porcentagem
      { x:41, y: 42 },
      { x: 41.5, y: 60 },
      { x: 47, y: 30.5 },
      { x: 50, y: 70 },
      { x: 62, y: 44 }
    ];

    return {
      position: 'absolute',
      left: `${positions[index].x}%`,
      top: `${positions[index].y}%`,
      transform: 'translate(-50%, -50%)',
      width: '10vw',
      height: '10vw',
      maxWidth: '120px',
      maxHeight: '120px'
    };
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.gallery-card');
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach(card => card.addEventListener('mousemove', handleMouseMove));
    return () => cards.forEach(card => card.removeEventListener('mousemove', handleMouseMove));
  }, []);

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

  const todasSubColecoes = colecoes.flatMap(colecao => 
    colecao.subCollections?.map(sub => ({ ...sub, colecaoPai: colecao._id })) || []
  );

  return (
    <div className="gallery-container">
      <div className="palette-svg-container">
        <IoColorPalette className="palette-svg" />
      </div>

      <div className="gallery-grid">
        {todasSubColecoes.slice(0, 6).map((subColecao, index) => {
          const imagemSrc = subColecao.pictures?.[1]?.src || "/img/placeholder.jpg";
          const nomeSubColecao = subColecao.subCollectionName || "Sem nome";

          return (
            <div 
              key={`${subColecao._id}-${index}`}
              className="gallery-card"
              style={getPositionStyle(index)}  // Usando a função aqui
            >
              <Link to={`/subcolecao/${subColecao._id}`}>
                <div className="image-card">
                  <img
                    src={imagemSrc}
                    alt={`Capa da subcoleção ${nomeSubColecao}`}
                    className="alternative-fix" /* Adicione esta classe */
        style={{
          width: '100%', /* Força explicitamente */
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
                    onError={(e) => e.target.src = "/img/placeholder.jpg"}
                  />
                </div>
                <div className="overlay">
                  <span>{nomeSubColecao}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;