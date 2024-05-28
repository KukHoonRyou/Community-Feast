import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Box, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel
} from '@mui/material';

const AdminEatsManagePage = () => {
  const [eats, setEats] = useState([]);
  const [editableEat, setEditableEat] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch('/eats')
      .then(response => response.json())
      .then(data => setEats(data))
      .catch(error => console.error('Error fetching eats:', error));
  }, []);

  const handleDelete = id => {
    const confirmed = window.confirm('Are you sure you want to delete this eat?');
    if (confirmed) {
      fetch(`/eats/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setEats(eats.filter(eat => eat.id !== id));
          }
        })
        .catch(error => console.error('Error deleting eat:', error));
    }
  };

  const handleEdit = eat => {
    setEditableEat(eat);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableEat({ ...editableEat, [name]: value });
  };

  const handleToggleAvailable = id => {
    const eat = eats.find(eat => eat.id === id);
    const updatedEat = { ...eat, is_available: !eat.is_available };

    fetch(`/eats/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_available: updatedEat.is_available }),
    })
      .then(response => response.json())
      .then(data => {
        setEats(eats.map(eat => (eat.id === id ? data : eat)));
      })
      .catch(error => console.error('Error updating eat:', error));
  };

  const handleUpdate = () => {
    fetch(`/eats/${editableEat.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableEat),
    })
      .then(response => response.json())
      .then(updatedEat => {
        setEats(eats.map(eat => (eat.id === updatedEat.id ? updatedEat : eat)));
        setEditableEat(null);
      })
      .catch(error => console.error('Error updating eat:', error));
  };

  const handleDialogOpen = (title, content) => {
    setDialogContent({ title, content });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogContent({ title: '', content: '' });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Eats
      </Typography>
      {editableEat ? (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Editing Eat: {editableEat.eats_name}
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              name="eats_name"
              value={editableEat.eats_name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Category"
              name="category"
              value={editableEat.category}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={editableEat.description}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={editableEat.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Allergic Ingredient"
              name="allergic_ingredient"
              value={editableEat.allergic_ingredient}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Cook Time"
              name="cook_time"
              value={editableEat.cook_time}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Image URL"
              name="image_url"
              value={editableEat.image_url}
              onChange={handleChange}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={editableEat.perishable}
                  onChange={(e) => handleChange({ target: { name: 'perishable', value: e.target.checked } })}
                  name="perishable"
                />
              }
              label="Perishable"
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Allergic Ingredient</TableCell>
                <TableCell>Cook Time</TableCell>
                <TableCell>Image URL</TableCell>
                <TableCell>Perishable</TableCell>
                <TableCell>Is Available</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eats.map(eat => (
                <TableRow key={eat.id}>
                  <TableCell>{eat.id}</TableCell>
                  <TableCell>{eat.eats_name}</TableCell>
                  <TableCell>{eat.category}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDialogOpen('Description', eat.description)}>
                      View
                    </Button>
                  </TableCell>
                  <TableCell>{eat.quantity}</TableCell>
                  <TableCell>{eat.allergic_ingredient}</TableCell>
                  <TableCell>{eat.cook_time}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDialogOpen('Image URL', eat.image_url)}>
                      View
                    </Button>
                  </TableCell>
                  <TableCell>{eat.perishable ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleToggleAvailable(eat.id)}>
                      {eat.is_available ? 'Yes' : 'No'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="contained" color="info" onClick={() => handleEdit(eat)}>Edit</Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(eat.id)}>Delete</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminEatsManagePage;