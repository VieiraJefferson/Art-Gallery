import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const images = [
  "/img/Blume.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1774285059/Sign_of_Peace_u8ayty.png",
  "/img/Blumen.jpg",
  "/img/Blumenstrauß.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1747734341/galeria/undefined/qxylzm0bxrwiudl1bbjk.jpg",
  "/img/Afrikakreis.jpg",
  "/img/Schnee.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1741213083/galeria/galeria/Pallas%20Galaxy%20Collection/Kunstraub/f0jmbbvkcfej1p0ofsoo.jpg",
  "/img/Stolz.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1747758400/galeria/undefined/r9x7ehpmowhoerj39ot8.jpg",
  "/img/Pferd.jpg",
  "/img/Muster.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1747755324/galeria/undefined/ruvl2dx1ie9gc9u3iclh.jpg",
  "/img/Mannes.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1747735935/galeria/undefined/bm0mvgleyrg6afvee5tr.jpg",
  "https://res.cloudinary.com/dpilz4p6g/image/upload/v1774285046/Fight_Racism_2_msgxe6.png",
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
