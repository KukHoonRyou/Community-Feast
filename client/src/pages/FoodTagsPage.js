import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Grid, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

// 인라인 스타일 정의
const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

// 카드 컴포넌트 생성
const FoodTagCard = ({ tag }) => {
  return (
    <Link to={`/foodtags/${tag.id}`} style={linkStyle}>
      <Paper 
        elevation={3} 
        sx={{
          padding: 2,
          transition: '0.3s',
          '&:hover': { boxShadow: 6 }
        }}
      >
        <Typography variant="h6" component="div">
          {tag.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tag.description}
        </Typography>
      </Paper>
    </Link>
  );
};

const FoodTagsPage = () => {
  const [foodTags, setFoodTags] = useState([]);

  // 서버에서 데이터 가져오기
  useEffect(() => {
    fetch('/foodtags')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFoodTags(data);
      })
      .catch(error => {
        console.error('Error fetching food tags:', error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, padding: 3, paddingLeft: 8, paddingRight: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} justifyContent="center">
          {foodTags.map(tag => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={tag.id}>
              <FoodTagCard tag={tag} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default FoodTagsPage;