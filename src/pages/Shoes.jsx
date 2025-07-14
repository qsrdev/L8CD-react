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
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // FINE FILTRI

  useEffect(() => {
    let url = "http://localhost:3000/shoes";


    const params = {};

    if (gender === "novita") {
        url += "?isNew=true";
    } else if (gender) {
        url += `?gender=${gender}`;
    }

    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (selectedColor) params.color = selectedColor;
    if (selectedBrand) params.brand = selectedBrand;
    if (searchTerm) params.q = searchTerm;



    axios.get(url, { params}).then((resp) => {
      setShoes(resp.data.data);
    });
  }, [gender, minPrice, maxPrice, selectedColor, selectedBrand]);

  const pageTitle = gender === "novita" ? "Novità" : gender ? `Risultati per "${gender}"` : "Tutte le scarpe";

  return (
    <main>
      <section className="container py-5">

        <div className="d-flex justify-content-center align-items-center gap-3 mb-4 flex-wrap">
              <h1 className="m-0 text-center">
                {pageTitle} ({shoes.length} risultati)
              </h1>
              <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                <i className="fa-solid fa-filter me-2"></i>
                {showFilters ? "Nascondi filtri" : "Filtri"}
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

export default Shoes
