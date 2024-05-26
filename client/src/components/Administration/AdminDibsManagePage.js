import React, { useEffect, useState } from 'react';

const AdminDibsManagePage = () => {
  const [dibs, setDibs] = useState([]);
  const [editableDib, setEditableDib] = useState(null);

  useEffect(() => {
    fetch('/dibs')
      .then(response => response.json())
      .then(data => setDibs(data))
      .catch(error => console.error('Error fetching dibs:', error));
  }, []);

  const handleDelete = id => {
    fetch(`/dibs/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setDibs(dibs.filter(dib => dib.id !== id));
        }
      })
      .catch(error => console.error('Error deleting dib:', error));
  };

  const handleEdit = dib => {
    setEditableDib(dib);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableDib({ ...editableDib, [name]: value });
  };

  const handleUpdate = () => {
    fetch(`/dibs/${editableDib.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableDib),
    })
      .then(response => response.json())
      .then(updatedDib => {
        setDibs(dibs.map(dib => (dib.id === updatedDib.id ? updatedDib : dib)));
        setEditableDib(null);
      })
      .catch(error => console.error('Error updating dib:', error));
  };

  return (
    <div>
      <h1>Manage Dibs</h1>
      {editableDib ? (
        <div>
          <h2>Editing Dib ID: {editableDib.id}</h2>
          <label>
            Status:
            <input
              type="checkbox"
              name="dib_status"
              checked={editableDib.dib_status}
              onChange={(e) => handleChange({ target: { name: 'dib_status', value: e.target.checked } })}
            />
          </label>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>User ID</th>
              <th>Eats ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dibs.map(dib => (
              <tr key={dib.id}>
                <td>{dib.id}</td>
                <td>{dib.dib_status ? 'Active' : 'Inactive'}</td>
                <td>{new Date(dib.created_at).toLocaleString()}</td>
                <td>{new Date(dib.updated_at).toLocaleString()}</td>
                <td>{dib.user_id}</td>
                <td>{dib.eats_id}</td>
                <td>
                  <button onClick={() => handleEdit(dib)}>Edit</button>
                  <button onClick={() => handleDelete(dib.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDibsManagePage;