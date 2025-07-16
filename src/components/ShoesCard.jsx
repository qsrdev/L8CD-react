import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { use } from "react";

const ShoesCard = ({ shoe }) => {
  const { addToCart } = useCart();
  const { id, name, description, brand, price, image, gender } = shoe;

  return (
    <Link to={`/shoes/product/${id}`} className="text-decoration-none text-dark">
      <div className="h-100 hover-zoom">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title name">
            {name} - {brand}
          </h5>
          <p className="card-text description">{description}</p>
          <p className="card-text price"> {price}€ </p>
          {/* <button
            className="add-to-cart-all "
            onClick={(e) => {
              e.preventDefault();
              addToCart(shoe);
            }}
          >
            AGGIUNGI!
          </button> */}
        </div>
      </div>
    </Link>
  );
};

export default ShoesCard;
