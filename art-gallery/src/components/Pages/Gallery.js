
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

  return (

    <div className="gallery-container">
    
      <div className="gallery-grid">
    {colecoes.map((colecao) =>
      colecao.subCollections.map((subColecao) => (
        <div key={subColecao._id} className="gallery-item">
          <Link to={`/subcolecao/${subColecao._id}`}>
            <div className="image-wrapper">
              {/* Exibe a primeira imagem da subcoleção como capa */}
              <img
                src={subColecao.pictures && subColecao.pictures.length > 0 ? subColecao.pictures[0].src : "/img/placeholder.jpg"}
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