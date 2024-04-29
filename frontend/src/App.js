import { Routes, Route } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./js/redux/store";

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
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
function App() {
  return (
    <Provider store={store}>
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
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/:accountID" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}
export default App;
