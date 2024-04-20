import React from "react";

const Productgird = () => {
  return (
    <>
      <div className="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="category leftbar">
                <h3 className="title">Categories</h3>
                <ul>
                  <li>
                    <a href="#">Men</a>
                  </li>
                  <li>
                    <a href="#">Women</a>
                  </li>
                  <li>
                    <a href="#">Salon</a>
                  </li>
                  <li>
                    <a href="#">New Trend</a>
                  </li>
                  <li>
                    <a href="#">Living room</a>
                  </li>
                  <li>
                    <a href="#">Bed room</a>
                  </li>
                </ul>
              </div>
              <div className="clearfix"></div>
              <div className="branch leftbar">
                <h3 className="title">Branch</h3>
                <ul>
                  <li>
                    <a href="#">New</a>
                  </li>
                  <li>
                    <a href="#">Sofa</a>
                  </li>
                  <li>
                    <a href="#">Salon</a>
                  </li>
                  <li>
                    <a href="#">New Trend</a>
                  </li>
                  <li>
                    <a href="#">Living room</a>
                  </li>
                  <li>
                    <a href="#">Bed room</a>
                  </li>
                </ul>
              </div>
              <div className="clearfix"></div>
              <div className="price-filter leftbar">
                <h3 className="title">Price</h3>
                <form className="pricing">
                  <label>
                    $
                    <input type="number" />
                  </label>
                  <span className="separate">-</span>
                  <label>
                    $
                    <input type="number" />
                  </label>
                  <input type="submit" value="Go" />
                </form>
              </div>
              <div className="clearfix"></div>
              <div className="clolr-filter leftbar">
                <h3 className="title">Color</h3>
                <ul>
                  <li>
                    <a href="#" className="red-bg">
                      light red
                    </a>
                  </li>
                  <li>
                    <a href="#" className=" yellow-bg">
                      yellow"
                    </a>
                  </li>
                  <li>
                    <a href="#" className="black-bg ">
                      black
                    </a>
                  </li>
                  <li>
                    <a href="#" className="pink-bg">
                      pink
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dkpink-bg">
                      dkpink
                    </a>
                  </li>
                  <li>
                    <a href="#" className="chocolate-bg">
                      chocolate
                    </a>
                  </li>
                  <li>
                    <a href="#" className="orange-bg">
                      orange-bg
                    </a>
                  </li>
                  <li>
                    <a href="#" className="off-white-bg">
                      off-white
                    </a>
                  </li>
                  <li>
                    <a href="#" className="extra-lightgreen-bg">
                      extra-lightgreen
                    </a>
                  </li>
                  <li>
                    <a href="#" className="lightgreen-bg">
                      lightgreen
                    </a>
                  </li>
                  <li>
                    <a href="#" className="biscuit-bg">
                      biscuit
                    </a>
                  </li>
                  <li>
                    <a href="#" className="chocolatelight-bg">
                      chocolatelight
                    </a>
                  </li>
                </ul>
              </div>
              <div className="clearfix"></div>
              <div className="product-tag leftbar">
                <h3 className="title">
                  Products
                  <strong>Tags</strong>
                </h3>
                <ul>
                  <li>
                    <a href="#">Lincoln us</a>
                  </li>
                  <li>
                    <a href="#">SDress for Girl</a>
                  </li>
                  <li>
                    <a href="#">Corner</a>
                  </li>
                  <li>
                    <a href="#">Window</a>
                  </li>
                  <li>
                    <a href="#">PG</a>
                  </li>
                  <li>
                    <a href="#">Oscar</a>
                  </li>
                  <li>
                    <a href="#">Bath room</a>
                  </li>
                  <li>
                    <a href="#">PSD</a>
                  </li>
                </ul>
              </div>
              <div className="clearfix"></div>
              <div className="others leftbar">
                <h3 className="title">Others</h3>
              </div>
              <div className="clearfix"></div>
              <div className="others leftbar">
                <h3 className="title">Others</h3>
              </div>
              <div className="clearfix"></div>
              <div className="fbl-box leftbar">
                <h3 className="title">Facebook</h3>
                <span className="likebutton">
                  <a href="#">
                    <img src="images/fblike.png" alt="" />
                  </a>
                </span>
                <p>12k people like Flat Shop.</p>
                <ul>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                  <li>
                    <a href="#"></a>
                  </li>
                </ul>
                <div className="fbplug">
                  <a href="#">
                    <span>
                      <img src="images/fbicon.png" alt="" />
                    </span>
                    Facebook social plugin
                  </a>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="leftbanner">
                <img src="images/banner-small-01.png" alt="" />
              </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
                      <div className="productname">
                        Iphone 5s Gold 32 Gb 2013
                      </div>
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
          </div>
          <div className="clearfix"></div>
          <div className="our-brand">
            <h3 className="title">
              <strong>Our</strong>
              Brands
            </h3>
            <div className="control">
              <a id="prev_brand" className="prev" href="#">
                &lt;
              </a>
              <a id="next_brand" className="next" href="#">
                &gt;
              </a>
            </div>
            <ul id="braldLogo">
              <li>
                <ul className="brand_item">
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/envato.png" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/themeforest.png" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/photodune.png" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/activeden.png" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/envato.png" alt="" />
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="brand_item">
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/envato.png" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/themeforest.png" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/photodune.png" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/activeden.png" alt="" />
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="brand-logo">
                        <img src="images/envato.png" alt="" />
                      </div>
                    </a>
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
export default Productgird;
