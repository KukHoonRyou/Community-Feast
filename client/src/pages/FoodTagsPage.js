// FoodTagsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 1. 카드 컴포넌트 생성
const FoodTagCard = ({ tag }) => {
    return (
        <Link to={`/foodtags/${tag.id}`} style={linkStyle}>
            <div style={cardStyle}>
                <div>
                    <h5>{tag.name}</h5>
                    <p>{tag.description}</p>
                </div>
            </div>
        </Link>
    );
};

const FoodTagsPage = () => {
    const [foodTags, setFoodTags] = useState([]);

    // 2. 서버에서 데이터 가져오기
    useEffect(() => {
        fetch('/foodtags')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFoodTags(data);
            })
            .catch(error => {
                console.error('Error fetching food tags:', error);
            });
    }, []);

    return (
        <div style={gridContainerStyle}>
            {foodTags.map(tag => (
                <div style={gridItemStyle} key={tag.id}>
                    <FoodTagCard tag={tag} />
                </div>
            ))}
        </div>
    );
};

export default FoodTagsPage;

// 인라인 스타일 정의
const gridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'space-around',
    padding: '16px',
};

const gridItemStyle = {
    flex: '1 1 calc(25% - 32px)',
    boxSizing: 'border-box',
    margin: '16px',
    maxWidth: 'calc(25% - 32px)',
};

const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
};

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
};