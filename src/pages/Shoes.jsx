import { useEffect, useState } from "react";
import axios from "axios";
import ShoesCard from "../components/ShoesCard.jsx";
import { useParams } from "react-router-dom";

const Shoes = () => {
  const { gender } = useParams();
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    let url = "http://localhost:3000/shoes";

    if (gender === "novita") {
      url += "?isNew=true";
    } else if (gender) {
      url += `?gender=${gender}`;
    }

    axios.get(url).then((resp) => {
      setShoes(resp.data.data);
    });
  }, [gender]);

  const pageTitle = gender === "novita" ? "Novità" : gender ? `Scarpe per ${gender}` : "Tutte le scarpe";

  return (
    <main>
      <section className="container py-5">
        <h1 className="text-center">Risultati di ricerca per '{gender}'</h1>
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
