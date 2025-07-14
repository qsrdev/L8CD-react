import { useState } from "react";
import { NavLink } from "react-router-dom";

const BurgerMenu = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);

  const linkNav = [
    { title: "Offerte", url: "/offerte" },
    { title: "Uomo", url: "/uomo" },
    { title: "Donna", url: "/donna" },
    { title: "Bambino", url: "/bambino" }
  ];

  return (
    <div className="burger-menu d-lg-none">
      <button
        className="btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
       <i className="fa-solid fa-bars text-white"></i>
      </button>

      {menuOpen && (
        <ul className="burger-nav p-3 position-absolute ">
          {linkNav.map((link, index) => (
            <li key={index} className="mb-2">
              <NavLink className="text-white" to={link.url}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BurgerMenu;
