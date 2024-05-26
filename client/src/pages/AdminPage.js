import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Admin Management Page</h1>
      <button onClick={() => navigateToPage('/admin/dibs')}>Manage Dibs</button>
      <button onClick={() => navigateToPage('/admin/eats')}>Manage Eats</button>
      <button onClick={() => navigateToPage('/admin/users')}>Manage Users</button>
    </div>
  );
};

export default AdminPage;