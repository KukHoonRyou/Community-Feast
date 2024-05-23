import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MyDibsPage = () => {
    const { id } = useParams();
    const [dib, setDib] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/dibs/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDib(data);
            })
            .catch(error => {
                setError(error.toString());
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!dib) {
        return <div>Loading...</div>;
    }

    return (
        <div style={detailContainerStyle}>
            <h2>Dib Detail</h2>
            <p>Status: {dib.dib_status}</p>
            <p>Created At: {new Date(dib.created_at).toLocaleString()}</p>
            <p>Eat ID: {dib.eats_id}</p>
            <p>User ID: {dib.user_id}</p>
        </div>
    );
};

export default MyDibsPage;

// 인라인 스타일 정의
const detailContainerStyle = {
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};