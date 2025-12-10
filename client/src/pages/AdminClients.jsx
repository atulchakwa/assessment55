import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ImageCropper from '../components/ImageCropper';

const API_URL = import.meta.env.VITE_API_URL;

const AdminClients = () => {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        description: '',
        image: null,
    });
    const [errors, setErrors] = useState({});

    // Cropper State
    const [showCropper, setShowCropper] = useState(false);
    const [tempImage, setTempImage] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/clients`);
            setClients(res.data);
        } catch (err) {
            console.error('Fetch Error:', err);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setTempImage(reader.result);
                    setShowCropper(true);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleCropComplete = (croppedBlob) => {
        setFormData({ ...formData, image: croppedBlob });
        setErrors({ ...errors, image: null });
        setShowCropper(false);
        setTempImage(null);
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setTempImage(null);
        const inputEl = document.getElementById('fileInputClient');
        if (inputEl) inputEl.value = '';
    };

    // ✅ Validation: string checks like in AdminProjects
    const validate = () => {
        let tempErrors = {};

        const name = formData.name.trim();
        const designation = formData.designation.trim();
        const description = formData.description.trim();

        // Client Name
        if (!name) {
            tempErrors.name = 'Client Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            tempErrors.name = 'Client Name must contain only letters and spaces';
        } else if (name.length < 3) {
            tempErrors.name = 'Client Name must be at least 3 characters';
        }

        // Designation
        if (!designation) {
            tempErrors.designation = 'Designation is required';
        } else if (!/^[a-zA-Z\s]+$/.test(designation)) {
            tempErrors.designation = 'Designation must contain only letters and spaces';
        } else if (designation.length < 2) {
            tempErrors.designation = 'Designation must be at least 2 characters';
        }

        // Testimonial / Description
        if (!description) {
            tempErrors.description = 'Testimonial is required';
        } else if (!/[a-zA-Z]/.test(description)) {
            tempErrors.description = 'Testimonial must contain letters';
        } else if (description.length < 10) {
            tempErrors.description = 'Testimonial must be at least 10 characters';
        }

        // Image
        if (!formData.image) {
            tempErrors.image = 'Client Image is required';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = new FormData();
        data.append('name', formData.name.trim());
        data.append('designation', formData.designation.trim());
        data.append('description', formData.description.trim());
        data.append('image', formData.image);

        try {
            await axios.post(`${API_URL}/api/clients`, data);
            alert('Client Added Successfully!');
            setFormData({
                name: '',
                designation: '',
                description: '',
                image: null,
            });
            const inputEl = document.getElementById('fileInputClient');
            if (inputEl) inputEl.value = '';
            fetchClients();
        } catch (err) {
            console.error(err);
            alert('Error adding client');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this client?')) return;
        try {
            await axios.delete(`${API_URL}/api/clients/${id}`);
            alert('Client deleted successfully');
            fetchClients();
        } catch (err) {
            console.error('Delete Error:', err);
            alert('Error deleting client');
        }
    };

    return (
        <div>
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                }}
            >
                <h2 style={{ fontSize: '1.875rem', color: '#1E293B' }}>
                    Manage Clients
                </h2>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr',
                    gap: '2rem',
                }}
            >
                {/* List Section */}
                <div>
                    <div className="card" style={{ padding: 0 }}>
                        <div
                            style={{
                                padding: '1.5rem',
                                borderBottom: '1px solid #E2E8F0',
                                background: '#F8FAFC',
                            }}
                        >
                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
                                Existing Clients
                            </h3>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            {clients.length === 0 && (
                                <p style={{ color: '#64748B', textAlign: 'center' }}>
                                    No clients found.
                                </p>
                            )}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: '1.5rem',
                                }}
                            >
                                {clients.map((c) => {
                                    const imageUrl =
                                        c.image && typeof c.image === 'string'
                                            ? c.image.startsWith('http')
                                                ? c.image
                                                : `${API_URL}${c.image}`
                                            : 'https://via.placeholder.com/128?text=Client';

                                    return (
                                        <div
                                            key={c._id}
                                            style={{
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '0.5rem',
                                                padding: '1rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={c.name}
                                                style={{
                                                    width: '64px',
                                                    height: '64px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    margin: '0 auto 1.5rem',
                                                }}
                                            />
                                            <h4
                                                style={{
                                                    margin: '0 0 0.25rem',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {c.name}
                                            </h4>
                                            <p
                                                style={{
                                                    margin: '0 0 1rem',
                                                    fontSize: '0.85rem',
                                                    color: 'var(--primary)',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                {c.designation}
                                            </p>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: '0.85rem',
                                                    color: '#64748B',
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                "{c.description}"
                                            </p>
                                            <button
                                                onClick={() => handleDelete(c._id)}
                                                style={{
                                                    background: '#EF4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '0.25rem',
                                                    padding: '0.25rem 0.5rem',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    marginTop: '0.5rem',
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div>
                    <div
                        className="card"
                        style={{ position: 'sticky', top: '2rem' }}
                    >
                        <div
                            style={{
                                padding: '1.5rem',
                                borderBottom: '1px solid #E2E8F0',
                                background: '#F8FAFC',
                            }}
                        >
                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>
                                Add New Client
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                            {/* Client Name */}
                            <div className="mb-4">
                                <label
                                    className="mb-1"
                                    style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Client Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input"
                                    style={{
                                        borderColor: errors.name ? '#EF4444' : '',
                                    }}
                                />
                                {errors.name && (
                                    <p
                                        style={{
                                            color: '#EF4444',
                                            fontSize: '0.8rem',
                                            marginTop: '0.25rem',
                                        }}
                                    >
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Designation */}
                            <div className="mb-4">
                                <label
                                    className="mb-1"
                                    style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    placeholder="CEO, TechCorp"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="input"
                                    style={{
                                        borderColor: errors.designation ? '#EF4444' : '',
                                    }}
                                />
                                {errors.designation && (
                                    <p
                                        style={{
                                            color: '#EF4444',
                                            fontSize: '0.8rem',
                                            marginTop: '0.25rem',
                                        }}
                                    >
                                        {errors.designation}
                                    </p>
                                )}
                            </div>

                            {/* Testimonial */}
                            <div className="mb-4">
                                <label
                                    className="mb-1"
                                    style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Testimonial
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="What did they say?"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="input"
                                    style={{
                                        minHeight: '100px',
                                        borderColor: errors.description ? '#EF4444' : '',
                                    }}
                                />
                                {errors.description && (
                                    <p
                                        style={{
                                            color: '#EF4444',
                                            fontSize: '0.8rem',
                                            marginTop: '0.25rem',
                                        }}
                                    >
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Client Photo */}
                            <div className="mb-4">
                                <label
                                    className="mb-1"
                                    style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Client Photo
                                </label>
                                <input
                                    id="fileInputClient"
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="input"
                                    style={{
                                        borderColor: errors.image ? '#EF4444' : '',
                                        padding: '0.5rem',
                                    }}
                                    accept="image/*"
                                />
                                {errors.image && (
                                    <p
                                        style={{
                                            color: '#EF4444',
                                            fontSize: '0.8rem',
                                            marginTop: '0.25rem',
                                        }}
                                    >
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', borderRadius: '0.5rem' }}
                            >
                                Add Client
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Image Cropper */}
            {showCropper && (
                <ImageCropper
                    imageSrc={tempImage}
                    aspect={1}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}
        </div>
    );
};

export default AdminClients;
