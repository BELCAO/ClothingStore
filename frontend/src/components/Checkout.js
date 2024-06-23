import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "./CartContext"; // Import CartContext
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, totalPrice, setTotalPrice } = useCart(); // Sử dụng CartContext

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  const userId = useSelector((state) => state.userId); // Lấy userId từ Redux store

  const [checkoutForm, setCheckoutForm] = useState({
    userId: userId,
    online: true,
    paymentAmout: totalPrice,
    transportFree: "",
    transType: "Nhanh",
    totalAmout: totalPrice,
    recipientName: "",
    recipientPhone: "",
    province: "",
    district: "",
    ward: "",
    description: "",
    detailOrderDTOs: "",
  });
  const validateForm = (form) => {
    const requiredFields = [
      "userId",
      "recipientName",
      "recipientPhone",
      "province",
      "district",
      "ward",
      "description",
    ];
    for (const field of requiredFields) {
      if (!form[field] || form[field] === "") {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const detailOrderDTOs = cartItems.map(item => ({
      quantity: item.quantity,
      productEntityId: item.productId,
      totalPrice: item.totalItemPrice
    }));
    setCheckoutForm({ ...checkoutForm, detailOrderDTOs : detailOrderDTOs });
  },[cartItems])
  useEffect(() => {
    setCheckoutForm({
      ...checkoutForm,
      totalAmout: totalPrice + checkoutForm.transportFree,
    });
  }, [checkoutForm.transportFree, totalPrice]);

  useEffect(() => {
    if (checkoutForm.transType == "Nhanh") {
      setCheckoutForm({ ...checkoutForm, transportFree: 22000 });
    } else {
      if (checkoutForm.transType == "Tiet kiem") {
        setCheckoutForm({ ...checkoutForm, transportFree: 15000 });
      } else {
        setCheckoutForm({ ...checkoutForm, transportFree: 50000 });
      }
    }
  }, [checkoutForm.transType]);

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId); // Chỉ fetch cart items nếu có userId
    }
  }, [userId]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cart/get?userId=${userId}`
      );
      const data = await response.json();
      setCartItems(data.items);
      setTotalPrice(data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
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
    setSelectedDistrict("");
    setSelectedWard("");
    // Fetch districts data for selected province
    axios
      .get(`https://esgoo.net/api-tinhthanh/2/${provinceCode}.htm`)
      .then((response) => {
        setCheckoutForm({ ...checkoutForm, province: response.data.data_name });
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
    setSelectedWard("");
    // Fetch wards data for selected district
    axios
      .get(`https://esgoo.net/api-tinhthanh/3/${districtCode}.htm`)
      .then((response) => {
        setCheckoutForm({ ...checkoutForm, district:response.data.data_name});
        setWards(response.data.data);
      })
      .catch((errors) => {
        setWards([]);
        console.log("Error creating account: ", errors);
      });
  };

  const handleWardChange = (e) => {
    const wardCode = e.target.value;
    setCheckoutForm({ ...checkoutForm, ward:wardCode});
    setSelectedWard(wardCode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const isOnline = e.target.value === "online";
    setCheckoutForm({ ...checkoutForm, online: isOnline });
    if (!isOnline) {
      setPaypalLoaded(false);
    }
  };

  const handleSubmit = (e) => {
    // const jsonData = {
    //   ...checkoutForm,
    //   address: {
    //     ...checkoutForm.address,
    //     district: selectedDistrict,
    //     province: selectedProvince,
    //     ward: selectedWard,
    //   },
    // };

    // // console.log(JSON.stringify(jsonData));
    // // console.log(detailDorderDTOs)
    // console.log(checkoutForm);
    
    // // Gọi API để gửi dữ liệu đặt hàng
    if (validateForm(checkoutForm)) {
      const data = JSON.stringify(checkoutForm);
      console.log(data)
      axios
      .post("http://localhost:8080/orders", data,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
          const userConfirmed = window.confirm("Đặt hàng thành công! Xem đơn hàng ?");
          if (userConfirmed) {
            // Thực hiện hành động nào đó khi người dùng bấm nút "OK"
            navigate("/cart")
          } else {
            // Thực hiện hành động nào đó khi người dùng bấm nút "Cancel"
            navigate("/")
          }
      })
      .catch((errors) => {
        console.log("Error creating account: ", errors);
      });
    } else {
      // Hiển thị thông báo lỗi
      alert("Vui lòng điền đầy đủ thông tin người nhận và địa chỉ.");
    }
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
    if (checkoutForm.online && window.paypal && !paypalLoaded) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: (totalPrice / 23000).toFixed(2), // Chuyển đổi sang USD (tỷ giá ước tính)
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert("Thanh toán thành công");
              // Xử lý logic sau khi thanh toán thành công
            });
          },
          onError: (err) => {
            console.error("Lỗi khi thanh toán PayPal:", err);
          },
        })
        .render("#paypal-button-container");
      setPaypalLoaded(true);
    }
  }, [checkoutForm.online, totalPrice, paypalLoaded]);


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
                              <input
                                type="text"
                                value={checkoutForm.recipientName}
                                onChange={(e) =>
                                  setCheckoutForm({
                                    ...checkoutForm,
                                    recipientName: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Số điện thoại</h5>
                            <div>
                              <input
                                type="text"
                                value={checkoutForm.recipientPhone}
                                onChange={(e) =>
                                  setCheckoutForm({
                                    ...checkoutForm,
                                    recipientPhone: e.target.value,
                                  })
                                }
                              />
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
                              <select
                                className="location-select"
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                              >
                                <option value="">Chọn tỉnh/thành phố</option>
                                {Array.isArray(provinces) &&
                                  provinces.map((province) => (
                                    <option
                                      key={province.id}
                                      value={province.id}

                                      >
                                      {province.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <h5>Quận/Huyện</h5>
                            <div>
                              <select
                                className="location-select"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedProvince}
                              >
                                <option value="">Chọn quận/huyện</option>
                                {Array.isArray(districts) &&
                                  districts.map((district) => (
                                    <option
                                      key={district.id}
                                      value={district.id}
                                    >
                                      {district.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Phường/Xã</h5>
                            <div>
                              <select
                                className="location-select"
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDistrict}
                              >
                                <option value="">Chọn phường/xã</option>
                                {Array.isArray(wards) &&
                                  wards.map((ward) => (
                                    <option key={ward.id} value={ward.name}>
                                      {ward.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <h5>Địa chỉ</h5>
                            <div>
                              <input
                                type="text"
                                value={checkoutForm.description}
                                onChange={(e) =>
                                  setCheckoutForm({
                                    ...checkoutForm,
                                    description: e.target.value,
                                  })
                                }
                                style={{ marginLeft: 10, width: "90%" }}
                              />
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
                          <table className="shop-table">
                            <thead>
                              <tr>
                                <th>Ảnh</th>
                                <th>Chi tiết</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng giá</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartItems.map((item) => (
                                <tr key={item.productId}>
                                  <td>
                                    <img
                                      src={item.productImage}
                                      alt={item.productName}
                                    />
                                  </td>
                                  <td>
                                    <div className="shop-details">
                                      <div className="productname">
                                        {item.productName}
                                      </div>
                                      <p>
                                        <img alt="" src="images/star.png" />
                                        <a className="review_num" href="#">
                                          02 Review(s)
                                        </a>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <h5>{formatPrice(item.productPrice)}</h5>
                                  </td>
                                  <td>
                                    <span>{item.quantity}</span>
                                  </td>
                                  <td>
                                    <h5>
                                      <strong className="red">
                                        {formatPrice(
                                          item.productPrice * item.quantity
                                        )}
                                      </strong>
                                    </h5>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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
                              <select
                                className="location-select"
                                value={checkoutForm.transType}
                                onChange={(e) =>
                                  setCheckoutForm({
                                    ...checkoutForm,
                                    transType: e.target.value,
                                  })
                                }
                              >
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
                              <input
                                type="text"
                                value={formatPrice(checkoutForm.transportFree)}
                                onChange={(e) =>
                                  setCheckoutForm({
                                    ...checkoutForm,
                                    transportFree: e.target.value,
                                  })
                                }
                                style={{ marginLeft: 10, width: "90%" }}
                                readOnly
                              />
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
                                  checked={checkoutForm.online === true}
                                  onChange={handlePaymentChange}
                                />
                                Online
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="payment"
                                  value="offline"
                                  checked={checkoutForm.online === false}
                                  onChange={handlePaymentChange}
                                />
                                Offline
                              </label>
                            </div>
                            {checkoutForm.online && (
                              <div
                                id="paypal-button-container"
                                style={{ marginTop: 10 }}
                              ></div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Sản phẩm</h5>
                            <div>
                              <input
                                type="text"
                                value={formatPrice(totalPrice)}
                                readOnly
                              />
                            </div>
                            <h5>Phí vận chuyển</h5>
                            <div>
                              <input
                                type="text"
                                value={formatPrice(checkoutForm.transportFree)}
                                readOnly
                              />
                            </div>
                            <h5>Tổng tiền</h5>
                            <div>
                              <input
                                type="text"
                                value={formatPrice(
                                  totalPrice + checkoutForm.transportFree
                                )}
                                readOnly
                              />
                            </div>
                            <h5>Đặt hàng</h5>
                            <div>
                              <button type="button" onClick={handleSubmit}>
                                Đặt hàng
                              </button>
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
