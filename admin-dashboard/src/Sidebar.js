import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Dashboard, ShoppingCart, People, BarChart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Thống kê" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Quản lý sản phẩm" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Quản lý người dùng" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
          <ListItemIcon><BarChart /></ListItemIcon>
          <ListItemText primary="Quản lý đơn hàng" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
