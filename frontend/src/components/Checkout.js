import React, { useState, useEffect } from "react";
import ".././css/mystyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



const Checkout = () => {
  const [checkoutForm, setCheckoutForm] = useState({
    userId: '',
    buyerName: '',
    buyerPhone: '',
    payment:{
      online: true,
      paymentAmout:1000},
    date: '',
    address:{
      district:'',
      province:'',
      ward:'',
      description:''},
    transportation:{
      transportFree:'',
      transType: ''},
    totalAmout: '',
    detailDorderDTOs:''
  });
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')


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
    axios
    .get('https://esgoo.net/api-tinhthanh/1/0.htm')
    .then((response) => {
      setProvinces(response.data.data)
    })
    .catch((errors) => {
      setProvinces([])
      console.log("Error creating account: ", errors);
    });
  }, [])

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict('');
    setSelectedWard('');
    // Fetch districts data for selected province
    axios
    .get(`https://esgoo.net/api-tinhthanh/2/${provinceCode}.htm`)
    .then((response) => {
      setDistricts(response.data.data)
    })
    .catch((errors) => {
      setDistricts([])
      console.log("Error creating account: ", errors);
    });
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard('');
    // Fetch wards data for selected district
    axios
    .get(`https://esgoo.net/api-tinhthanh/3/${districtCode}.htm`)
    .then((response) => {
      setWards(response.data.data)
    })
    .catch((errors) => {
      setWards([])
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = {
      userId,
      buyerName,
      buyerPhone,
      payment: {
        online: paymentOnline,
        paymentAmout :paymentAmount
      },
      address: {
        district: selectedDistrict,
        province: selectedProvince,
        ward: selectedWard,
        description: addressDescription
      },
      transportation: {
        transportFree: transportationFree,
        transType: transportationType
      },
    };

    const jsonString = JSON.stringify(jsonData);
    console.log(jsonString);
    // fetch('url_api_goi', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(checkoutForm)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Dữ liệu đã được gửi đi:', data);
    //     // Xử lý phản hồi từ API (nếu cần)
    //   })
    //   .catch(error => {
    //     console.error('Lỗi khi gửi dữ liệu:', error);
    //     // Xử lý lỗi (nếu cần)
    //   });
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
            <div className="col-md-12">
              <div className="checkout-page">
                <ol className="checkout-steps">

                  <li className="steps">
                    <a className="step-title">
                      01. Thong tin nguoi mua
                    </a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>ho va ten</h5>
                            <div>
                              <input type="text" value={buyerName} onChange={(e)=> setBuyerName(e.target.value)} />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>So dien thaoi</h5>
                            <div>
                              <input type="text" value={setBuyerPhone} onChange={(e)=> setBuyerPhone(e.target.value)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="steps">
                    <a className="step-title">
                      02. Dia chi
                    </a>
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
                              <input type="text" value={addressDescription} onChange={(e)=> setAddressDescription(e.target.value)} style={{marginLeft:10, width: "90%"}}></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="steps">
                    <a className="step-title">
                      03. San pham
                    </a>
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
                        <img src={item.productImage} alt={item.productName} />
                      </td>
                      <td>
                        <div className="shop-details">
                          <div className="productname">{item.productName}</div>
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
                            
                            </ul>
                          </div>
                    
                        </div>
                      </td>
                      <td>
                        <h5>{formatPrice(item.productPrice)}</h5>
                      </td>
                      <td>
                        <h5>{item.quantity}</h5>
                      </td>
                      <td>
                        <h5>
                          <strong className="red">{formatPrice(item.productPrice * item.quantity)}</strong>
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
                    <a className="step-title">
                      04. Van chuyen
                    </a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Hinh thuc van chuyn</h5>
                            <div>
                              <select className="location-select"  value={transportationType} onChange={(e)=> setTransportationType(e.target.value)}>
                                <option value="Nhanh">Nhanh</option>
                                <option value="Tiet kiem">Tiet kiem</option>
                                <option value="Hoa toc">Hoa toc</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Phi van chuyen</h5>
                            <div>
                              <input type="text" value={transportationFree} onChange={(e)=> setTransportationFree(e.target.value)} style={{marginLeft:10, width: "90%"}} readOnly></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  
                  
                  <li className="steps">
                    <a className="step-title">
                      05. Thanh toan
                    </a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Hinh Thuc Thanh Toan</h5>
                            <div>
                              <select className="location-select" value={paymentOnline} onChange={(e)=> setPaymentOnline(e.target.value)}>
                                  <option value="online">online</option>
                                  <option value="offline">offlien</option>
                                </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Tổng tiền</h5>
                            <div>
                              <input type="text" value={paymentAmount} onChange={(e)=> setPaymentAmount(e.target.value)} style={{marginLeft:10, width: "90%"}} readOnly></input>
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
