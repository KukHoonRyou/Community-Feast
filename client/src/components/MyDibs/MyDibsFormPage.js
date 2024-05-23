import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MyDibsFormPage = () => {
    const query = new URLSearchParams(useLocation().search);
    const eatId = query.get('eatId');
    const [dibStatus, setDibStatus] = useState('');
    const [createdTime, setCreatedTime] = useState(new Date().toISOString().slice(0, 16)); // 현재 시간으로 초기화
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/dibs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dib_status: dibStatus,
                created_at: createdTime,
                eats_id: eatId,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                navigate(`/dibs/${data.id}`); // Redirect to the newly created dibs detail page
            })
            .catch(error => {
                setError(error.toString());
            });
    };

    return (
        <div style={formContainerStyle}>
            <h2>Reserve Eat</h2>
            {error && <div style={errorStyle}>Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label>Dib Status:</label>
                    <input
                        type="text"
                        value={dibStatus}
                        onChange={(e) => setDibStatus(e.target.value)}
                        required
                    />
                </div>
                <div style={formGroupStyle}>
                    <label>Created Time:</label>
                    <input
                        type="datetime-local"
                        value={createdTime}
                        onChange={(e) => setCreatedTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={buttonStyle}>Reserve</button>
            </form>
        </div>
    );
};

export default MyDibsFormPage;

// 인라인 스타일 정의
const formContainerStyle = {
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
};

const formGroupStyle = {
    marginBottom: '16px',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const errorStyle = {
    color: 'red',
    marginBottom: '16px',
};