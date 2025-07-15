import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="burger-menu d-md-block d-lg-none">
      <div className="d-flex align-content-center">
        <button className="btn" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fs-5 fa-solid fa-bars text-white"></i>
        </button>
        <div className="header-icon">
          <Link className="btn" to="/shoes/cart">
            <i className="fs-5 fa-solid fa-cart-shopping text-white"></i>
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="container">
          <ul className="burger-nav py-3 position-absolute">
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
