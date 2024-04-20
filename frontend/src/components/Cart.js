import React from "react";

const Cart = () => {
  return (
    <>
      <div className="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container shopping-cart">
          <div className="row">
            <div className="col-md-12">
              <h3 className="title">Shopping Cart</h3>
              <div className="clearfix"></div>
              <table className="shop-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Dtails</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="images/products/small/products-06.png" alt="" />
                    </td>
                    <td>
                      <div className="shop-details">
                        <div className="productname">
                          Lincoln Corner Unit Products
                        </div>
                        <p>
                          <img alt="" src="images/star.png" />
                          <a className="review_num" href="#">
                            02 Review(s)
                          </a>
                        </p>
                        <div className="color-choser">
                          <span className="text">Product Color :</span>
                          <ul>
                            <li>
                              <a className="black-bg " href="#">
                                black
                              </a>
                            </li>
                            <li>
                              <a className="red-bg" href="#">
                                light red
                              </a>
                            </li>
                          </ul>
                        </div>
                        <p>
                          Product Code :
                          <strong className="pcode">Dress 120</strong>
                        </p>
                      </div>
                    </td>
                    <td>
                      <h5>$200.00</h5>
                    </td>
                    <td>
                      <select name="">
                        <option selected value="1">
                          1
                        </option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                      </select>
                    </td>
                    <td>
                      <h5>
                        <strong className="red">$200.00</strong>
                      </h5>
                    </td>
                    <td>
                      <a href="#">
                        <img src="images/remove.png" alt="" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="images/products/small/products-02.png" alt="" />
                    </td>
                    <td>
                      <div className="shop-details">
                        <div className="productname">
                          Lincoln Corner Unit Products
                        </div>
                        <p>
                          <img alt="" src="images/star.png" />
                          <a className="review_num" href="#">
                            02 Review(s)
                          </a>
                        </p>
                        <div className="color-choser">
                          <span className="text">Product Color :</span>
                          <ul>
                            <li>
                              <a className="gray-bg" href="#">
                                pink
                              </a>
                            </li>
                            <li>
                              <a className="black-bg " href="#">
                                black
                              </a>
                            </li>
                          </ul>
                        </div>
                        <p>
                          Product Code :
                          <strong className="pcode">Dress 132</strong>
                        </p>
                      </div>
                    </td>
                    <td>
                      <h5>$200.00</h5>
                    </td>
                    <td>
                      <select name="">
                        <option selected value="1">
                          1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </td>
                    <td>
                      <h5>
                        <strong className="red">$200.00</strong>
                      </h5>
                    </td>
                    <td>
                      <a href="#">
                        <img src="images/remove.png" alt="" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="images/products/small/products-05.png" alt="" />
                    </td>
                    <td>
                      <div className="shop-details">
                        <div className="productname">
                          Lincoln Corner Unit Products
                        </div>
                        <p>
                          <img alt="" src="images/star.png" />
                          <a className="review_num" href="#">
                            02 Review(s)
                          </a>
                        </p>
                        <div className="color-choser">
                          <span className="text">Product Color :</span>
                          <ul>
                            <li>
                              <a className="red-bg" href="#">
                                light red
                              </a>
                            </li>
                            <li>
                              <a className=" yellow-bg" href="#">
                                yellow"
                              </a>
                            </li>
                            <li>
                              <a className="black-bg " href="#">
                                black
                              </a>
                            </li>
                            <li>
                              <a className="pink-bg" href="#">
                                pink
                              </a>
                            </li>
                          </ul>
                        </div>
                        <p>
                          Product Code :
                          <strong className="pcode">Dress 050</strong>
                        </p>
                      </div>
                    </td>
                    <td>
                      <h5>$200.00</h5>
                    </td>
                    <td>
                      <select name="">
                        <option selected value="1">
                          1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </td>
                    <td>
                      <h5>
                        <strong className="red">$200.00</strong>
                      </h5>
                    </td>
                    <td>
                      <a href="#">
                        <img src="images/remove.png" alt="" />
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="6">
                      <button className="pull-left">Continue Shopping</button>
                      <button className=" pull-right">
                        Update Shopping Cart
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="clearfix"></div>
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="shippingbox">
                    <h5>Estimate Shipping And Tax</h5>
                    <form>
                      <label>Select Country *</label>
                      <select className="">
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option selected="" value="IL">
                          Illinois
                        </option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                      <label>State / Province *</label>
                      <select className="">
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option selected="" value="IL">
                          Illinois
                        </option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                      <label>Zip / Post Code *</label>
                      <select className="">
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option selected="" value="IL">
                          Illinois
                        </option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                      <div className="clearfix"></div>
                      <button>Get A Qoute</button>
                    </form>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="shippingbox">
                    <h5>Discount Codes</h5>
                    <form>
                      <label>Enter your coupon code if you have one</label>
                      <input type="text" name="" />
                      <div className="clearfix"></div>
                      <button>Get A Qoute</button>
                    </form>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="shippingbox">
                    <div className="subtotal">
                      <h5>Sub Total</h5>
                      <span>$1.000.00</span>
                    </div>
                    <div className="grandtotal">
                      <h5>GRAND TOTAL</h5>
                      <span>$1.000.00</span>
                    </div>
                    <button>Process To Checkout</button>
                  </div>
                </div>
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
export default Cart;
