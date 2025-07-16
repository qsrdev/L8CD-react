import { useNavigate} from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <main className="container py-5">        
                <h1 className="text-center fw-bold">Ti sei pers*?</h1>
                <p className="text-center my-2">Pagina non trovata</p>
                <div className="d-flex justify-content-center align-items-center gap-3 my-4">
                    <button aria-label="Torna alla pagina precedente" className="btn-notfound" onClick={() => {navigate(-1)}}>Torna alla pagina precedente</button>
                    <button aria-label="Torna alla Home" className="btn-notfound" onClick={() => {navigate("/")}}>Torna alla Home</button>
                </div>
        </main>
    )
}

export default NotFound