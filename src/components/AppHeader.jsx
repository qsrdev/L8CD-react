import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import SearchInput from "./SearchInput";

const AppHeader = () => {
 
// Link per la navigazione di pagina in pagina  
const linkNav = [
{
    title: "Offerte",
    url: "/offerte",
},
{
    title: "Uomo",
    url: "/uomo",
},
{
    title: "Donna",
    url: "/donna",
},
{
    title: "Bambino",
    url: "/bambino",
}
]



    return (
        <>
            <header className="header-color">
                <div className="header-logo  me-auto"><Link className="logo">L8CD</Link></div>
                <div className="link-header">
            <ul className="d-flex text-white">
  {linkNav.map((curLink, index) => (
    <li key={index}>
      <Link to={curLink.url}>{curLink.title}</Link>
    </li>
  ))}
</ul>
                </div>
    
                
                <div ><input type="text" placeholder="Cerca il tuo articolo... " className="search"/></div>
            <div className="left-group d-flex align-items-center">
                 <div>{<BurgerMenu/>}</div> 
                <div className="header-icons"><Link><i className="fa-solid fa-cart-shopping text-white"></i></Link></div>
             </div>
            </header>
                <div className="line"></div>
    <SearchInput/>
            
        </>
    )
}





export default AppHeader;
