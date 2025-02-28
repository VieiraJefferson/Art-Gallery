import React from "react";
import ImageSlider from "./SpecificPages/ImageSlider";


const HomePage = () => {
  return (
    <section className="home">
      <div className="overlay">
     
      </div>
      <ImageSlider />
      <div className="content">
        <h1>Exploring Contemporary Art</h1>
        <p>A visual journey through creativity and expression.</p>
        <a href="/gallery" className="cta-btn">
          Gallery
        </a>
      </div>
    </section>
  );
};

export default HomePage;
