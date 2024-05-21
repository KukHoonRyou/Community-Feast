import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLogin, setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 로그인 로직 구현
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setIsLogin(true);
      // 관리자 여부에 따라 setIsAdmin 호출
      if (data.isAdmin) {
        setIsAdmin(true);
      }
      navigate('/');
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Fail to login.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Log In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        Not Registered?{' '}
        <button onClick={handleSignupRedirect}>Sign Up</button>
      </p>
    </div>
  );
};

export default LoginPage;