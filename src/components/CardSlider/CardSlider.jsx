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
  const [discont, setDiscount] = useState([]);

  useEffect(() => {
    let url = `${import.meta.env.VITE_API_URL}/shoes`;

    axios.get(url).then((resp) => {
      setDiscount(resp.data.data);
    });
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {array.map((curElement, index) => (
          <SwiperSlide key={index} className="slide">
            {/* <Link to={`/shoes/product/${curElement.slug} `} onClick={() => console.log("Clicked", curElement.slug)}>
              <img src={curElement.image} alt={curElement.name} />
            </Link>
            {curElement.discount_price && curElement.price !== curElement.discount_price ? (
              <p className="promo-marklabel-green">PROMO</p>
            ) : curElement.price >= 100 ? (
              <p className="promo-marklabel">spedizione gratuita</p>
            ) : null} */}

            {/* CARD STRUCTURE */}
            <div
              className="card card-slider shadow-sm rounded-4 overflow-hidden"
              style={{ width: "80%" }}
            >
              <div className="position-relative">
                <Link to={`/shoes/product/${curElement.slug}`}>
                  <img
                    src={curElement.image}
                    className="card-img-top"
                    alt={curElement.name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                </Link>

                {curElement.discount_price &&
                curElement.price !== curElement.discount_price ? (
                  <span className="badge bg-success text-light position-absolute top-0 start-0 m-2">
                    PROMO{" "}
                  </span>
                ) : curElement.price >= 100 ? (
                  <span className="badge bg-info text-light position-absolute top-0 start-0 m-2">
                    Spedizione gratuita
                  </span>
                ) : null}
              </div>

              <div className="card-body">
                <h5 className="card-title fw-bold mb-1">{curElement.name}</h5>
                <p className="card-subtitle text-muted mb-2">
                  {curElement.tagline}
                </p>
                <p className="card-text text-secondary small">
                  {curElement.description}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  {curElement.discount_price ? (
                    <>
                    <div className="d-flex flex-wrap flex-column">
                      <span className="original-price">{curElement.price} €</span>
                      <span className="discount-price">{curElement.discount_price} €</span>
                    </div>
                    </>
                    ) : (
                    <span className="fw-bold fs-6">{curElement.price} €</span>
                    )}

                  <Link className="btn btn-card-home btn-sm rounded-pill" to={`/shoes/product/${curElement.slug}`}>
                    Acquista →
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
