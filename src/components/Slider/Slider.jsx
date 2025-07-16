import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    bg: "./slider/nike-air.jpg",
    text: "Nike Air Max",
    description:
      "Comfort, stile e performance. Scopri la nuova collezione Air Max.",
    link: "/shoes?q=nike",
  },
  {
    id: 2,
    bg: "./slider/nike-zoom.webp",
    text: "Nike ZoomX",
    description:
      "Pensata per la velocità. Perfetta per la corsa ad alte prestazioni.",
    link: "/shoes?q=nike",
  },
  {
    id: 3,
    bg: "./slider/nike-revolution.webp",
    text: "Nike Revolution",
    description:
      "Reinventa il tuo stile urbano con un design moderno e leggero.",
    link: "/shoes?q=nike",
  },
];

export default function Slider() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        preventClicks={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        speed={2000}
        className="nike-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide-content"
              style={{
                backgroundImage: `url(${slide.bg})`,
              }}
            >
              <div className="slide-info">
                <h1 className="fw-bold">{slide.text}</h1>
                <p className="slider-description fw-normal">
                  {slide.description}
                </p>
                <Link to={slide.link} className="cta-button">
                  Scopri di più
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
