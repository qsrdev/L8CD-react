import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import CardSlider from "../components/CardSlider/CardSlider";
import { useCart } from "../Context/CartContext";

const Home = () => {
  const [shoes, setShoes] = useState([]);

  //lascio l'array vuoto perché voglio che la chiamata venga sempre fatta quando carico la pagina
  useEffect(() => {
    axios.get("http://localhost:3000/shoes").then((resp) => {
      setShoes(resp.data.data);
    });
  }, []);

  //creo un nuovo array che si popola solo delle scarpe che sto filtrano e poi l'array verrà mappato nella sua parte di pagina precisa
  //ultime 10 scarpe inserite nel database
  const newShoes = shoes.filter((shoe) => shoe.id >= shoes.length - 9);

  //scarpe che hanno il prezzo superiore a 100 euro - solo i primi 5 risultati
  const freeShippingShoes = shoes.filter((shoe) => shoe.price >= 100).slice(0, 5);

  // 5 scarpe casuali per scopri i nostri brand
  const randomShoes = shoes.filter((shoe) => (shoe.id = Math.floor(Math.random() * shoes.length))).slice(0, 5);

  const products = [
    { id: 1, name: "pozion", price: 5 },
    { id: 2, name: "spada", price: 50 },
    { id: 3, name: "libro", price: 10 },
  ];

  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const getQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <>
      <div>
        <h2>Prodotti</h2>
        {products.map((product) => {
          const quantity = getQuantity(product.id);

          return (
            <div key={product.id} style={{ marginBottom: "1rem" }}>
              <p>
                {product.name} - €{product.price}
              </p>

              {quantity === 0 ? (
                <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
              ) : (
                <div>
                  <button onClick={() => decreaseQuantity(product.id)}>-</button>
                  <span style={{ margin: "0 10px" }}>{quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Slider />
      <section>
        <div className="coupons-cta py-3">
          <h3 className="text-center fs-4 text-white text-decoration-underline">Usa il codice SUMMER15 per avere il 15% di sconto sui prodotti</h3>
        </div>
      </section>

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
    </>
  );
};

export default Home;
