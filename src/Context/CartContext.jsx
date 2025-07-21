import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  // Recupero dal localStorage
  useEffect(() => {
    const localCartItems = localStorage.getItem("cartItems");
    const localDiscount = localStorage.getItem("discount");

    if (localCartItems) {
      setCartItems(JSON.parse(localCartItems));
    }

    if (localDiscount) {
      setDiscount(parseFloat(localDiscount));
    }
  }, []);

  // Salvataggio su localStorage: cartItems, discount
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("discount", JSON.stringify(discount));
  }, [cartItems, discount]);

  // Calcolo totale dinamico e salvataggio su localStorage
  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      const hasDiscount = item.discount_price && parseFloat(item.discount_price) !== parseFloat(item.price);

      const itemPrice = hasDiscount ? parseFloat(item.discount_price) : parseFloat(item.price);

      return acc + itemPrice * item.quantity;
    }, 0);

    setTotalPrice(newTotal);
    localStorage.setItem("totalPrice", JSON.stringify(newTotal));
  }, [cartItems]);

  // Aggiunta prodotto
  const addToCart = (newItem) => {
    const existingItem = cartItems.find((item) => item.id === newItem.id);

    if (existingItem) {
      const updatedItems = cartItems.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item));
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
    }
  };

  // Rimozione completa
  const removeItemCompletely = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Aumenta quantità
  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    setCartItems(updatedItems);
  };

  // Diminuisci quantità
  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      removeItemCompletely(id);
    } else {
      const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      setCartItems(updatedItems);
    }
  };

  // Svuota tutto
  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setIsDiscountApplied(false);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("discount");
  };

  const value = {
    cartItems,
    totalPrice,
    addToCart,
    removeItemCompletely,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    discount,
    setDiscount,
    isDiscountApplied,
    setIsDiscountApplied,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
