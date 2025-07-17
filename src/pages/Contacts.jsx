import { Link } from "react-router-dom";

const Contacts = () => {
  return (
    <>
      <section className="section-contact py-5">
        <div className="container">
          <h1 className="text-center mb-5">Contattaci</h1>
          <div className="row">
            <div className="text-center col-6">
              <i className="fa-solid fa-comments fs-1 mb-4"></i>
              <h5>Chatta con noi!</h5>
              <p>Puoi contattarci dalle 9:30 alle 18:00</p>
              <p>7 giorni su 7</p>
            </div>
            <div className="text-center col-6">
              <i className="fa-solid fa-mobile-screen fs-1 mb-4"></i>
              <h5>Puoi chiamarci</h5>
              <p>Numero nazionale: +39 02 12345678</p>
              <p>Numero internazionale: +44 20 12345678</p>
              <p>7 giorni su 7</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacts;
