import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import CardSlider from "../components/CardSlider/CardSlider";

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

  return (
    <>
      {/* <div style={{ padding: "1rem" }}>
        <h2>Prodotti disponibili</h2>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: "10px" }}>
            {product.name} - €{product.price}
            <button style={{ marginLeft: "10px" }} onClick={() => addToCart(product)}>
              Aggiungi al carrello
            </button>
          </div>
        ))}

        <hr />

        <h2>Carrello</h2>
        {cartItems.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} style={{ marginBottom: "5px" }}>
                {item.name} - €{item.price} × {item.quantity} = €{item.price * item.quantity}
                <button style={{ marginLeft: "10px" }} onClick={() => decreaseQuantity(item.id)}>
                  -
                </button>
                <button style={{ marginLeft: "5px" }} onClick={() => increaseQuantity(item.id)}>
                  +
                </button>
                <button style={{ marginLeft: "5px" }} onClick={() => removeItemCompletely(item.id)}>
                  Rimuovi tutto
                </button>
              </div>
            ))}
            <p>
              <strong>Totale: €{totalPrice}</strong>
            </p>
            <button onClick={clearCart}>Svuota carrello</button>
          </div>
        )}
      </div> */}

      <Slider />
      <div className="container g-4">
        <CardSlider array={newShoes} />
      </div>
    </>
  );
};

export default Home;
