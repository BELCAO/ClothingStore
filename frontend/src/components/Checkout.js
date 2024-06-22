import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCart } from "./CartContext"; // Import CartContext
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cartItems, totalPrice } = useCart(); // Sử dụng CartContext

  const [checkoutForm, setCheckoutForm] = useState({
    userId: '',
    buyerName: '',
    buyerPhone: '',
    payment: {
      online: true,
      paymentAmout: 1000
    },
    date: '',
    address: {
      district: '',
      province: '',
      ward: '',
      description: ''
    },
    transportation: {
      transportFree: '',
      transType: ''
    },
    totalAmout: '',
    detailDorderDTOs: ''
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentOnline, setPaymentOnline] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [addressDescription, setAddressDescription] = useState('');
  const [transportationFree, setTransportationFree] = useState('');
  const [transportationType, setTransportationType] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = useSelector((state) => state.userId); // Lấy userId từ Redux store

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId); // Chỉ fetch cart items nếu có userId
    }
  }, [userId]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/get?userId=${userId}`);
      const data = await response.json();
      setCartItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((errors) => {
        setProvinces([]);
        console.log("Error creating account: ", errors);
      });
  }, []);

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict('');
    setSelectedWard('');
    // Fetch districts data for selected province
    axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceCode}.htm`)
      .then((response) => {
        setDistricts(response.data.data);
      })
      .catch((errors) => {
        setDistricts([]);
        console.log("Error creating account: ", errors);
      });
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard('');
    // Fetch wards data for selected district
    axios.get(`https://esgoo.net/api-tinhthanh/3/${districtCode}.htm`)
      .then((response) => {
        setWards(response.data.data);
      })
      .catch((errors) => {
        setWards([]);
        console.log("Error creating account: ", errors);
      });
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const isOnline = e.target.value === "online";
    setCheckoutForm({ ...checkoutForm, payment: { ...checkoutForm.payment, online: isOnline } });
    if (!isOnline) {
      setPaypalLoaded(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = {
      ...checkoutForm,
      address: {
        ...checkoutForm.address,
        district: selectedDistrict,
        province: selectedProvince,
        ward: selectedWard,
      }
    };

    console.log(JSON.stringify(jsonData));
    // Gọi API để gửi dữ liệu đặt hàng
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(price)
      .replace(/\D00(?=\D*$)/, "");
  };


  useEffect(() => {
    if (checkoutForm.payment.online && window.paypal && !paypalLoaded) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: (totalPrice / 23000).toFixed(2), // Chuyển đổi sang USD (tỷ giá ước tính)
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Thanh toán thành công');
            // Xử lý logic sau khi thanh toán thành công
          });
        },
        onError: (err) => {
          console.error('Lỗi khi thanh toán PayPal:', err);
        }
      }).render('#paypal-button-container');
      setPaypalLoaded(true);
    }
  }, [checkoutForm.payment.online, totalPrice, paypalLoaded]);

  return (
    <>
      <div className="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="checkout-page">
                <ol className="checkout-steps">
                  <li className="steps">
                    <a className="step-title">01. Thong tin nguoi mua</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Họ và Tên</h5>
                            <div>
                              <input type="text" value={checkoutForm.buyerName} onChange={(e) => setCheckoutForm({ ...checkoutForm, buyerName: e.target.value })} />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Số điện thoại</h5>
                            <div>
                              <input type="text" value={checkoutForm.buyerPhone} onChange={(e) => setCheckoutForm({ ...checkoutForm, buyerPhone: e.target.value })} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="steps">
                    <a className="step-title">02. Dia chi</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Tỉnh/Thành phố</h5>
                            <div>
                              <select className="location-select" value={selectedProvince} onChange={handleProvinceChange}>
                                <option value="">Chọn tỉnh/thành phố</option>
                                {Array.isArray(provinces) && provinces.map(province => (
                                  <option key={province.id} value={province.id}>{province.name}</option>
                                ))}
                              </select>
                            </div>
                            <h5>Quận/Huyện</h5>
                            <div>
                              <select className="location-select" value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
                                <option value="">Chọn quận/huyện</option>
                                {Array.isArray(districts) && districts.map(district => (
                                  <option key={district.id} value={district.id}>{district.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Phường/Xã</h5>
                            <div>
                              <select className="location-select" value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
                                <option value="">Chọn phường/xã</option>
                                {Array.isArray(wards) && wards.map(ward => (
                                  <option key={ward.id} value={ward.id}>{ward.name}</option>
                                ))}
                              </select>
                            </div>
                            <h5>Địa chỉ</h5>
                            <div>
                              <input type="text" value={checkoutForm.address.description} onChange={(e) => setCheckoutForm({ ...checkoutForm, address: { ...checkoutForm.address, description: e.target.value } })} style={{ marginLeft: 10, width: "90%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="steps">
                    <a className="step-title">03. San pham</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <ul>
                            {cartItems.map(item => (
                              <li key={item.productId}>
                                <div>{item.productName} - {item.quantity} x {formatPrice(item.productPrice)}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="steps">
                    <a className="step-title">04. Van chuyen</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Hình thức vận chuyển</h5>
                            <div>
                              <select className="location-select" value={checkoutForm.transportation.transType} onChange={(e) => setCheckoutForm({ ...checkoutForm, transportation: { ...checkoutForm.transportation, transType: e.target.value } })}>
                                <option value="Nhanh">Nhanh</option>
                                <option value="Tiet kiem">Tiết kiệm</option>
                                <option value="Hoa toc">Hoả tốc</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Phí vận chuyển</h5>
                            <div>
                              <input type="text" value={checkoutForm.transportation.transportFree} onChange={(e) => setCheckoutForm({ ...checkoutForm, transportation: { ...checkoutForm.transportation, transportFree: e.target.value } })} style={{ marginLeft: 10, width: "90%" }} readOnly />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="steps">
                    <a className="step-title">05. Thanh toán</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Hình thức thanh toán</h5>
                            <div>
                              <label>
                                <input
                                  type="radio"
                                  name="payment"
                                  value="online"
                                  checked={checkoutForm.payment.online === true}
                                  onChange={handlePaymentChange}
                                />
                                Online
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="payment"
                                  value="offline"
                                  checked={checkoutForm.payment.online === false}
                                  onChange={handlePaymentChange}
                                />
                                Offline
                              </label>
                            </div>
                            {checkoutForm.payment.online && (
                              <div id="paypal-button-container" style={{ marginTop: 10 }}></div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Tổng tiền</h5>
                            <div>
                              <input type="text" value={formatPrice(totalPrice)} readOnly style={{ marginLeft: 10, width: "90%" }} />
                            </div>
                            <h5>Đặt hàng</h5>
                            <div>
                              <button type="button" onClick={handleSubmit}>Đặt hàng</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};

export default Checkout;
