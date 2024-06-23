import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Notifications, Settings } from '@mui/icons-material';

const Topbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
