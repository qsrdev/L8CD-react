import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import SearchInput from "./SearchInput";

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
      <header className="header-color">
        <div className="header-logo  me-auto">
          <Link className="logo" to="/">
            L8CD
          </Link>
        </div>
        <div className="link-header">
          <ul className="d-flex text-white">
            {linkNav.map((curLink, index) => (
              <li key={index}>
                <Link to={curLink.url}>{curLink.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <input
            type="text"
            placeholder="Cerca il tuo articolo... "
            className="search"
          />
        </div>
        <div className="left-group d-flex align-items-center">
          <div>{<BurgerMenu />}</div>
            <Link>Cerca</Link>
          <div className="header-icons">
            <Link to='/shoes/cart'>
              <i className="fa-solid fa-cart-shopping text-white"></i>
            </Link>
          </div>
        </div>
      <div className="line"></div>
      </header>
      <SearchInput />
    </>
  );
};

export default AppHeader;
