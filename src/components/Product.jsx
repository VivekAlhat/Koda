import axios from "axios";
import { useEffect, useState } from "react";
import { Loader, Grid, Image, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import "./css/product.css";

const Product = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="product">
      {loading ? (
        <div className="loading">
          <Loader active inline="centered" />
        </div>
      ) : (
        <Grid stackable columns={2} className="productInfo">
          <Grid.Column>
            <Image src={product.image} centered size="medium" />
          </Grid.Column>
          <Grid.Column className="details">
            <h2>{product.title}</h2>
            <p>
              <span
                style={{
                  fontSize: "12px",
                  textTransform: "capitalize",
                  padding: "8px",
                  color: "#fff",
                  background: "#949cdf",
                }}
              >
                {product.category}
              </span>
            </p>
            <p
              style={{
                textTransform: "capitalize",
              }}
            >
              {product.description}
            </p>
            <p>
              <span style={{ fontWeight: "700" }}>Price: </span>${product.price}
            </p>
            <Button color="violet" className="buy_btn">
              Buy Now
            </Button>
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
};

export default Product;
