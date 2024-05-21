import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EatsListPage = () => {
  const [eats, setEats] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchEats = async () => {
      try {
        const response = await fetch('/eats');
        const data = await response.json();
        setEats(data);
      } catch (error) {
        console.error('Error fetching eats:', error);
      }
    };

    fetchEats();
  }, []);

  return (
    <div style={styles.container}>
      <Link to="/eats/create" style={styles.button}>
        Create Eats
      </Link>
      {eats.map(eat => (
        <Link to={`/eats/${eat.id}`} key={eat.id} style={styles.link}>
          <div
            style={{
              ...styles.card,
              ...(hoveredCard === eat.id && styles.cardHovered),
            }}
            onMouseEnter={() => setHoveredCard(eat.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2>{eat.eats_name}</h2>
            <p>{eat.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '20px 0',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  cardHovered: {
    transform: 'scale(1.05)',
  },
};

export default EatsListPage;