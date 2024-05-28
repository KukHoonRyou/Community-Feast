import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  Chip,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const EatsCreateFormPage = () => {
  const [formData, setFormData] = useState({
    eats_name: '',
    category: '',
    description: '',
    cook_time: '',
    quantity: 0,
    allergic_ingredient: '',
    perishable: false,
    image_url: '',
    food_tags: [],
  });
  const [foodTags, setFoodTags] = useState([]);
  const [newFoodTag, setNewFoodTag] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFoodTags = async () => {
      try {
        const response = await fetch('/foodtags');
        const data = await response.json();
        setFoodTags(data);
      } catch (error) {
        console.error('Error fetching food tags:', error);
      }
    };

    fetchFoodTags();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    });
  };

  const handleFoodTagClick = (tagId) => {
    setFormData((prevFormData) => {
      const { food_tags } = prevFormData;
      if (food_tags.includes(tagId)) {
        return {
          ...prevFormData,
          food_tags: food_tags.filter((id) => id !== tagId),
        };
      } else {
        return {
          ...prevFormData,
          food_tags: [...food_tags, tagId],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/eats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      navigate(`/eats/${data.id}`);
    } catch (error) {
      console.error('Failed to create eats:', error);
    }
  };

  const handleNewFoodTagChange = (e) => {
    setNewFoodTag(e.target.value);
  };

  const handleNewFoodTagSubmit = async () => {
    try {
      const response = await fetch('/foodtags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newFoodTag }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFoodTags([...foodTags, data]);
      setNewFoodTag('');
    } catch (error) {
      console.error('Failed to create food tag:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Create Eats
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="eats_name"
              label="Eats Name"
              name="eats_name"
              autoComplete="eats_name"
              autoFocus
              value={formData.eats_name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              autoComplete="category"
              value={formData.category}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cook_time"
              label="Cook Time"
              name="cook_time"
              autoComplete="cook_time"
              value={formData.cook_time}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="quantity"
              label="Quantity"
              name="quantity"
              autoComplete="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="allergic_ingredient"
              label="Allergic Ingredient"
              name="allergic_ingredient"
              autoComplete="allergic_ingredient"
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
              id="image_url"
              label="Image URL"
              name="image_url"
              autoComplete="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                Food Tags:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {foodTags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    clickable
                    color={formData.food_tags.includes(tag.id) ? 'primary' : 'default'}
                    onClick={() => handleFoodTagClick(tag.id)}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="new_food_tag"
                label="Add New Food Tag"
                value={newFoodTag}
                onChange={handleNewFoodTagChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewFoodTagSubmit}
                sx={{ mt: 2, height: 'fit-content' }}
              >
                Add
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Eats
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default EatsCreateFormPage;