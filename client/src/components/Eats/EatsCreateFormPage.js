import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EatsCreateFormPage = () => {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/eats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/eats');
      } else {
        const errorData = await response.json();
        console.error('Failed to create eats:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create New Eats</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Eats Name:
          <input
            type="text"
            name="eats_name"
            value={formData.eats_name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </label>
        <label>
          Cook Time:
          <input
            type="text"
            name="cook_time"
            value={formData.cook_time}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label>
          Allergic Ingredient:
          <input
            type="text"
            name="allergic_ingredient"
            value={formData.allergic_ingredient}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label>
          Perishable:
          <input
            type="checkbox"
            name="perishable"
            checked={formData.perishable}
            onChange={handleChange}
            style={styles.checkbox}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>Create</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '8px 0',
    padding: '8px',
    fontSize: '16px',
  },
  textarea: {
    margin: '8px 0',
    padding: '8px',
    fontSize: '16px',
    height: '100px',
  },
  checkbox: {
    margin: '8px 0',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default EatsCreateFormPage;