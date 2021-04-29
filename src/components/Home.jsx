import axios from "axios";
import useStore from "../store/store";
import { useEffect, useState } from "react";
import { Card, Loader, Button, Icon, Grid } from "semantic-ui-react";
import "./css/home.css";

const Home = () => {
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
          <Grid container columns={3}>
            {products.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                header={item.title}
                description={"Price: $" + item.price}
                extra={
                  <Button
                    color="violet"
                    animated
                    fluid
                    onClick={() => addToCart(item.id)}
                  >
                    <Button.Content visible>Buy Now</Button.Content>
                    <Button.Content hidden>
                      <Icon name="shop" />
                    </Button.Content>
                  </Button>
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
