import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import Loader from "../components/Loader/Loader";

import "../pages/Checkout.css";
import "../index.css";
import CartAccordion from "../components/CartAccordion";

const Checkout = () => {
  const { cartItems, totalPrice, discount, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const totalWithDiscount = (totalPrice - discount).toFixed(2);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(0);

  // verifiche degli errori
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const isEmailValid = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const [formData, setFormData] = useState({
    custom_name: "",
    custom_surname: "",
    custom_email: "",
    custom_address: "",
    costum_cell: "",
    shipping_address: "",
    shipping_method: "standard",
    payment_method: "PayPal",
    coupon_id: null,
    status: "pending",
    tracking_number: "prova",
  });

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  switch (name) {
    case "custom_email":
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        setFormErrors((prev) => ({ ...prev, [name]: true }));
      } else {
        setFormErrors((prev) => ({ ...prev, [name]: false }));
      }
      break;
    case "custom_name":
    case "custom_surname":
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        setFormErrors((prev) => ({ ...prev, [name]: true }));
      } else {
        setFormErrors((prev) => ({ ...prev, [name]: false }));
      }
      break;
    case "costum_cell":
      if (!/^\d{9,12}$/.test(value)) {
        setFormErrors((prev) => ({ ...prev, [name]: true }));
      } else {
        setFormErrors((prev) => ({ ...prev, [name]: false }));
      }
      break;
    default:
      setFormErrors((prev) => ({ ...prev, [name]: false }));
  }
};

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.custom_name) errors.custom_name = true;
    if (!formData.custom_surname) errors.custom_surname = true;
    if (!formData.custom_address) errors.custom_address = true;
    if (!/^\d{9,12}$/.test(formData.costum_cell)) errors.costum_cell = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        ...formData,
        total_amount: parseFloat(totalWithDiscount),
        products: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/shoes/store`, orderData);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/mail/checkout`, {
        email: formData.custom_email,
        cartItems: cartItems,
        name: formData.custom_name,
        total: totalWithDiscount,
      });

      console.log("Ordine salvato con successo, ID:", response.data.order_id);
      clearCart();
      setShowSuccess(true);
    } catch (error) {
      console.error("Errore durante il salvataggio dell'ordine:", error);
      alert("Errore durante l'invio dell'ordine.");
    } finally {
      setIsSubmitting(false); // ← END
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
                <img className="logo" src="/Logo.png" alt="logo" />
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

                {/* FORM */}

                <form onSubmit={handleOrderSubmit} className="rounded border p-4 needs-validation" noValidate>
                  {/* Email */}

                  <div className="mb-3">
                    <label className="form-label">E-mail*</label>
                    <input
                      className={`form-control ${formErrors.custom_email ? "is-invalid" : (!formErrors.custom_email && formData.custom_email && /^\S+@\S+\.\S+$/.test(formData.custom_email)) ? "is-valid" : ""}`}
                      type="email"
                      name="custom_email"
                      placeholder="es. mario.rossi@me.it"
                      value={formData.custom_email}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">Indirizzo mail corretto!</div>
                    <div className="invalid-feedback">Per favore inserisci un indirizzo corretto</div>
                  </div>

                  {/* Nome e Cognome */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nome*</label>
                      <input
                        autoComplete="off"
                        className={`form-control ${formErrors.custom_name ? "is-invalid" : (!formErrors.custom_name && formData.custom_name && /^[a-zA-Z\s]+$/.test(formData.custom_name)) ? "is-valid" : ""}`}
                        type="text"
                        name="custom_name"
                        placeholder="es. Mario"
                        value={formData.custom_name}
                        onChange={handleChange}
                        required
                        onKeyDown={(e) => {
                          if (/\d/.test(e.key)) e.preventDefault();
                        }}
                      />
                      <div className="valid-feedback">Nome valido</div>
                      <div className="invalid-feedback">Inserisci un nome valido</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Cognome*</label>
                      <input
                        autoComplete="off"
                        className={`form-control ${formErrors.custom_surname ? "is-invalid" : (!formErrors.custom_surname && formData.custom_surname && /^[a-zA-Z\s]+$/.test(formData.custom_surname)) ? "is-valid" : ""}`}
                        type="text"
                        name="custom_surname"
                        placeholder="es. Rossi"
                        value={formData.custom_surname}
                        onChange={handleChange}
                        required
                        onKeyDown={(e) => {
                          if (/\d/.test(e.key)) e.preventDefault();
                        }}
                      />
                      <div className="valid-feedback">Cognome valido</div>
                      <div className="invalid-feedback">Inserisci un cognome valido</div>
                    </div>
                  </div>

                  {/* Indirizzo di Fatturazione */}
                  <div className="mb-3">
                    <label className="form-label">Indirizzo di Fatturazione*</label>
                    <input
                      autoComplete="off"
                      className={`form-control ${formErrors.custom_address ? "is-invalid" : formData.custom_address ? "is-valid" : ""}`}
                      type="text"
                      name="custom_address"
                      placeholder="es. Via Panisperna 7"
                      value={formData.custom_address}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">Indirizzo valido</div>
                    <div className="invalid-feedback">Inserisci un indirizzo valido</div>
                  </div>

                  {/* Indirizzo di Spedizione */}
                  <div className="mb-3">
                    <label className="form-label">Indirizzo di Spedizione</label>
                    <input
                      autoComplete="off"
                      className={`form-control ${formErrors.shipping_address ? "is-invalid" : formData.shipping_address ? "is-valid" : ""}`}
                      type="text"
                      name="shipping_address"
                      placeholder="es. Via Cavour 76"
                      value={formData.shipping_address}
                      onChange={handleChange}
                    />
                    <div className="valid-feedback">Indirizzo valido</div>
                  </div>

                  {/* Numero di Telefono */}
                  <div className="mb-3">
                    <label className="form-label">Numero di Telefono*</label>
                    <input
                      inputMode="numeric"
                      maxLength={11}
                      required
                      autoComplete="off"
                      className={`form-control ${formErrors.costum_cell > 10 ? "is-invalid" : formData.costum_cell ? "is-valid" : ""}`}
                      type="tel"
                      name="costum_cell"
                      placeholder="es. 3326951222"
                      value={formData.costum_cell}
                      onChange={handleChange}
                      pattern="[0-9]*"
                      onKeyDown={(e) => {
                        if (!/[0-9]/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <div className="valid-feedback">Numero corretto</div>
                    <div className="invalid-feedback">Inserisci un numero valido</div>
                  </div>

                  {/* Metodo di Pagamento */}
                  <div className="mb-3">
                    <label className="form-label">Metodo di Pagamento</label>
                    <select className="form-select" name="payment_method" value={formData.payment_method} onChange={handleChange}>
                      <option value="">Seleziona un metodo</option>
                      <option value="paypal">PayPal</option>
                      <option value="credit_card">Carta di credito</option>
                    </select>
                    <div className="valid-feedback">Metodo selezionato</div>
                  </div>

                  {/* Colonna destra con Carrello */}
                  <div className="col-lg-5 right-column-small">
                    <CartAccordion cartItems={cartItems} totalPrice={totalPrice} />
                  </div>

                  {/* Bottone di Invio */}
                  <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <Loader />
                        <span className="ms-2">Invio in corso...</span>
                      </div>
                    ) : (
                      "Conferma ordine"
                    )}
                  </button>
                </form>
              </div>

              {/* Colonna destra */}
              <div className="col-lg-5 right-column-desktop">
                <h5 className="fw-bold">Nel carrello</h5>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Subtotale</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Costi di spedizione stimati</span>
                  <span>0,00 €</span>
                </div>
                {discount > 0 && (
                  <div className="d-flex justify-content-between">
                    <span>Sconto:</span>
                    <span>-{discount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="d-flex justify-content-between fw-bold fs-5 my-3">
                  <span>Totale</span>
                  <span>{totalWithDiscount} €</span>
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
                      <div className="fw-bold">{item.price} €</div>
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
