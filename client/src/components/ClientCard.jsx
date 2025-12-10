import React from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const ClientCard = ({ client }) => {
    return (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
            <div style={{
                position: 'absolute', top: '1rem', left: '1rem', fontSize: '4rem', color: '#E2E8F0', fontFamily: 'serif', lineHeight: 1
            }}>
                "
            </div>
            <img
                src={client.image.startsWith('http') ? client.image : `${API_URL}${client.image}`}
                alt={client.name}
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem', border: '4px solid white', boxShadow: 'var(--shadow-md)' }}
            />
            <p style={{ color: '#475569', fontStyle: 'italic', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                "{client.description}"
            </p>
            <h4 style={{ margin: '0', fontSize: '1.1rem' }}>{client.name}</h4>
            <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase' }}>{client.designation}</p>
        </div>
    );
};

export default ClientCard;
