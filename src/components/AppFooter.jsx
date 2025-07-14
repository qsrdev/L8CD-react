import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <>
      <footer className="footer text-white">
        {/* footer top */}
        <div className="footer-top">
          <div>
            <ul className="link-footer">
              <li>
                <Link className="nav-footer">Home</Link>
              </li>
              <li>
                <Link className="nav-footer">Categorie</Link>
              </li>
              <li>
                <Link className="nav-footer">Contatti</Link>
              </li>
            </ul>
          </div>
          <div className="sponsored-by">
            <p>Sponsored by</p>
          </div>
        </div>
        {/* footer bottom */}
        <div className="footer-bottom">
          <div>
            <Link to="/" className="l8cd-link">
              L8CD
            </Link>
          </div>

          <div>
            <p className="diritti-riservati">@L8CD. diritti riservati</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AppFooter;
