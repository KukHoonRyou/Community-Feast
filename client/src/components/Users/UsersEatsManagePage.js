import React, { useState, useEffect } from 'react';

const UserEatsManagePage = () => {
  const [eats, setEats] = useState([]);
  const [selectedEat, setSelectedEat] = useState(null);
  const [formData, setFormData] = useState({
    eats_name: '',
    category: '',
    description: '',
    cook_time: '',
    quantity: 0,
    allergic_ingredient: '',
    perishable: false,
    image_url: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬 스토리지에서 가져옵니다.

  useEffect(() => {
    const fetchEats = async () => {
      try {
        const response = await fetch('/eats');
        const data = await response.json();
        // 현재 로그인된 사용자가 만든 Eats를 필터링합니다.
        const filteredEats = data.filter(eat => eat.user_id === parseInt(userId));
        setEats(filteredEats);
      } catch (error) {
        console.error('Error fetching eats:', error);
      }
    };

    fetchEats();
  }, [userId]);

  const handleSelectEat = (eat) => {
    setSelectedEat(eat);
    setFormData({
      eats_name: eat.eats_name,
      category: eat.category,
      description: eat.description,
      cook_time: eat.cook_time,
      quantity: eat.quantity,
      allergic_ingredient: eat.allergic_ingredient,
      perishable: eat.perishable,
      image_url: eat.image_url,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/eats/${selectedEat.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Eat information updated successfully.');
        // Eats 목록을 다시 불러와서 업데이트된 정보를 반영합니다.
        const updatedEats = eats.map(eat => eat.id === selectedEat.id ? { ...eat, ...formData } : eat);
        setEats(updatedEats);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update eat information.');
      }
    } catch (error) {
      setError('Error updating eat information.');
    }
  };

  const handleDelete = async () => {
    if (!selectedEat) return;
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/eats/${selectedEat.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.ok) {
        setSuccess('Eat deleted successfully.');
        // Eats 목록에서 삭제된 Eat를 제거합니다.
        const updatedEats = eats.filter(eat => eat.id !== selectedEat.id);
        setEats(updatedEats);
        setSelectedEat(null); // 선택된 Eat을 초기화합니다.
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete eat.');
      }
    } catch (error) {
      setError('Error deleting eat.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Your Eats</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      <h2>Your Eats</h2>
      {eats.map(eat => (
        <div key={eat.id} style={styles.eatItem} onClick={() => handleSelectEat(eat)}>
          <h3>{eat.eats_name}</h3>
          <p>{eat.description}</p>
        </div>
      ))}

      {selectedEat && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Edit Eat: {selectedEat.eats_name}</h2>
          <div>
            <label htmlFor="eats_name">Eats Name:</label>
            <input
              type="text"
              id="eats_name"
              name="eats_name"
              value={formData.eats_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cook_time">Cook Time:</label>
            <input
              type="text"
              id="cook_time"
              name="cook_time"
              value={formData.cook_time}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="allergic_ingredient">Allergic Ingredient:</label>
            <input
              type="text"
              id="allergic_ingredient"
              name="allergic_ingredient"
              value={formData.allergic_ingredient}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="perishable">Perishable:</label>
            <input
              type="checkbox"
              id="perishable"
              name="perishable"
              checked={formData.perishable}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image_url">Image URL:</label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Eat</button>
          <button type="button" onClick={handleDelete} style={styles.deleteButton}>Delete Eat</button>
        </form>
      )}
    </div>
  );
};

const styles = {
  eatItem: {
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
    marginLeft: '10px',
  }
};

export default UserEatsManagePage;