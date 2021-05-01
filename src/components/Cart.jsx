import useStore from "../store/store";
import "./css/cart.css";

const Cart = () => {
  const cart = useStore((state) => state.cart);

  return <div className="cart">{console.log(cart)}</div>;
};

export default Cart;
