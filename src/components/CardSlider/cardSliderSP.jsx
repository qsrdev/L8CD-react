import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/navigation";

import "./CardSlider.css";

import { Pagination, Navigation } from "swiper/modules";

export default function CardSliderSP({ array }) {
  
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {array.map((curElement, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="position-relative">
              <Link to={`/shoes/product/${curElement.slug}`}>
                {" "}
                <img src={curElement.image} alt={curElement.name} />{" "}
              </Link>
              <h6 className="card-title name py-3">{curElement.name}</h6>
              <p className="card-text price">{curElement.price} €</p>
            <p className="promo-marklabel">Tra i più acquistati</p>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
