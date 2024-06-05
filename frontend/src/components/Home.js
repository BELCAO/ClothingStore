import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userInfo = useSelector((state) => state);
  const userId = userInfo.userId;

  useEffect(() => {
    fetchProducts();
    fetchFeaturedProducts();
  }, [userId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      if (data && Array.isArray(data.content)) {
        setProducts(data.content);
      } else {
        console.error("Received data is not an array:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/categories/3/products"
      );
      const data = await response.json();
      if (data && Array.isArray(data.content)) {
        setFeaturedProducts(data.content);
      } else {
        console.error("Received data is not an array:", data);
        setFeaturedProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setFeaturedProducts([]);
    }
  };

  

  const handleAddToCart = async (product) => {
    try {
      if (!userId) {
        alert("User is not logged in.");
        return;
      }

      const response = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.productId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCartItems(updatedCart.items);
        setTotalPrice(updatedCart.totalPrice);
        alert("Sản phẩm đã được thêm vào giỏ hàng");
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleProductClick = (product) => {
    return (
      <Link to="/details" state={{ product }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: 200, height: "auto" }}
        />
      </Link>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(price)
      .replace(/\D00(?=\D*$)/, "");
  };

  return (
    <>
      <div className="clearfix"></div>
      <div className="hom-slider">
        <div className="container">
          <div id="sequence">
            <div className="sequence-prev">
              <i className="fa fa-angle-left"></i>
            </div>
            <div className="sequence-next">
              <i className="fa fa-angle-right"></i>
            </div>
            <ul className="sequence-canvas">
              <li className="animate-in">
                <div className="flat-caption caption1 formLeft delay300 text-center">
                  <span className="suphead">Paris show 2014</span>
                </div>
                <div className="flat-caption caption2 formLeft delay400 text-center">
                  <h1>Collection For Winter</h1>
                </div>
                <div className="flat-caption caption3 formLeft delay500 text-center">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                    <br />
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </p>
                </div>
                <div className="flat-button caption4 formLeft delay600 text-center">
                  <Link className="more">More Details</Link>
                </div>
                <div
                  className="flat-image formBottom delay200"
                  data-duration="5"
                  data-bottom="true"
                >
                  <img src="images/slider-image-01.png" alt="" />
                </div>
              </li>
              <li>
                <div className="flat-caption caption2 formLeft delay400">
                  <h1>Collection For Winter</h1>
                </div>
                <div className="flat-caption caption3 formLeft delay500">
                  <h2>
                    Etiam velit purus, luctus vitae velit sedauctor
                    <br />
                    egestas diam, Etiam velit purus.
                  </h2>
                </div>
                <div className="flat-button caption5 formLeft delay600">
                  <Link className="more">More Details</Link>
                </div>
                <div
                  className="flat-image formBottom delay200"
                  data-bottom="true"
                >
                  <img src="images/slider-image-02.png" alt="" />
                </div>
              </li>
              <li>
                <div className="flat-caption caption2 formLeft delay400 text-center">
                  <h1>New Fashion of 2013</h1>
                </div>
                <div className="flat-caption caption3 formLeft delay500 text-center">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. <br />
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </p>
                </div>
                <div className="flat-button caption4 formLeft delay600 text-center">
                  <Link className="more" to="#">
                    More Details
                  </Link>
                </div>
                <div
                  className="flat-image formBottom delay200"
                  data-bottom="true"
                >
                  <img src="images/slider-image-03.png" alt="" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="promotion-banner">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4 col-xs-4">
                <div className="promo-box">
                  <img src="images/promotion-01.png" alt="" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-4">
                <div className="promo-box">
                  <img src="images/promotion-02.png" alt="" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-4">
                <div className="promo-box">
                  <img src="images/promotion-03.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container">
          <div className="hot-products">
            <h3 className="title">
              <strong>Hot</strong> Products
            </h3>
            <div className="control">
              <Link id="prev_hot" className="prev" to="#">
                &lt;
              </Link>
              <Link id="next_hot" className="next" to="#">
                &gt;
              </Link>
            </div>
            <ul id="hot">
              <li>
                <div className="row">
                  {products.map((product) => (
                    <div key={product.id} className="col-md-3 col-sm-6">
                      <div className="products">
                        <div className="thumbnail">
                          {handleProductClick(product)}
                        </div>
                        <div className="productname">{product.name}</div>
                        <h4 className="price">{formatPrice(product.price)}</h4>
                        <div className="button_group">
                          <button
                            className="button add-cart"
                            type="button"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add To Cart
                          </button>
                          <button className="button compare" type="button">
                            <i className="fa fa-exchange"></i>
                          </button>
                          <button className="button wishlist" type="button">
                            <i className="fa fa-heart-o"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
          <div className="featured-products">
            <h3 className="title">
              <strong>Featured </strong> Products
            </h3>
            <div className="control">
              <Link id="prev_featured" className="prev" to="#">
                &lt;
              </Link>
              <Link id="next_featured" className="next" to="#">
                &gt;
              </Link>
            </div>
            <ul id="featured">
              <li>
                <div className="row">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="col-md-3 col-sm-6">
                      <div className="products">
                        <div className="thumbnail">
                          {handleProductClick(product)}
                        </div>
                        <div className="productname">{product.name}</div>
                        <h4 className="price">{formatPrice(product.price)}</h4>
                        <div className="button_group">
                          <button
                            className="button add-cart"
                            type="button"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add To Cart
                          </button>
                          <button className="button compare" type="button">
                            <i className="fa fa-exchange"></i>
                          </button>
                          <button className="button wishlist" type="button">
                            <i className="fa fa-heart-o"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};

export default Home;
