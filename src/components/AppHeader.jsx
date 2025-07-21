import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import SearchInput from "./SearchInput";
import SearchInputDesktop from "./SearchInputDesktop";

const AppHeader = () => {
  // Link per la navigazione di pagina in pagina

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
    <>
      <header className="header-color">
        {/* Occhio a toccare il container */}
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div>
            <Link to="/">
              <img className="logo" src="../../public/Logo.png" alt="logo" />
            </Link>
          </div>

          {/* Nav-Link */}
          <div className="navlink-none d-sm-none d-md-none d-lg-block">
            <ul className="d-flex text-white gap-4 navlink-list">
              {linkNav.map((curLink, index) => (
                <li className="link-header" key={index}>
                  <Link to={curLink.url}>{curLink.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search */}
          <SearchInputDesktop />

          {/* Burger-Menu */}
          {<BurgerMenu />}
        </div>
      </header>
    </>
  );
};

export default AppHeader;
