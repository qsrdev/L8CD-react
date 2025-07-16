import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CardSlider.css";

export default function CardSlider({ array }) {
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
            <Link to={`/shoes/product/${curElement.slug} `} onClick={() => console.log("Clicked", curElement.slug)}>
              <img src={curElement.image} alt={curElement.name} />
            </Link>
            <p className="promo-marklabel">PROMO</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
