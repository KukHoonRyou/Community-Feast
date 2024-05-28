import React, { useState, useEffect, useCallback } from 'react';
import Ratings from './Ratings';
import { Button, Modal, Box, Typography, TextField, Rating, Grid } from '@mui/material';

const Reviews = ({ dibsId, dib }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(`/reviews?dibs_id=${dibsId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [dibsId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      rating,
      comment,
      dibs_id: dibsId,
      user_id: dib.user_id,
      eats_id: dib.eats_id,
    };
    try {
      const response = await fetch('/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (response.ok) {
        const savedReview = await response.json();
        setReviews([...reviews, savedReview]);
        setShowReviewModal(false);
        setRating(0);
        setComment('');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateClick = (review) => {
    setSelectedReview(review);
    setRating(review.rating);
    setComment(review.comment);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedReview = {
      rating,
      comment,
    };
    try {
      const response = await fetch(`/reviews/${selectedReview.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });
      if (response.ok) {
        const savedReview = await response.json();
        setReviews(reviews.map((review) => (review.id === savedReview.id ? savedReview : review)));
        setShowUpdateModal(false);
        setSelectedReview(null);
        setRating(0);
        setComment('');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = async (reviewId) => {
    const confirmDelete = window.confirm('Delete the review?');
    if (confirmDelete) {
      try {
        const response = await fetch(`/reviews/${reviewId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setReviews(reviews.filter((review) => review.id !== reviewId));
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleWriteReviewClick = () => {
    if (reviews.length > 0) {
      setShowWarningModal(true);
    } else {
      setShowReviewModal(true);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          {reviews.map((review, index) => (
            <Grid container spacing={2} alignItems="center" key={index}>
              <Grid item xs={8}>
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant="body2">{review.comment}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" onClick={() => handleUpdateClick(review)} sx={{ mr: 1 }}>
                  Update
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteClick(review.id)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item container justifyContent="left">
          <Button variant="contained" onClick={handleWriteReviewClick}>
            Write a Review
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="review-modal-title" variant="h6" component="h2">
            Write a Review
          </Typography>
          <form onSubmit={handleReviewSubmit}>
            <Ratings rating={rating} setRating={setRating} />
            <div>
              <TextField
                label="Comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                margin="normal"
              />
            </div>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowReviewModal(false)}>Cancel</Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="update-modal-title" variant="h6" component="h2">
            Update Review
          </Typography>
          <form onSubmit={handleUpdateSubmit}>
            <Ratings rating={rating} setRating={setRating} />
            <div>
              <TextField
                label="Comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                margin="normal"
              />
            </div>
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        aria-labelledby="warning-modal-title"
        aria-describedby="warning-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="warning-modal-title" variant="h6" component="h2">
            Warning
          </Typography>
          <Typography id="warning-modal-description" sx={{ mt: 2 }}>
            You can only write one review. A review has already been written for this item.
          </Typography>
          <Button variant="contained" onClick={() => setShowWarningModal(false)} sx={{ mt: 2 }}>
            OK
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Reviews;