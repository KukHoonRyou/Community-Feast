import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoManagePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email_address: '',
    phone_number: '',
    address: '',
    allergic_info: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬 스토리지에서 가져옵니다.
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
        } else {
          setError(data.error || 'Failed to fetch user information.');
        }
      } catch (error) {
        setError('Error fetching user information.');
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('User information updated successfully.');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update user information.');
      }
    } catch (error) {
      setError('Error updating user information.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm("탈퇴하겠습니까?")) {
      try {
        const response = await fetch(`/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          alert('나중에 다시 만나요');
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          navigate('/');
          window.location.reload();
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to delete account.');
        }
      } catch (error) {
        setError('Error deleting account.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage User Information</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email_address">Email Address:</label>
          <input
            type="email"
            id="email_address"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="allergic_info">Allergic Information:</label>
          <input
            type="text"
            id="allergic_info"
            name="allergic_info"
            value={formData.allergic_info}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Information</button>
        <button type="button" onClick={handleDelete} style={styles.deleteButton}>Delete Account</button>
      </form>
    </div>
  );
};

const styles = {
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    marginTop: '10px',
    marginLeft: '10px',
  }
};

export default UserInfoManagePage;