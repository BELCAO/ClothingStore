import React, { useState, useEffect } from 'react';
import {Grid ,Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import './ProductManagement.css'; // Import file CSS cho react-paginate

function OrderManagement() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page
  const [totalPages, setTotalPages] = useState(0);
  const [orderStatus, setOrderStatus] = useState('x'); // State để lưu trữ trạng thái đơn hàng được chọn
  const [selectedOrder, setSelectedOrder] = useState({
    orderId: '',
    customerName: '',
    orderDate: '',
    totalAmount: 0,
    status: '',
    items: []
  });

  useEffect(() => {
    fetchOrders(page, rowsPerPage, orderStatus);
  }, [page, rowsPerPage, orderStatus]);

  const fetchOrders = (page, size, status) => {
    axios.get(`http://localhost:8080/orders?page=${page}&size=${size}&status=${status}`)
      .then(response => {
        setOrders(response.data.content || []);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  };

  const handleOpen = (id) => {
    navigate("/Order/"+id)
  };

  const changeStatus = (orderId, newStatus) => {
    axios.put(`http://localhost:8080/orders/${orderId}?status=${newStatus}`)
    .then(response => {
      fetchOrders(page, rowsPerPage, orderStatus);
    })
    .catch(error => {
      console.error('There was an error updating the order status!', error);
    });
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setOrderStatus(newStatus);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPage(selectedPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
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
    <Box>
      <Typography variant="h4" gutterBottom>
        Quản lý đơn hàng
      </Typography>
      <Box display="flex" mb={2}>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Trạng thái</InputLabel>
            <Select
              labelId="status-label"
              id="order-status"
              value={orderStatus}
              onChange={handleStatusChange}
              label="Trạng thái"
              sx={{ width: '100%' }} // Đặt kích thước của Select
            >
              <MenuItem value="x">Tất cả</MenuItem>
              <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
              <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
              <MenuItem value="Đã giao hàng">Đã giao hàng</MenuItem>
              <MenuItem value="Đã hủy">Đã hủy</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="rows-per-page-label">Số lượng</InputLabel>
            <Select
              labelId="rows-per-page-label"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              label="Số lượng"
              sx={{ width: '100%' }} // Đặt kích thước của Select
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>15</MenuItem>
              <MenuItem value={50}>20</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Ngày đặt hàng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{formatPrice(order.totalAmout)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(order.id)}>Xem chi tiết</Button>
                  {order.status !== "Đang xử lý" ? <Button variant="contained" color="secondary" sx={{ ml: 1 }} onClick={() => changeStatus(order.id, "Đã Hủy")}>Hủy đơn hàng</Button>: 
                  <Button variant="contained" color="success" sx={{ ml: 1 }} onClick={() => changeStatus(order.id, "Đang giao hàng")}>Xác nhận</Button>}
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />

      {/* <Modal open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, bgcolor: 'background.paper', boxShadow: 24, margin: 'auto', width: 400, maxHeight: '80vh', overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Chi tiết đơn hàng #{selectedOrder.orderId}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Khách hàng: {selectedOrder.customerName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Ngày đặt hàng: {selectedOrder.orderDate}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Tổng tiền: {selectedOrder.totalAmount}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Trạng thái: {selectedOrder.status}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Chi tiết sản phẩm
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Giá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder.items.map(item => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal> */}
    </Box>
  );
}

export default OrderManagement;
