import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const images = [
  "/img/Blume.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212695/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/y6pwsm02rgvr8tdgxfsw.jpg",
  "/img/Blumen.jpg",
  "/img/Blumenstrauß.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212075/galeria/Pallas%20Galaxy%20Collection/yhahyrurr7gtkccfcfv3.jpg",
  "/img/Afrikakreis.jpg",
  "/img/Schnee.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212362/galeria/galeria/Pallas%20Galaxy%20Collection/2013/ekp8soassh5wssrlyhcs.jpg",
  "/img/Stolz.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212666/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/schjzl01spocb68d9f05.jpg",
  "/img/Pferd.jpg",
  "/img/Muster.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212063/galeria/Pallas%20Galaxy%20Collection/lbp9onud38upck3uy2ol.jpg",
  "/img/Mannes.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212070/galeria/Pallas%20Galaxy%20Collection/a18wurfnvi9nlz2hyzbz.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212695/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/y6pwsm02rgvr8tdgxfsw.jpg",
];

const ImageSlider = () => {
  return (
    <div className="slider-container">
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={6000} // Ajuste a velocidade para um movimento contínuo
        loop={true}
        freeMode={true}
        freeModeMomentum={false}
      >
        {/* Duplicando as imagens para efeito de loop contínuo */}
        {images.concat(images).map((img, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img src={img} alt={`Slide ${index + 1}`} className="slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
