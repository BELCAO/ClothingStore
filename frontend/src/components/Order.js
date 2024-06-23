import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Order = () => {
  const userId = useSelector((state) => state.userId); // Lấy userId từ Redux store
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(price)
      .replace(/\D00(?=\D*$)/, "");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/orders/" + id)
      .then((response) => {
        setOrderData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((errors) => {
        setError(errors);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading order data: {error.message}</div>;
  }

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
                    <a className="step-title">01.Đơn hàng</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Trạng Thái Đơn hàng</h5>
                            <h6>{orderData.status}</h6>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Ngày đặt hàng</h5>
                            <h6>{orderData.date}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="steps">
                    <a className="step-title">02. Thông tin người nhận hàng</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Họ và Tên</h5>
                            <h6>{orderData.recipientName}</h6>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Số điện thoại</h5>
                            <h6>{orderData.recipientPhone}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="steps">
                    <a className="step-title">03. Địa chỉ</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Tỉnh thành</h5>
                            <h6>
                              {orderData.province +
                                ", " +
                                orderData.district +
                                ", " +
                                orderData.ward}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Ghi chú</h5>
                            <h6>{orderData.description}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="steps">
                    <a className="step-title">04. Sản phẩm</a>
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
                              {orderData.detailOrderDTOs.map((item) => (
                                <tr key={item.productEntityId}>
                                  <td>
                                    <img
                                      src={item.imageUrl}
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
                                          item.totalPrice
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
                    <a className="step-title">05. Vận chuyển</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Hình thức vận chuyển</h5>
                            <h6>{orderData.transType}</h6>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Phí vận chuyển</h5>
                            <h6>{formatPrice(orderData.transportFree)}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="steps">
                    <a className="step-title">06. Thanh toán</a>
                    <div className="step-description">
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Hình thức thanh toán</h5>
                            <h6>{orderData.online ? "Online" : "Offline"}</h6>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="new-customer">
                            <h5>Số tiền thanh toán</h5>
                            <h6>{formatPrice(orderData.paymentAmout)}</h6>
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

export default Order;
