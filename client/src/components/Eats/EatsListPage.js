import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Grid, Box, Paper, Divider, CardActionArea, Chip, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const EatsListPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [eats, setEats] = useState([]);
  const [myEats, setMyEats] = useState([]);
  const [activeEats, setActiveEats] = useState([]);
  const [dibbedEats, setDibbedEats] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEats = async () => {
      try {
        const response = await fetch('/eats');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setEats(data);
          const filteredMyEats = data.filter(eat => eat.user_id === parseInt(userId));
          const filteredActiveEats = data.filter(eat => eat.is_available && eat.user_id !== parseInt(userId));
          const filteredDibbedEats = data.filter(eat => !eat.is_available && eat.user_id !== parseInt(userId));
          setMyEats(filteredMyEats);
          setActiveEats(filteredActiveEats);
          setDibbedEats(filteredDibbedEats);
        } else {
          setEats([]);
          setMyEats([]);
          setActiveEats([]);
          setDibbedEats([]);
        }
      } catch (error) {
        console.error('Error fetching eats:', error);
        setEats([]);
        setMyEats([]);
        setActiveEats([]);
        setDibbedEats([]);
      }
    };

    fetchEats();
  }, [userId]);

  const renderListItem = (eat) => (
    <Grid item xs={12} key={eat.id}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <CardActionArea component={Link} to={`/eats/${eat.id}`}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Box
                component="img"
                src={eat.image_url || "/static/images/cards/default.jpg"}
                alt={eat.eats_name}
                sx={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="div" gutterBottom>
                {eat.eats_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {eat.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {eat.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'center' }}>
              <Button
                size="small"
                sx={{
                  backgroundColor: eat.is_available ? '#007bff' : '#6c757d',
                  color: 'white',
                  fontWeight: 'bold',
                  ':hover': {
                    backgroundColor: eat.is_available ? '#0056b3' : '#5a6268',
                  },
                }}
                disabled
              >
                {eat.is_available ? "Open" : "Closed"}
              </Button>
            </Grid>
          </Grid>
        </CardActionArea>
      </Paper>
    </Grid>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            component={Link}
            to="/eats/create"
            variant="contained"
            sx={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              ':hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Create Eats
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ textAlign: 'left', width: '100%', mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            My Eats
          </Typography>
          <Grid container spacing={2}>
            {myEats.length > 0 ? (
              myEats.map((eat) => renderListItem(eat))
            ) : (
              <Typography sx={{ ml: 2 }}>No eats created by you.</Typography>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'left', width: '100%', mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Active Eats
          </Typography>
          <Grid container spacing={2}>
            {activeEats.length > 0 ? (
              activeEats.map((eat) => renderListItem(eat))
            ) : (
              <Typography sx={{ ml: 2 }}>No active eats available.</Typography>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'left', width: '100%', mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Dibbed Eats
          </Typography>
          <Grid container spacing={2}>
            {dibbedEats.length > 0 ? (
              dibbedEats.map((eat) => renderListItem(eat))
            ) : (
              <Typography sx={{ ml: 2 }}>No dibbed eats available.</Typography>
            )}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EatsListPage;