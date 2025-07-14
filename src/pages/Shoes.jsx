import { useEffect, useState } from "react";
import axios from "axios";
import ShoesCard from "../components/ShoesCard.jsx";
import { useParams } from "react-router-dom";

const Shoes = () => {
  const { gender } = useParams();
  const [shoes, setShoes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // INIZIO FILTRI
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);
  // FINE FILTRI

  useEffect(() => {
    let url = "http://localhost:3000/shoes";

    const params = {};

    if (gender === "offerte") {
      params.maxPrice = 90;
    } else if (gender) {
      params.gender = gender;
    }

    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (selectedBrand) params.brand = selectedBrand;
    if (onlyNew) params.isNew = true;

    axios.get(url, { params }).then((resp) => {
      setShoes(resp.data.data);
    });
  }, [gender, minPrice, maxPrice, onlyNew, selectedBrand]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const pageTitle =
    gender === "offerte"
      ? "Offerte"
      : gender
      ? capitalize(gender)
      : "Tutte le scarpe";

  return (
    <main>
      <section className="container py-5">
        <div className="d-flex justify-content-center align-items-center gap-3 mb-4 flex-wrap">
          <h1 className="m-0 text-center">{pageTitle}</h1>
          <span className="text-muted fs-6">({shoes.length} risultati)</span>
          <button
            className="btn btn-outline-secondary custom-hover d-flex align-items-center"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <i className="fa-solid fa-filter me-2"></i>
            <span className="d-none d-sm-inline">
              {showFilters ? "Nascondi filtri" : "Filtri"}
            </span>
          </button>
        </div>
        {showFilters && (
          <div className="filters d-flex flex-wrap gap-3 my-4">
            <input
              type="number"
              placeholder="Prezzo minimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="form-control"
            />

            <input
              type="number"
              placeholder="Prezzo massimo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-control"
            />

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="filter-new"
                checked={onlyNew}
                onChange={(e) => setOnlyNew(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="filter-new">
                Aggiunte di recente
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
              <option value="Solomon">Solomon</option>
              <option value="The North Face">The North Face</option>
              <option value="Columbia">Columbia</option>
              <option value="Under Armour">Under Armour</option>
              <option value="Converse">Converse</option>
            </select>
          </div>
        )}

        <div className="row g-3">
          {shoes.map((curShoe) => (
            <div key={curShoe.id} className="col-6 col-md-4">
              <ShoesCard shoe={curShoe} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Shoes;
