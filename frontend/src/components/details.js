import React from "react";

const Details = () => {
  return (
    <>
      <div class="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="products-details">
                <div className="preview_image">
                  <div className="preview-small">
                    <img
                      id="zoom_03"
                      src="images/products/medium/products-01.jpg"
                      data-zoom-image="images/products/Large/products-01.jpg"
                      alt=""
                    />
                  </div>
                  <div className="thum-image">
                    <ul id="gallery_01" className="prev-thum">
                      <li>
                        <a
                          href="#"
                          data-image="images/products/medium/products-01.jpg"
                          data-zoom-image="images/products/Large/products-01.jpg"
                        >
                          <img
                            src="images/products/thum/products-01.png"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-image="images/products/medium/products-02.jpg"
                          data-zoom-image="images/products/Large/products-02.jpg"
                        >
                          <img
                            src="images/products/thum/products-02.png"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-image="images/products/medium/products-03.jpg"
                          data-zoom-image="images/products/Large/products-03.jpg"
                        >
                          <img
                            src="images/products/thum/products-03.png"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-image="images/products/medium/products-04.jpg"
                          data-zoom-image="images/products/Large/products-04.jpg"
                        >
                          <img
                            src="images/products/thum/products-04.png"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-image="images/products/medium/products-05.jpg"
                          data-zoom-image="images/products/Large/products-05.jpg"
                        >
                          <img
                            src="images/products/thum/products-05.png"
                            alt=""
                          />
                        </a>
                      </li>
                    </ul>
                    <a
                      className="control-left"
                      id="thum-prev"
                      href="javascript:void(0);"
                    >
                      <i className="fa fa-chevron-left"> </i>
                    </a>
                    <a
                      className="control-right"
                      id="thum-next"
                      href="javascript:void(0);"
                    >
                      <i className="fa fa-chevron-right"> </i>
                    </a>
                  </div>
                </div>
                <div className="products-description">
                  <h5 className="name">Lincoln Corner Unit Products</h5>
                  <p>
                    <img alt="" src="images/star.png" />
                    <a className="review_num" href="#">
                      {" "}
                      02 Review(s){" "}
                    </a>
                  </p>
                  <p>
                    Availability:
                    <span className="light-red"> In Stock </span>
                  </p>
                  <p>
                    Proin lectus ipsum, gravida et mattis vulputate, tristique
                    ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis
                    in faucibus orci luctus et ultrie ces posuere cubilia curae.
                    Proin lectus ipsum, gravida etds mattis vulps utate,
                    tristique ut lectus. Sed et lorem nunc...
                  </p>
                  <hr className="border" />
                  <div className="price">
                    Price :
                    <span className="new_price">
                      450.00
                      <sup> $ </sup>
                    </span>
                    <span className="old_price">
                      450.00
                      <sup> $ </sup>
                    </span>
                  </div>
                  <hr className="border" />
                  <div className="wided">
                    <div className="qty">
                      Qty &nbsp;&nbsp;:
                      <select>
                        <option>1</option>
                      </select>
                    </div>
                    <div className="button_group">
                      <button className="button">Add To Cart</button>
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
              <div className="tab-box">
                <div id="tabnav">
                  <ul>
                    <li>
                      <a href="#Descraption"> DESCRIPTION </a>
                    </li>
                    <li>
                      <a href="#Reviews"> REVIEW </a>
                    </li>
                    <li>
                      <a href="#tags"> PRODUCT TAGS </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content-wrap">
                  <div className="tab-content" id="Descraption">
                    <p>
                      Proin lectus ipsum, gravida et mattis vulputate, tristique
                      ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis
                      in faucibus orci luctus et ultri ces posuere cubilia curae
                      Aenean eleifend laoreet congue. Proin lectus ipsum,
                      gravida et mattis vulputate, tristique ut lectus. Sed et
                      lorem nunc. Vestibu um ante ipsum primis in faucibus orci
                      luctus et ultri ces posuere cubilia curae Aenean eleifend
                      laoreet congue. Proin lectus ipsum, gravida et mattis
                      vulputate, tristique ut lectus. Sed et lorem nunc.
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultri ces posuere cubilia curae Aenean eleifend laoreet
                      congue. Proin lectus ipsum, gravida et mattis vulputate,
                      tristique ut lectus. Sed et lorem nunc. Vestibulum ante
                      ipsum primis in faucibus orci luctus et ultri ces posuere
                      cubilia curae...
                    </p>
                    <p>
                      Proin lectus ipsum, gravida et mattis vulputate, tristique
                      ut lectus. Sed et lorem nunc. Vestibulum ante ipsum primis
                      in faucibus orci luctus et ultri ces posuere cubilia curae
                      Aenean eleifend laoreet congue. Proin lectus ipsum,
                      gravida et mattis vulputate, tristique ut lectus. Sed et
                      lorem nunc. Vestibu um ante ipsum primis in faucibus orci
                      luctus et ultri ces posuere cubilia curae Aenean eleifend
                      laoreet congue. Proin lectus ipsum, gravida et mattis
                      vulputate, tristique ut lectus. Sed et lorem nunc...
                    </p>
                  </div>
                  <div className="tab-content" id="Reviews">
                    <form>
                      <table>
                        <thead>
                          <tr>
                            <th>&nbsp;</th>
                            <th>1 star</th>
                            <th>2 stars</th>
                            <th>3 stars</th>
                            <th>4 stars</th>
                            <th>5 stars</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Quality</td>
                            <td>
                              <input type="radio" name="quality" value="Blue" />
                            </td>
                            <td>
                              <input type="radio" name="quality" value="" />
                            </td>
                            <td>
                              <input type="radio" name="quality" value="" />
                            </td>
                            <td>
                              <input type="radio" name="quality" value="" />
                            </td>
                            <td>
                              <input type="radio" name="quality" value="" />
                            </td>
                          </tr>
                          <tr>
                            <td>Price</td>
                            <td>
                              <input type="radio" name="price" value="" />
                            </td>
                            <td>
                              <input type="radio" name="price" value="" />
                            </td>
                            <td>
                              <input type="radio" name="price" value="" />
                            </td>
                            <td>
                              <input type="radio" name="price" value="" />
                            </td>
                            <td>
                              <input type="radio" name="price" value="" />
                            </td>
                          </tr>
                          <tr>
                            <td>Value</td>
                            <td>
                              <input type="radio" name="value" value="" />
                            </td>
                            <td>
                              <input type="radio" name="value" value="" />
                            </td>
                            <td>
                              <input type="radio" name="value" value="" />
                            </td>
                            <td>
                              <input type="radio" name="value" value="" />
                            </td>
                            <td>
                              <input type="radio" name="value" value="" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="form-row">
                            <label className="lebel-abs">
                              Your Name
                              <strong className="red"> * </strong>
                            </label>
                            <input
                              type="text"
                              name=""
                              className="input namefild"
                            />
                          </div>
                          <div className="form-row">
                            <label className="lebel-abs">
                              Your Email
                              <strong className="red"> * </strong>
                            </label>
                            <input
                              type="email"
                              name=""
                              className="input emailfild"
                            />
                          </div>
                          <div className="form-row">
                            <label className="lebel-abs">
                              Summary of You Review
                              <strong className="red"> * </strong>
                            </label>
                            <input
                              type="text"
                              name=""
                              className="input summeryfild"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-row">
                            <label className="lebel-abs">
                              Your Name
                              <strong className="red"> * </strong>
                            </label>
                            <textarea
                              className="input textareafild"
                              name=""
                              rows="7"
                            ></textarea>
                          </div>
                          <div className="form-row">
                            <input
                              type="submit"
                              value="Submit"
                              className="button"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="tab-content">
                    <div className="review">
                      <p className="rating">
                        <i className="fa fa-star light-red"> </i>
                        <i className="fa fa-star light-red"> </i>
                        <i className="fa fa-star light-red"> </i>
                        <i className="fa fa-star-half-o gray"> </i>
                        <i className="fa fa-star-o gray"> </i>
                      </p>
                      <h5 className="reviewer">Reviewer name</h5>
                      <p className="review-date">Date: 01-01-2014</p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer a eros neque. In sapien est, malesuada non
                        interdum id, cursus vel neque.
                      </p>
                    </div>
                    <div className="review">
                      <p className="rating">
                        <i className="fa fa-star light-red"> </i>
                        <i className="fa fa-star light-red"> </i>
                        <i className="fa fa-star light-red"> </i>
                        <i className="fa fa-star-half-o gray"> </i>
                        <i className="fa fa-star-o gray"> </i>
                      </p>
                      <h5 className="reviewer">Reviewer name</h5>
                      <p className="review-date">Date: 01-01-2014</p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer a eros neque. In sapien est, malesuada non
                        interdum id, cursus vel neque.
                      </p>
                    </div>
                  </div>
                  <div className="tab-content" id="tags">
                    <div className="tag">
                      Add Tags :
                      <input type="text" name="" />
                      <input type="submit" value="Tag" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div id="productsDetails" className="hot-products">
                <h3 className="title">
                  <strong> Hot </strong>
                  Products
                </h3>
                <div className="control">
                  <a id="prev_hot" className="prev" href="#">
                    {" "}
                    &lt;{" "}
                  </a>
                  <a id="next_hot" className="next" href="#">
                    {" "}
                    &gt;{" "}
                  </a>
                </div>
                <ul id="hot">
                  <li>
                    <div className="row">
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="offer">- %20</div>
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-01.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-02.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="offer">New</div>
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-03.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="offer">- %20</div>
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-01.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-02.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="offer">New</div>
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-03.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="offer">- %20</div>
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-01.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-02.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="products">
                          <div className="offer">New</div>
                          <div className="thumbnail">
                            <img
                              src="images/products/small/products-03.png"
                              alt="Product Name"
                            />
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
                              <i className="fa fa-exchange"> </i>
                            </button>
                            <button className="button wishlist" type="button">
                              <i className="fa fa-heart-o"> </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="col-md-3">
              <div className="special-deal leftbar">
                <h4 className="title">
                  Special
                  <strong> Deals </strong>
                </h4>
                <div className="special-item">
                  <div className="product-image">
                    <a href="#">
                      <img src="images/products/thum/products-01.png" alt="" />
                    </a>
                  </div>
                  <div className="product-info">
                    <p>Licoln Corner Unit</p>
                    <h5 className="price">$300.00</h5>
                  </div>
                </div>
                <div className="special-item">
                  <div className="product-image">
                    <a href="#">
                      <img src="images/products/thum/products-02.png" alt="" />
                    </a>
                  </div>
                  <div className="product-info">
                    <p>Licoln Corner Unit</p>
                    <h5 className="price">$300.00</h5>
                  </div>
                </div>
                <div className="special-item">
                  <div className="product-image">
                    <a href="#">
                      <img src="images/products/thum/products-03.png" alt="" />
                    </a>
                  </div>
                  <div className="product-info">
                    <p>Licoln Corner Unit</p>
                    <h5 className="price">$300.00</h5>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="product-tag leftbar">
                <h3 className="title">
                  Products
                  <strong> Tags </strong>
                </h3>
                <ul>
                  <li>
                    <a href="#"> Lincoln us </a>
                  </li>
                  <li>
                    <a href="#"> SDress for Girl </a>
                  </li>
                  <li>
                    <a href="#"> Corner </a>
                  </li>
                  <li>
                    <a href="#"> Window </a>
                  </li>
                  <li>
                    <a href="#"> PG </a>
                  </li>
                  <li>
                    <a href="#"> Oscar </a>
                  </li>
                  <li>
                    <a href="#"> Bath room </a>
                  </li>
                  <li>
                    <a href="#"> PSD </a>
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
                  <input
                    className="email"
                    type="text"
                    name=""
                    placeholder="Your Email..."
                  />
                  <input className="submit" type="submit" value="Submit" />
                </form>
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
                    <a href="#"> </a>
                  </li>
                  <li>
                    <a href="#"> </a>
                  </li>
                  <li>
                    <a href="#"> </a>
                  </li>
                  <li>
                    <a href="#"> </a>
                  </li>
                  <li>
                    <a href="#"> </a>
                  </li>
                  <li>
                    <a href="#"> </a>
                  </li>
                  <li>
                    <a href="#"> </a>
                  </li>
                  <li>
                    <a href="#"> </a>
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
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="our-brand">
            <h3 className="title">
              <strong> Our </strong>
              Brands
            </h3>
            <div className="control">
              <a id="prev_brand" className="prev" href="#">
                {" "}
                &lt;{" "}
              </a>
              <a id="next_brand" className="next" href="#">
                {" "}
                &gt;{" "}
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
      <div class="clearfix"></div>
    </>
  );
};
export default Details;
