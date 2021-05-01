import axios from "axios";
import { useEffect, useState } from "react";
import useStore from "../store/store";
import "./css/cart.css";

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    cart.forEach((item) => {
      const { itemId, quantity } = item;
      axios
        .get(`https://fakestoreapi.com/products/${itemId}`)
        .then((res) =>
          setCartItems((prev) => {
            return [...prev, { ...res.data, quantity: quantity }];
          })
        )
        .catch((err) => console.log(err));
    });
  }, [cart]);

  return <div className="cart">{console.log(cartItems)}</div>;
};

export default Cart;
