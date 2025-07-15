import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);

  const linkNav = [
    { title: "Offerte", url: "/offerte" },
    { title: "Uomo", url: "/uomo" },
    { title: "Donna", url: "/donna" },
    { title: "Bambino", url: "/bambino" }
  ];

  return (
    <div className="burger-menu  d-md-block d-lg-none">
      <div className="d-flex align-content-center">
        <button
          className="btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
        <i className="fa-solid fa-bars text-white"></i>
        </button>
        <div className="header-icon">
          <Link to='/shoes/cart'>
            <i className="fa-solid fa-cart-shopping text-white"></i>
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="container">
        <ul className="burger-nav p-3 position-absolute ">
          {linkNav.map((link, index) => (
            <li key={index} className="mb-2">
              <NavLink className="text-white" to={link.url}>
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
