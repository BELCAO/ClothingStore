import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";

const Productgird = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("categoryId") || 3;

  const userId = useSelector((state) => state.userId); // Lấy userId từ Redux store

  useEffect(() => {
    fetchProducts(page, pageSize, categoryId);
  }, [page, pageSize, categoryId]);

  const fetchProducts = (page, size, categoryId) => {
    axios
      .get(`http://localhost:8080/categories/${categoryId}/products?page=${page}&size=${size}`)
      .then((response) => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(0); // Reset to first page when page size changes
  };

  const handleProductClick = (product) => {
    navigate("/details", { state: { product } });
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
          userId: userId, // Sử dụng userId từ Redux store
          productId: product.productId,
          quantity: 1, // Mặc định số lượng là 1
        }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        // Update cart items and total price in context or state here if needed
        alert("Sản phẩm đã được thêm vào giỏ hàng");
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
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

  const truncate = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="category leftbar">
                <h3 className="title">Categories</h3>
                <ul>
                  <li><Link to="/Productgird?categoryId=3">Men</Link></li>
                  <li><Link to="/Productgird?categoryId=2">Women</Link></li>
                  <li><Link to="/Productgird?categoryId=1">Salon</Link></li>
                  <li><Link to="/Productgird?categoryId=4">New Trend</Link></li>
                  <li><Link to="/Productgird?categoryId=5">Living room</Link></li>
                  <li><Link to="/Productgird?categoryId=6">Bed room</Link></li>
                </ul>
              </div>
             
  
              
              <div className="clearfix"></div>
              <div className="product-tag leftbar">
                <h3 className="title">Products <strong>Tags</strong></h3>
                <ul>
                  <li><a href="#">Lincoln us</a></li>
                  <li><a href="#">SDress for Girl</a></li>
                  <li><a href="#">Corner</a></li>
                  <li><a href="#">Window</a></li>
                  <li><a href="#">PG</a></li>
                  <li><a href="#">Oscar</a></li>
                  <li><a href="#">Bath room</a></li>
                  <li><a href="#">PSD</a></li>
                </ul>
              </div>
              <div className="clearfix"></div>
              <div className="fbl-box leftbar">
                <h3 className="title">Facebook</h3>
                <span className="likebutton">
                  <a href="#"><img src="images/fblike.png" alt="" /></a>
                </span>
                <p>12k people like Flat Shop.</p>
                <ul>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                </ul>
                <div className="fbplug">
                  <a href="#"><span><img src="images/fbicon.png" alt="" /></span>Facebook social plugin</a>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="leftbanner"><img src="images/banner-small-01.png" alt="" /></div>
            </div>
            <div className="col-md-9">
              <div className="banner">
                <div className="bannerslide" id="bannerslide">
                  <ul className="slides">
                    <li><a href="#"><img src="images/banner-01.jpg" alt="" /></a></li>
                    <li><a href="#"><img src="images/banner-02.jpg" alt="" /></a></li>
                  </ul>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="products-grid">
                <div className="toolbar">
                  <div className="sorter">
                    <div className="view-mode">
                      <Link to={`/Productlist?categoryId=${categoryId}`} className="list">List</Link>
                      <a href="#" className="grid active">Grid</a>
                    </div>
                    <div className="sort-by">
                      Sort by:
                      <select onChange={handlePageSizeChange} value={pageSize}>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  />
                </div>
                <div className="clearfix"></div>
                <div className="row">
                  {products.map((product) => (
                    <div className="col-md-4 col-sm-6" key={product.productId}>
                      <div className="products">
                        <div className="thumbnail">
                          <a href="details.html" onClick={(e) => {e.preventDefault(); handleProductClick(product);}}>
                            <img src={product.imageUrl} alt={product.name} />
                          </a>
                        </div>
                        <div className="productname">{truncate(product.name, 25)}</div>
                        <h4 className="price">{formatPrice(product.price)}</h4>
                        <div className="button_group">
                          <button className="button add-cart" type="button" onClick={() => handleAddToCart(product)}>Add To Cart</button>
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
                <div className="clearfix"></div>
                <div className="toolbar bottom">
                  <div className="sorter">
                    <div className="view-mode">
                      <Link to={`/Productlist?categoryId=${categoryId}`} className="list">List</Link>
                      <a href="#" className="grid active">Grid</a>
                    </div>
                    <div className="sort-by">
                      Sort by:
                      <select onChange={handlePageSizeChange} value={pageSize}>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  />
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="our-brand">
            <h3 className="title"><strong>Our</strong> Brands</h3>
            <div className="control">
              <a id="prev_brand" className="prev" href="#">&lt;</a>
              <a id="next_brand" className="next" href="#">&gt;</a>
            </div>
            <ul id="braldLogo">
              <li>
                <ul className="brand_item">
                  <li><a href="#"><div className="brand-logo"><img src="images/envato.png" alt="" /></div></a></li>
                  <li><a href="#"><div className="brand-logo"><img src="images/themeforest.png" alt="" /></div></a></li>
                  <li><a href="#"><div className="brand-logo"><img src="images/photodune.png" alt="" /></div></a></li>
                  <li><a href="#"><div className="brand-logo"><img src="images/activeden.png" alt="" /></div></a></li>
                  <li><a href="#"><div className="brand-logo"><img src="images/envato.png" alt="" /></div></a></li>
                </ul>
              </li>
              <li>
                <ul className="brand_item">
                  <li><a href="#"><div className="brand-logo"><img src="images/envato.png" alt="" /></div></a></li>
                  <li><a href="#"><div className="brand-logo"><img src="images/themeforest.png" alt="" /></div></a></li>
                  <li><a href="#"><div className="brand-logo"><img src="images/photodune.png" alt="" /></div></a></li>
                  <li><a href="#"><div className="brand-logo"><img src="images/activeden.png" alt="" /></div></a></li>
                  <li><a href="#"><div className="brand-logo"><img src="images/envato.png" alt="" /></div></a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productgird;
