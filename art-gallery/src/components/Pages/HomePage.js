import React from "react";
import ImageSlider from "./SpecificPages/ImageSlider";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Seção Hero */}
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>
            Where Surrealism Intertwines with the Essence of Being in Dreamlike
            Stories{" "}
          </h1>
          <p>
            Discover daring creativity where surrealism and symbolism transform
            spaces into immersive experiences, blending whimsy, emotion, and the
            essence of human connection.
          </p>
          <a href="/gallery" className="cta-btn">
            Explore Gallery
          </a>
        </div>
      </section>

      {/* Carrossel */}
      <section className="carousel-section">
        <div carousel-container>
          <ImageSlider />
        </div>
      </section>

      {/* Seção de Conteúdo Adicional */}
      <section className="content-section">
        <div className="content-block">
          <h2>Maria Pallas</h2>
          <p>
            Blending surrealism with evocative symbolism, creating life on art.
          </p>
        </div>

        <div className="content-block">
          <h2>Artistic Images</h2>
          <p>Photography & Contemporary Art.</p>
        </div>

        <div className="content-block">
          <h2>Art in Blockchain</h2>
          <p>
          Immutable Art Under the Digital Big Top: Big Top Collection Showcases Circus Character NFTs in Blockchain Legacy
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
