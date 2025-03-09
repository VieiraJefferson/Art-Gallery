// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, Parallax } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/parallax";


// const images = [
//   "/img/Blume.jpg",
//   "/img/Blumen.jpg",
//   "/img/Blumenstrauß.jpg",
//   "/img/Elefefant.jpg",
//   "/img/Afrikakreis.jpg",
//   "/img/Schnee.jpg",
//   "/img/Stolz.jpg",
//   "/img/Pferd.jpg",
//   "/img/Muster.jpg",
//   "/img/Stiefmütterchen.jpg",
//   "/img/Mannes.jpg",
// ];

// const ImageSlider = () => {
//   return (
//     <div className="slider-container">
//       <Swiper
//         modules={[Navigation, Autoplay, Parallax]}
//         autoplay={{ delay: 3000, disableOnInteraction: false }} // Ajuste o delay para 3 segundos
//         loop={true}
//         navigation={true}
//         speed={1000} // Velocidade da transição
//         parallax={true}
//         direction="horizontal" // Direção vertical
//         className="slider"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index} className="slide">
//             <div
//               className="image-container"
//               data-swiper-parallax="-50%"
//               data-swiper-parallax-opacity="0"
//               data-swiper-parallax-scale="0.9"
//             >
//               <img src={img} alt={`Slide ${index + 1}`} />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ImageSlider;

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';
// import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';



// const images = [
//   "/img/Blume.jpg",
//   "/img/Blumen.jpg",
//   "/img/Blumenstrauß.jpg",
//   "/img/Elefefant.jpg",
//   "/img/Afrikakreis.jpg",
//   "/img/Schnee.jpg",
//   "/img/Stolz.jpg",
//   "/img/Pferd.jpg",
//   "/img/Muster.jpg",
//   "/img/Stiefmütterchen.jpg",
//   "/img/Mannes.jpg",
// ];

// const ImageSlider = () => {
//   return (

//     <div className="slider-container">

// <Swiper
//       effect={'coverflow'}
//       grabCursor={true}
//       centeredSlides={true}
//       slidesPerView={'auto'}
//       coverflowEffect={{
//         rotate: 0,
//         stretch: 0,
//         depth: 100,
//         modifier: 2,
//         slideShadows: true,
//       }}
//       pagination={{ clickable: true }}
//       navigation
//       modules={[EffectCoverflow, Pagination, Navigation]}
//       className="mySwiper"
//     >
//       <SwiperSlide>
//         <img src="/img/Blumenstrauß.jpg" alt="Slide 1" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src="/img/Stiefmütterchen.jpg" alt="Slide 2" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src="/img/Mannes.jpg" alt="Slide 3" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src="/img/Muster.jpg" alt="Slide 4" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src="/img/Blume.jpg" alt="Slide 4" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src="/img/Blumen.jpg" alt="Slide 4" />
//       </SwiperSlide>
//     </Swiper>

//     </div>
  
//   );
// };

// export default ImageSlider;

// novo com efeito overflow 

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import { EffectCoverflow, Autoplay } from 'swiper/modules';

// const images = [
//   "/img/Blume.jpg",
//   "/img/Blumen.jpg",
//   "/img/Blumenstrauß.jpg",
//   "/img/Elefefant.jpg",
//   "/img/Afrikakreis.jpg",
//   "/img/Schnee.jpg",
//   "/img/Stolz.jpg",
//   "/img/Pferd.jpg",
//   "/img/Muster.jpg",
//   "/img/Stiefmütterchen.jpg",
//   "/img/Mannes.jpg",
// ];

// const ImageSlider = () => {
//   return (
//     <div className="slider-container">
//       <Swiper
//         effect={'coverflow'}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={'auto'}
//         loop={true} // Loop infinito
//         autoplay={{
//           delay: 3000, // Tempo entre as transições (3 segundos)
//           disableOnInteraction: false, // Continua o autoplay após interação do usuário
//         }}
//         coverflowEffect={{
//           rotate: 0,
//           stretch: 0,
//           depth: 100,
//           modifier: 2,
//           slideShadows: true,
//         }}
//         modules={[EffectCoverflow, Autoplay]} // Módulos usados
//         className="mySwiper"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index}>
//             <img src={img} alt={`Slide ${index + 1}`} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ImageSlider;


// novo sem efeito overflow 


// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { Autoplay } from 'swiper/modules';


// const images = [
//   "/img/Blume.jpg",
//   "/img/Blumen.jpg",
//   "/img/Blumenstrauß.jpg",
//   "/img/Elefefant.jpg",
//   "/img/Afrikakreis.jpg",
//   "/img/Schnee.jpg",
//   "/img/Stolz.jpg",
//   "/img/Pferd.jpg",
//   "/img/Muster.jpg",
//   "/img/Stiefmütterchen.jpg",
//   "/img/Mannes.jpg",
// ];

// const ImageSlider = () => {
//   return (
//     <div className="slider-container">
//       <Swiper
//         slidesPerView={'auto'} // Ajusta o número de slides visíveis automaticamente
//         spaceBetween={20} // Espaço entre os slides
//         loop={true} // Loop infinito
//         autoplay={{
//           delay: 1, // Sem delay entre as transições
//           disableOnInteraction: false, // Continua o autoplay após interação do usuário
//         }}
//         speed={5000} // Velocidade do deslizamento (5 segundos para percorrer o carrossel)
//         modules={[Autoplay]} // Módulos usados
//         className="mySwiper"
//         freeMode={true} // Ativa o modo livre para um deslizamento contínuo
//         freeModeMomentum={false} // Remove o efeito de desaceleração
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index}>
//             <img src={img} alt={`Slide ${index + 1}`} className="slide-image" />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ImageSlider;



// gpteco

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



