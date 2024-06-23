import { Routes, Route, Redirect } from "react-router-dom";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./js/redux/store";

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
import Admin from "./components/admin/Admin";
import Order from "./components/Order";
import ProductManagement from "./components/admin/ProductManagement";
import UserManagement from "./components/admin/UserManagement";
import { Dashboard } from "@mui/icons-material";
import OrderManagement from "./components/admin/OrderManagement";
function App() {
  const user = () => {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Productgird" element={<Productgird />} />
          <Route path="/Productlist" element={<Productlist />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Checkout2" element={<Checkout2 />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Profile/*" element={<Profile />} />
          <Route path="/Order/:id" element={<Order />} />
        </Routes>
        <Footer />
      </>
    );
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <div id="home" className="wrapper">
            <Routes>
              <Route path="/*" element={user()} />
              <Route path="/admin/*" element={<Admin/>}/>
            </Routes>
            {/* <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Productgird" element={<Productgird />} />
              <Route path="/Productlist" element={<Productlist />} />
              <Route path="/Details" element={<Details />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/Checkout2" element={<Checkout2 />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/Profile/*" element={<Profile />} />
              <Route path="/Order/:id" element={<Order />} />
              <Route path="/Admin" element={<Admin />} />
            </Routes>
            <Footer /> */}
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}
export default App;
