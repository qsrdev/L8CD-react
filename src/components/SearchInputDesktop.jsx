import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const SearchInputDesktop = () => {
  const { cartItems } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handleInput = (event) => {
    setSearch(event.target.value);
  };


  const handleRedirect = () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    const newQuery = `?q=${encodeURIComponent(trimmed)}`;
    const newPath = `/shoes${newQuery}`;
    const currentPath = location.pathname + location.search;

    if (currentPath === newPath) {
      navigate("/", { replace: true });
      setTimeout(() => navigate(newPath), 0);
    } else {
      navigate(newPath);
    }
   };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("q")) {
      setSearch("");
    }
  }, [location.search]);

  return (
    <div className="search-wrapper d-flex align-items-center gap-3">
      <input
        type="text"
        placeholder="Cerca il tuo articolo..."
        className="search d-sm-none d-md-none d-lg-block"
        value={search}
        onChange={handleInput}
        // onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
      />


      {/* Il search viene avviato al premere del button */}
      {/* Togliere il commento su onKeyDown se si vuole la ricerca al tasto Invio */}
      <button
        onClick={handleRedirect}
        className="btn-search-desktop d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <div className="header-icons d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block relative">
        <Link to="/shoes/cart">
          <i className="fa-solid fa-cart-shopping text-white"></i>
          {cartItems.length > 0 ? (
            <span className="cart-badge">{cartItems.length}</span>
          ) : null}
        </Link>
      </div>
    </div>
  );
};

export default SearchInputDesktop;
