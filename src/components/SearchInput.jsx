import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const handleRedirect = () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    const newSearch = `?q=${encodeURIComponent(trimmed)}`;
    const currentPath = location.pathname + location.search;

    const newPath = `/shoes${newSearch}`;

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
    <div className="search-wrapper search-input">
      <div className="d-flex">
        <input
          type="text"
          placeholder="Cerca il tuo articolo..."
          className="w-100 search-small-screen"
          value={search}
          onChange={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
        />

        <button onClick={handleRedirect} className="btn-search">
          Cerca
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
