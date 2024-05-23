import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLogin, isAdmin, setIsLogin, setIsAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 구현
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