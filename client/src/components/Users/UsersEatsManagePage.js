import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Paper, Box, Checkbox, FormControlLabel, CssBaseline, ThemeProvider, createTheme, List, ListItem, ListItemText, ListItemButton, Divider, Chip, Dialog, DialogTitle, DialogContent, DialogActions, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Footer from '../../Footer'; // Footer 컴포넌트를 불러옵니다.

const theme = createTheme();

const UserEatsManagePage = () => {
  const [eats, setEats] = useState([]);
  const [foodTags, setFoodTags] = useState([]);
  const [selectedEat, setSelectedEat] = useState(null);
  const [formData, setFormData] = useState({
    eats_name: '',
    category: '',
    description: '',
    cook_time: '',
    quantity: 0,
    allergic_ingredient: '',
    perishable: false,
    image_url: '',
    food_tag_ids: [],
  });
  const [newTag, setNewTag] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬 스토리지에서 가져옵니다.

  useEffect(() => {
    const fetchEats = async () => {
      try {
        const response = await fetch('/eats');
        const data = await response.json();
        // 현재 로그인된 사용자가 만든 Eats를 필터링합니다.
        const filteredEats = data.filter(eat => eat.user_id === parseInt(userId));
        setEats(filteredEats);
      } catch (error) {
        console.error('Error fetching eats:', error);
      }
    };

    const fetchFoodTags = async () => {
      try {
        const response = await fetch('/foodtags');
        const data = await response.json();
        setFoodTags(data);
      } catch (error) {
        console.error('Error fetching food tags:', error);
      }
    };

    fetchEats();
    fetchFoodTags();
  }, [userId]);

  const handleSelectEat = (eat) => {
    setSelectedEat(eat);
    setFormData({
      eats_name: eat.eats_name,
      category: eat.category,
      description: eat.description,
      cook_time: eat.cook_time,
      quantity: eat.quantity,
      allergic_ingredient: eat.allergic_ingredient,
      perishable: eat.perishable,
      image_url: eat.image_url,
      food_tag_ids: eat.food_tags.map(tag => tag.id) || [], // food_tags 배열에서 id 추출
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? Number(value) : (type === 'checkbox' ? checked : value),
    });
  };

  const handleTagClick = (tagId) => {
    setFormData((prevFormData) => {
      const tagExists = prevFormData.food_tag_ids.includes(tagId);
      return {
        ...prevFormData,
        food_tag_ids: tagExists
          ? prevFormData.food_tag_ids.filter(id => id !== tagId)
          : [...prevFormData.food_tag_ids, tagId],
      };
    });
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleNewTagSubmit = async () => {
    try {
      const response = await fetch('/foodtags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newTag }),
      });

      if (response.ok) {
        const data = await response.json();
        setFoodTags((prevTags) => [...prevTags, data]);
        setDialogOpen(false);
        setNewTag('');
        setSuccess('New tag created successfully.');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create new tag.');
      }
    } catch (error) {
      setError('Error creating new tag.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/eats/${selectedEat.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Eat information updated successfully.');
        // Eats 목록을 다시 불러와서 업데이트된 정보를 반영합니다.
        const updatedEats = eats.map(eat => eat.id === selectedEat.id ? { ...eat, ...formData } : eat);
        setEats(updatedEats);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update eat information.');
      }
    } catch (error) {
      setError('Error updating eat information.');
    }
  };

  const handleDelete = async () => {
    if (!selectedEat) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this eat?');
    if (!confirmDelete) return;

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/eats/${selectedEat.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.ok) {
        setSuccess('Eat deleted successfully.');
        // Eats 목록에서 삭제된 Eat를 제거합니다.
        const updatedEats = eats.filter(eat => eat.id !== selectedEat.id);
        setEats(updatedEats);
        setSelectedEat(null); // 선택된 Eat을 초기화합니다.
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete eat.');
      }
    } catch (error) {
      setError('Error deleting eat.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: '64px' }}> {/* 푸터의 높이만큼 하단 여백을 추가합니다. */}
        <Typography component="h1" variant="h5" gutterBottom>
          Manage Your Eats
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}

        <Typography component="h2" variant="h6" gutterBottom>
          Your Eats
        </Typography>
        <List>
          {eats.map((eat, index) => (
            <React.Fragment key={eat.id}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleSelectEat(eat)}>
                  <ListItemText primary={eat.eats_name} secondary={eat.description} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        {selectedEat && (
          <Paper sx={{ padding: 2, marginTop: 3 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Edit Eat: {selectedEat.eats_name}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Eats Name"
                name="eats_name"
                value={formData.eats_name}
                onChange={handleChange}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Cook Time"
                name="cook_time"
                value={formData.cook_time}
                onChange={handleChange}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Allergic Ingredient"
                name="allergic_ingredient"
                value={formData.allergic_ingredient}
                onChange={handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.perishable}
                    onChange={handleChange}
                    name="perishable"
                    color="primary"
                  />
                }
                label="Perishable"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Image URL"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
              />
              <Typography component="h3" variant="subtitle1" gutterBottom>
                Food Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {foodTags.map(tag => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    clickable
                    color={formData.food_tag_ids.includes(tag.id) ? 'primary' : 'default'}
                    onClick={() => handleTagClick(tag.id)}
                  />
                ))}
                <IconButton color="primary" onClick={() => setDialogOpen(true)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Update Eat
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                  Delete Eat
                </Button>
              </Box>
            </form>
          </Paper>
        )}

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Create New Tag</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="New Tag"
              type="text"
              fullWidth
              value={newTag}
              onChange={handleNewTagChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleNewTagSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default UserEatsManagePage;