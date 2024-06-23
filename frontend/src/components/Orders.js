import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../css/profileStyle.css";

const Orders = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

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
      .get(`${process.env.REACT_APP_HOST_API_URL}user/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrderData(response.data);
        setLoading(false);
      })
      .catch((errors) => {
        setError(errors);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading order data: {error.message}</div>;
  }

  const clickToOrder = (id) => {
    navigate("/Order/" + id);
  };
  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          {orderData.map((order) => (
            <div
              className="order_panel"
              onClick={() => clickToOrder(order.id)}
              key={order.id}
            >
              <div className="order_item">
                <div>Ngày đặt hàng: {order.date}</div>
                <div>Trạng thái: {order.status}</div>
              </div>
              <div>
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
                    {order.detailOrderDTOs.map((item) => (
                      <tr key={item.productEntityId}>
                        <td>
                          <img src={item.imageUrl} alt={item.productName} />
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
                              {formatPrice(item.totalPrice)}
                            </strong>
                          </h5>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="order-item" style={{ textAlign: "right" }}>
                <div>Tổng tiền: {formatPrice(order.totalAmout)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Orders;
