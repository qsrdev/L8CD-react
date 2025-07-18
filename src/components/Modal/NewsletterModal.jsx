import { useState, useEffect } from "react";
import axios from "axios";
import "./NewsletterModal.css";
import Loader from "../Loader/Loader";

export default function NewsletterModal({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false)

 useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        onClose()
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, onClose]);


  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Per favore inserisci un'email valida!");
      return;
    }

    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/mail/subscribe`, { email })
      .then((res) => {
        setStatus("Iscrizione avvenuta con successo!");
        console.log("successo " + email);
        setEmail("");
        localStorage.setItem("promoModalShown", "true");
        setShowToast(true)
      })
      .catch((err) => {
        console.error("Errore durante la richiesta:", err);
        setStatus("Errore durante l'iscrizione.");
      })
      .finally(() => {
        if (!showToast) {
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-content-custom container p-0">
        <button className="btn-close-custom" onClick={onClose}>
          ×
        </button>
        <div className="row g-0">
          <div className="col-md-6 text-center p-4">
            <h6 className="text-uppercase text-muted text-center mt-5">Prima volta?</h6>
            <h2 className="text-center">Iscriviti alla nostra newsletter e otterrai 15% di sconto sul tuo primo ordine</h2>
            <form className="text-center mt-4" onSubmit={handleSubmit}>
              <input
                autoComplete="off"
                type="email"
                className="form-control mb-3"
                placeholder="Inserisci la tua mail..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <button type="submit" className="text-decoration-underline btn-modal w-100 text-uppercase fw-bold d-flex justify-content-center align-items-center" disabled={isLoading}>
                {isLoading ? <Loader /> : "Iscriviti"}
              </button>
              {status && <p className="mt-3 text-center">{status}</p>}
            </form>
            <p className="text-muted small text-center mt-3">Iscrivetevi alla nostra newsletter per essere i primi a conoscere i nostri nuovi arrivi e le promozioni.</p>
          </div>
          <div className="col-md-6 image-section">
            <img src="/NewsletterModal.jpg" alt="Promo" className="img-fluid h-100 w-100 object-fit-cover" />
          </div>
        </div>
      </div>

      {showToast && (
        <div
            style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                backgroundColor: "#fea82f",
                color: "white",
                padding: ".5rem 1rem",
                borderRadius: "0.25rem",
                zIndex: 9999,
            }}
            >
            E-mail inviata con successo!
            </div>
      )}
    </div>
  );
}
