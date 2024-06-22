import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ py: 2, backgroundColor: '#3f51b5', color: 'white', textAlign: 'center', mt: 'auto' }}>
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
