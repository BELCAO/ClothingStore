import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "./CartContext";

const Details = () => {
  const location = useLocation();
  const params = useParams();
  const [product, setProduct] = useState(location.state?.product || null);
  const [currentImageUrl, setCurrentImageUrl] = useState(product?.imageUrl || "");
  const [hotProducts, setHotProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems, totalPrice, setTotalPrice } = useCart(); // Use CartContext


  const userId = useSelector((state) => state.userId); // Lấy userId từ Redux store

  useEffect(() => {
    if (!product) {
      fetchProductDetails(params.id);
    } else {
      setCurrentImageUrl(product.imageUrl);
    }

    const fetchHotProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        if (data && Array.isArray(data.content)) {
          setHotProducts(data.content);
        } else {
          console.error("Received data is not an array:", data);
          setHotProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setHotProducts([]);
      }
    };

    fetchHotProducts();
  }, [params.id, product]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setCurrentImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error fetching product details:", error);
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

  const handlePrevImage = () => {
    const currentIndex = product.imageUrls.indexOf(currentImageUrl);
    if (currentIndex > 0) {
      setCurrentImageUrl(product.imageUrls[currentIndex - 1]);
    }
  };

  const handleNextImage = () => {
    const currentIndex = product.imageUrls.indexOf(currentImageUrl);
    if (currentIndex < product.imageUrls.length - 1) {
      setCurrentImageUrl(product.imageUrls[currentIndex + 1]);
    }
  };

  const handleAddToCart = async () => {
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
          userId: userId, // Sử dụng userId từ Redux store
          productId: product.productId,
          quantity: quantity,
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

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <div className="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="products-details">
                <div className="preview_image">
                  <div className="preview-small">
                    <img src={currentImageUrl} alt={product.name} />
                  </div>
                  <div className="thum-image">
                    <ul id="gallery_01" className="prev-thum">
                      {product.imageUrls?.map((imageUrl, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentImageUrl(imageUrl);
                            }}
                            data-image={imageUrl}
                            data-zoom-image={imageUrl}
                          >
                            <img src={imageUrl} alt={product.name} />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a className="control-left" id="thum-prev" onClick={handlePrevImage}>
                      <i className="fa fa-chevron-left"> </i>
                    </a>
                    <a className="control-right" id="thum-next" onClick={handleNextImage}>
                      <i className="fa fa-chevron-right"> </i>
                    </a>
                  </div>
                </div>
                <div className="products-description">
                  <h5 className="name">{product.name}</h5>
                  <p>
                    <img alt="" src="images/star.png" />
                    <Link className="review_num" to="#">
                      02 Review(s)
                    </Link>
                  </p>
                  <p>
                    Trạng Thái:
                    <span className="light-red"> Còn hàng </span>
                  </p>
                  {product.description && <p>{product.description}</p>}
                  <hr className="border" />
                  <div className="price">
                    Price :
                    <span className="new_price">{formatPrice(product.price)}</span>
                    {product.oldPrice && <span className="old_price">{formatPrice(product.oldPrice)}</span>}
                  </div>
                  <hr className="border" />
                  <div className="wided">
                    <div className="qty">
                      Qty &nbsp;&nbsp;:
                      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                        {[...Array(10).keys()].map((n) => (
                          <option key={n + 1} value={n + 1}>{n + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div className="button_group">
                      <button className="button" onClick={handleAddToCart}>Add To Cart</button>
                      <button className="button compare">
                        <i className="fa fa-exchange"> </i>
                      </button>
                      <button className="button favorite">
                        <i className="fa fa-heart-o"> </i>
                      </button>
                      <button className="button favorite">
                        <i className="fa fa-envelope-o"> </i>
                      </button>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <hr className="border" />
                  <img src="images/share.png" alt="" className="pull-right" />
                </div>
              </div>
              <div className="clearfix"></div>
              <div id="productsDetails" className="hot-products">
                <h3 className="title">
                  <strong> Hot </strong>
                  Products
                </h3>
                <ul id="hot">
                  <li>
                    <div className="row">
                      {hotProducts.map((product) => (
                        <div key={product.id} className="col-md-3 col-sm-6">
                          <div className="products">
                            <div className="thumbnail">
                              <Link to={`/details`} state={{ product }}>
                                <img src={product.imageUrl} alt={product.name} style={{ width: 200, height: "auto" }} />
                              </Link>
                            </div>
                            <div className="productname">{product.name}</div>
                            <h4 className="price">{formatPrice(product.price)}</h4>
                            <div className="button_group">
                              <button className="button add-cart" type="button">Add To Cart</button>
                              <button className="button compare" type="button"><i className="fa fa-exchange"></i></button>
                              <button className="button wishlist" type="button"><i className="fa fa-heart-o"></i></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="clearfix"></div>
              <div className="product-tag leftbar">
                <h3 className="title">
                  Products
                  <strong> Tags </strong>
                </h3>
                <ul>
                  <li>
                    <Link to="#"> Lincoln us </Link>
                  </li>
                  <li>
                    <Link to="#"> SDress for Girl </Link>
                  </li>
                  <li>
                    <Link to="#"> Corner </Link>
                  </li>
                  <li>
                    <Link to="#"> Window </Link>
                  </li>
                  <li>
                    <Link to="#"> PG </Link>
                  </li>
                  <li>
                    <Link to="#"> Oscar </Link>
                  </li>
                  <li>
                    <Link to="#"> Bath room </Link>
                  </li>
                  <li>
                    <Link to="#"> PSD </Link>
                  </li>
                </ul>
              </div>
              <div className="clearfix"></div>
              <div className="get-newsletter leftbar">
                <h3 className="title">
                  Get
                  <strong> newsletter </strong>
                </h3>
                <p>Casio G Shock Digital Dial Black.</p>
                <form>
                  <input className="email" type="text" name="" placeholder="Your Email..." />
                  <input className="submit" type="submit" value="Submit" />
                </form>
              </div>
              <div className="clearfix"></div>
              <div className="fbl-box leftbar">
                <h3 className="title">Facebook</h3>
                <span className="likebutton">
                  <Link to="#">
                    <img src="images/fblike.png" alt="" />
                  </Link>
                </span>
                <p>12k people like Flat Shop.</p>
                <ul>
                  <li>
                    <Link to="#"> </Link>
                  </li>
                  <li>
                    <Link to="#"> </Link>
                  </li>
                  <li>
                    <Link to="#"> </Link>
                  </li>
                  <li>
                    <Link to="#"> </Link>
                  </li>
                  <li>
                    <Link to="#"> </Link>
                  </li>
                  <li>
                    <Link to="#"> </Link>
                  </li>
                  <li>
                    <Link to="#"> </Link>
                  </li>
                  <li>
                    <Link to="#"> </Link>
                  </li>
                </ul>
                <div className="fbplug">
                  <Link to="#">
                    <span>
                      <img src="images/fbicon.png" alt="" />
                    </span>
                    Facebook social plugin
                  </Link>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="our-brand">
            <h3 className="title">
              <strong> Our </strong>
              Brands
            </h3>
            <div className="control">
              <Link id="prev_brand" className="prev" to="#">
                {" "}
                &lt;{" "}
              </Link>
              <Link id="next_brand" className="next" to="#">
                {" "}
                &gt;{" "}
              </Link>
            </div>
            <ul id="braldLogo">
              <li>
                <ul className="brand_item">
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/envato.png" alt="" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/themeforest.png" alt="" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/photodune.png" alt="" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/activeden.png" alt="" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/envato.png" alt="" />
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="brand_item">
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/envato.png" alt="" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/themeforest.png" alt="" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/photodune.png" alt="" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/activeden.png" alt="" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <div className="brand-logo">
                        <img src="images/envato.png" alt="" />
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};

export default Details;
