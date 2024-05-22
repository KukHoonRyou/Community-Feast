import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const FoodTagsDetailPage = () => {
    const { id } = useParams();
    const [foodTag, setFoodTag] = useState(null);
    const [eats, setEats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the food tag details
        fetch(`/foodtags/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFoodTag(data);
            })
            .catch(error => {
                setError(error.toString());
            });

        // Fetch the eats related to this food tag
        fetch(`/foodtags/${id}/eats`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEats(data);
            })
            .catch(error => {
                setError(error.toString());
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!foodTag) {
        return <div>Loading...</div>;
    }

    return (
        <div style={detailContainerStyle}>
            <h2>{foodTag.name}</h2>
            <h3>Related Eats</h3>
            <div style={eatsContainerStyle}>
                {eats.map(eat => (
                    <Link to={`/eats/${eat.id}`} key={eat.id} style={linkStyle}>
                        <div style={eatCardStyle}>
                            <h4>{eat.eats_name}</h4>
                            <p>{eat.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FoodTagsDetailPage;

// 인라인 스타일 정의
const detailContainerStyle = {
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const eatsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: '16px',
};

const eatCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    flex: '1 1 calc(33% - 32px)',
    boxSizing: 'border-box',
    maxWidth: 'calc(33% - 32px)',
};

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
};