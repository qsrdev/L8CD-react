import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
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

  const value = { cartItems, totalPrice, addToCart, removeItemCompletely, increaseQuantity, decreaseQuantity, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
