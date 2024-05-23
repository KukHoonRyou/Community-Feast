import React, { useEffect, useState } from 'react';

const MyDibsPage = ({ onDibsFetch }) => {
    const [dibs, setDibs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/dibs/0')  // id가 0인 경우 모든 Dibs를 가져오도록 수정
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDibs(data);
                if (onDibsFetch) {
                    onDibsFetch(data);
                }
            })
            .catch(error => {
                setError(error.toString());
            });
    }, [onDibsFetch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!dibs.length) {
        return <div>No Dibs found.</div>;
    }

    return (
        <div style={detailContainerStyle}>
            <h2>My Dibs</h2>
            {dibs.map(dib => (
                <div key={dib.id} style={dibItemStyle}>
                    <p>Status: {dib.dib_status ? 'Open' : 'Closed'}</p>
                    <p>Created At: {new Date(dib.created_at).toLocaleString()}</p>
                    <p>Eat Name: {dib.eats_name}</p> {/* Eats의 이름 출력 */}
                    <p>User ID: {dib.user_id}</p>
                </div>
            ))}
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

const dibItemStyle = {
    marginBottom: '16px',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};