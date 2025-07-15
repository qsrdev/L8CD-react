import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";


const Cart = () => {
  const { cartItems, setCartItems, totalPrice, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  return (
    <>
      <div className="container py-4">
        <div className="row">
          <h2 className="mt-5">Carrello</h2>

          <div className="col-md-8">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-3">
                  <img src="https://via.placeholder.com/100" alt="Prodotto 1" className="img-fluid rounded-start" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">[Nome Prodotto]</h5>
                    <p className="card-text">[Descrizione]</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Taglia/misura: <u>[Taglia]</u>
                      </small>
                    </p>
                    <p className="card-text fw-bold">[Prezzo] €</p>
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-center">
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-secondary">
                      -
                    </button>
                    <span className="mx-2">[Qty]</span>
                    <button type="button" className="btn btn-outline-secondary">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h4 className="card-title mb-3">Riepilogo</h4>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotale</span>
                  <span>[Subtotale] €</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Costi di spedizione</span>
                  <span>Gratis</span>
                </li>
              </ul>
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Totale</span>
                <span>[Totale] €</span>
              </div>
              <button className="btn btn-dark w-100 mb-2">Vai al pagamento</button>
              <button className="btn btn-outline-secondary w-100 mb-3">PayPal</button>
              <div className="mb-3">
                <label className="form-label">Hai un codice promozionale?</label>
                <input type="text" className="form-control" placeholder="Inserisci codice" />
              </div>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          cartItems.map((item) => (
            <p key={item.id}>
              {item.name} : {item.price}× {item.quantity} = €{item.quantity * item.price}
              <button className="btn btn-primary" onClick={() => increaseQuantity(item.id)}>
                {" "}
                +{" "}
              </button>
              <button className="btn btn-secondary" onClick={() => decreaseQuantity(item.id)}>
                {" "}
                -{" "}
              </button>
            </p>
          ))
        )}
        <p>
          <strong>Totale: €{totalPrice}</strong>
        </p>
        <button className="btn btn-danger" onClick={clearCart}>
          Svota tutto
        </button>
        <br />
        <Link to="/checkout" className="btn btn-primary my-5"> Vai al Check-out</Link>
      </div>
    </>
  );
};

export default Cart;
