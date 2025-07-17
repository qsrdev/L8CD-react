import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import "../pages/Checkout.css";
import "../index.css";

const Checkout = () => {
  const { cartItems, setCartItems, totalPrice, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(0);

  const [formData, setFormData] = useState({
    custom_name: "",
    custom_email: "",
    custom_address: "",
    shipping_address: "",
    shipping_method: "standard",
    payment_method: "paypal",
    coupon_id: null,
    status: "pending",
    tracking_number: "prova",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    try {
      e.preventDefault();
      const orderData = {
        ...formData,
        total_amount: totalPrice,
        products: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post("http://localhost:3000/shoes/store", orderData);
      await axios.post("http://localhost:3000/api/mail/checkout", {
        email: formData.custom_email,
        cartItems: cartItems,
        name: formData.custom_name,
        total: totalPrice,
      });

      console.log("Ordine salvato con successo, ID:", response.data.order_id);
      clearCart();
      setShowSuccess(true);
    } catch (error) {
      console.error("Errore durante il salvataggio dell'ordine:", error);
      alert("Errore durante l'invio dell'ordine.");
    }
  };

  return (
    <>
      {!showSuccess ? (
        <>
          {/* Header */}
          <header className="header-color-checkout py-3 mb-4">
            <div className="container d-flex justify-content-between align-items-center text-white">
              <Link className="logo text-white fw-bold fs-5 text-decoration-none" to="/">
                L8CD
              </Link>
              <h1 className="checkout m-0">Ci sei quasi</h1>
              <Link to="/shoes/cart">
                <i className="fa-solid fa-cart-shopping text-white"></i>
              </Link>
            </div>
          </header>

          {/* Main layout */}
          <div className="container mb-5">
            <div className="row">
              {/* Colonna sinistra */}
              <div className="col-lg-7">
                <h4 className="mb-4">Opzioni di consegna</h4>

                {/* <div className="d-flex mb-4">
                  <button
                    type="button"
                    className={`btn me-2 ${formData.shipping_method === "standard" ? "btn-dark" : "btn-outline-dark"}`}
                    onClick={() => setFormData({ ...formData, shipping_method: "standard" })}
                  >
                    <i className="fa-solid fa-truck me-2"></i> Spedizione
                  </button>
                  <button
                    type="button"
                    className={`btn ${formData.shipping_method === "pickup" ? "btn-dark" : "btn-outline-dark"}`}
                    onClick={() => setFormData({ ...formData, shipping_method: "pickup" })}
                  >
                    <i className="fa-solid fa-map-marker-alt me-2"></i> Ritiro
                  </button>
                </div> */}

                {/* FORM */}
                <form onSubmit={handleOrderSubmit}>
                  <div className="mb-3">
                    <input className="form-control" type="email" name="custom_email" placeholder="E-mail*" value={formData.custom_email} onChange={handleChange} required />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input className="form-control" type="text" name="custom_name" placeholder="Nome*" value={formData.custom_name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input className="form-control" type="text" name="custom_surname" placeholder="Cognome*" onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="mb-3">
                    <input className="form-control" type="text" name="custom_address" placeholder="Inizia a digitare l'indirizzo" value={formData.custom_address} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <input className="form-control" type="text" name="shipping_address" placeholder="Indirizzo spedizione" value={formData.shipping_address} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <input className="form-control" type="tel" name="phone" placeholder="Numero di telefono*" onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <select className="form-select" name="payment_method" value={formData.payment_method} onChange={handleChange}>
                      <option value="paypal">PayPal</option>
                      <option value="credit_card">Carta di credito</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-dark w-100">
                    Conferma Ordine
                  </button>
                </form>
              </div>

              {/* Colonna destra */}
              <div className="col-lg-5">
                <h5 className="fw-bold">Nel carrello</h5>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Subtotale</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Costi di spedizione stimati</span>
                  <span>0,00 €</span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-5 my-3">
                  <span>Totale</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>

                <p className="text-muted">
                  Arriva entro il giorno <strong>mer 23 lug</strong>
                </p>

                {cartItems.map((item, index) => (
                  <div className="d-flex mb-3" key={index}>
                    <img src={item.image} alt={item.name} className="me-3" width="60" />
                    <div>
                      <div className="fw-bold">{item.name}</div>
                      <small className="text-muted">{item.description?.slice(0, 40)}...</small>
                      <br />
                      <small>
                        Quantità: {item.quantity} | Misura: {item.size}
                      </small>
                      <div>{item.price} €</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container text-center mt-5">
          <h1>Ordine ricevuto con successo!</h1>
          <p>Grazie per il tuo acquisto. Ti invieremo presto la conferma via email.</p>
          <Link to="/" className="btn btn-dark mt-3">
            Continua con gli acquisti
          </Link>
        </div>
      )}
    </>
  );
};

export default Checkout;
