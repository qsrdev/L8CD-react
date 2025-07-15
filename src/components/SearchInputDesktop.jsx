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
      navigate(`/shoes?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <div className="search-wrapper d-flex align-items-center gap-3">
      <input
        type="text"
        placeholder="Cerca il tuo articolo..."
        className="search d-sm-none d-md-none d-lg-block"
        value={search}
        onChange={handleInput}
        onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
      />

      <button onClick={handleRedirect} className="btn-search-desktop d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <div className="header-icons d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
        <Link to="/shoes/cart">
          <i className="fa-solid fa-cart-shopping text-white"></i>
        </Link>
      </div>
    </div>
  );
};

export default SearchInputDesktop;
