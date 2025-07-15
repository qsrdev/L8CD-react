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
        {/* Non toccare il container, deve esserci */}
          <div className="container d-flex justify-content-between">
          {/* Logo */}
          <div className="header-logo">
            <Link className="logo text-white text-decoration-none fw-bold fs-4" to="/">
              L8CD
            </Link>
          </div>

          {/* Nav-Link */}
          <div>
            <ul className="d-flex text-white gap-4">
              {linkNav.map((curLink, index) => (
                <li className="link-header" key={index}>
                  <Link to={curLink.url}>{curLink.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search */}
          <SearchInputDesktop/>
          {/* <div className="left-group d-flex align-items-center"> */}
            <div>{<BurgerMenu />}</div>
            {/* <div className="header-icons">
              <Link to='/shoes/cart'>
                <i className="fa-solid fa-cart-shopping text-white"></i>
              </Link>
            </div> */}
          {/* </div> */}
          </div>
      </header>
      <SearchInput />
      
    </>
  );
};

export default AppHeader;
