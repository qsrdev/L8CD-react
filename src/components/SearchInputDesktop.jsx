import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInputDesktop = () => {
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
    <div className="search-wrapper d-flex">
      <input
        type="text"
        placeholder="Cerca il tuo articolo..."
        className="search"
        value={search}
        onChange={handleInput}
        onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
      />

      <button onClick={handleRedirect} className="btn-search-desktop">
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

export default SearchInputDesktop;
