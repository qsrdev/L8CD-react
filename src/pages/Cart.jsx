import { useCart } from "../Context/CartContext";

const Cart = () => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  return (
    <>
      <div>
        <h2>Carrello</h2>
        {cartItems.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          cartItems.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity} = €{item.quantity * item.price}
            </p>
          ))
        )}
        <p>
          <strong>Totale: €{totalPrice}</strong>
        </p>
      </div>
    </>
  );
};

export default Cart;
