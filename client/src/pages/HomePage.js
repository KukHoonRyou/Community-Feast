import React from 'react';
import { ImageList, ImageListItem, Container, CssBaseline, Typography, ThemeProvider, createTheme, Box } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const HomePage = () => {
  const itemData = [
    {
      img: 'https://www.motherspridepreschool.com/news/wp-content/uploads/2019/11/food-sharing-activity-2019-0003.jpg',
      title: 'Breakfast',
    },
    {
      img: 'https://www.treehugger.com/thmb/Oc1ljI2tc9y0SKpEhARFfd22n7w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/OLIO-Handover5-Credit-AnnabelStaff-99a548648a7348c0bbfdcd060004a647.jpg',
      title: 'Burger',
    },
    {
      img: 'https://static.mothership.sg/1/2017/03/15304603_640967402740710_581454099308359652_o.jpg',
      title: 'Camera',
    },
    {
      img: 'https://www.ifco.com/media/uberization-of-food-1180x786.jpg',
      title: 'Coffee',
    },
    {
      img: 'https://familyapp.com/wp-content/uploads/2021/07/the-3-best-food-sharing-apps_iruro0f.jpg',
      title: 'Hats',
    },
    {
      img: 'https://www.vrg.org/blog/wp-content/uploads/2022/04/depositphotos_339323212-stock-illustration-please-stop-food-waste-handwritten.jpg',
      title: 'Honey',
    },
    {
      img: 'https://static01.nyt.com/images/2018/03/22/style/22mealshare-1/00mealshare-1-superJumbo.jpg',
      title: 'Basketball',
    },
    {
      img: 'https://thereader.mitpress.mit.edu/wp-content/uploads/2020/11/lead-graphic.jpg',
      title: 'Fern',
    },
    {
      img: 'https://news.leavitt.com/wp-content/uploads/2020/05/Dining-Together_web600.jpg',
      title: 'Mushrooms',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ color: 'green', fontWeight: 'bold' }} // 그린 계열 색상으로 두껍게 설정
            >
              SHARE KINDNESS, SAVE THE EARTH
            </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Discover and share delicious meals with your community. Join us to explore new tastes and make a positive impact.
          </Typography>
        </Box>
        <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} gap={12}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} sx={{ width: '100%', height: 200, overflow: 'hidden', aspectRatio: '1/1' }}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;