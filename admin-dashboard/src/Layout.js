import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Footer from './components/Footer';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
    <Topbar />
    <Box display="flex" flexGrow={1} mt={8} mb={8}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        {children}
      </Box>
    </Box>
    <Footer />
  </Box>
  );
};

export default Layout;
