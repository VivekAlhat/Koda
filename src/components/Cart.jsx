import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { List, Image, Button } from "semantic-ui-react";
import useStore from "../store/store";
import "./css/cart.css";

const Cart = () => {
  const history = useHistory();
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // setTimeout(() => {}, 1000);
    cart.map((item) =>
      setTotal((prev) => prev + item.product.price * item.quantity)
    );
  }, [cart]);

  return (
    <div className="cart">
      {cart.length > 0 ? (
        <div>
          <h2 style={{ textAlign: "center" }}>Your Cart</h2>
          <List divided relaxed verticalAlign="middle" className="cartList">
            {cart.map((item) => {
              const { product, itemId, quantity } = item;
              return (
                <List.Item key={itemId} className="cartItem">
                  <Image src={product.image} size="small" alt={product.title} />
                  <List.Content className="cartContent">
                    <h3>{product.title}</h3>
                    <p>Quantity: {quantity}</p>
                    <p>Price: ${product.price}</p>
                    <div>
                      <Button
                        size="small"
                        color="black"
                        onClick={() => {
                          addToCart(itemId);
                        }}
                      >
                        +
                      </Button>
                      <Button
                        size="small"
                        color="black"
                        onClick={() => {
                          removeFromCart(itemId);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
          <div className="checkout">
            <p>Total: ${total.toFixed(2)}</p>
            <div className="checkout-btn">
              <Button
                size="large"
                onClick={() => {
                  clearCart();
                }}
              >
                Clear
              </Button>
              <Button color="violet" size="large">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty">
          <Image src="assets/empty-cart.png" alt="Empty Cart" />
          <Button
            color="violet"
            onClick={() => {
              history.push("/");
            }}
          >
            Continue Shopping?
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
