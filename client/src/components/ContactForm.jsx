import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        city: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName.trim()) {
            tempErrors.fullName = "Full Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            tempErrors.fullName = "Name must contain only letters";
        }
        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
        }
        if (!formData.mobileNumber.trim()) {
            tempErrors.mobileNumber = "Mobile Number is required";
        } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) { // Simple 10 digit check
            tempErrors.mobileNumber = "Enter a valid 10-digit mobile number";
        }
        if (!formData.city.trim()) {
            tempErrors.city = "City is required";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
            tempErrors.city = "City must contain only letters";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post(`${API_URL}/api/contact`, formData);
            alert('Message Sent Successfully!');
            setFormData({ fullName: '', email: '', mobileNumber: '', city: '' });
        } catch (err) {
            alert('Error sending message');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
            <h3 className="text-center" style={{ marginBottom: '0.5rem' }}>Send us a Message</h3>
            <p className="text-center" style={{ color: 'var(--gray)', marginBottom: '2rem' }}>We'd love to hear from you.</p>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--dark)' }}>Full Name</label>
                <input
                    type="text" name="fullName" placeholder="John Doe"
                    value={formData.fullName} onChange={handleChange}
                    className="input"
                    style={{ marginBottom: 0, borderColor: errors.fullName ? 'red' : '' }}
                />
                {errors.fullName && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.fullName}</p>}
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--dark)' }}>Email Address</label>
                <input
                    type="email" name="email" placeholder="john@example.com"
                    value={formData.email} onChange={handleChange}
                    className="input"
                    style={{ marginBottom: 0, borderColor: errors.email ? 'red' : '' }}
                />
                {errors.email && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--dark)' }}>Mobile Number</label>
                    <input
                        type="text" name="mobileNumber" placeholder="+1 234..."
                        value={formData.mobileNumber} onChange={handleChange}
                        className="input"
                        style={{ marginBottom: 0, borderColor: errors.mobileNumber ? 'red' : '' }}
                    />
                    {errors.mobileNumber && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.mobileNumber}</p>}
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--dark)' }}>City</label>
                    <input
                        type="text" name="city" placeholder="New York"
                        value={formData.city} onChange={handleChange}
                        className="input"
                        style={{ marginBottom: 0, borderColor: errors.city ? 'red' : '' }}
                    />
                    {errors.city && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.city}</p>}
                </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '0.5rem' }}>Send Message</button>
        </form>
    );
};

export default ContactForm;
