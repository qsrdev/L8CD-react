import { useState } from "react"
import { NavLink } from "react-router-dom"

const AppHeader = () => {

// Link per la navigazione di pagina in pagina  
const linkNav = [{

    title: "Home",
    url: "/"
},
{

    title: "",
    url: ""
},
{

    title: "",
    url: ""
},
{

    title: "",
    url: ""
},
{

    title: "",
    url: ""
}]

    return (
        <header>
            <h1>Evviva che bello sono l'header</h1>
        </header>
    )
}

export default AppHeader


