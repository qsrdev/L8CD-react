import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./CardSlider.css";

import { Pagination } from "swiper/modules";

export default function CardSlider({ array }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {array.map((curElement, index) => (
          <SwiperSlide className={index}>
            <img src={curElement.image} alt={curElement.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
