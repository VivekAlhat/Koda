import axios from "axios";
import useStore from "../store/store";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Card, Loader, Button, Icon, Grid } from "semantic-ui-react";
import "./css/home.css";

const Home = () => {
  const notify = () =>
    toast("Ready For Checkout", { position: "bottom-right", type: "dark" });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      {loading ? (
        <div className="loading">
          <Loader active inline="centered" />
        </div>
      ) : (
        <div className="trending">
          <ToastContainer />
          <Grid container columns={3}>
            {products.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                header={
                  <Link to={`/products/${item.id}`}>
                    <h3 id="productTitle">{item.title}</h3>
                  </Link>
                }
                description={"Price: $" + item.price}
                extra={
                  <div>
                    <Button.Group widths="5">
                      <Link to={`/products/${item.id}`}>
                        <Button>Details</Button>
                      </Link>
                      <Button
                        color="violet"
                        animated
                        onClick={() => {
                          notify();
                          addToCart(item.id);
                        }}
                      >
                        <Button.Content visible>Add To Cart</Button.Content>
                        <Button.Content hidden>
                          <Icon name="shop" />
                        </Button.Content>
                      </Button>
                    </Button.Group>
                  </div>
                }
              />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Home;
