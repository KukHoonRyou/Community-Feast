import React, { useState, useEffect } from 'react';

const UserDibsManagePage = () => {
  const [dibs, setDibs] = useState([]);
  const [selectedDib, setSelectedDib] = useState(null);
  const [formData, setFormData] = useState({
    dib_status: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬 스토리지에서 가져옵니다.

  useEffect(() => {
    const fetchDibs = async () => {
      try {
        const response = await fetch('/dibs/0'); // 현재 로그인된 사용자의 모든 Dibs를 가져옵니다.
        const data = await response.json();
        setDibs(data);
      } catch (error) {
        console.error('Error fetching dibs:', error);
      }
    };

    fetchDibs();
  }, [userId]);

  const handleSelectDib = (dib) => {
    setSelectedDib(dib);
    setFormData({
      dib_status: dib.dib_status,
    });
  };

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
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
      const response = await fetch(`/dibs/${selectedDib.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Dib information updated successfully.');
        // Dibs 목록을 다시 불러와서 업데이트된 정보를 반영합니다.
        const updatedDibs = dibs.map(dib => dib.id === selectedDib.id ? { ...dib, ...formData } : dib);
        setDibs(updatedDibs);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update dib information.');
      }
    } catch (error) {
      setError('Error updating dib information.');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/dibs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.ok) {
        setSuccess('Dib deleted successfully.');
        // Dibs 목록에서 삭제된 Dib를 제거합니다.
        const updatedDibs = dibs.filter(dib => dib.id !== id);
        setDibs(updatedDibs);
        setSelectedDib(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete dib.');
      }
    } catch (error) {
      setError('Error deleting dib.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Your Dibs</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      <h2>Your Dibs</h2>
      {dibs.map(dib => (
        <div key={dib.id} style={styles.dibItem} onClick={() => handleSelectDib(dib)}>
          <h3>{dib.eats_name}</h3> {/* Eats의 이름 출력 */}
          <p>{dib.dib_status ? 'Open' : 'Closed'}</p>
          <button onClick={() => handleDelete(dib.id)} style={styles.deleteButton}>Delete</button>
        </div>
      ))}

      {selectedDib && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Edit Dib: {selectedDib.eats_name}</h2> {/* Eats의 이름 출력 */}
          <div>
            <label htmlFor="dib_status">Dib Status:</label>
            <input
              type="checkbox"
              id="dib_status"
              name="dib_status"
              checked={formData.dib_status}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Dib</button>
        </form>
      )}
    </div>
  );
};

const styles = {
  dibItem: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    width: '300px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default UserDibsManagePage;