import { useEffect, useState } from "react";
import axios from "axios";
import ShoesCard from "../components/ShoesCard.jsx";

const Shoes = () => {
    const [shoes, setShoes] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/shoes").then((resp) => {
            setShoes(resp.data.data);            
        });

    }, []);
    return (
        <>
    <main>
        <section className="container py-5">
            <h1 className="text-center">Risultati di ricerca</h1>
            <div className="row g-3">
                {shoes.map((curShoe) => (
                    <div key={curShoe.id} className="col-6 col-md-4">
                        <ShoesCard shoe={curShoe} />
                    </div>
                ))}                
            </div>
        </section>
    </main>
        </>
    );
};

export default Shoes;