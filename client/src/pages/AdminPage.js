import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const AdminPage = () => {
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Management Page
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" onClick={() => navigateToPage('/admin/dibs')}>
            Manage Dibs
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigateToPage('/admin/eats')}>
            Manage Eats
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigateToPage('/admin/users')}>
            Manage Users
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigateToPage('/admin/tags')}>
            Manage Tags
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;