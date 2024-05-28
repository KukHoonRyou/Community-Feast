import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminDibsManagePage = () => {
  const [dibs, setDibs] = useState([]);

  useEffect(() => {
    fetchDibs();
  }, []);

  const fetchDibs = async () => {
    try {
      const response = await fetch('/dibs');
      const data = await response.json();
      setDibs(data);
    } catch (error) {
      console.error('Error fetching dibs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/dibs/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setDibs(dibs.filter((dib) => dib.id !== id));
      } else {
        console.error('Error deleting dib:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting dib:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Dibs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Eats ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dibs.map((dib) => (
              <TableRow key={dib.id}>
                <TableCell>{dib.id}</TableCell>
                <TableCell>{dib.dib_status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>{new Date(dib.created_at).toLocaleString()}</TableCell>
                <TableCell>{new Date(dib.updated_at).toLocaleString()}</TableCell>
                <TableCell>{dib.user_id}</TableCell>
                <TableCell>{dib.eats_id}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(dib.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDibsManagePage;