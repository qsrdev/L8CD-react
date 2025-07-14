import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


const SearchInput = () => {

    const [search, setSearch] = useState("");
    const [shoes, setShoes] = useState([])

    const searchShoes = () => {
      if (search) {
        axios
        .get(`http://localhost:3000/shoes/&query=${search}`)
        .then((resp) => {
          const shoesList = resp.data.data
          setShoes(shoesList)
        })
      }
    }

    return (
    <div className="search-wrapper">
      <input
      type="text"
      placeholder="Cerca il tuo articolo..."
      className="w-100 search-small-screen"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
         <button className="clear-btn" onClick={() => setSearch("")}>
        &#10005;
      </button>
      )}
    </div>
    )
}
export default SearchInput;