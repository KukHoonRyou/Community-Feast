import React, { useEffect, useState } from 'react';

const AdminEatsManagePage = () => {
  const [eats, setEats] = useState([]);
  const [editableEat, setEditableEat] = useState(null);

  useEffect(() => {
    fetch('/eats')
      .then(response => response.json())
      .then(data => setEats(data))
      .catch(error => console.error('Error fetching eats:', error));
  }, []);

  const handleDelete = id => {
    fetch(`/eats/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setEats(eats.filter(eat => eat.id !== id));
        }
      })
      .catch(error => console.error('Error deleting eat:', error));
  };

  const handleEdit = eat => {
    setEditableEat(eat);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableEat({ ...editableEat, [name]: value });
  };

  const handleToggleAvailable = id => {
    const eat = eats.find(eat => eat.id === id);
    const updatedEat = { ...eat, is_available: !eat.is_available };

    fetch(`/eats/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_available: updatedEat.is_available }),
    })
      .then(response => response.json())
      .then(data => {
        setEats(eats.map(eat => (eat.id === id ? data : eat)));
      })
      .catch(error => console.error('Error updating eat:', error));
  };

  const handleUpdate = () => {
    fetch(`/eats/${editableEat.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableEat),
    })
      .then(response => response.json())
      .then(updatedEat => {
        setEats(eats.map(eat => (eat.id === updatedEat.id ? updatedEat : eat)));
        setEditableEat(null);
      })
      .catch(error => console.error('Error updating eat:', error));
  };

  return (
    <div>
      <h1>Manage Eats</h1>
      {editableEat ? (
        <div>
          <h2>Editing Eat: {editableEat.eats_name}</h2>
          <label>
            Name:
            <input type="text" name="eats_name" value={editableEat.eats_name} onChange={handleChange} />
          </label>
          <label>
            Category:
            <input type="text" name="category" value={editableEat.category} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={editableEat.description} onChange={handleChange} />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value={editableEat.quantity} onChange={handleChange} />
          </label>
          <label>
            Allergic Ingredient:
            <input type="text" name="allergic_ingredient" value={editableEat.allergic_ingredient} onChange={handleChange} />
          </label>
          <label>
            Cook Time:
            <input type="text" name="cook_time" value={editableEat.cook_time} onChange={handleChange} />
          </label>
          <label>
            Image URL:
            <input type="text" name="image_url" value={editableEat.image_url} onChange={handleChange} />
          </label>
          <label>
            Perishable:
            <input
              type="checkbox"
              name="perishable"
              checked={editableEat.perishable}
              onChange={(e) => handleChange({ target: { name: 'perishable', value: e.target.checked } })}
            />
          </label>
          <label>
            Is Available:
            <button onClick={() => handleToggleAvailable(editableEat.id)}>
              {editableEat.is_available ? 'Yes' : 'No'}
            </button>
          </label>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Allergic Ingredient</th>
              <th>Cook Time</th>
              <th>Image URL</th>
              <th>Perishable</th>
              <th>Is Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {eats.map(eat => (
              <tr key={eat.id}>
                <td>{eat.id}</td>
                <td>{eat.eats_name}</td>
                <td>{eat.category}</td>
                <td>{eat.description}</td>
                <td>{eat.quantity}</td>
                <td>{eat.allergic_ingredient}</td>
                <td>{eat.cook_time}</td>
                <td>{eat.image_url}</td>
                <td>{eat.perishable ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleToggleAvailable(eat.id)}>
                    {eat.is_available ? 'Yes' : 'No'}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(eat)}>Edit</button>
                  <button onClick={() => handleDelete(eat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEatsManagePage;