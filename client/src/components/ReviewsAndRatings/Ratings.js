import React from 'react';

const Ratings = ({ rating, setRating }) => {
  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  return (
    <div>
      <label>Rating: </label>
      <select value={rating} onChange={handleRatingChange}>
        <option value={0}>Select Rating</option>
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
    </div>
  );
};

export default Ratings;