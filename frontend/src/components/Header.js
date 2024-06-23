import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from './CartContext'; // Import CartContext

// UserMenu component
const UserMenu = () => {
  return (
    <ul className="usermenu">
      <li>
        <Link to="/SignIn" className="log">
          Đăng nhập
        </Link>
      </li>
      <li>
        <Link to="/SignUp" className="reg">
          Đăng ký
        </Link>
      </li>
    </ul>
  );
};

// Account component
const Account = (prop) => {
  return (
    <ul className="usermenu">
      <li>
        <Link to="/Profile" style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ margin: "auto" }}>{prop.name}</div>
          <img
            src={
              process.env.REACT_APP_HOST_API_URL +
              "images/avatar?imgPath=" +
              prop.imgPath
            }
            style={{
              width: 25,
              height: 25,
              borderRadius: 15,
              marginLeft: 10,
              objectFit: "cover",
            }}
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
  const userId = useSelector((state) => state.userId); 
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { cartItems, totalPrice } = useCart(); // Use CartContext

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/autocomplete?name=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const renderUserMenu = () => {
    if (token) {
      if (userName && avatarUrl)
        return <Account imgPath={avatarUrl} name={userName} />;
    } else {
      return <UserMenu />;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(price)
      .replace(/\D00(?=\D*$)/, "");
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
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
                      <a href="#">Về Chúng tôi</a>
                    </li>
                    <li>
                      <a href="#">Tin mới</a>
                    </li>
                    <li>
                      <a href="#">Dịch vụ</a>
                    </li>
                    <li>
                      <a href="#">Tuyển dụng</a>
                    </li>
                    <li>
                      <a href="#">Truyền thông</a>
                    </li>
                    <li>
                      <a href="#">Hỗ trợ</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">{renderUserMenu()}</div>
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                      <div className="search-results">
                        {searchResults.map((product) => (
                          <Link
                            to={`/details/search`}
                            state={{ product }}
                            key={product.id}
                            className="search-result-item"
                          >
                            <div className="image">
                              <img src={product.imageUrl} alt={product.name} />
                            </div>
                            <div className="item-description">
                              <p className="name">{product.name}</p>
                              <p className="price">{formatPrice(product.price)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </form>
                </li>

                <li className="option-cart">
                  <a className="cart-icon">
                    cart <span className="cart_no">{cartItems.length}</span>
                  </a>
                  <ul className="option-cart-item">
                    <Slider {...settings}>
                      {cartItems.map((item) => (
                        <li key={item.id}>
                          <div className="cart-item">
                            <div className="image">
                              <img src={item.productImage} alt={item.productName} />
                            </div>
                            <div className="item-description">
                              <p className="name">{item.productName}</p>
                              <p>
                                Quantity: <span className="light-red">{item.quantity}</span>
                              </p>
                            </div>
                            <div className="right">
                              <p className="price">{formatPrice(item.productPrice * item.quantity)}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </Slider>
                    <li>
                      <span className="total">
                        Total <strong>{formatPrice(totalPrice)}</strong>
                      </span>
                      <button className="checkout" onClick={() => navigate("/cart")}>Chi tiết giỏ hàng</button>
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
                      Trang Chủ
                    </Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=1">Áo thun</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=2">Áo khoác</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=3">Áo Polo</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=4">Áo sơ mi</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=5">Quần</Link>
                  </li>
                  <li>
                    <Link to="/Contact">Liên hệ</Link>
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
