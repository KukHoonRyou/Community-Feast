import React from 'react';
import EatsListPage from '../components/Eats/EatsListPage';

const EatsPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>All Eats</h1>
      <EatsListPage />
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    marginBottom: '20px',
  },
};

export default EatsPage;