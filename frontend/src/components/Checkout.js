import React from "react";

const Checkout = () => {
  return (
    <>
      <div className="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="special-deal leftbar" style={{ marginTop: 0 }}>
                <h4 className="title">
                  Special
                  <strong>Deals</strong>
                </h4>
                <div className="special-item">
                  <div className="product-image">
                    <a href="details.html">
                      <img src="images/products/thum/products-01.png" alt="" />
                    </a>
                  </div>
                  <div className="product-info">
                    <p>
                      <a href="details.html">Licoln Corner Unit</a>
                    </p>
                    <h5 className="price">$300.00</h5>
                  </div>
                </div>
                <div className="special-item">
                  <div className="product-image">
                    <a href="details.html">
                      <img src="images/products/thum/products-02.png" alt="" />
                    </a>
                  </div>
                  <div className="product-info">
                    <p>
                      <a href="details.html">Licoln Corner Unit</a>
                    </p>
                    <h5 className="price">$300.00</h5>
                  </div>
                </div>
                <div className="special-item">
                  <div className="product-image">
                    <a href="details.html">
                      <img src="images/products/thum/products-03.png" alt="" />
                    </a>
                  </div>
                  <div className="product-info">
                    <p>
                      <a href="details.html">Licoln Corner Unit</a>
                    </p>
                    <h5 className="price">$300.00</h5>
                  </div>
                </div>
              </div>
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
              <div className="get-newsletter leftbar">
                <h3 className="title">
                  Get
                  <strong>newsletter</strong>
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
            </div>
            <div className="col-md-9">
              <div className="checkout-page">
                <ol className="checkout-steps">
                  <li className="steps active">
                    <a href="checkout.html" className="step-title">
                      01. checkout opition
                    </a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>New Customer</h5>
                            <label>
                              <span className="input-radio">
                                <input type="radio" name="user" />
                              </span>
                              <span className="text">
                                I wish to subscribe to the Herbal Store
                                newsletter.
                              </span>
                            </label>
                            <label>
                              <span className="input-radio">
                                <input type="radio" name="user" />
                              </span>
                              <span className="text">
                                My delivery and billing addresses are the same.
                              </span>
                            </label>
                            <p className="requir">
                              By creating an account you will be able to shop
                              faste be up to date on an order's status, and keep
                              track of the orders you have previously made.
                            </p>
                            <button>Continue</button>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="run-customer">
                            <h5>Rerunning Customer</h5>
                            <form>
                              <div className="form-row">
                                <label className="lebel-abs">
                                  Email
                                  <strong className="red">*</strong>
                                </label>
                                <input
                                  type="text"
                                  className="input namefild"
                                  name=""
                                />
                              </div>
                              <div className="form-row">
                                <label className="lebel-abs">
                                  Password
                                  <strong className="red">*</strong>
                                </label>
                                <input
                                  type="text"
                                  className="input namefild"
                                  name=""
                                />
                              </div>
                              <p className="forgoten">
                                <a href="#">Forgoten your password?</a>
                              </p>
                              <button>Login</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="steps">
                    <a href="checkout2.html" className="step-title">
                      02. billing information
                    </a>
                  </li>
                  <li className="steps">
                    <a href="checkout2.html" className="step-title">
                      03. Shipping information
                    </a>
                  </li>
                  <li className="steps">
                    <a href="#" className="step-title">
                      04. shipping method
                    </a>
                  </li>
                  <li className="steps">
                    <a href="#" className="step-title">
                      05. payment information
                    </a>
                  </li>
                  <li className="steps">
                    <a href="#" className="step-title">
                      06. oder review
                    </a>
                  </li>
                </ol>
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
export default Checkout;
