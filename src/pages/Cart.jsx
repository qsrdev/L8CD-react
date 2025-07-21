import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState, useEffect } from "react";
import "../pages/Cart.css";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    discount,
    setDiscount,
    isDiscountApplied,
    setIsDiscountApplied,
  } = useCart();

  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if (isDiscountApplied) {
      setDiscount(totalPrice * 0.15);
    }
  }, [totalPrice, isDiscountApplied]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setIsDiscountApplied(false);
      setDiscount(0);
      setDiscountCode("");
    }
  }, [cartItems]);

  const applyDiscountCode = () => {
    const code = discountCode.trim().toUpperCase();

    if (isDiscountApplied) return;

    if (code === "VILLA15") {
      setDiscount(totalPrice * 0.15); // 15% sconto calcolato sul totale
      setIsDiscountApplied(true);
    } else {
      setDiscount(0);
      alert("Codice sconto non valido");
    }
  };

  const shippingCost = totalPrice > 100 ? 0 : 5.99;
  const discountedTotal = totalPrice + shippingCost - discount;

  return (
    <>
      <section className="cart-section">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Carrello</h2>
                {cartItems.length === 0 ? (
                  ""
                ) : (
                  <button
                    className="btn btn-outline-danger btn-sm p-2"
                    onClick={clearCart}
                  >
                    <i className="bi bi-recycle"></i> Svuota carrello
                  </button>
                )}
              </div>

              {/* CARRELLO VUOTO gestione*/}
              {cartItems.length === 0 ? (
                <>
                <h2 className="fw-bold"> OPS! IL TUO CARRELLO È VUOTO</h2>
                <p>Quando aggiungerai il primo prodotto al carrello, apparirà qui. Inizia ad esplorare!</p>
                <button className="btn-explore"
                onClick={() => navigate("/shoes")}
                > Esplora <i className="fa-solid fa-arrow-right"></i></button>
                </>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded-start cart-img"
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="card-body">
                          <h5 className="card-title name">{item.name}</h5>
                          <p className="card-text">{item.gender}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              Taglia: <b>{Math.trunc(item.size)}</b>
                            </small>
                          </p>
                          <p className="card-text fw-bold">{item.price} €</p>
                        </div>
                      </div>
                      <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <div className="counter-container btn-group">
                          <button
                            className="counter-btn"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <i
                              className={`bi ${
                                item.quantity === 1 ? "bi-trash" : "bi-dash"
                              }`}
                            ></i>
                          </button>
                          <div className="counter-number">{item.quantity}</div>
                          <button
                            className="counter-btn"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
            <div className="col-md-4">
              <div className="card p-3">
                <h4 className="card-title mb-3">Riepilogo</h4>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Subtotale</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Costi di spedizione</span>
                    <span>{totalPrice > 100 ? "Gratis" : "5.99 €"}</span>
                  </li>
                </ul>
                {discount > 0 && (
                  <div className="d-flex justify-content-between text-success mb-2">
                    <span>Sconto</span>
                    <span>-{discount.toFixed(2)} €</span>
                  </div>
                )}

                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Totale</span>
                  <span>
                    {totalPrice === 0 ? "---" : discountedTotal.toFixed(2)} €
                  </span>
                </div>

                {cartItems.length === 0 ? (
                  <>
                    <button className="btn btn-secondary w-100 mb-2" disabled>
                      Vai al pagamento
                    </button>
                    <button
                      className="btn btn-outline-secondary w-100 mb-3"
                      disabled
                    >
                      PayPal
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-dark w-100 mb-2" to="/checkout">
                      Vai al pagamento
                    </Link>
                    <Link
                      className="btn btn-outline-secondary w-100 mb-3"
                      to="/checkout/Paypal"
                    >
                      PayPal
                    </Link>
                  </>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Hai un codice promozionale?
                  </label>

                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Inserisci codice"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      disabled={isDiscountApplied}
                    />
                    <button
                      className="btn btn-outline-dark"
                      type="button"
                      onClick={applyDiscountCode}
                      disabled={isDiscountApplied}
                    >
                      Applica
                    </button>
                  </div>
                  {isDiscountApplied && (
                    <div className="form-text text-success">
                      Codice "VILLA15" applicato con successo!
                    </div>
                  )}
                </div> 
              </div>
            </div>
          )}

          </div> 
        </div>
      </section>
    </>
  );
};

export default Cart;
