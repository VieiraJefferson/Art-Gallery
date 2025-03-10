
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";


// const Colecao = () => {
//   const { id } = useParams(); // Pega o ID da coleção da URL
//   const [colecao, setColecao] = useState(null);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);

//   // Função para buscar os detalhes da coleção
//   useEffect(() => {
//     const buscarColecao = async () => {
//       try {
//         const resposta = await axios.get(`https://art-api-ten.vercel.app/collections/${id}`);
//         setColecao(resposta.data);
//         setCarregando(false);
//       } catch (error) {
//         setErro(error.message);
//         setCarregando(false);
//       }
//     };

//     buscarColecao();
//   }, [id]);

//   if (carregando) {
//     return <div>Carregando...</div>;
//   }

//   if (erro) {
//     return <div>Erro: {erro}</div>;
//   }

//   return (
//     <div className="subcolecao-container">
//       <h1>{colecao.collectionName}</h1>
//       {colecao.subCollections.map((subColecao) => (
//         <div key={subColecao._id} className="subcolecao-section">
//           <h2>{subColecao.subCollectionName}</h2>
//           <div className="sub-gallery-grid">
//             {subColecao.pictures.map((picture) => {
//               // Use a URL do Cloudinary diretamente
//               const imageUrl = picture.src;

//               return (
//                 <div key={picture._id} className="sub-gallery-item">
//                   <div className="sub-image-wrapper">
//                     <img
//                       src={imageUrl}
//                       alt={picture.name}
//                       onError={(e) => {
//                         e.target.src = "/img/placeholder.jpg"; // Fallback para imagens quebradas
//                       }}
//                     />
//                   </div>
//                   <div className="sub-overlay">
//                     <span>{picture.name}</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Colecao;