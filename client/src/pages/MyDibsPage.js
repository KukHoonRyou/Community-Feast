import React, { useEffect, useState } from 'react';
import Reviews from '../components/ReviewsAndRatings/Reviews';
import { Typography, Container, Grid, Paper, Box, Chip, Divider, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const MyDibsPage = ({ onDibsFetch, userId }) => {
  const [dibs, setDibs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/dibs?user_id=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDibs(data);
        if (onDibsFetch) {
          onDibsFetch(data);
        }
      })
      .catch(error => {
        setError(error.toString());
      });
  }, [onDibsFetch, userId]);

  if (error) {
    return <Container><Typography color="error">Error: {error}</Typography></Container>;
  }

  if (!dibs.length) {
    return <Container><Typography>No Dibs found.</Typography></Container>;
  }

  const renderDibCard = (dib) => (
    <Grid item xs={12} key={dib.id}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <Box
              component="img"
              src={dib.eats_image_url || "/static/images/cards/default.jpg"}
              alt={dib.eats_name}
              sx={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6" component="div" gutterBottom>
              {dib.eats_name}
            </Typography>
            <Divider />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Created At: {new Date(dib.created_at).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              User ID: {dib.user_id}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {dib.tags && dib.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" />
              ))}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Contact</Typography>
              <Divider />
              <Typography variant="body2">Phone: {dib.eats_user_phone}</Typography>
              <Typography variant="body2">Address: {dib.eats_user_address}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Reviews</Typography>
              <Divider sx={{ mt: 1 }} />
              <Reviews dibsId={dib.id} dib={dib} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>My Dibs</Typography>
        <Grid container spacing={2}>
          {dibs.map(dib => renderDibCard(dib))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default MyDibsPage;