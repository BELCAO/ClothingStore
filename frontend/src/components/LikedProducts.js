import React from "react";

const LikedProducs = () => {
  return (
    <>
      <div
        className="content"
        style={{ height: 500, backgroundColor: "aliceblue" }}
      >
        <div className="products-grid">
          <div className="toolbar">
            <div className="sorter">
              <div className="view-mode">
                <a href="productlitst.html" className="list">
                  List
                </a>
                <a href="#" className="grid active">
                  Grid
                </a>
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
                <select name="">
                  <option value="3" selected>
                    3
                  </option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>
            <div className="pager">
              <a href="#" className="prev-page">
                <i className="fa fa-angle-left"></i>
              </a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#" className="next-page">
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-05.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-06.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="offer">New</div>
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-07.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-05.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-06.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="offer">New</div>
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-07.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-05.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-06.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
            <div className="col-md-4 col-sm-6">
              <div className="products">
                <div className="offer">New</div>
                <div className="thumbnail">
                  <a href="details.html">
                    <img
                      src="images/products/small/products-07.png"
                      alt="Product Name"
                    />
                  </a>
                </div>
                <div className="productname">Iphone 5s Gold 32 Gb 2013</div>
                <h4 className="price">$451.00</h4>
                <div className="button_group">
                  <button className="button add-cart" type="button">
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
          </div>
          <div className="clearfix"></div>
          <div className="toolbar">
            <div className="sorter bottom">
              <div className="view-mode">
                <a href="productlitst.html" className="list">
                  List
                </a>
                <a href="#" className="grid active">
                  Grid
                </a>
              </div>
              <div className="sort-by">
                Sort by :
                <select name="">
                  <option value="Default" selected>
                    Default
                  </option>
                  <option value="Name">Name</option>
                  <option
                    value="
<strong>
#
</strong>
"
                  >
                    Price
                  </option>
                </select>
              </div>
              <div className="limiter">
                Show :
                <select name="">
                  <option value="3" selected>
                    3
                  </option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                </select>
              </div>
            </div>
            <div className="pager">
              <a href="#" className="prev-page">
                <i className="fa fa-angle-left"></i>
              </a>
              <a href="#" className="active">
                1
              </a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#" className="next-page">
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </>
  );
};
export default LikedProducs;
