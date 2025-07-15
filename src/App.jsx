import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import GuestLayout from "./layouts/GuestLayout";
import Shoes from "./pages/Shoes";
import Home from "./pages/Home";
import NewsletterModal from "./components/Modal/NewsletterModal";
import Cart from "./pages/Cart";
import Contacts from "./pages/Contacts";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

function App() {
  // Per vedere il modale dentro la pagina basta switchare lo stato da false a true
  const [showModal, setShowModal] = useState(false);

  //settiamo gli stati del carrello e del prezzo totale
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Carica dallo storage solo una volta
  useEffect(() => {
    const localCartItems = localStorage.getItem("cartItems");
    const localTotalPrice = localStorage.getItem("totalPrice");

    if (localCartItems) setCartItems(JSON.parse(localCartItems));
    if (localTotalPrice) setTotalPrice(JSON.parse(localTotalPrice));
  }, []);

  //se il modale non è mai stato visto allo lo metti true e di conseguenza lo mette a schermo
  useEffect(() => {
    const modalShown = localStorage.getItem("promoModalShown");
    if (!modalShown) {
      setShowModal(true);
    }
  }, []);

  //funzione che viene parte quanto chiudiamo il modale: soddisfa la condizione quindi lo nasconde
  // per resettare lo stato globale della funziona basta incollare nel browser localStorage.removeItem('promoModalShown')
  //manca da fare la richiesta per la newsletter
  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem("promoModalShown", "true");
  };

  return (
    <>
      <NewsletterModal show={showModal} onClose={handleClose} />
      <CartProvider
        cartItems={cartItems}
        setCartItems={setCartItems}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<GuestLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shoes" element={<Shoes />} />
              <Route path="/shoes/:gender" element={<Shoes />} />
              <Route path="/shoes/product/:id" element={<ProductDetail />} />
              <Route path="/shoes/cart" element={<Cart />} />
              <Route path="/contacts" element={<Contacts />} />


            </Route>
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
