import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../Context/CartContext";
import axios from "axios";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

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
      e.preventDefault;
      const orderData = {
        ...formData,
        total_amount: totalPrice,
        products: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post(
        "http://localhost:3000/shoes/store",
        orderData
      );

      console.log("Ordine salvato con successo, ID:", response.data.order_id);
      clearCart();
      alert("Ordine completato!");
    } catch (error) {
      console.error("Errore durante il salvataggio dell'ordine:", error);
      alert("Errore durante l'invio dell'ordine.");
    }
  };

  return (
    <>
      <header className="header-color">
        <div className="header-logo  me-auto">
          <Link className="logo" to="/">
            L8CD
          </Link>
        </div>
        <p>Pagina di checkout</p>
      </header>
      <form onSubmit={handleOrderSubmit}>
        <h2>Checkout</h2>
        <input
          type="text"
          name="custom_name"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="custom_email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="custom_address"
          placeholder="Indirizzo"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="shipping_address"
          placeholder="Indirizzo spedizione"
          onChange={handleChange}
        />
        <select
          name="shipping_method"
          onChange={handleChange}
          defaultValue="standard"
        >
          <option value="standard">Standard</option>
          <option value="express">Espressa</option>
        </select>
        <select
          name="payment_method"
          onChange={handleChange}
          defaultValue="paypal"
        >
          <option value="paypal">PayPal</option>
          <option value="credit_card">Carta di credito</option>
        </select>
        {/* Puoi aggiungere coupon_id, status ecc se vuoi */}
        <button type="submit">Conferma Ordine</button>
      </form>
    </>
  );
};

export default Checkout;
