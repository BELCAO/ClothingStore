import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy categoryId từ URL
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("categoryId") || 3;

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

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(0); // Reset to first page when page size changes
  };

  const handleProductClick = (product) => {
    navigate("/details", { state: { product, hotProducts: products } });
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
      <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              {/* Category and other filters */}
              <div className="category leftbar">
                <h3 className="title">Categories</h3>
                <ul>
                  <li>
                    <Link to="/Productlist?categoryId=3">Men</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=2">Women</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=1">Salon</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=4">New Trend</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=5">Living room</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=6">Bed room</Link>
                  </li>
                </ul>
              </div>
              {/* Other filters */}
            </div>
            <div className="col-md-9">
              <div className="banner">
                <div className="bannerslide" id="bannerslide">
                  <ul className="slides">
                    <li>
                      <a href="#">
                        <img src="images/banner-01.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/banner-02.jpg" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="products-list">
                <div className="toolbar">
                  <div className="sorter">
                    <div className="view-mode">
                      <a href="#" className="list active">
                        List
                      </a>
                      <Link to={`/Productgird?categoryId=${categoryId}`} className="grid">
                        Grid
                      </Link>
                    </div>
                    <div className="sort-by">
                      Sort by :
                      <select name="">
                        <option value="Default" selected>
                          Default
                        </option>
                        <option value="Name">Name</option>
                        <option value="Price">Price</option>
                      </select>
                    </div>
                    <div className="limiter">
                      Show :
                      <select name="" onChange={handlePageSizeChange} value={pageSize}>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                  <div className="pager">
                    <a href="#" className="prev-page" onClick={() => handlePageChange(page - 1)}>
                      <i className="fa fa-angle-left"></i>
                    </a>
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                      <a
                        href="#"
                        key={pageNumber}
                        className={pageNumber === page ? "active" : ""}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber + 1}
                      </a>
                    ))}
                    <a href="#" className="next-page" onClick={() => handlePageChange(page + 1)}>
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
                <ul className="products-listItem">
                  {products.map((product) => (
                    <li className="products" key={product.productId}>
                      <div className="offer">New</div>
                      <div className="thumbnail">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          onClick={() => handleProductClick(product)}
                        />
                      </div>
                      <div className="product-list-description">
                        <div className="productname">{product.name}</div>
                        <p>
                          <img src="images/star.png" alt="" />
                          <a href="#" className="review_num">
                            0 Review(s)
                          </a>
                        </p>
                        <div className="list_bottom">
                          <div className="price">
                            <span className="new_price">
                              {formatPrice(product.price)}
                              <sup>₫</sup>
                            </span>
                          </div>
                          <div className="button_group">
                            <button className="button">Add To Cart</button>
                            <button className="button compare">
                              <i className="fa fa-exchange"></i>
                            </button>
                            <button className="button favorite">
                              <i className="fa fa-heart-o"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="toolbar">
                  <div className="sorter bottom">
                    <div className="view-mode">
                      <a href="#" className="list active">
                        List
                      </a>
                      <Link to={`/Productgird?categoryId=${categoryId}`} className="grid">
                        Grid
                      </Link>
                    </div>
                    <div className="sort-by">
                      Sort by :
                      <select name="">
                        <option value="Default" selected>
                          Default
                        </option>
                        <option value="Name">Name</option>
                        <option value="Price">Price</option>
                      </select>
                    </div>
                    <div className="limiter">
                      Show :
                      <select name="" onChange={handlePageSizeChange} value={pageSize}>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                  <div className="pager">
                    <a href="#" className="prev-page" onClick={() => handlePageChange(page - 1)}>
                      <i className="fa fa-angle-left"></i>
                    </a>
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                      <a
                        href="#"
                        key={pageNumber}
                        className={pageNumber === page ? "active" : ""}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber + 1}
                      </a>
                    ))}
                    <a href="#" className="next-page" onClick={() => handlePageChange(page + 1)}>
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="our-brand">
            <h3 className="title">
              <strong>Our </strong> Brands
            </h3>
            <div className="control">
              <Link id="prev_brand" className="prev" to="#">
                &lt;
              </Link>
              <Link id="next_brand" className="next" to="#">
                &gt;
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

export default ProductList;
