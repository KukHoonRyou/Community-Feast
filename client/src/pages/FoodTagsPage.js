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

// 문자열을 해시 값으로 변환하는 함수
const stringToHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// 해시 값을 파스텔 색상으로 변환하는 함수
const hashToPastelColor = (hash) => {
  const r = (hash & 0xFF0000) >> 16;
  const g = (hash & 0x00FF00) >> 8;
  const b = hash & 0x0000FF;
  return `rgb(${(r + 255) / 2}, ${(g + 255) / 2}, ${(b + 255) / 2})`;
};

// 카드 컴포넌트 생성
const FoodTagCard = ({ tag }) => {
  const hash = stringToHash(tag.name.toLowerCase());
  const bgColor = hashToPastelColor(hash);

  return (
    <Link to={`/foodtags/${tag.id}`} style={linkStyle}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: bgColor,
          transition: '0.3s',
          '&:hover': { boxShadow: 6 },
          textAlign: 'center', // 텍스트 가운데 정렬
        }}
      >
        <Typography variant="h6" component="div" sx={{ color: '#D2691E' /* 입맛을 돋구는 색상 */ }}>
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