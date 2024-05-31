import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const ProductList = () => {
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

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(0);
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
                <h3 className="title">Danh mục</h3>
                <ul>
                  <li>
                    <Link to="/Productlist?categoryId=3">Nam</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=2">Nữ</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=1">Dạ hội</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=4">Thời thượng</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=5">Đồ ở nhà</Link>
                  </li>
                  <li>
                    <Link to="/Productlist?categoryId=6">Đồ ngủ</Link>
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
                      Sắp xếp :
                      <select name="">
                        <option value="Default" selected>
                          Mặc định
                        </option>
                        <option value="Name">Tên</option>
                        <option value="Price">Giá</option>
                      </select>
                    </div>
                    <div className="limiter">
                      Hiển thị :
                      <select name="" onChange={handlePageSizeChange} value={pageSize}>
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
                            0 Đánh giá(s)
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
                            <button className="button">Thêm vào giỏ hàng</button>
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
                      Sắp xếp :
                      <select name="">
                        <option value="Default" selected>
                          Mặc định
                        </option>
                        <option value="Name">Tên</option>
                        <option value="Price">Giá</option>
                      </select>
                    </div>
                    <div className="limiter">
                      Hiển thị :
                      <select name="" onChange={handlePageSizeChange} value={pageSize}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};

export default ProductList;
