import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Context/CartContext";
import axios from "axios";

import "../pages/Checkout.css";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
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
          <header className="header-color d-flex justify-content-between">
            <div className="header-logo">
              <Link className="logo" to="/">
                L8CD
              </Link>
            </div>
            <p className="checkout">Checkout Sicuro</p>
            <Link to="/shoes/cart">
              <i className="fa-solid fa-cart-shopping text-white"></i>
            </Link>
          </header>
          <div className="container">
            <form
              onSubmit={handleOrderSubmit}
              className="my-3 d-flex flex-column align-items-center"
            >
              <div className="mb-3 col-5">
                <input
                  id="custom_name"
                  className="form-control"
                  type="text"
                  name="custom_name"
                  placeholder="Nome"
                  value={formData.custom_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-5">
                <input
                  className="form-control"
                  type="email"
                  name="custom_email"
                  placeholder="Email"
                  value={formData.custom_email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-5">
                <input
                  className="form-control"
                  type="text"
                  name="custom_address"
                  placeholder="Indirizzo"
                  value={formData.custom_address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-5">
                <input
                  className="form-control"
                  type="text"
                  name="shipping_address"
                  placeholder="Indirizzo spedizione"
                  value={formData.shipping_address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-5">
                <select
                  className="form-select"
                  name="shipping_method"
                  value={formData.shipping_method}
                  onChange={handleChange}
                >
                  <option value="standard">Standard</option>
                  <option value="express">Espressa</option>
                </select>
              </div>
              <div className="mb-3 col-5">
                <select
                  className="form-select"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                >
                  <option value="paypal">PayPal</option>
                  <option value="credit_card">Carta di credito</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary my-2">
                Conferma Ordine
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="confirm-container">
          <div className="confirm-box">
            <h1>Ordine ricevuto con successo!</h1>
            <p>
              Grazie per il tuo acquisto. Ti invieremo presto la conferma via
              email.
            </p>
            <button>
              <Link className="btn " to="/">
                Continua con gli acquisti
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
