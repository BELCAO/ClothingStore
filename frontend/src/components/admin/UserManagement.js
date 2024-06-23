import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./ProductManagement.css";

function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page
  const [totalPages, setTotalPages] = useState(0);
  const [role, setRole] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchOrders(page, rowsPerPage, role);
  }, [page, rowsPerPage, role]);

  const fetchOrders = (page, size, role) => {
    axios
      .get(`http://localhost:8080/user?page=${page}&size=${size}&role=${role}`)
      .then((response) => {
        setUsers(response.data.content || []);
        setTotalPages(response.data.totalPages);
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  };

  const changeStatus = (userId, newStatus) => {
    axios
      .put(`http://localhost:8080/user/${userId}?status=${newStatus}`)
      .then((response) => {
        fetchOrders(page, rowsPerPage, role);
      })
      .catch((error) => {
        console.error("There was an error updating the order status!", error);
      });
  };

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setRole(newRole);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPage(selectedPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };



  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };
  

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quản lý người dùng
      </Typography>
      <Box display="flex" mb={2}>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Quyền</InputLabel>
            <Select
              labelId="status-label"
              id="order-status"
              value={role}
              onChange={handleRoleChange}
              label="Quyền"
              sx={{ width: "100%" }} // Đặt kích thước của Select
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="USER">USER</MenuItem>
              {/* <MenuItem value="Đã giao hàng">Đã giao hàng</MenuItem>
              <MenuItem value="Đã hủy">Đã hủy</MenuItem> */}
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
              sx={{ width: "100%" }} // Đặt kích thước của Select
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
              <TableCell>ID</TableCell>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Quyền</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleOpen(user)}>Xem</Button>

                  {user.status !== "LOCK" ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 1 }}
                      onClick={() => changeStatus(user.id, "LOCK")}
                    >
                      Khóa
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 1 }}
                      onClick={() => changeStatus(user.id, "NORMAL")}
                    >
                      Mở Khóa
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="user-details-title"
  aria-describedby="user-details-description"
>
  <Box sx={{ ...modalStyle }}>
    <Typography id="user-details-title" variant="h6" component="h2" sx={{ mb: 2 }}>
      Chi Tiết Người Dùng
    </Typography>
    {selectedUser && (
      <Box>
        <Typography variant="body1"><strong>ID:</strong> {selectedUser.id}</Typography>
        <Typography variant="body1"><strong>Tên người dùng:</strong> {selectedUser.name}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {selectedUser.email}</Typography>
        <Typography variant="body1"><strong>Số điện thoại:</strong> {selectedUser.phone}</Typography>
        <Typography variant="body1"><strong>Giới tính:</strong> {selectedUser.gender || 'N/A'}</Typography>
        <Typography variant="body1"><strong>Ngày sinh:</strong> {selectedUser.birthday || 'N/A'}</Typography>
        <Typography variant="body1"><strong>Quyền:</strong> {selectedUser.role}</Typography>
        <Typography variant="body1"><strong>Trạng thái:</strong> {selectedUser.status}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <img src={process.env.REACT_APP_HOST_API_URL +
              "images/avatar?imgPath=" +selectedUser.avatarUrl} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        </Box>
      </Box>
    )}
    <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>Đóng</Button>
  </Box>
</Modal>
    </Box>
  );
}
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  width: '400px',
  maxWidth: '90vw'
};

export default UserManagement;
