import React, { useState, useEffect } from 'react';
// import { Button, Paper, Box } from '@mui/material';
import { Container, Typography, List, ListItem, ListItemText, ListItemButton, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserDibsManagePage = () => {
  const [dibs, setDibs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬 스토리지에서 가져옵니다.

  useEffect(() => {
    const fetchDibs = async () => {
      try {
        const response = await fetch('/dibs/0'); // 현재 로그인된 사용자의 모든 Dibs를 가져옵니다.
        const data = await response.json();
        setDibs(data);
      } catch (error) {
        console.error('Error fetching dibs:', error);
      }
    };

    fetchDibs();
  }, [userId]);

  const handleDelete = async (dibId, eatsId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this dib?');
    if (!confirmDelete) return;

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/dibs/${dibId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.ok) {
        // Eats의 is_available 상태를 true로 업데이트
        await fetch(`/eats/${eatsId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ is_available: true }),
        });

        setSuccess('Dib deleted successfully.');
        // Dibs 목록에서 삭제된 Dib를 제거합니다.
        const updatedDibs = dibs.filter(dib => dib.id !== dibId);
        setDibs(updatedDibs);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete dib.');
      }
    } catch (error) {
      setError('Error deleting dib.');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" gutterBottom>
        Manage Your Dibs
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
      
      <Typography component="h2" variant="h6" gutterBottom>
        Your Dibs
      </Typography>
      <List>
        {dibs.map((dib, index) => (
          <React.Fragment key={dib.id}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={dib.eats_name} secondary={dib.created_at} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(dib.id, dib.eats_id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
            {index < dibs.length - 1 && <Divider />}
          </React.Fragment>
        ))}
        {dibs.length > 0 && <Divider />} {/* 목록의 맨 밑에 라인 추가 */}
      </List>
    </Container>
  );
};

export default UserDibsManagePage;