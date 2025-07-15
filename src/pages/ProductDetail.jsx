import { useParams } from "react-router-dom";
import axios from "axios";
import CardSlider from "../components/CardSlider/CardSlider";
import Slider from "../components/Slider/Slider";
import { useRef, useEffect, useState } from "react";


const useInView = (threshold = 0.3) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return  [ref, isVisible];
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
    const [shoes, setShoes] = useState([]);
    const [ref1, inView1] = useInView();
const [ref2, inView2] = useInView();
const [ref3, inView3] = useInView();
const [ref4, inView4] = useInView();


  useEffect(() => {
    axios.get("http://localhost:3000/shoes").then((resp) => {
      setShoes(resp.data.data);
    });
  }, []);

  const newShoes = shoes.filter((shoe) => shoe.id >= shoes.length - 9);

  const freeShippingShoes = shoes.filter((shoe) => shoe.price >= 100).slice(0, 5);

  const randomShoes = shoes.filter((shoe) => (shoe.id = Math.floor(Math.random() * shoes.length))).slice(0, 5);

  useEffect(() => {
    axios.get(`http://localhost:3000/shoes/${id}`).then((res) => {
      setProduct(res.data.data);
      console.log(res.data.data)
    });
  }, [id]);

  return product ? (
    <>
  <div className="scroll-container">
        <div ref={ref1} className={`d-flex justify-content-between vh-90 snap-section ${inView1 ? "visible" : ""}`}>
            <div>
                  <img src={product.image} alt={product.name} className="single-product-image"/>
            </div>
    <div className="single-product-details">
      <h1 className="fw-5">{product.name}</h1>
      <p className="description">{product.description}</p>
      <p className="price"> €{product.price}</p>
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
        Offriamo spedizioni rapide e gratuite su tutti gli ordini. Se non sei completamente soddisfatta del tuo acquisto, puoi effettuare un reso gratuito entro 30 giorni dalla consegna. La procedura è facile, veloce e senza costi aggiuntivi.
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
        Tutti i nostri prodotti sono selezionati con cura e realizzati con materiali di alta qualità. Offriamo supporto clienti dedicato per aiutarti in ogni fase del tuo acquisto, dalla scelta del modello fino alla consegna. Consulta la sezione FAQ o contattaci per qualsiasi domanda.
      </div>
    </div>
  </div>
</div>

{/* BOTTONE AGGIUNGI AL CARRELLO */}
<button className="add-to-cart">Aggiungi al carrello</button>

        </div>
          </div>
   {/* SEZIONI AGGIUNTIVE */}
       <section ref={ref2} className={`py-5 snap-section ${inView2 ? "visible" : ""}`}>
              <div className="container g-4">
                <div className="mb-5">
                  <h2>Novità</h2>
                  <p>Scopri gli ultimi arrivi</p>
                </div>
                <CardSlider array={newShoes} />
              </div>
            </section>
  <section ref={ref3} className={`promo-color py-5 snap-section ${inView3 ? "visible" : ""}`}>
        <div className="container g-4">
          <div className="mb-5 text-white">
            <h2>Promo spedizione gratuita</h2>
            <p>Approfitta ora della spedizione a costo zero</p>
          </div>
          <CardSlider array={freeShippingShoes} />
        </div>
      </section>
<section ref={ref4} className={`py-5 snap-section ${inView4 ? "visible" : ""}`}>
        <div className="container g-4">
          <div className="mb-5">
            <h2>Nuovi brand!</h2>
            <p>Tutti gli ultimi arrivi</p>
            <CardSlider array={randomShoes} />
          </div>
        </div>
      </section>
      </div>
</>
    
    )
  
   : (
    <p>Caricamento...</p>
    
  );

}
  

export default ProductDetail;
