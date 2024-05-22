import React from 'react';

const FoodTagsListPage = ({ foodTags }) => {
  return (
    <div>
      <ul>
        {foodTags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FoodTagsListPage;