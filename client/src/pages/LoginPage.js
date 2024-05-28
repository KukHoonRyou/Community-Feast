import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const LoginPage = ({ setIsLogin, setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      setIsLogin(true);
      if (data.isAdmin) {
        setIsAdmin(true);
      }
      localStorage.setItem('userId', data.userId); // 사용자 ID 저장
      navigate('/');
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Failed to login.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
          <Typography component="h1" variant="h5" align="center">
            Log In
          </Typography>
          {error && <Typography color="error" align="center" sx={{ mt: 1 }}>{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Typography align="center">
              Not Registered?{' '}
              <Button onClick={handleSignupRedirect} color="primary">
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;