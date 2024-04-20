import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-sm-2">
            <div className="logo">
              <Link to="/">
                <img src="images/logo2.png" alt="FlatShop" />
              </Link>
            </div>
          </div>
          <div className="col-md-10 col-sm-10">
            <div className="header_top">
              <div className="row">
                <div className="col-md-3">
                  <ul className="option_nav">
                    <li className="dorpdown">
                      <a href="#">Eng</a>
                      <ul className="subnav">
                        <li>
                          <a href="#">Eng</a>
                        </li>
                        <li>
                          <a href="#">Vns</a>
                        </li>
                        <li>
                          <a href="#">Fer</a>
                        </li>
                        <li>
                          <a href="#">Gem</a>
                        </li>
                      </ul>
                    </li>
                    <li className="dorpdown">
                      <a href="#">USD</a>
                      <ul className="subnav">
                        <li>
                          <a href="#">USD</a>
                        </li>
                        <li>
                          <a href="#">UKD</a>
                        </li>
                        <li>
                          <a href="#">FER</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="topmenu">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">News</a>
                    </li>
                    <li>
                      <a href="#">Service</a>
                    </li>
                    <li>
                      <a href="#">Recruiment</a>
                    </li>
                    <li>
                      <a href="#">Media</a>
                    </li>
                    <li>
                      <a href="#">Support</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <ul className="usermenu">
                    <li>
                      <a href="checkout.html" className="log">
                        Login
                      </a>
                    </li>
                    <li>
                      <a href="checkout2.html" className="reg">
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="header_bottom">
              <ul className="option">
                <li id="search" className="search">
                  <form>
                    <input className="search-submit" type="submit" value="" />
                    <input
                      className="search-input"
                      placeholder="Enter your search term..."
                      type="text"
                      value=""
                      name="search"
                    />
                  </form>
                </li>
                <li className="option-cart">
                  <a href="#" className="cart-icon">
                    cart <span className="cart_no">02</span>
                  </a>
                  <ul className="option-cart-item">
                    <li>
                      <div className="cart-item">
                        <div className="image">
                          <img
                            src="images/products/thum/products-01.png"
                            alt=""
                          />
                        </div>
                        <div className="item-description">
                          <p className="name">Lincoln chair</p>
                          <p>
                            Size: <span className="light-red">One size</span>
                            <br />
                            Quantity: <span className="light-red">01</span>
                          </p>
                        </div>
                        <div className="right">
                          <p className="price">$30.00</p>
                          <a href="#" className="remove">
                            <img src="images/remove.png" alt="remove" />
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="cart-item">
                        <div className="image">
                          <img
                            src="images/products/thum/products-02.png"
                            alt=""
                          />
                        </div>
                        <div className="item-description">
                          <p className="name">Lincoln chair</p>
                          <p>
                            Size: <span className="light-red">One size</span>
                            <br />
                            Quantity: <span className="light-red">01</span>
                          </p>
                        </div>
                        <div className="right">
                          <p className="price">$30.00</p>
                          <a href="#" className="remove">
                            <img src="images/remove.png" alt="remove" />
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <span className="total">
                        Total <strong>$60.00</strong>
                      </span>
                      <button
                        className="checkout"
                        onClick="location.href='checkout.html'"
                      >
                        CheckOut
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="dropdown">
                    <Link
                      to="/"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      mome
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="mega-menu-links">
                        <li>
                          <a href="index.html">home</a>
                        </li>
                        <li>
                          <a href="home2.html">home2</a>
                        </li>
                        <li>
                          <a href="home3.html">home3</a>
                        </li>
                        <li>
                          <a href="productlitst.html">Productlitst</a>
                        </li>
                        <li>
                          <a href="#">Productgird</a>
                        </li>
                        <li>
                          <a href="details.html">Details</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="checkout.html">CheckOut</a>
                        </li>
                        <li>
                          <a href="checkout2.html">CheckOut2</a>
                        </li>
                        <li>
                          <a href="contact.html">contact</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <Link to="/Productgird">men</Link>
                  </li>
                  <li>
                    <Link to="/Productlitst">women</Link>
                  </li>
                  <li className="dropdown">
                    <Link
                      to="/Productgird"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Fashion
                    </Link>
                    <div className="dropdown-menu mega-menu">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <ul className="mega-menu-links">
                            <li>
                              <a href="#">New Collection</a>
                            </li>
                            <li>
                              <a href="#">Shirts & tops</a>
                            </li>
                            <li>
                              <a href="#">Laptop & Brie</a>
                            </li>
                            <li>
                              <a href="#">Dresses</a>
                            </li>
                            <li>
                              <a href="#">Blazers & Jackets</a>
                            </li>
                            <li>
                              <a href="#">Shoulder Bags</a>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <ul className="mega-menu-links">
                            <li>
                              <a href="#">New Collection</a>
                            </li>
                            <li>
                              <a href="#">Shirts & tops</a>
                            </li>
                            <li>
                              <a href="#">Laptop & Brie</a>
                            </li>
                            <li>
                              <a href="#">Dresses</a>
                            </li>
                            <li>
                              <a href="#">Blazers & Jackets</a>
                            </li>
                            <li>
                              <a href="#">Shoulder Bags</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/Productgd">gift</Link>
                  </li>
                  <li>
                    <Link to="/Productgird">kids</Link>
                  </li>
                  <li>
                    <Link to="/Productgird">blog</Link>
                  </li>
                  <li>
                    <Link to="/Productgird">jewelry</Link>
                  </li>
                  <li>
                    <Link to="/Contact">contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
