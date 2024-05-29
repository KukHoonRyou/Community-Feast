import React from 'react';
import { Box, Typography, Container, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          p: 1, 
          mt: 4, 
          position: 'fixed', 
          bottom: 0, 
          width: '100%', 
          height: '40px' // 푸터의 높이를 지정합니다.
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            © 2024 Community Feast. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;