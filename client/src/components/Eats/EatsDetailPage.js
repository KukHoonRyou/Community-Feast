import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EatsDetailPage = () => {
  const { id } = useParams();
  const [eat, setEat] = useState(null);

  useEffect(() => {
    const fetchEat = async () => {
      try {
        const response = await fetch(`/eats/${id}`);
        const data = await response.json();
        setEat(data);
      } catch (error) {
        console.error('Error fetching eat:', error);
      }
    };

    fetchEat();
  }, [id]);

  if (!eat) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>{eat.eats_name}</h1>
      <p>{eat.description}</p>
      <p>Category: {eat.category}</p>
      <p>Cook Time: {eat.cook_time}</p>
      <p>Quantity: {eat.quantity}</p>
      <p>Perishable: {eat.perishable ? 'Yes' : 'No'}</p>
      {eat.image_url && <img src={eat.image_url} alt={eat.eats_name} style={styles.image} />}
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '8px',
  },
};

export default EatsDetailPage;