import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const AppHeader = () => {
  // Link per la navigazione di pagina in pagina
  const linkNav = [
    {
      title: "Novità",
      url: "/shoes/novita",
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
    <>
      <header className="header-color d-flex justify-content-between align-items-center">
        <div className="header-logo">L8CD</div>

        <div className="link-header">
          <ul className="d-flex">
            {linkNav.map((link) => (
              <li key={link.title}>
                <NavLink to={link.url} className={({ isActive }) => `text-white text-decoration-none ${isActive ? "fw-bold" : ""}`}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input type="text" placeholder="Cerca il tuo articolo... " className="search" />
        </div>
        <div className="header-icons">
          <Link>
            <i className="fa-solid fa-cart-shopping text-white"></i>
          </Link>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
