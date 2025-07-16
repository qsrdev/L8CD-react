import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "../pages/Cart.css";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    totalPrice,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  return (
    <>
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
            {cartItems.length === 0 ? (
              <p>Il carrello è vuoto</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
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

          <div className="col-md-4">
            <div className="card p-3">
              <h4 className="card-title mb-3">Riepilogo</h4>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotale</span>
                  <span>{totalPrice} €</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Costi di spedizione</span>
                  <span>{totalPrice > 100 ? "Gratis" : "5.99 €"}</span>
                </li>
              </ul>
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Totale</span>
                <span>{totalPrice === 0 ? "---" : totalPrice} €</span>
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
                    className="btn btn-outline-secondary w-100 mb-3" to='/checkout/Paypal'>
                    PayPal
                  </Link>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">
                  Hai un codice promozionale?
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Inserisci codice"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
