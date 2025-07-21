import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CardSlider.css";

export default function CardSlider({ array }) {

  const [discont, setDiscount] = useState([])
  
  useEffect(() => {
    let url = `${import.meta.env.VITE_API_URL}/shoes`;

    axios.get(url).then((resp) => {
      setDiscount(resp.data.data);
    })
  }, []);

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
              <Link to={`/shoes/product/${curElement.slug} `} onClick={() => console.log("Clicked", curElement.slug)}>
                <img src={curElement.image} alt={curElement.name} />
              </Link>
            {curElement.discount_price ? (
              <p className="promo-marklabel">PROMO</p>
            ) : (
              <p></p>
            )}
            </div>


          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
