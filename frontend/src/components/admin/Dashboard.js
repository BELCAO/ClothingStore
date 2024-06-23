import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    fetchProductCount();
    fetchUserCount();
    fetchOrderCount();
  }, []);

  const fetchProductCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistics/products/count');
      setProductCount(response.data);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistics/users/count');
      setUserCount(response.data);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const fetchOrderCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistics/orders/count');
      setOrderCount(response.data);
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Thống kê
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Paper sx={{ p: 2, flexGrow: 1, m: 1 }}>
          <Typography variant="h6">Số lượng sản phẩm</Typography>
          <Typography variant="h4">{productCount}</Typography>
        </Paper>
        <Paper sx={{ p: 2, flexGrow: 1, m: 1 }}>
          <Typography variant="h6">Số lượng người dùng</Typography>
          <Typography variant="h4">{userCount}</Typography>
        </Paper>
        <Paper sx={{ p: 2, flexGrow: 1, m: 1 }}>
          <Typography variant="h6">Số lượng đơn hàng</Typography>
          <Typography variant="h4">{orderCount}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
