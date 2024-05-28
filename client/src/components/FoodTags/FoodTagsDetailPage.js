import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Paper, Typography, Grid, Box, Avatar, CircularProgress, Container, Alert } from '@mui/material';

const FoodTagsDetailPage = () => {
    const { id } = useParams();
    const [foodTag, setFoodTag] = useState(null);
    const [eats, setEats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the food tag details
        fetch(`/foodtags/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFoodTag(data);
            })
            .catch(error => {
                setError(error.toString());
            });

        // Fetch the eats related to this food tag
        fetch(`/foodtags/${id}/eats`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEats(data);
            })
            .catch(error => {
                setError(error.toString());
            });
    }, [id]);

    if (error) {
        return <Container><Alert severity="error">{error}</Alert></Container>;
    }

    if (!foodTag) {
        return <Container><CircularProgress /></Container>;
    }

    return (
        <Container sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" component="h2">{foodTag.name}</Typography>
            </Paper>
            <Typography variant="h5" component="h3" gutterBottom>Related Eats</Typography>
            <Grid container spacing={2}>
                {eats.map(eat => (
                    <Grid item xs={12} sm={6} md={4} key={eat.id}>
                        <Link to={`/eats/${eat.id}`} style={linkStyle}>
                            <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar alt={eat.eats_name} src={eat.image} sx={{ width: 56, height: 56, mr: 2 }} />
                                    <Typography variant="h6" component="div">{eat.eats_name}</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {eat.description}
                                </Typography>
                                <Typography variant="body2" color="primary">
                                    {foodTag.name}
                                </Typography>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FoodTagsDetailPage;

// 인라인 스타일 정의
const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
};