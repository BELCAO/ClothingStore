
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Productgird = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

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
    navigate("/details", { state: { product } });
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
              <div className="branch leftbar">
                <h3 className="title">Branch</h3>
                <ul>
                  <li><a href="#">New</a></li>
                  <li><a href="#">Sofa</a></li>
                  <li><a href="#">Salon</a></li>
                  <li><a href="#">New Trend</a></li>
                  <li><a href="#">Living room</a></li>
                  <li><a href="#">Bed room</a></li>
                </ul>
              </div>
              <div className="clearfix"></div>
              <div className="price-filter leftbar">
                <h3 className="title">Price</h3>
                <form className="pricing">
                  <label>$ <input type="number" /></label>
                  <span className="separate">-</span>
                  <label>$ <input type="number" /></label>
                  <input type="submit" value="Go" />
                </form>
              </div>
              <div className="clearfix"></div>
              <div className="clolr-filter leftbar">
                <h3 className="title">Color</h3>
                <ul>
                  <li><a href="#" className="red-bg">light red</a></li>
                  <li><a href="#" className="yellow-bg">yellow</a></li>
                  <li><a href="#" className="black-bg">black</a></li>
                  <li><a href="#" className="pink-bg">pink</a></li>
                  <li><a href="#" className="dkpink-bg">dkpink</a></li>
                  <li><a href="#" className="chocolate-bg">chocolate</a></li>
                  <li><a href="#" className="orange-bg">orange</a></li>
                  <li><a href="#" className="off-white-bg">off-white</a></li>
                  <li><a href="#" className="extra-lightgreen-bg">extra-lightgreen</a></li>
                  <li><a href="#" className="lightgreen-bg">lightgreen</a></li>
                  <li><a href="#" className="biscuit-bg">biscuit</a></li>
                  <li><a href="#" className="chocolatelight-bg">chocolatelight</a></li>
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
                          <button className="button add-cart" type="button">Add To Cart</button>
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
