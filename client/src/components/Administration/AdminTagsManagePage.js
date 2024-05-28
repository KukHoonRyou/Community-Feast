import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box
} from '@mui/material';

const AdminTagsManagePage = () => {
  const [tags, setTags] = useState([]);
  const [editableTag, setEditableTag] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch('/foodtags')
      .then(response => response.json())
      .then(data => setTags(data))
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  const handleDelete = id => {
    const confirmed = window.confirm('Are you sure you want to delete this tag?');
    if (confirmed) {
      fetch(`/foodtags/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setTags(tags.filter(tag => tag.id !== id));
          }
        })
        .catch(error => console.error('Error deleting tag:', error));
    }
  };

  const handleEdit = tag => {
    setEditableTag({ id: tag.id, name: tag.name });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTag({ ...editableTag, [name]: value });
  };

  const handleUpdate = () => {
    fetch(`/foodtags/${editableTag.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableTag),
    })
      .then(response => response.json())
      .then(updatedTag => {
        setTags(tags.map(tag => (tag.id === updatedTag.id ? updatedTag : tag)));
        setEditableTag(null);
      })
      .catch(error => console.error('Error updating tag:', error));
  };

  const handleCreate = () => {
    fetch(`/foodtags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableTag),
    })
      .then(response => response.json())
      .then(newTag => {
        setTags([...tags, newTag]);
        setEditableTag(null);
      })
      .catch(error => console.error('Error creating tag:', error));
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
        Manage Tags
      </Typography>
      {editableTag && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {editableTag.id ? `Editing Tag: ${editableTag.name}` : 'Create New Tag'}
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={editableTag.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={editableTag.id ? handleUpdate : handleCreate}
            >
              {editableTag.id ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Paper>
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map(tag => (
              <TableRow key={tag.id}>
                <TableCell>{tag.id}</TableCell>
                <TableCell>{tag.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" color="info" onClick={() => handleEdit(tag)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(tag.id)}>Delete</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => setEditableTag({ name: '' })}>
          Create New Tag
        </Button>
      </Box>

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

export default AdminTagsManagePage;