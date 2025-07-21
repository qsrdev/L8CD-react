import { useState, useEffect } from "react";
import axios from "axios";
import CardSliderSP from "../components/CardSlider/cardSliderSP";
import { useCart } from "../Context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [shoes, setShoes] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/shoes`).then((resp) => {
      setShoes(resp.data.data);
    });
  }, []);

  const newShoes = shoes.filter((shoe) => shoe.id >= shoes.length - 9);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/shoes/${slug}`).then((res) => {
      setProduct(res.data.data);
    });
  }, [slug]);

  return product ? (
    <>
      <div className="scroll-container">
        <div className="vh-75 SP-section">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="single-product-image"
            />
          </div>
          <div className="single-product-details">
            <h1 className="fw-5">{product.name}</h1>
            <p className="description">{product.description}</p>


            {product.discount_price &&
            product.price !== product.discount_price ? (
              <div className="price-wrapper">
                <span className="original-price">€{product.price}</span>
                <span className="discount-price">
                  €{product.discount_price}
                </span>
              </div>
            ) : (
              <p className="price">€{product.price}</p>
            )}


            <p className="categoria-prodotto">Scarpa {product.gender}</p>

            {/* accordion */}

            <div className="accordion my-5" id="infoAccordion">
              {/* Spedizioni e resi */}
              <div className="accordion-item border-0 bg-transparent">
                <h2 className="accordion-header" id="headingShipping">
                  <button
                    className="accordion-button collapsed custom-accordion-btn fw-bold "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseShipping"
                    aria-expanded="false"
                    aria-controls="collapseShipping"
                  >
                    Spedizioni e resi gratuiti
                  </button>
                </h2>
                <div
                  id="collapseShipping"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingShipping"
                  data-bs-parent="#infoAccordion"
                >
                  <div className="accordion-body">
                    Offriamo spedizioni rapide e gratuite su tutti gli ordini.
                    Se non sei completamente soddisfatta del tuo acquisto, puoi
                    effettuare un reso gratuito entro 30 giorni dalla consegna.
                    La procedura è facile, veloce e senza costi aggiuntivi.
                  </div>
                </div>
              </div>

              {/* Ulteriori informazioni */}
              <div className="accordion-item border-0 bg-transparent py-3">
                <h2 className="accordion-header" id="headingDetails">
                  <button
                    className="accordion-button collapsed custom-accordion-btn fw-bold "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseDetails"
                    aria-expanded="false"
                    aria-controls="collapseDetails"
                  >
                    Ulteriori informazioni
                  </button>
                </h2>
                <div
                  id="collapseDetails"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingDetails"
                  data-bs-parent="#infoAccordion"
                >
                  <div className="accordion-body">
                    Tutti i nostri prodotti sono selezionati con cura e
                    realizzati con materiali di alta qualità. Offriamo supporto
                    clienti dedicato per aiutarti in ogni fase del tuo acquisto,
                    dalla scelta del modello fino alla consegna. Consulta la
                    sezione FAQ o contattaci per qualsiasi domanda.
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTONE AGGIUNGI AL CARRELLO */}
            <button
              className="add-to-cart bottone-carrello-SP"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
              }}
            >
              Aggiungi al carrello
            </button>

            {/* TOAST DI CONFERMA PRODOTTO AGGIUNTO AL CARRELLO */}
            {showToast && (
              <div
                style={{
                  position: "fixed",
                  bottom: 20,
                  right: 20,
                  backgroundColor: "#251f32",
                  color: "white",
                  padding: ".5rem 1rem",
                  borderRadius: "0.25rem",
                  zIndex: 9999,
                }}
              >
                {product.name} aggiunta al carrello!
              </div>
            )}
          </div>
        </div>

        {/* SEZIONI AGGIUNTIVE */}
        <section className="py-5 snap-section">
          <div className="container g-4">
            <div className="mb-5">
              <h2>Ti potrebbe interessare anche</h2>
              <p>Lasciati ispirare da scelte che camminano verso di te</p>
            </div>
            <CardSliderSP array={newShoes} />
          </div>
        </section>
      </div>
    </>
  ) : (
    <div className="d-flex justify-content-center py-5">
      <Loader />
    </div>
  );
};

export default ProductDetail;
