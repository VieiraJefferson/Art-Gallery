import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Colecao = () => {
  const { id } = useParams(); // Pega o ID da coleção da URL
  const [colecao, setColecao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Função para buscar os detalhes da coleção
  useEffect(() => {
    const buscarColecao = async () => {
      try {
        const resposta = await axios.get(`https://art-api-ten.vercel.app/collections/${id}`);
        setColecao(resposta.data);
        setCarregando(false);
      } catch (error) {
        setErro(error.message);
        setCarregando(false);
      }
    };

    buscarColecao();
  }, [id]);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (erro) {
    return <div>Erro: {erro}</div>;
  }

  return (
    <div className="colecao-container">
      <h1>{colecao.collectionName}</h1>
      <div className="gallery-grid">
        {colecao.subCollections.map((subColecao) =>
          subColecao.pictures.map((picture) => (
            <div key={picture._id} className="gallery-item">
              <div className="image-wrapper">
                <img src={picture.src} alt={picture.name} />
              </div>
              <div className="overlay">
                <span>{picture.name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Colecao;