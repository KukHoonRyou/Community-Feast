import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ isLogin }) => {
  const [recentEats, setRecentEats] = useState([]);
  const [dibs, setDibs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // 로그인한 경우에만 최근 eats와 dibs를 가져옴
    if (isLogin) {
      // 모든 eats를 가져온 후 가장 최근 추가된 5개의 eats를 선택
      fetch('/eats')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const sortedEats = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setRecentEats(sortedEats.slice(0, 5)); // 가장 최근 5개의 eats를 설정
        })
        .catch(error => {
          setError(error.toString());
        });

      // 현재 사용자의 dibs 가져오기
      if (userId) {
        fetch('/dibs/0')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setDibs(data.filter(dib => dib.user_id === parseInt(userId)));
          })
          .catch(error => {
            setError(error.toString());
          });
      }
    }
  }, [isLogin, userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEatClick = (id) => {
    navigate(`/eats/${id}`);
  };

  const handleDibClick = (id) => {
    navigate(`/dibs/${id}`);
  };

  return (
    <div style={homeContainerStyle}>
      {isLogin ? (
        <>
          <h2>Recent Eats</h2>
          {recentEats.length > 0 ? (
            recentEats.map(eat => (
              <div key={eat.id} style={cardStyle} onClick={() => handleEatClick(eat.id)}>
                <p>Eat Name: {eat.eats_name}</p>
                <p>Description: {eat.description}</p>
                <p>Created At: {new Date(eat.created_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>There Is No Recent eats.</p>
          )}

          <h2>My Dibs</h2>
          {dibs.length > 0 ? (
            dibs.map(dib => (
              <div key={dib.id} style={cardStyle} onClick={() => handleDibClick(dib.id)}>
                <p>Status: {dib.dib_status ? 'Open' : 'Closed'}</p>
                <p>Created At: {new Date(dib.created_at).toLocaleString()}</p>
                <p>Eat Name: {dib.eats_name}</p>
              </div>
            ))
          ) : (
            <p>You Should Dib!</p>
          )}
        </>
      ) : (
        <p>Please log in to view Recent Eats and My Dibs.</p>
      )}
    </div>
  );
};

export default HomePage;

// 인라인 스타일 정의
const homeContainerStyle = {
  padding: '16px',
};

const cardStyle = {
  marginBottom: '16px',
  padding: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

const cardStyleHover = {
  ...cardStyle,
  transform: 'scale(1.02)',
};

const itemStyle = {
  marginBottom: '16px',
  padding: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};