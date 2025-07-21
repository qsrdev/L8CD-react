import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { use } from "react";

const ShoesCard = ({ shoe }) => {
  const { addToCart } = useCart();
  const { id, name, description, brand, price, image, gender, slug, discount_price } = shoe;

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
          {discount_price ? (
          <>
          <div className="d-flex">
            <p className="original-price me-1">{price} €</p>
            <p className="discount-price">{discount_price} €</p>
          </div>
          </>
          ) : (
          <p className="card-text price">{price} €</p>
          )}

        </div>
      </div>
    </Link>
  );
};

export default ShoesCard;
