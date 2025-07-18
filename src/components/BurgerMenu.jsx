import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useCart } from "../Context/CartContext";

const BurgerMenu = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchMobile, setSearchMobile] = useState(false)

  const linkNav = [
    {
      title: "Catalogo",
      url: "/shoes",
    },
    {
      title: "Offerte",
      url: "/shoes/offerte",
    },
    {
      title: "Uomo",
      url: "/shoes/uomo",
    },
    {
      title: "Donna",
      url: "/shoes/donna",
    },
    {
      title: "Bambino",
      url: "/shoes/bambino",
    },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false)
  }
  
  const handleSearchClick = () => {
    setSearchMobile(false)
  }
  

  return (
    <div className="burger-menu d-md-block d-lg-none">

      <div className="d-flex align-content-center gap-1">

        {/* Link-cart */}
        <div className="header-icon">
          <Link className="btn" to="/shoes/cart">
            <i className="fs-5 fa-solid fa-cart-shopping text-white"></i>
          </Link>
        </div>

        {/* Search Button */}
        <div className="position-relative">
          <button className="btn btn-search-small-screen" onClick={() => setSearchMobile(!searchMobile)}>
            <i className="fs-5 fa-solid fa-magnifying-glass text-white"></i>
          </button>
          {cartItems.length > 0 && (
            <span className="cart-badge-small-screen translate-middle badge rounded-pill bg-danger">
              {cartItems.length}
            </span>
          )}
        </div>

        {searchMobile && (
          <SearchInput onClick={handleSearchClick}/>
        )}

        {/* Burger menu link */}
        <div>
          <button className="btn" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fs-5 fa-solid fa-bars text-white"></i>
          </button>
        </div>


      </div>

      {menuOpen && (
        <div className="container">
          <ul className="burger-nav py-3 position-absolute">
            {linkNav.map((link, index) => (
              <li key={index} className="mb-2" onClick={handleLinkClick}>
                <NavLink to={link.url}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
