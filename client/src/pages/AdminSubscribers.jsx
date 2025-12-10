import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/subscribers');
                setSubscribers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSubscribers();
    }, []);

    return (
        <div>
            <h2 style={{ fontSize: '1.875rem', color: '#1E293B', marginBottom: '2rem' }}>Newsletter Subscribers</h2>
            <div className="card" style={{ padding: 0, border: '1px solid #E2E8F0', maxWidth: '800px' }}>
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0, color: '#475569' }}>Total Subscribers</h3>
                    <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        {subscribers.length}
                    </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {subscribers.length === 0 ? (
                        <li style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>No subscribers yet.</li>
                    ) : (
                        subscribers.map(sub => (
                            <li key={sub._id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#1E293B', fontWeight: '500' }}>{sub.email}</span>
                                <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Joined: {new Date(sub.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminSubscribers;
