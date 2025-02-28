import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/parallax";


const images = [
  "/img/Blume.jpg",
  "/img/Blumen.jpg",
  "/img/Blumenstrauß.jpg",
  "/img/Elefefant.jpg",
  "/img/Afrikakreis.jpg",
  "/img/Schnee.jpg",
  "/img/Stolz.jpg",
  "/img/Pferd.jpg",
  "/img/Muster.jpg",
  "/img/Stiefmütterchen.jpg",
  "/img/Mannes.jpg",
];

const ImageSlider = () => {
  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Autoplay, Parallax]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        speed={5200} // Velocidade da transição do Parallax
        parallax={true}
        direction="vertical" // Faz o slide mover para cima
        className="slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="image-container" 
             data-swiper-parallax="-50%"
             data-swiper-parallax-opacity="0" // Faz a opacidade começar do zero
             data-swiper-parallax-scale="0.9" // Suaviza o efeito com um leve zoom
             
             >
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
