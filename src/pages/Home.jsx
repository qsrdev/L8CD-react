import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import CardSlider from "../components/CardSlider/CardSlider";
import { useCart } from "../Context/CartContext";
import Loader from "../components/Loader/Loader";
import CouponToast from "../components/CouponToast";

const Home = () => {
  const [shoes, setShoes] = useState([]);

  //lascio l'array vuoto perché voglio che la chiamata venga sempre fatta quando carico la pagina
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/shoes`).then((resp) => {
      setShoes(resp.data.data);
    });
  }, []);

  //creo un nuovo array che si popola solo delle scarpe che sto filtrano e poi l'array verrà mappato nella sua parte di pagina precisa
  //ultime 10 scarpe inserite nel database
  const newShoes = shoes.filter((shoe) => shoe.id >= shoes.length - 9);

  //scarpe che hanno il prezzo superiore a 100 euro - solo i primi 5 risultati
  const freeShippingShoes = shoes
    .filter((shoe) => shoe.discount_price != null)
    .slice(0, 5);

  // 5 scarpe casuali per scopri i nostri brand
  const shuffled = [...shoes].sort(() => 0.5 - Math.random());
  const randomShoes = shuffled.slice(0, 5);

  return (
    <>
      {shoes.length === 0 ? (
        <div className="d-flex justify-content-center py-5">
          <Loader />
        </div>
      ) : (
        <>
          <Slider />

          <CouponToast />

          <section className="py-5">
            <div className="container g-4">
              <div className="mb-5">
                <h2>Novità</h2>
                <p>Scopri gli ultimi arrivi</p>
              </div>
              <CardSlider array={newShoes} />
            </div>
          </section>

          <section className="promo-color py-5">
            <div className="container g-4">
              <div className="mb-5 text-white">
                <h2>Promo spedizione gratuita</h2>
                <p>Approfitta ora della spedizione a costo zero</p>
              </div>
              <CardSlider array={freeShippingShoes} />
            </div>
          </section>

          <section className="py-5">
            <div className="container g-4">
              <div className="mb-5">
                <h2>Nuovi brand!</h2>
                <p>Tutti gli ultimi arrivi</p>
                <CardSlider array={randomShoes} />
              </div>
            </div>
          </section>

          <section></section>
        </>
      )}
    </>
  );
};

export default Home;
