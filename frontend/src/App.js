import { Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Productgird from "./components/Productgird";
import Productlist from "./components/Productlist";
import Details from "./components/details";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Checkout2 from "./components/Checkout2";
function App() {
  return (
    <div className="App">
      <div id="home" className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Productgird" element={<Productgird />} />
          <Route path="/Productlist" element={<Productlist />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Checkout2" element={<Checkout2 />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
export default App;
