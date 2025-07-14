import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const SearchInput = () => {

    // const [text, setText] = useState("")
    const [search, setSearch] = useState("");
    const [shoes, setShoes] = useState([])

    const navigate = useNavigate()
    

    const searchShoes = () => {
      if (search) {
        axios
        .get(`http://localhost:3000/shoes/?brand=${search}`)
        .then((resp) => {
          const shoesList = resp.data
          console.log(resp.data)
          setShoes(shoesList)
          navigate(`/shoes`)       
        })
        .catch((error) => {
          console.error("Errore nella chiamata");
        });
      }
    }

    const handleInput = (event) => {
      event.preventDefault()
      setSearch(event.target.value)
    }

    


    return (
    <div className="search-wrapper">
      <input
      type="text"
      placeholder="Cerca il tuo articolo..."
      className="w-100 search-small-screen"
      value={search}
      onChange={handleInput}
      />
      {search && (
        <button className="clear-btn" onClick={() => setText("")}>
        &#10005;
        </button>
      )}
    </div>
    )
}


export default SearchInput;