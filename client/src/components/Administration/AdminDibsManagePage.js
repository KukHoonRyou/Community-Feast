import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Box
} from '@mui/material';

const AdminDibsManagePage = () => {
  const [dibs, setDibs] = useState([]);
  const [editableDib, setEditableDib] = useState(null);

  useEffect(() => {
    fetch('/dibs')
      .then(response => response.json())
      .then(data => setDibs(data))
      .catch(error => console.error('Error fetching dibs:', error));
  }, []);

  const handleDelete = id => {
    const confirmed = window.confirm('Are you sure you want to delete this dib?');
    if (confirmed) {
      fetch(`/dibs/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setDibs(dibs.filter(dib => dib.id !== id));
          }
        })
        .catch(error => console.error('Error deleting dib:', error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableDib({ ...editableDib, [name]: value });
  };

  const handleUpdate = () => {
    fetch(`/dibs/${editableDib.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableDib),
    })
      .then(response => response.json())
      .then(updatedDib => {
        setDibs(dibs.map(dib => (dib.id === updatedDib.id ? updatedDib : dib)));
        setEditableDib(null);
      })
      .catch(error => console.error('Error updating dib:', error));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Dibs
      </Typography>
      {editableDib ? (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Editing Dib ID: {editableDib.id}
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography component="label">Status:</Typography>
            <Checkbox
              name="dib_status"
              checked={editableDib.dib_status}
              onChange={(e) => handleChange({ target: { name: 'dib_status', value: e.target.checked } })}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
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
              {dibs.map(dib => (
                <TableRow key={dib.id}>
                  <TableCell>{dib.id}</TableCell>
                  <TableCell>{dib.dib_status ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>{new Date(dib.created_at).toLocaleString()}</TableCell>
                  <TableCell>{new Date(dib.updated_at).toLocaleString()}</TableCell>
                  <TableCell>{dib.user_id}</TableCell>
                  <TableCell>{dib.eats_id}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDelete(dib.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminDibsManagePage;