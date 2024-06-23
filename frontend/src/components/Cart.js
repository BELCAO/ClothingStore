import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Import CartContext


const Cart = () => {
  const userId = useSelector((state) => state.userId); // Lấy userId từ Redux store
  const { cartItems, setCartItems, totalPrice, setTotalPrice } = useCart(); // Sử dụng CartContext
  const navigate = useNavigate();

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

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:8080/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, // Sử dụng userId từ Redux store
          productId: productId,
        }),
      });
      if (response.ok) {
        // Remove the item from the state
        const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
        setCartItems(updatedCartItems);
        // Recalculate the total price
        const updatedTotalPrice = updatedCartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
        setTotalPrice(updatedTotalPrice);
        alert("Sản phẩm đã được xóa khỏi giỏ hàng");
      } else {
        console.error("Failed to remove product from cart");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
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

  const handleCheckout = () => {
    if (!userId) {
      alert('Người dùng cần đăng nhập');
    } else {
      navigate("/checkout", { state: { cartItems, totalPrice } });
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <>
      <div className="clearfix"></div>
      <div className="container_fullwidth">
        <div className="container shopping-cart">
          <div className="row">
            <div className="col-md-12">
              <h3 className="title">Giỏ hàng</h3>
              <div className="clearfix"></div>
              <table className="shop-table">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Chi tiết</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng giá</th>
                    <th>Xóa</th>
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
                          <strong className="red">{formatPrice(item.productPrice * item.quantity)}</strong>
                        </h5>
                      </td>
                      <td>
                        <button onClick={() => handleRemoveFromCart(item.productId)}>
                          <img src="images/remove.png" alt="Remove" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="clearfix"></div>
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="shippingbox">
                    <div className="subtotal">
                      <h5>Tạm tính</h5>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <button onClick={handleCheckout}>Đặt hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </>
  );
};

export default Cart;
