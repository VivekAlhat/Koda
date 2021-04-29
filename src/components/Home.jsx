import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Loader, Button, Icon } from "semantic-ui-react";
import "./css/home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const extra = (
    <Button animated fluid>
      <Button.Content visible>Buy Now</Button.Content>
      <Button.Content hidden>
        <Icon name="shop" />
      </Button.Content>
    </Button>
  );

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
        <div class="loading">
          <Loader active inline="centered" />
        </div>
      ) : (
        <div className="trending">
          <Card.Group itemsPerRow={4}>
            {products.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                header={item.title}
                description={"Price: $" + item.price}
                extra={extra}
              />
            ))}
          </Card.Group>
        </div>
      )}
    </div>
  );
};

export default Home;
