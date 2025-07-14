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

  //settiamo gli stati del carrello e del prezzo totale
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  //vado a prendere lo stato da localstorage del mio carrello e del prezzo totale del carrello
  useEffect(() => {
    const localCartItems = localStorage.getItem("cartItems");
    const localTotalPrice = localStorage.getItem("totalPrice");
    if (localCartItems) {
      setCartItems(JSON.parse(localCartItems));
      setTotalPrice(JSON.parse(localTotalPrice));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [cartItems, totalPrice]);

  //array fittizio con dei prodotti finti
  const products = [
    { id: 1, name: "Pozione", price: 5 },
    { id: 2, name: "Spada", price: 20 },
    { id: 3, name: "Armatura", price: 40 },
  ];

  //funzione che gestisce l'aggiunta di prodotti nuovi al carrello
  const addToCart = (newItem) => {
    const existingItem = cartItems.find((item) => item.id === newItem.id);

    if (existingItem) {
      // Se esiste, incrementa quantità
      const updatedItems = cartItems.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item));
      setCartItems(updatedItems);
    } else {
      // Se non esiste, aggiungi al carrello
      setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
    }

    //aggiornamento del prezzo in base all'oggetto che viene aggiunto
    setTotalPrice((prev) => prev + newItem.price);
  };

  //funzione che cancella tutto il carrello con un click
  const removeItemCompletely = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (!itemToRemove) return;

    setCartItems(cartItems.filter((item) => item.id !== id));
    setTotalPrice((prev) => prev - itemToRemove.price * itemToRemove.quantity);
  };

  //funzione che gestisce i bottoni visino ai prodotti nel carrello per aggiungere 1 di singola quantità
  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    setCartItems(updatedItems);
    setTotalPrice((prev) => prev + item.price);
  };

  //funzione che gestisce il bottone di sottrazione nel carrello
  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      removeItemCompletely(id);
    } else {
      const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      setCartItems(updatedItems);
      setTotalPrice((prev) => prev - item.price);
    }
  };

  //funzione che svuota tutto il carrello insieme e aggiorna lo stato dentro il local storage
  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");
  };

  return (
    <>
      <div style={{ padding: "1rem" }}>
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
      </div>

      <Slider />
      <div className="container g-4">
        <CardSlider array={newShoes} />
      </div>
    </>
  );
};

export default Home;
