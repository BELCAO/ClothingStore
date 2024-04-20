import React from "react";

const Contact = () => {
  return (
    <>
      <div className="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h5 className="title contact-title">Contact Us</h5>
              <div className="clearfix"></div>
              <div className="map">
                <iframe
                  width="600"
                  height="350"
                  src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Vietnam&amp;aq=&amp;sll=14.058324,108.277199&amp;sspn=21.827722,43.286133&amp;ie=UTF8&amp;hq=&amp;hnear=Vietnam&amp;ll=14.058324,108.277199&amp;spn=8.883583,21.643066&amp;t=m&amp;z=6&amp;output=embed"
                ></iframe>
              </div>
              <div className="clearfix"></div>
              <div className="row">
                <div className="col-md-4">
                  <div className="contact-infoormation">
                    <h5>Contact Info</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur ad ipis cing elit.
                      Suspendisse at sapien mascsa. Lorem ipsum dolor sit amet,
                      consectetur se adipiscing elit. Sed fermentum, sapien
                      scele risque volutp at tempor, lacus est sodales massa, a
                      hendrerit dolor slase turpis non mi.
                    </p>
                    <ul>
                      <li>
                        <span className="icon">
                          <img src="images/message.png" alt="" />
                        </span>
                        <p>
                          contact@michaeldesign.me
                          <br />
                          support@michaeldesign.me
                        </p>
                      </li>
                      <li>
                        <span className="icon">
                          <img src="images/phone.png" alt="" />
                        </span>
                        <p>
                          084. 93 668 2236
                          <br />
                          084. 93 668 6789
                        </p>
                      </li>
                      <li>
                        <span className="icon">
                          <img src="images/address.png" alt="" />
                        </span>
                        <p>
                          No.86 ChuaBoc St, DongDa Dt,
                          <br />
                          Hanoi, Vietnam
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="ContactForm">
                    <h5>Contact Form</h5>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <label>
                            Your Name
                            <strong className="red">*</strong>
                          </label>
                          <input className="inputfild" type="text" name="" />
                        </div>
                        <div className="col-md-6">
                          <label>
                            Your Email
                            <strong className="red">*</strong>
                          </label>
                          <input className="inputfild" type="email" name="" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>
                            Your Message
                            <strong className="red">*</strong>
                          </label>
                          <textarea
                            className="inputfild"
                            rows="8"
                            name=""
                          ></textarea>
                        </div>
                      </div>
                      <button className="pull-right">Send Message</button>
                    </form>
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
export default Contact;
