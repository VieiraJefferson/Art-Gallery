import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";


const images = [
    "../img/Blume.jpg",
    "../img/Blumen.jpg",
    "../img/Blumenstrauß.jpg",
    "../img/blauer Elefefant.jpg",
    "../img/Afrikakreis.jpg",
    "../img/Äste mit Schnee.jpg",
  
    
  ];
  const ImageSlider = () => {
    return (
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        className="slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="image-container">
              <img src={img} alt={`Slide ${index + 1}`} className="fade-in" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
  
  export default ImageSlider;



