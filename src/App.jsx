import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Shoes from "./pages/Shoes";
import Home from "./pages/Home";
import NewsletterModal from "./components/Modal/NewsletterModal";

function App() {
  // Per vedere il modale dentro la pagina basta switchare lo stato da false a true
  const [showModal, setShowModal] = useState(false);

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



  // ================GESTIONE del CARRELLO ================

  const [cartItems, setCartItems] = useState([]); 
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);


  useEffect(() => {
    //questo use effect serve se esistono già degli oggetti nel carrello li aggiunge
    const localCartItems = localStorage.getItem("cartItems"); 
    const localTotalPrice = localStorage.getItem("totalPrice");
    if (localCartItems !== null) {
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





  return (
    <>
      <NewsletterModal show={showModal} onClose={handleClose} />
      <BrowserRouter>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/shoes/:gender" element={<Shoes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
