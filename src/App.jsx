import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Shoes from "./pages/Shoes";
import Home from "./pages/Home";
import NewsletterModal from "./components/Modal/NewsletterModal";
import Cart from "./pages/Cart";

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

  return (
    <>
      <NewsletterModal show={showModal} onClose={handleClose} />
      <BrowserRouter>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/shoes/:gender" element={<Shoes />} />
            <Route path="/shoes/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
