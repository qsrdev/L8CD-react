import "./NewsletterModal.css";

export default function NewsletterModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-content-custom container">
        <button className="btn-close-custom" onClick={onClose}>
          ×
        </button>
        <div className="row g-0">
          <div className="col-md-6 text-center p-4">
            <h6 className="text-uppercase text-muted text-center mt-5">Prima volta?</h6>
            <h2 className="text-center">Iscriviti alla nostra newsletter e otterrai 10% di sconto sul tuo primo ordine</h2>
            <form className="text-center mt-4">
              <input type="email" className="form-control mb-3" placeholder="Inserisci la tua mail..." />
              <button type="submit" className="text-decoration-underline btn btn-dark w-100 text-uppercase fw-bold">
                Iscriviti
              </button>
            </form>
            <p className="text-muted small text-center  mt-3">Iscrivetevi alla nostra newsletter per essere i primi a conoscere i nostri nuovi arrivi e le promozioni.</p>
          </div>
          <div className="col-md-6 image-section">
            <img src="/NewsletterModal.jpg" alt="Promo" className="img-fluid h-100 w-100 object-fit-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
