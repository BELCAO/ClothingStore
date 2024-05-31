import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const UserMenu = () => {
  return (
    <ul className="usermenu">
      <li>
        <Link to="/SignIn" className="log">Sign In</Link>
      </li>
      <li>
        <Link to="/SignUp" className="reg">Sign Up</Link>
      </li>
    </ul>
  );
};

const Account = (prop) => {
  return (
    <ul className="usermenu">
      <li>
        <Link to="/Profile" style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ margin: "auto" }}>{prop.name}</div>
          <img
            src={process.env.REACT_APP_HOST_API_URL + "images/avatar?imgPath=" + prop.imgPath}
            style={{ width: 25, height: 25, borderRadius: 15, marginLeft: 10, objectFit: "cover" }}
            alt="Avatar"
          />
        </Link>
      </li>
    </ul>
  );
};

const Header = () => {
  const token = useSelector((state) => state.token);
  const avatarUrl = useSelector((state) => state.avatarUrl);
  const userName = useSelector((state) => state.userName);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products/autocomplete?name=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const renderUserMenu = () => {
    if (token) {
      if (userName && avatarUrl) return <Account imgPath={avatarUrl} name={userName} />;
    } else {
      return <UserMenu />;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price).replace(/\D00(?=\D*$)/, '');
  };

  

  
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-sm-2">
            <div className="logo">
              <Link to="/">
                <img src="images/logo3.png" alt="FlatShop" />
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
                        <li><a href="#">Eng</a></li>
                        <li><a href="#">Vns</a></li>
                        <li><a href="#">Fer</a></li>
                        <li><a href="#">Gem</a></li>
                      </ul>
                    </li>
                    <li className="dorpdown">
                      <a href="#">USD</a>
                      <ul className="subnav">
                        <li><a href="#">USD</a></li>
                        <li><a href="#">UKD</a></li>
                        <li><a href="#">FER</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="topmenu">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Service</a></li>
                    <li><a href="#">Recruiment</a></li>
                    <li><a href="#">Media</a></li>
                    <li><a href="#">Support</a></li>
                  </ul>
                </div>
                <div className="col-md-3">
                  {renderUserMenu()}
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="header_bottom">
              <ul className="option">
                <li id="search" className="search">
                  <form>
                    <input
                      className="search-submit"
                      type="submit"
                      value=""
                    />
                    <input
                      className="search-input"
                      placeholder="Enter your search term..."
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}

                      
                    />
                                {searchResults.length > 0 && (
  <div className="search-results">
    {searchResults.map((product) => (
      <div className="search-result-item" key={product.id}>
        <div className="image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="item-description">
          <p className="name">{product.name}</p>
          <p className="price">{formatPrice(product.price)}</p>
        </div>
      </div>
    ))}
  </div>
)}
                  
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
                          <img src="images/products/thum/products-01.png" alt="" />
                        </div>
                        <div className="item-description">
                          <p className="name">Lincoln chair</p>
                          <p>
                            Size: <span className="light-red">One size</span><br />
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
                          <img src="images/products/thum/products-02.png" alt="" />
                        </div>
                        <div className="item-description">
                          <p className="name">Lincoln chair</p>
                          <p>
                            Size: <span className="light-red">One size</span><br />
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
                      <span className="total">Total <strong>$60.00</strong></span>
                      <button className="checkout">CheckOut</button>
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
                      home
                    </Link>
                  </li>
                  <li><Link to="/Productlist?categoryId=1">Áo thun</Link></li>
                  <li><Link to="/Productlist?categoryId=2">women</Link></li>
                  <li><Link to="/Productlist?categoryId=7">áo nam</Link></li>
                  <li><Link to="/Productlist?categoryId=2">áo nữ</Link></li>
                  <li><Link to="/Productlist?categoryId=5">kids</Link></li>
                  <li><Link to="/Productlist?categoryId=6">blog</Link></li>
                  <li><Link to="/Productlist?categoryId=7">jewelry</Link></li>
                  <li><Link to="/Contact">contact us</Link></li>
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
