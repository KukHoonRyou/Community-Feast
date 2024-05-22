import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UsersPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 로그인된 사용자 정보 가져오기
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/current-user');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUser();
  }, []);

  const handleDibsManageClick = () => {
    navigate('/users/dibs');
  };

  const handleEatsManageClick = () => {
    navigate('/users/eats');
  };

  const handleInfoManageClick = () => {
    navigate('/users/info');
  };

  return (
    <div>
      <h1>User Page</h1>
      {user ? (
        <div>
          <h2>User Information</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email_address}</p>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Phone Number: {user.phone_number}</p>
          <p>Address: {user.address}</p>
          <p>Allergic Information: {user.allergic_info}</p>
          <p>Member Since: {user.created_at}</p>
          <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
          <button onClick={handleDibsManageClick}>Manage My Dibs</button>
          <button onClick={handleEatsManageClick}>Manage My Eats</button>
          <button onClick={handleInfoManageClick}>Manage My Information</button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default UsersPage;