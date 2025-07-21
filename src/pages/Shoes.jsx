import { useEffect, useState } from "react";
import axios from "axios";
import ShoesCard from "../components/ShoesCard.jsx";
import { useParams, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader.jsx";

const Shoes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brandFromQuery = queryParams.get("brand");
  const searchTermFromQuery = queryParams.get("q");

  const { gender } = useParams();
  const [shoes, setShoes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // FILTRI
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);
  const searchTerm = searchTermFromQuery || "";

  // Chiamata API
  useEffect(() => {
    let url = `${import.meta.env.VITE_API_URL}/shoes`;
    const params = {};

    if (gender === "offerte") {
      params.maxPrice = 90;
    } else if (gender === "novita") {
      params.isNew = true;
    } else if (gender) {
      params.gender = gender;
    }

    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (selectedColor) params.color = selectedColor;

    if (onlyNew) params.isNew = true;
    if (selectedBrand || brandFromQuery)
      params.brand = selectedBrand || brandFromQuery;
    if (searchTerm) params.q = searchTerm;

    axios.get(url, { params }).then((resp) => {
      setShoes(resp.data.data);
    });
  }, [
    gender,
    minPrice,
    maxPrice,
    onlyNew,
    selectedColor,
    selectedBrand,
    brandFromQuery,
    searchTermFromQuery,
  ]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  let pageTitle =
    gender === "offerte"
      ? "Offerte"
      : gender === "novita"
      ? "Novità"
      : gender
      ? capitalize(gender)
      : "Tutte le scarpe";

  return (
    <main>
      {/* {shoes.length === 0 ? (
        <Loader/>
      ) : ( */}
      <section className="container py-5">
        <div className="d-flex justify-content-center align-items-center gap-3 my-5 flex-wrap">
          <h1 className="m-0 text-center">{pageTitle}</h1>
          <span className="text-muted fs-6">({shoes.length} risultati)</span>
          <button
            className="btn-custom-filter custom-hover d-flex align-items-center"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <i className="fa-solid fa-filter me-2"></i>
            <span className="d-none d-sm-inline">
              {showFilters ? "Nascondi filtri" : "Filtri"}
            </span>
          </button>
        </div>
        {showFilters && (
          <div className="filters bg-light p-4 rounded-4 shadow-sm mb-4 w-100">
            <div className="d-flex flex-column gap-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-euro-sign"></i>
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Prezzo minimo"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-euro-sign"></i>
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Prezzo massimo"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filter-new"
                  checked={onlyNew}
                  onChange={(e) => setOnlyNew(e.target.checked)}
                />
                <label className="form-check-label ms-2" htmlFor="filter-new">
                  <i className="fa-solid fa-star me-1 text-warning"></i> Novità
                </label>
              </div>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="form-select"
              >
                <option value="">Tutti i brand</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="New Balance">New Balance</option>
                <option value="Merrell">Merrell</option>
                <option value="Asics">Asics</option>
                <option value="La Sportiva">La Sportiva</option>
                <option value="Vans">Vans</option>
                <option value="Salomon">Salomon</option>
                <option value="The North Face">The North Face</option>
                <option value="Columbia">Columbia</option>
                <option value="Under Armour">Under Armour</option>
                <option value="Converse">Converse</option>
              </select>

              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="form-select"
              >
                <option value="">Tutti i colori</option>
                <option value="Black">Nero</option>
                <option value="White">Bianco</option>
                <option value="Blue">Blu</option>
                <option value="Red">Rosso</option>
                <option value="Grey">Grigio</option>
                <option value="Green">Verde</option>
                <option value="Yellow">Giallo</option>
                <option value="Pink">Rosa</option>
                <option value="Brown">Marrone</option>
              </select>
            </div>
          </div>
        )}

        {shoes && shoes.length === 0 ? (
          <div className="text-center my-5">
            <h4>Nessun risultato trovato 😢</h4>
            <p>Prova a modificare i filtri o cerca un brand diverso.</p>
          </div>
        ) : (
          <div className="row g-3">
            {shoes.map((curShoe) => (
              <div key={curShoe.id} className="col-lg-4 col-md-6 col-sm-12">
                <ShoesCard shoe={curShoe} />
              </div>
            ))}
          </div>
        )}
      </section>
      {/* )} */}
    </main>
  );
};

export default Shoes;
