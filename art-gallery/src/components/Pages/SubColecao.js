import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const SubColecao = () => {
  const { id } = useParams(); // Pega o ID da subcoleção da URL
  const [subColecao, setSubColecao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Função para buscar todas as coleções e filtrar a subcoleção desejada
  useEffect(() => {
    const buscarSubColecao = async () => {
      try {
        // Busca todas as coleções
        const resposta = await axios.get("https://art-api-nine.vercel.app/collections/get-all");
        console.log("Resposta da API:", resposta.data); // Verifique os dados no console

        // Filtra a subcoleção desejada
        let subColecaoEncontrada = null;
        resposta.data.collections.forEach((colecao) => {
          const subColecaoFiltrada = colecao.subCollections.find(
            (sub) => sub._id === id
          );
          if (subColecaoFiltrada) {
            subColecaoEncontrada = subColecaoFiltrada;
          }
        });

        if (subColecaoEncontrada) {
          setSubColecao(subColecaoEncontrada);
        } else {
          throw new Error("Subcoleção não encontrada!");
        }

        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar subcoleção:", error); // Verifique o erro no console
        setErro(error.message);
        setCarregando(false);
      }
    };

    buscarSubColecao();
  }, [id]);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  if (erro) {
    return <div>Erro: {erro}</div>;
  }

  return (
    <div className="subcolecao-container">
      <h1>{subColecao.subCollectionName}</h1>
      <div className="gallery-grid">
        {subColecao.pictures.map((picture) => {
             const imageUrl = `https://art-api-nine.vercel.app/${picture.src}`;
          console.log("Caminho da imagem:", picture.src); // Verifique o caminho no console
          return (
            <div key={picture._id} className="gallery-item">
              <div className="image-wrapper">
                <img
                  src={imageUrl}
                  alt={picture.name}
                  onError={(e) => {
                    e.target.src = "/img/placeholder.jpg"; // Fallback para imagens quebradas
                  }}
                />
              </div>
              <div className="overlay">
                <span>{picture.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubColecao;