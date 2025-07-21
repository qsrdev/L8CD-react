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
              <div className="card card-slider shadow-sm rounded-4 overflow-hidden position-relative" style={{ width: "80%" }}>
                <Link to={`/shoes/product/${curElement.slug}`}>
                  {" "}
                  <img className="card-img-top" src={curElement.image} alt={curElement.name} style={{ height: "250px", objectFit: "cover" }} />{" "}
                </Link>
              <div className="card-body">
                <h6 className="card-title name py-3">{curElement.name}</h6>
                <p className="card-text description">{curElement.description}</p>
                {curElement.discount_price ? (
                  <>
                  <div className="d-flex">
                    <p className="original-price me-1">{curElement.price} €</p>
                    <p className="discount-price">{curElement.discount_price} €</p>
                  </div>
                  </>
                  ) : (
                  <p className="card-text price">{curElement.price} €</p>
                  )}
              </div>
            </div>
                <p className="promo-marklabel">Tra i più acquistati</p>

          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
