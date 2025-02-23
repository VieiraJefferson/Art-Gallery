import React from "react";
import ImageSlider from "./SpecificPages/ImageSlider";


const HomePage = () => {
  return (
    <section className="home">
      <div className="overlay"></div>
      <ImageSlider />
      <div className="content">
        <h1>Explorando a Arte Contemporânea</h1>
        <p>Uma jornada visual através da criatividade e expressão.</p>
        <a href="/gallery" className="cta-btn">
          Ver Galeria
        </a>
      </div>
    </section>
  );
};

export default HomePage;
