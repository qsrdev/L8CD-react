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

  // ================GESTIONE del CARRELLO ================

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    //questo use effect serve se esistono già degli oggetti nel carrello li aggiunge
    const localCartItems = localStorage.getItem("cartItems");
    const localTotalPrice = localStorage.getItem("totalPrice");
    if (localCartItems !== null) {
      //facciamo parse e stringify dopo per trasformare l'array in stringa e viceversa
      // localstorare supporta solo queste modalità di dati
      setCartItems(JSON.parse(localCartItems));
      setTotalPrice(JSON.parse(localTotalPrice));
    }
  }, []);

  useEffect(() => {
    // crea nello storage gli elementi cartItems e totalPrice
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }
  }, [cartItems, totalPrice]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setTotalPrice((prevTotal) => prevTotal + item.price);
  };

  return (
    <>
      <div>
        <button
          className="text-center"
          onClick={() =>
            addToCart({
              id: Date.now(),
              name: "Prodotto di prova",
              price: 10,
              quantity: 1,
            })
          }
        >
          Aggiungi prodotto di prova
        </button>

        <h3>Carrello</h3>
        {cartItems.map((item) => (
          <div key={item.id}>
            {item.name} - €{item.price}
          </div>
        ))}
        <p>Totale: €{totalPrice}</p>
      </div>

      <Slider />
      <div className="container g-4">
        <CardSlider array={newShoes} />
      </div>
    </>
  );
};

export default Home;
