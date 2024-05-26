import React, { useState, useEffect } from 'react';
import Ratings from './Ratings';

const Reviews = ({ dibsId, dib }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [dibsId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/reviews?dibs_id=${dibsId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

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

  return (
    <div>
      <button onClick={() => setShowReviewModal(true)}>Write a Review</button>
      <div>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>{`Rating: ${review.rating}`}</p>
            <p>{review.comment}</p>
            <button onClick={() => handleUpdateClick(review)}>Update</button>
            <button onClick={() => handleDeleteClick(review.id)}>Delete</button>
          </div>
        ))}
      </div>
      {showReviewModal && (
        <div
          style={{
            padding: '20px',
            border: '1px solid black',
            backgroundColor: 'white',
            zIndex: 1000,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h2>Write a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <Ratings rating={rating} setRating={setRating} />
            <div>
              <label>Comment: </label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowReviewModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {showUpdateModal && (
        <div
          style={{
            padding: '20px',
            border: '1px solid black',
            backgroundColor: 'white',
            zIndex: 1000,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h2>Update Review</h2>
          <form onSubmit={handleUpdateSubmit}>
            <Ratings rating={rating} setRating={setRating} />
            <div>
              <label>Comment: </label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;