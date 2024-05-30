import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MyDibsPage from '../../pages/MyDibsPage';
import { Container, Box, Typography, Button, Chip, CircularProgress, Grid, Paper, CardMedia, CssBaseline, ThemeProvider, createTheme, Divider, Card, CardContent } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const EatsDetailPage = () => {
    const { id } = useParams();
    const [eat, setEat] = useState(null);
    const [error, setError] = useState(null);
    const [dibs, setDibs] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch(`/eats/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEat(data);
            })
            .catch(error => {
                setError(error.toString());
            });
    }, [id]);

    useEffect(() => {
        if (eat && eat.id) {
            fetch(`/dibs?eatId=${eat.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setDibs(data);
                })
                .catch(error => {
                    setError(error.toString());
                });
        }
    }, [eat]);

    const handleDibsClick = () => {
        navigate(`/dibs/create?eatId=${id}`);
    };

    const handleDibsFetch = (fetchedDibs) => {
        setDibs(fetchedDibs);
    };

    if (error) {
        return <Container><Typography color="error">{error}</Typography></Container>;
    }

    if (!eat) {
        return <Container><CircularProgress /></Container>;
    }

    const userHasDibs = dibs.some(dib => dib.user_id === parseInt(userId));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                {eat.eats_name}
                            </Typography>
                            <Box sx={{ ml: 2 }}>
                                {eat.tags && eat.tags.map((tag, index) => (
                                    <Chip key={index} label={tag} sx={{ ml: 1 }} />
                                ))}
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: eat.is_available ? '#007bff' : '#6c757d',
                                color: 'white',
                                fontWeight: 'bold',
                                ':hover': {
                                    backgroundColor: eat.is_available ? '#0056b3' : '#5a6268',
                                },
                            }}
                            disabled={!eat.is_available}
                        >
                            {eat.is_available ? 'Open' : 'Closed'}
                        </Button>
                    </Box>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography variant="body1" paragraph>
                        {eat.description}
                    </Typography>
                    {eat.image_url && (
                        <CardMedia
                            component="img"
                            height="300"
                            image={eat.image_url}
                            alt={eat.eats_name}
                            sx={{ mb: 2 }}
                        />
                    )}
                    
                    <Box sx={{ flexGrow: 1, mb: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'red' }}>
                                Allergic Info: <Typography component="span" sx={{ fontSize: '1.25rem', color: 'red', fontWeight: 'bold' }}>{eat.allergic_ingredient || 'None'}</Typography>
                                </Typography>
                            </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Cook Time: <Typography component="span">{eat.cook_time || 'Unknown'}</Typography>
                                </Typography>
                            </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Quantity: <Typography component="span">{eat.quantity || 'Unknown'}</Typography>
                                </Typography>
                            </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        {eat.is_available && !userHasDibs && eat.user_id !== parseInt(userId) && (
                            <Button
                                onClick={handleDibsClick}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    ':hover': {
                                        backgroundColor: '#0056b3',
                                    },
                                }}
                            >
                                Dibs
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {eat.user_id === parseInt(userId) ? (
                            <Typography color="primary" fontWeight="bold">Thanks for sharing!</Typography>
                        ) : (
                            eat.is_available ? (
                                userHasDibs ? (
                                    <Typography color="secondary" fontWeight="bold">There is already an ongoing dibs, so you cannot create another one.</Typography>
                                ) : null
                            ) : (
                                <Typography color="secondary" fontWeight="bold">Someone else already called dibs!!</Typography>
                            )
                        )}
                    </Box>
                    <MyDibsPage onDibsFetch={handleDibsFetch} />
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default EatsDetailPage;