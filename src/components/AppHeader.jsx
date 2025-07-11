import { useState } from "react"
import { NavLink, Link } from "react-router-dom"

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
            <header className="header-color d-flex justify-content-between align-items-center">
                <div className="header-logo">L8CD</div>
                <div className="link-header">
            <ul className="d-flex">
                <li><Link>Offerte</Link></li>
                <li><Link>Uomo</Link></li>
                <li><Link>Donna</Link></li>
                <li><Link>Bambino</Link></li>
            </ul>
                </div>
                
                <div ><input type="text" placeholder="Cerca il tuo articolo... " className="search"/></div>
                <div className="header-icons"><Link><i className="fa-solid fa-cart-shopping text-white"></i></Link></div>
                
            </header>
        </>
    )
}

export default AppHeader


