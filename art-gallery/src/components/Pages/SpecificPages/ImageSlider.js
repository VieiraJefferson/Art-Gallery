import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
    <div className="w-full overflow-hidden py-4">
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={6000}
        loop={true}
        freeMode={true}
        freeModeMomentum={false}
        className="!overflow-visible"
      >
        {images.concat(images).map((img, index) => (
          <SwiperSlide
            key={index}
            className="!w-auto"
          >
            <div className="relative h-48 md:h-64 lg:h-72 aspect-[4/3] overflow-hidden rounded-xl group">
              <img
                src={img}
                alt={`Artwork ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
