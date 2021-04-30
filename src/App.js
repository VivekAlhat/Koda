import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Cart from "./components/Cart";
import Product from "./components/Product";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/products/:id" component={Product} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
