import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const validate = () => {
        if (!email.trim()) {
            setError("Email is required");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Email is invalid");
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post(`${API_URL}/api/subscribe`, { email });
            alert('Subscribed Successfully!');
            setEmail('');
        } catch (err) {
            alert(err.response?.data?.message || 'Error subscribing');
        }
    };

    return (
        <div style={{ backgroundImage: 'linear-gradient(to right, #1E293B, #0F172A)', padding: '5rem 0', color: 'white', textAlign: 'center' }}>
            <div className="container">
                <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', fontSize: '0.9rem' }}>Stay Updated</span>
                <h2 style={{ fontSize: '2.5rem', margin: '1rem 0 2rem' }}>Subscribe to our Newsletter</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ width: '100%', display: 'flex', gap: '1rem' }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            className="input"
                            style={{ marginBottom: 0, borderRadius: '50px', padding: '1rem 1.5rem', border: 'none', flex: 1, borderColor: error ? 'red' : '' }}
                        />
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </div>
                    {error && <p style={{ color: '#F87171', marginTop: '0.5rem' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
