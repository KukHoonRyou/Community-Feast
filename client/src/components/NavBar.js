import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLogin, isAdmin, setIsLogin, setIsAdmin }) {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (isLogin) {
      calculateAverageRating();
    }
  }, [isLogin]);

  const calculateAverageRating = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/reviews?user_id=${userId}`);
      if (response.ok) {
        const reviews = await response.json();
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const average = totalRating / reviews.length;
          setAverageRating(average.toFixed(2));
        }
      }
    } catch (error) {
      console.error('Error calculating average rating:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsLogin(false);
    setIsAdmin(false);
    navigate('/');
  };

  const handleLinkClick = (path) => {
    if (!isLogin) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <button onClick={() => handleLinkClick('/eats')}>Eats</button>
        </li>
        <li>
          <button onClick={() => handleLinkClick('/dibs/:id')}>My Dibs</button>
        </li>
        <li>
          <button onClick={() => handleLinkClick('/users')}>User</button>
        </li>
        <li>
          <button onClick={() => handleLinkClick('/foodtags')}>Food Tags</button>
        </li>
        {isLogin && (
          <li>
            <span>User Rating: {averageRating}</span>
          </li>
        )}
        {!isLogin && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {isLogin && isAdmin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        {isLogin && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;