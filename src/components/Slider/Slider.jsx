import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css"; // Per i tuoi stili personalizzati

const slides = [
  {
    id: 1,
    bg: "./slider/jumbobanner.jpg",
    text: "Nike Air Max",
    description: "Comfort, stile e performance. Scopri la nuova collezione Air Max.",
    link: "/scarpe/air-max",
  },
  {
    id: 2,
    bg: "./slider/jumbobanner2.jpg",
    text: "Nike ZoomX",
    description: "Pensata per la velocità. Perfetta per la corsa ad alte prestazioni.",
    link: "/scarpe/zoomx",
  },
  {
    id: 3,
    bg: "./slider/jumbobanner.jpg",
    text: "Nike Revolution",
    description: "Reinventa il tuo stile urbano con un design moderno e leggero.",
    link: "/scarpe/revolution",
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
                <h1>{slide.text}</h1>
                <p>{slide.description}</p>
                <a href={slide.link} className="cta-button">
                  Scopri di più
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      ;
    </>
  );
}
