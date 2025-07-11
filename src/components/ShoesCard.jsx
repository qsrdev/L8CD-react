import { Link } from "react-router-dom";
const ShoesCard = ({ shoe }) => {
    const { id, name, description, brand, price, image, gender} = shoe;
    return (
    <Link to={`/shoes/${id}`} className="text-decoration-none text-dark">
        <div className="card h-100 hover-zoom">
            <img src={image} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title name">{name} - {brand}</h5>
                <p className="card-text description">{description}</p>
                <p className="card-text price"> {price} </p>
            </div>
        </div>
    </Link>
    );
};

export default ShoesCard;

