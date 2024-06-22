import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((state) => state.user);
  const userId = user ? user.userId : null; // Kiểm tra xem user có tồn tại không

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    setCartItems(storedCartItems);
    setTotalPrice(storedTotalPrice);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice.toString());
  }, [cartItems, totalPrice]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalPrice, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
