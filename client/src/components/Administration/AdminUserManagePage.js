import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, Rating
} from '@mui/material';

const AdminUserManagePage = () => {
  const [users, setUsers] = useState([]);
  const [editableUser, setEditableUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = id => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      fetch(`/users/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setUsers(users.filter(user => user.id !== id));
          }
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const handleEdit = user => {
    setEditableUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleToggleAdmin = id => {
    const user = users.find(user => user.id === id);
    const updatedUser = { ...user, isAdmin: !user.isAdmin };

    fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers(users.map(user => (user.id === id ? data : user)));
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleUpdate = () => {
    fetch(`/users/${editableUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableUser),
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setEditableUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
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
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Users
      </Typography>
      {editableUser ? (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Editing User: {editableUser.username}
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Username"
              name="username"
              value={editableUser.username}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="First Name"
              name="first_name"
              value={editableUser.first_name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={editableUser.last_name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email_address"
              type="email"
              value={editableUser.email_address}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phone_number"
              value={editableUser.phone_number}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={editableUser.address}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Allergic Info"
              name="allergic_info"
              value={editableUser.allergic_info}
              onChange={handleChange}
              fullWidth
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
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Allergic Info</TableCell>
                  <TableCell>Is Admin</TableCell>
                  <TableCell>Average Rating</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleDialogOpen('Email', user.email_address)}>
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleDialogOpen('Phone Number', user.phone_number)}>
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleDialogOpen('Address', user.address)}>
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleDialogOpen('Allergic Info', user.allergic_info)}>
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color={user.isAdmin ? "success" : "warning"} onClick={() => handleToggleAdmin(user.id)}>
                        {user.isAdmin ? 'Yes' : 'No'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Rating value={user.average_rating || 0} precision={0.5} readOnly />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" color="info" onClick={() => handleEdit(user)}>Edit</Button>
                        <Button variant="contained" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
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

export default AdminUserManagePage;