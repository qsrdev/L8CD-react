import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import SearchInput from "./SearchInput";
import SearchInputDesktop from "./SearchInputDesktop";

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
        <div className="header-logo">
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
         <SearchInputDesktop/>
        </div>
        <div className="left-group d-flex align-items-center">
          <div>{<BurgerMenu />}</div>
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
