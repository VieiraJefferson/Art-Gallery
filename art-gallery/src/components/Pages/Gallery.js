import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const [colecoes, setColecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  
useEffect(() => {
  const cards = document.querySelectorAll('.gallery-card');
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  cards.forEach(card => {
    card.addEventListener('mousemove', handleMouseMove);
  });

  return () => {
    cards.forEach(card => {
      card.removeEventListener('mousemove', handleMouseMove);
    });
  };
}, []);

  // Token fixo para autenticação
  const fixedToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJndWVzdCIsImlhdCI6MTc0MjY0OTM5MCwiZXhwIjoxNzQ1MjQxMzkwfQ.HAOUcKQLxQpZ2b4ogcUiOGtUWh96tMe1PLtl-IXkI-o"; // Substitua pelo token gerado

  // Função para buscar as coleções da API
  useEffect(() => {
    const buscarColecoes = async () => {
      try {
        const resposta = await axios.get(
          "https://art-api-nine.vercel.app/collections/get-all",
          {
            headers: {
              Authorization: `Bearer ${fixedToken}`, // Adiciona o token fixo no header
            },
          }
        );
        console.log(resposta.data.collections);

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

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (erro) {
    return <div>Erro: {erro}</div>;
  }

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {colecoes.map((colecao) =>
          colecao.subCollections.map((subColecao) => (
            <div key={subColecao._id} className="gallery-card">
              <Link to={`/subcolecao/${subColecao._id}`}>
                <div className="image-card">
                  <img
                    src={
                      subColecao.pictures && subColecao.pictures.length > 0
                        ? subColecao.pictures[1].src
                        : "/img/placeholder.jpg"
                    }
                    alt={`Capa da subcoleção ${subColecao.subCollectionName}`}
                    onError={(e) => {
                      e.target.src = "/img/placeholder.jpg"; // Fallback para imagens quebradas
                    }}
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
