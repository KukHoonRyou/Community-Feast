import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Button, Box, TextField, Paper, Avatar, Chip } from '@mui/material';
import '@fontsource/roboto'; // Roboto 폰트를 불러옵니다.

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const MyDibsFormPage = () => {
    const query = new URLSearchParams(useLocation().search);
    const eatId = query.get('eatId');
    const [eat, setEat] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [createdTime, setCreatedTime] = useState(new Date().toISOString().slice(0, 16)); // 현재 시간으로 초기화
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the eat data from the server
        fetch(`/eats/${eatId}`)
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
    }, [eatId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        fetch('/dibs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dib_status: false,
                created_at: createdTime,
                eats_id: eatId,
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.error || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(() => {
            return fetch(`/eats/${eatId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_available: false,
                }),
            });
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.error || 'Failed to update availability');
                });
            }
            return response.json();
        })
        .then(() => {
            navigate(`/dibs/${eatId}`); // Redirect to the updated eat detail page
        })
        .catch(error => {
            console.error('Error creating dib or updating eat status:', error); // 오류를 콘솔에 출력
            setError(error.toString());
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <Typography component="h2" variant="h5">
                            Create My Dibs
                        </Typography>
                        {eat && (
                            <Button
                                size="small"
                                sx={{
                                    backgroundColor: eat.is_available ? '#007bff' : '#6c757d',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    ':hover': {
                                        backgroundColor: eat.is_available ? '#0056b3' : '#5a6268',
                                    },
                                }}
                                disabled
                            >
                                {eat.is_available ? "Open" : "Closed"}
                            </Button>
                        )}
                    </Box>
                    {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
                    {eat && (
                        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                            <Avatar
                                src={eat.image_url || "/static/images/cards/default.jpg"}
                                alt={eat.eats_name}
                                sx={{ width: 120, height: 120, margin: 'auto' }}
                            />
                            <Typography variant="h6" sx={{ marginTop: 1 }}>
                                {eat.eats_name}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                                {eat.tags.map((tag, index) => (
                                    <Chip key={index} label={tag} />
                                ))}
                            </Box>
                        </Box>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ position: 'relative', marginBottom: 2 }}>
                            <TextField
                                type="datetime-local"
                                value={createdTime}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    borderRadius: '4px',
                                    ':hover': {
                                        backgroundColor: '#0056b3',
                                    },
                                }}
                            >
                                Dibs
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default MyDibsFormPage;