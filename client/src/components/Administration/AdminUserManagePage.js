import React, { useEffect, useState } from 'react';

const AdminUserManagePage = () => {
  const [users, setUsers] = useState([]);
  const [editableUser, setEditableUser] = useState(null);

  useEffect(() => {
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = id => {
    fetch(`/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.id !== id));
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEdit = user => {
    setEditableUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleToggleAdmin = id => {
    const user = users.find(user => user.id === id);
    const updatedUser = { ...user, isAdmin: !user.isAdmin };

    fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers(users.map(user => (user.id === id ? data : user)));
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleUpdate = () => {
    fetch(`/users/${editableUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableUser),
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setEditableUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h1>Manage Users</h1>
      {editableUser ? (
        <div>
          <h2>Editing User: {editableUser.username}</h2>
          <label>
            Username:
            <input type="text" name="username" value={editableUser.username} onChange={handleChange} />
          </label>
          <label>
            First Name:
            <input type="text" name="first_name" value={editableUser.first_name} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" value={editableUser.last_name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email_address" value={editableUser.email_address} onChange={handleChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phone_number" value={editableUser.phone_number} onChange={handleChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={editableUser.address} onChange={handleChange} />
          </label>
          <label>
            Allergic Info:
            <input type="text" name="allergic_info" value={editableUser.allergic_info} onChange={handleChange} />
          </label>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Allergic Info</th>
              <th>Is Admin</th>
              <th>Average Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email_address}</td>
                <td>{user.phone_number}</td>
                <td>{user.address}</td>
                <td>{user.allergic_info}</td>
                <td>
                  <button onClick={() => handleToggleAdmin(user.id)}>
                    {user.isAdmin ? 'Yes' : 'No'}
                  </button>
                </td>
                <td>{user.average_rating != null ? user.average_rating.toFixed(2) : 'N/A'}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserManagePage;