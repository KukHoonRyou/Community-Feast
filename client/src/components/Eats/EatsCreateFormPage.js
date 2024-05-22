import React, { useState, useEffect } from 'react';
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
    food_tags: [],  // Food tags를 추가합니다.
  });
  const [foodTags, setFoodTags] = useState([]);  // 사용 가능한 food tags를 저장합니다.
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬 스토리지에서 가져옵니다.

  useEffect(() => {
    const fetchFoodTags = async () => {
      try {
        const response = await fetch('/foodtags');
        const data = await response.json();
        setFoodTags(data);
      } catch (error) {
        console.error('Error fetching food tags:', error);
      }
    };

    fetchFoodTags();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    });
  };

  const handleFoodTagClick = (tagId) => {
    setFormData((prevFormData) => {
      const { food_tags } = prevFormData;
      if (food_tags.includes(tagId)) {
        return {
          ...prevFormData,
          food_tags: food_tags.filter((id) => id !== tagId),
        };
      } else {
        return {
          ...prevFormData,
          food_tags: [...food_tags, tagId],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // 전송하는 데이터 출력

    try {
      const response = await fetch('/eats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, user_id: userId }), // 사용자 ID를 함께 전송합니다.
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      navigate(`/eats/${data.id}`);
    } catch (error) {
      console.error('Failed to create eats:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Eats Name:
        <input type="text" name="eats_name" value={formData.eats_name} onChange={handleChange} required />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <label>
        Cook Time:
        <input type="text" name="cook_time" value={formData.cook_time} onChange={handleChange} required />
      </label>
      <label>
        Quantity:
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
      </label>
      <label>
        Allergic Ingredient:
        <input type="text" name="allergic_ingredient" value={formData.allergic_ingredient} onChange={handleChange} />
      </label>
      <label>
        Perishable:
        <input type="checkbox" name="perishable" checked={formData.perishable} onChange={handleChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
      </label>
      <label>
        Food Tags:
        <div>
          {foodTags.map((tag) => (
            <button
              type="button"
              key={tag.id}
              onClick={() => handleFoodTagClick(tag.id)}
              style={{
                backgroundColor: formData.food_tags.includes(tag.id) ? '#d4edda' : '#f8d7da',
                margin: '2px',
                padding: '5px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </label>
      <button type="submit">Create Eats</button>
    </form>
  );
};

export default EatsCreateFormPage;