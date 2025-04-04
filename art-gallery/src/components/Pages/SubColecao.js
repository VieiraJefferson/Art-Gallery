// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";

// // const SubColecao = () => {
// //   const { id } = useParams(); // Pega o ID da subcoleção da URL
// //   const [subColecao, setSubColecao] = useState(null);
// //   const [carregando, setCarregando] = useState(true);
// //   const [erro, setErro] = useState(null);
// //   const [activeImageId, setActiveImageId] = useState(null); // Estado para controlar a imagem ativa

// //   // Função para buscar todas as coleções e filtrar a subcoleção desejada
// //   useEffect(() => {
// //     const buscarSubColecao = async () => {
// //       try {
// //         // Busca todas as coleções
// //         const resposta = await axios.get(
// //           "https://art-api-nine.vercel.app/collections/get-all"
// //         );
// //         console.log("Resposta da API:", resposta.data); // Verifique os dados no console

// //         // Filtra a subcoleção desejada
// //         let subColecaoEncontrada = null;
// //         resposta.data.collections.forEach((colecao) => {
// //           const subColecaoFiltrada = colecao.subCollections.find(
// //             (sub) => sub._id === id
// //           );
// //           if (subColecaoFiltrada) {
// //             subColecaoEncontrada = subColecaoFiltrada;
// //           }
// //         });

// //         if (subColecaoEncontrada) {
// //           setSubColecao(subColecaoEncontrada);
// //         } else {
// //           throw new Error("Subcoleção não encontrada!");
// //         }

// //         setCarregando(false);
// //       } catch (error) {
// //         console.error("Erro ao buscar subcoleção:", error); // Verifique o erro no console
// //         setErro(error.message);
// //         setCarregando(false);
// //       }
// //     };

// //     buscarSubColecao();
// //   }, [id]);

// //   // Função para expandir a imagem ao clicar
// //   const handleImageClick = (imageId) => {
// //     if (activeImageId === imageId) {
// //       setActiveImageId(null); // Fecha a imagem se já estiver aberta
// //     } else {
// //       setActiveImageId(imageId); // Expande a imagem clicada
// //     }
// //   };

// //   if (carregando) {
// //     return <div>Carregando...</div>;
// //   }

// //   if (erro) {
// //     return <div>Erro: {erro}</div>;
// //   }

// //   return (
// //     <div className="sub-colecao-container">
// //       <h1>{subColecao.subCollectionName}</h1>
// //       <div className="sub-gallery-grid">
// //         {subColecao.pictures.map((picture) => {
// //           const imageUrl = picture.src;
// //           const isActive = activeImageId === picture._id; // Verifica se a imagem está ativa

// //           return (
// //             <div
// //               key={picture._id}
// //               className={`sub-gallery-item ${isActive ? "active" : ""}`}
// //               onClick={() => handleImageClick(picture._id)}
// //             >
// //               <div className="sub-image-wrapper">
// //                 <img
// //                   src={imageUrl}
// //                   alt={picture.name}
// //                   onError={(e) => {
// //                     e.target.src = "/img/placeholder.jpg"; // Fallback para imagens quebradas
// //                   }}
// //                 />
// //                 <div className="sub-overlay">
// //                   <span>{picture.name}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //       {activeImageId && (
// //         <div
// //           className="expanded-overlay"
// //           onClick={() => setActiveImageId(null)}
// //         >
// //           <div className="expanded-image">
// //             <img
// //               src={
// //                 subColecao.pictures.find((pic) => pic._id === activeImageId).src
// //               }
// //               alt="Expanded"
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SubColecao;



// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";

// // const SubColecao = () => {
// //   const { colecaoId, subId } = useParams(); // Agora recebe ambos IDs da URL
// //   const [subColecao, setSubColecao] = useState(null);
// //   const [carregando, setCarregando] = useState(true);
// //   const [erro, setErro] = useState(null);
// //   const [activeImageId, setActiveImageId] = useState(null);

// //   // Token de autenticação fixo
// //   const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndWVzdCIsImlhdCI6MTc0MjY0OTM5MCwiZXhwIjoxNzQ1MjQxMzkwfQ.HAOUcKQLxQpZ2b4ogcUiOGtUWh96tMe1PLtl-IXkI-o";

// //   useEffect(() => {
// //     const buscarSubColecao = async () => {
// //       try {
// //         // Busca direta usando os dois IDs
// //         const resposta = await axios.get(
// //           `https://art-api-nine.vercel.app/collections/${colecaoId}/subcollection/${subId}`,
// //           { 
// //             headers: { 
// //               Authorization: `Bearer ${fixedToken}` 
// //             } 
// //           }
// //         );

// //         if (resposta.data) {
// //           setSubColecao(resposta.data);
// //         } else {
// //           throw new Error("Subcoleção não encontrada!");
// //         }

// //         setCarregando(false);
// //       } catch (error) {
// //         console.error("Erro ao buscar subcoleção:", error);
// //         setErro(error.response?.data?.message || error.message);
// //         setCarregando(false);
// //       }
// //     };

// //     buscarSubColecao();
// //   }, [colecaoId, subId]); // Dependências atualizadas

// //   const handleImageClick = (imageId) => {
// //     setActiveImageId(prev => prev === imageId ? null : imageId);
// //   };

// //   if (carregando) return <div>Carregando...</div>;
// //   if (erro) return <div>Erro: {erro}</div>;
// //   if (!subColecao) return <div>Subcoleção não encontrada</div>;

// //   return (
// //     <div className="sub-colecao-container">
// //       <h1>{subColecao.subCollectionName}</h1>
// //       <div className="sub-gallery-grid">
// //         {subColecao.pictures?.map((picture) => (
// //           <div
// //             key={picture._id}
// //             className={`sub-gallery-item ${activeImageId === picture._id ? "active" : ""}`}
// //             onClick={() => handleImageClick(picture._id)}
// //           >
// //             <div className="sub-image-wrapper">
// //               <img
// //                 src={picture.src}
// //                 alt={picture.name}
// //                 onError={(e) => {
// //                   e.target.src = "/img/placeholder.jpg";
// //                 }}
// //               />
// //               <div className="sub-overlay">
// //                 <span>{picture.name}</span>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {activeImageId && (
// //         <div className="expanded-overlay" onClick={() => setActiveImageId(null)}>
// //           <div className="expanded-image">
// //             <img
// //               src={subColecao.pictures.find(pic => pic._id === activeImageId).src}
// //               alt="Expanded"
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SubColecao;  

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SubColecao = () => {
//   const { id } = useParams();
//   const [subColecao, setSubColecao] = useState(null);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);

//   const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndWVzdCIsImlhdCI6MTc0MjY0OTM5MCwiZXhwIjoxNzQ1MjQxMzkwfQ.HAOUcKQLxQpZ2b4ogcUiOGtUWh96tMe1PLtl-IXkI-o";

//   useEffect(() => {
//     const buscarSubColecao = async () => {
//       try {
//         // 1. Buscar todas as coleções
//         const resposta = await axios.get(
//           "https://art-api-nine.vercel.app/collections/get-all",
//           { headers: { Authorization: `Bearer ${fixedToken}` } }
//         );

//         // 2. Encontrar subcoleção pelo ID
//         let subEncontrada = null;
//         for (const colecao of resposta.data.collections) {
//           subEncontrada = colecao.subCollections?.find(sub => sub._id === id);
//           if (subEncontrada) break;
//         }

//         if (subEncontrada) {
//           setSubColecao(subEncontrada);
//         } else {
//           throw new Error("Subcoleção não encontrada!");
//         }

//         setCarregando(false);
//       } catch (error) {
//         console.error("Erro:", error);
//         setErro(error.message);
//         setCarregando(false);
//       }
//     };

//     buscarSubColecao();
//   }, [id]);

//   if (carregando) return <div>Carregando...</div>;
//   if (erro) return <div>Erro: {erro}</div>;

//   return (
//     <div className="subcolecao-container">
//       <h1>{subColecao.subCollectionName}</h1>
//       <div className="subcolecao-grid">
//         {subColecao.pictures?.map((picture) => (
//           <div key={picture._id} className="artwork-item">
//             <img
//               src={picture.src}
//               alt={picture.name}
//               onError={(e) => e.target.src = "/img/placeholder.jpg"}
//             />
//             <div className="artwork-info">
//               <h3>{picture.name}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubColecao;   



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";


// const SubColecao = () => {
//   const { id } = useParams();
//   const [subColecao, setSubColecao] = useState(null);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);
//   const [activeImageId, setActiveImageId] = useState(null);

//   const fixedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2VlYzZmOTI5ZjEyNDIxMzY5NWEzNzgiLCJpYXQiOjE3NDM3MDE3NTMsImV4cCI6MTc0ODg4NTc1M30.UvMxJfZVY-wLSEGpZES5j3Pg_OAIKTaAiALXMR7hXAo";

//   // Função de clique para imagens
//   const handleImageClick = (imageId) => {
//     setActiveImageId(prev => prev === imageId ? null : imageId);
//   };

//   useEffect(() => {
//     const buscarSubColecao = async () => {
//       try {
//         const resposta = await axios.get(
//           "https://art-api-nine.vercel.app/collections/get-all",
//           { headers: { Authorization: `Bearer ${fixedToken}` } }
//         );

//         let subEncontrada = null;
//         resposta.data.collections.forEach(colecao => {
//           colecao.subCollections?.forEach(sub => {
//             if (sub._id === id) subEncontrada = sub;
//           });
//         });

//         if (subEncontrada) {
//           setSubColecao(subEncontrada);
//         } else {
//           throw new Error("Subcoleção não encontrada!");
//         }

//       } catch (error) {
//         setErro(error.message);
//       } finally {
//         setCarregando(false);
//       }
//     };

//     buscarSubColecao();
//   }, [id]);

//   if (carregando) return <div>Carregando...</div>;
//   if (erro) return <div>Erro: {erro}</div>;

//   return (
//     <div className="sub-colecao-container">
//       <h1>{subColecao.subCollectionName}</h1>
      
//       <div className="sub-gallery-grid">
//         {subColecao.pictures.map((picture) => {
//           const isActive = activeImageId === picture._id;

//           return (
//             <div
//               key={picture._id}
//               className={`sub-gallery-item ${isActive ? "active" : ""}`}
//               onClick={() => handleImageClick(picture._id)}
//             >
//               <div className="sub-image-wrapper">
//                 <img
//                   src={picture.src}
//                   alt={picture.name}
//                   onError={(e) => {
//                     e.target.src = "/img/placeholder.jpg";
//                   }}
//                 />
//                 <div className="sub-overlay">
//                   <span>{picture.name}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {activeImageId && (
//         <div className="expanded-overlay" onClick={() => setActiveImageId(null)}>
//           <div className="expanded-image">
//             <img
//               src={subColecao.pictures.find(pic => pic._id === activeImageId).src}
//               alt="Expanded"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubColecao;  



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SubColecao = () => {
//   const { id } = useParams();
//   const [subColecao, setSubColecao] = useState(null);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);
//   const [activeImageId, setActiveImageId] = useState(null);

//   const fixedToken = "eyJ1c2VySWQiOiI2N2VlYzZmOTI5ZjEyNDIxMzY5NWEzNzgiLCJpYXQiOjE3NDM3MDE3NTMsImV4cCI6MTc0ODg4NTc1M30";

//   const handleImageClick = (imageId) => {
//     setActiveImageId(prev => prev === imageId ? null : imageId);
//   };

//   useEffect(() => {
//     const buscarSubColecao = async () => {
//       try {
//         const resposta = await axios.get(
//           "https://art-api-nine.vercel.app/collections/get-all",
//           { headers: { Authorization: `Bearer ${fixedToken}` } }
//         );

//         let subEncontrada = null;
//         resposta.data.collections.forEach(colecao => {
//           colecao.subCollections?.forEach(sub => {
//             if (sub._id === id) subEncontrada = sub;
//           });
//         });

//         if (subEncontrada) {
//           setSubColecao(subEncontrada);
//         } else {
//           throw new Error("Subcoleção não encontrada!");
//         }
//       } catch (error) {
//         setErro(error.message);
//       } finally {
//         setCarregando(false);
//       }
//     };

//     buscarSubColecao();
//   }, [id]);

//   if (carregando) return <div>Carregando...</div>;
//   if (erro) return <div>Erro: {erro}</div>;

//   return (
//     <div className="sub-colecao-container">
//       <h1>{subColecao.subCollectionName}</h1>
      
//       <div className="sub-gallery-grid">
//         {subColecao.pictures.map((picture) => {
//           const isActive = activeImageId === picture._id;

//           return (
//             <div
//               key={picture._id}
//               className={`sub-gallery-item ${isActive ? "active" : ""}`}
//               onClick={() => handleImageClick(picture._id)}
//             >
//               <div className="sub-image-wrapper">
//                 <img
//                   src={picture.src}
//                   alt={picture.name}
//                   onError={(e) => {
//                     e.target.src = "/img/placeholder.jpg";
//                   }}
//                 />
//               </div>
//               {/* Novo card de informações */}
//               <div className="sub-info-card">
//                 <h3 className="image-title">{picture.name}</h3>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {activeImageId && (
//         <div className="expanded-overlay" onClick={() => setActiveImageId(null)}>
//           <div className="expanded-image">
//             <img
//               src={subColecao.pictures.find(pic => pic._id === activeImageId).src}
//               alt="Expanded"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubColecao;  


//04/04

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SubColecao = () => {
//   const { id } = useParams();
//   const [subColecao, setSubColecao] = useState(null);
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(null);
//   const [activeImageId, setActiveImageId] = useState(null);

//   const fixedToken = "SEU_TOKEN_AQUI";

//   const handleImageClick = (imageId) => {
//     setActiveImageId(prev => prev === imageId ? null : imageId);
//   };

//   useEffect(() => {
//     const buscarSubColecao = async () => {
//       try {
//         const resposta = await axios.get(
//           "https://art-api-nine.vercel.app/collections/get-all",
//           { headers: { Authorization: `Bearer ${fixedToken}` } }
//         );

//         let subEncontrada = null;
//         resposta.data.collections.forEach(colecao => {
//           colecao.subCollections?.forEach(sub => {
//             if (sub._id === id) subEncontrada = sub;
//           });
//         });

//         if (subEncontrada) {
//           setSubColecao(subEncontrada);
//         } else {
//           throw new Error("Subcoleção não encontrada!");
//         }
//       } catch (error) {
//         setErro(error.message);
//       } finally {
//         setCarregando(false);
//       }
//     };

//     buscarSubColecao();
//   }, [id]);

//   if (carregando) return <div>Carregando...</div>;
//   if (erro) return <div>Erro: {erro}</div>;

//   return (
//     <div className="sub-colecao-container">
//       <h1>{subColecao.subCollectionName}</h1>
      
//       <div className="sub-gallery-grid">
//         {subColecao.pictures.map((picture) => (
//           <div
//             key={picture._id}
//             className={`sub-gallery-item ${activeImageId === picture._id ? "active" : ""}`}
//             onClick={() => handleImageClick(picture._id)}
//           >
//             <div className="sub-image-wrapper">
//               <img
//                 src={picture.src}
//                 alt={picture.name}
//                 onError={(e) => {
//                   e.target.src = "/img/placeholder.jpg";
//                 }}
//               />
//             </div>
//             <div className="sub-info-card">
//               <h3 className="image-title">{picture.name}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {activeImageId && (
//         <div className="expanded-overlay" onClick={() => setActiveImageId(null)}>
//           <div className="expanded-image">
//             <img
//               src={subColecao.pictures.find(pic => pic._id === activeImageId).src}
//               alt="Expanded"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubColecao;  

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SubColecao = () => {
  const { id } = useParams();
  const [subColecao, setSubColecao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [activeImageId, setActiveImageId] = useState(null);

  const fixedToken = "SEU_TOKEN_AQUI";

  const handleImageClick = (imageId) => {
    setActiveImageId(prev => prev === imageId ? null : imageId);
  };

  useEffect(() => {
    const buscarSubColecao = async () => {
      try {
        const resposta = await axios.get(
          "https://art-api-nine.vercel.app/collections/get-all",
          { headers: { Authorization: `Bearer ${fixedToken}` } }
        );

        let subEncontrada = null;
        resposta.data.collections.forEach(colecao => {
          colecao.subCollections?.forEach(sub => {
            if (sub._id === id) subEncontrada = sub;
          });
        });

        if (subEncontrada) {
          setSubColecao(subEncontrada);
        } else {
          throw new Error("Subcoleção não encontrada!");
        }
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarSubColecao();
  }, [id]);

  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>Erro: {erro}</div>;

  return (
    <div className="sub-colecao-container">
      {/* <h1>{subColecao.subCollectionName}</h1> */}
      
      <div className="sub-gallery-grid">
        {subColecao.pictures.map((picture) => {
          const isActive = activeImageId === picture._id;

          return (
            <div
              key={picture._id}
              className={`sub-gallery-item ${isActive ? "active" : ""}`}
              onClick={() => handleImageClick(picture._id)}
            >
              <div className="sub-image-wrapper">
                <img
                  src={picture.src}
                  alt={picture.name}
                  onError={(e) => {
                    e.target.src = "/img/placeholder.jpg";
                  }}
                />
                <div className="sub-overlay">
                  <span>{picture.name}</span>
                </div>
              </div>
              {/* Novo card de informações fixo */}
              {/* <div className="sub-info-card">
                <h3>{picture.name}</h3>
              </div> */}
            </div>
          );
        })}
      </div>

      {activeImageId && (
        <div className="expanded-overlay" onClick={() => setActiveImageId(null)}>
          <div className="expanded-image">
            <img
              src={subColecao.pictures.find(pic => pic._id === activeImageId).src}
              alt="Expanded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubColecao;