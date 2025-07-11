import { useState } from "react"
import { NavLink } from "react-router-dom"

const AppHeader = () => {

// Link per la navigazione di pagina in pagina  
const linkNav = [{

    title: "Home",
    url: "/"
},
{

    title: "Offerte",
    url: "/offerte"
},
{

    title: "Uomo",
    url: "/uomo"
},
{

    title: "Donna",
    url: "/donna"
},
{

    title: "Bambino",
    url: "/bambino"
}]

    return (
        <>
            <header>
                <div className="container">
                <nav className="navbar">
                    <div className="container-fluid">
                        <a className="navbar-brand">Navbar</a>
                        <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                </div>
            </header>
        </>
    )
}

export default AppHeader


