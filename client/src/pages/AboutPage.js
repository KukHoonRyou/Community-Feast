import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import '@fontsource/roboto'; // npm install @fontsource/roboto

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const AboutPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center', mt: 20 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About Community Feast
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="body1" paragraph>
            Welcome to Community Feast! Our mission is to reduce food waste and provide a platform where community members can share food with each other. Whether you have extra food to give away or are looking for something to eat, Community Feast is here to help.
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom>
            How It Works
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="body1" paragraph>
            <strong>For Donors (Eats):</strong> If you have food to share, simply post a description and picture of the food along with the location and availability times. Other community members can then view and reserve the food.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>For Receivers (Dibs):</strong> Browse the available food listings and reserve what you need. You can then arrange to pick it up at the specified location and time.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            Our Mission
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="body1" paragraph>
            Our mission is to create a sustainable community where food is shared and valued, reducing waste and helping those in need. We believe in the power of community and the positive impact of sharing resources.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            Get Involved
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="body1" paragraph>
            Join our community today and start sharing! Whether you have extra food or are in need of a meal, your participation helps make a difference.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AboutPage;