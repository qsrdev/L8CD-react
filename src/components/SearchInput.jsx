import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const handleRedirect = () => {
    if (search.trim()) {
      // Usa il valore inserito, non un brand fisso
      navigate(`/shoes?brand=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="search-wrapper search-input">
      <input
        type="text"
        placeholder="Cerca il tuo articolo..."
        className="w-100 search-small-screen"
        value={search}
        onChange={handleInput}
        onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
      />


      <button onClick={handleRedirect} className="btn btn-primary mx-2">
        Cerca
      </button>


      {search && (
        <button className="clear-btn" onClick={() => setSearch("")}>
          &#10005;
        </button>
      )}
    </div>
  );
};

export default SearchInput;
