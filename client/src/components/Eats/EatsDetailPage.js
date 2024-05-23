import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EatsDetailPage = () => {
  const { id } = useParams();
  const [eat, setEat] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleDibsClick = () => {
    navigate(`/dibs/create?eatId=${id}`); // URL에 eatId를 포함하여 전송
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!eat) {
    return <div>Loading...</div>;
  }

  return (
    <div style={detailContainerStyle}>
      <h2>{eat.eats_name}</h2>
      <p>{eat.description}</p>
      <div>
        <strong>Food Tags: </strong>
        {eat && eat.tags && eat.tags.map(tag => (
          <span key={tag} style={tagStyle}>{tag}</span>
        ))}
      </div>
      <button
        style={{
          backgroundColor: eat.is_available ? 'green' : 'red',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'default',
          fontWeight: 'bold',
        }}
        disabled
      >
        {eat.is_available ? 'Open' : 'Closed'}
      </button>
      {eat.is_available ? (
        <button onClick={handleDibsClick} style={buttonStyle}>
          Dibs
        </button>
      ) : (
        <p style={messageStyle}>Sorry, somebody dibs first!</p>
      )}
    </div>
  );
};

export default EatsDetailPage;

// 인라인 스타일 정의
const detailContainerStyle = {
  padding: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const messageStyle = {
  color: 'purple',
  fontWeight: 'bold',
};

const tagStyle = {
  backgroundColor: '#f0f0f0',
  color: '#333',
  padding: '4px 8px',
  borderRadius: '4px',
  marginRight: '8px',
};