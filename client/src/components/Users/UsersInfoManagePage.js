import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const UserInfoManagePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email_address: '',
    phone_number: '',
    address: '',
    allergic_info: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬 스토리지에서 가져옵니다.
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
        } else {
          setError(data.error || 'Failed to fetch user information.');
        }
      } catch (error) {
        setError('Error fetching user information.');
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('User information updated successfully.');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update user information.');
      }
    } catch (error) {
      setError('Error updating user information.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(`/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          alert('I look forward to meeting you again when the time is right.');
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          navigate('/');
          window.location.reload();
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to delete account.');
        }
      } catch (error) {
        setError('Error deleting account.');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Manage User Information
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Allergic Information"
              name="allergic_info"
              value={formData.allergic_info}
              onChange={handleChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Update Information
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete Account
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default UserInfoManagePage;