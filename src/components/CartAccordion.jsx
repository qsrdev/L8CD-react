import { useState } from "react";

const CartAccordion = ({ cartItems, totalPrice }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion mb-4">
      <div className="accordion-header">
        <button
          className="btn btn-light btn-outline-dark w-100 text-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          Riepilogo Carrello {isOpen ? "▲" : "▼"}
        </button>
      </div>

      {isOpen && (
        <div className="accordion-body bg-light p-3">
          <h5 className="fw-bold">Nel carrello</h5>

          <div className="d-flex justify-content-between border-bottom py-2">
            <span>Subtotale</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
          <div className="d-flex justify-content-between border-bottom py-2">
            <span>Costi di spedizione</span>
            <span>0.00 €</span>
          </div>
          <div className="d-flex justify-content-between fw-bold fs-5 my-3">
            <span>Totale</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>

          <p className="text-muted">
            Arriva entro il giorno <strong>mer 23 lug</strong>
          </p>

          {cartItems.map((item, index) => (
            <div
              className="d-flex flex-wrap justify-content-center mb-3"
              key={index}
            >
              <img
                src={item.image}
                alt={item.name}
                className="me-3"
                width="60"
              />
              <div>
                <div className="fw-bold">{item.name}</div>
                <small className="text-muted">
                  {item.description?.slice(0, 40)}...
                </small>
                <br />
                <small>
                  Quantità: {item.quantity} | Misura: {item.size}
                </small>
                {item.discount_price && item.price !== item.discount_price ? (
                  <div className="price-wrapper fw-bold">
                    <span className="original-price text-decoration-line-through me-2">
                      {item.price} €
                    </span>
                    <span className="discount-price text-danger">
                      {item.discount_price} €
                    </span>
                  </div>
                ) : (
                  <div className="fw-bold">{item.price} €</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartAccordion;
