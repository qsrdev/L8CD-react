import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { use } from "react";

const ShoesCard = ({ shoe }) => {
  const { addToCart } = useCart();
  const { id, name, description, brand, price, image, gender, slug } = shoe;

  return (
    <Link
      to={`/shoes/product/${slug}`}
      className="text-decoration-none text-dark"
    >
      <div className="h-100 hover-zoom mb-2">
        <div className="card-body">
          <img src={image} className="card-img-top img-shoes-card" alt={name} />
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
