import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Topbar from "./Topbar";
import { Routes, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";
import OrderManagement from "./OrderManagement";

const Admin = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" >
      <Topbar />
      <Box display="flex" flexGrow={1} mt={8} mb={8}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/orders" element={<OrderManagement/>} />
            <Route path="/users" element={<UserManagement/>} />
            <Route path="/products" element={<ProductManagement/>} />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Admin;
