// import React from "react";
// import ImageSlider from "./SpecificPages/ImageSlider";


// const HomePage = () => {
//   return (
//     <section className="home">
//       <div className="overlay">
     
//       </div>
//       <ImageSlider />
//       <div className="content">
//         <h1>Exploring Contemporary Art</h1>
//         <p>A visual journey through creativity and expression.</p>
//         <a href="/gallery" className="cta-btn">
//           Gallery
//         </a>
//       </div>
//     </section>
//   );
// };

// export default HomePage;


import React from "react";
import ImageSlider from "./SpecificPages/ImageSlider";


const HomePage = () => {
  return (
    <div className="home-page">
      {/* Seção Hero */}
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Where Surrealism Intertwines with the Essence of Being in Dreamlike Stories </h1>
          <p>
          Discover daring creativity where surrealism and symbolism transform spaces into immersive experiences, blending whimsy, emotion, and the essence of human connection.
          </p>
          <a href="/gallery" className="cta-btn">
            Explore  Gallery
          </a>
        </div>
      </section>

      {/* Carrossel */}
      <section className="carousel-section">
        <div carousel-container >
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
          <h2>Imagens Artísticas</h2>
          <p>
            Fotografia & Arte Contemporânea.
          </p>
        </div>

        <div className="content-block">
          <h2>Curadoria de Arte Digital</h2>
          <p>
            Exposições Virtuais Interativas e Consultoria de Branding Artístico.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;