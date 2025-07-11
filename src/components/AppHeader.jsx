import { useState } from "react"
import { NavLink, Link } from "react-router-dom"

const AppHeader = () => {



// Link per la navigazione di pagina in pagina  
const linkNav = [
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
}
]



    return (
        <>
            <header className="header-color">

                {/* Navigazione */}
                <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="text-white text-decoration-none fs-5 fw-bold mright-200" href="#">L8CD</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"></button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {linkNav.map((curLink, index) => (
                                <li className="nav-item" key={index}>
                                    <Link to={curLink.url} className="nav-link text-white" aria-current="page" href="#">{curLink.title}</Link>
                                </li>                               
                            ))}
                        </ul>
                    </div>
                    <form className="d-flex" role="search">
                        <input className="search-control me-4" type="search" placeholder="Ricerca l'articolo..." aria-label=""/>
                        <div className="py-2 me-3">
                            <Link><i className="fa-solid fa-cart-shopping text-white"></i></Link>
                        </div>
                    </form>
                </div>
                </nav>
                <form className="d-flex d-none" role="search">
                    <input className="form-control me-2" type="search" placeholder="Ricerca l'articolo..." aria-label="Search"/>
                </form>
            </header>
        </>
    )
}

export default AppHeader


