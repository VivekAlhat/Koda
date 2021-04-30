import "./css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <h2 id="logo">KODA</h2>
        </Link>
      </div>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/cart">
          <li>Cart</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
