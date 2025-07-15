import { useCart } from "../Context/CartContext";

const Cart = () => {
  const { cartItems, setCartItems, totalPrice, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  return (
    <>
      <div>
        <h2>Carrello</h2>
        {cartItems.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          cartItems.map((item) => (
            <p key={item.id}>
              {item.name} : { item.price }× {item.quantity} = €{item.quantity * item.price}
              <button className="btn btn-primary"
              onClick={() => increaseQuantity(item.id)}> + </button>
              <button className="btn btn-secondary" onClick={() => decreaseQuantity(item.id)}> - </button>
            </p>
          ))
        )}
        <p>
          <strong>Totale: €{totalPrice}</strong>
        </p>
        <button onClick={clearCart}>Svota tutto</button>
      </div>
    </>
  );
};

export default Cart;
