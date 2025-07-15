import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

      <div className="search-wrapper d-flex align-items-center gap-3">
          <input
            type="text"
            placeholder="Cerca il tuo articolo..."
            className="search"
            value={search}
            onChange={handleInput}
            onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
          />

          <button onClick={handleRedirect} className="btn-search-desktop">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <div className="header-icons">
            <Link to='/shoes/cart'>
              <i className="fa-solid fa-cart-shopping text-white"></i>
            </Link>
          </div>

        {search && (
          <button className="clear-btn" onClick={() => setSearch("")}>
            &#10005;
          </button>
        )}
      </div>
  );
};

export default SearchInputDesktop;
