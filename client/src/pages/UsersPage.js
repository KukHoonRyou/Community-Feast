import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Button, CircularProgress, Box, Grid, Divider, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.
import { deepPurple } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function UsersPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/current-user');
        if (response.ok) {
          const data = await response.json();
          console.log('Server Response:', data); // 서버 응답 출력
          setUser(data);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleDibsManageClick = () => {
    navigate('/users/dibs');
  };

  const handleEatsManageClick = () => {
    navigate('/users/eats');
  };

  const handleInfoManageClick = () => {
    navigate('/users/info');
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  const getYear = (dateString) => {
    try {
      console.log('dateString:', dateString);
      if (!dateString) {
        return "No Date";
      }
      const date = new Date(Date.parse(dateString));
      console.log('Date Object:', date);
      const year = date.getFullYear();
      return String(year);
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid Date";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          User Page
        </Typography>
        {user ? (
          <Card sx={{ padding: 3, borderRadius: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: deepPurple[500] }}>{user.username[0].toUpperCase()}</Avatar>
              }
              title={<Typography variant="h5" component="h2">User Information</Typography>}
            />
            <Divider sx={{ marginBottom: 2 }} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Username:</Typography>
                  <Typography variant="body1">{user.username}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email:</Typography>
                  <Typography variant="body1">{user.email_address}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>First Name:</Typography>
                  <Typography variant="body1">{user.first_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Last Name:</Typography>
                  <Typography variant="body1">{user.last_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Phone Number:</Typography>
                  <Typography variant="body1">{user.phone_number}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Address:</Typography>
                  <Typography variant="body1">{user.address}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Allergic Information:</Typography>
                  <Typography variant="body1">{user.allergic_info}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Member Since:
                  </Typography>
                  <Typography variant="body1">
                    {user.created_at ? getYear(user.created_at) : "No Date"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Admin:</Typography>
                  <Typography variant="body1">{user.isAdmin ? 'Yes' : 'No'}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ marginTop: 2 }} />
            <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleDibsManageClick}>
                Manage My Dibs
              </Button>
              <Button variant="contained" color="secondary" onClick={handleEatsManageClick}>
                Manage My Eats
              </Button>
              <Button variant="contained" onClick={handleInfoManageClick}>
                Manage My Information
              </Button>
            </Box>
          </Card>
        ) : (
          <Typography variant="body1">Loading user information...</Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default UsersPage;