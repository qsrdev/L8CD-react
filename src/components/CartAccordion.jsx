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
            <span>{totalPrice} €</span>
          </div>
          <div className="d-flex justify-content-between border-bottom py-2">
            <span>Costi di spedizione stimati</span>
            <span>0,00 €</span>
          </div>
          <div className="d-flex justify-content-between fw-bold fs-5 my-3">
            <span>Totale</span>
            <span>{totalPrice} €</span>
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
      )}
    </div>
  );
};

export default CartAccordion;
