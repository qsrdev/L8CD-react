import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <>
      <footer className="footer text-white">
        <div className="container">
          {/* footer top */}
          <div className="footer-top">
            <div>
              <ul className="link-footer">
                <li>
                  <Link className="nav-footer" to={`/contacts`}>
                    Contatti
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sponsored-by text-center">
              <p>Sponsored by</p>
              <div className="d-flex align-items-center lemon-company py-2">
                <i className="fa-solid fa-lemon fa-2x mx-2"></i>
                <span>Lemon Company S.P.A.</span>
              </div>
            </div>
          </div>
          {/* footer bottom */}
          <div className="footer-bottom">
            <div>
              <p className="diritti-riservati">@L8CD. diritti riservati</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AppFooter;
