import React from 'react';
import { Rating, Box } from '@mui/material';

const Ratings = ({ rating, setRating }) => {
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  return (
    <Box>
      <Rating
        name="star-rating"
        value={rating}
        onChange={handleRatingChange}
        size="large"
      />
    </Box>
  );
};

export default Ratings;