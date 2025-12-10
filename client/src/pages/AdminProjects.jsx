import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ImageCropper from '../components/ImageCropper';

const API_URL = import.meta.env.VITE_API_URL;

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
    });
    const [errors, setErrors] = useState({});

    // Cropper State
    const [showCropper, setShowCropper] = useState(false);
    const [tempImage, setTempImage] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/projects`);
            setProjects(res.data);
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
        const inputEl = document.getElementById('fileInput');
        if (inputEl) inputEl.value = ''; // Reset input safely
    };

    // ✅ UPDATED VALIDATION: name & description must be string
    const validate = () => {
        let tempErrors = {};

        const name = formData.name.trim();
        const description = formData.description.trim();

        // Project Name validation (string only)
        if (!name) {
            tempErrors.name = 'Project Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            tempErrors.name = 'Project Name must contain only letters and spaces';
        } else if (name.length < 3) {
            tempErrors.name = 'Project Name must be at least 3 characters';
        }

        // Project Description validation (must contain letters, min length 10)
        if (!description) {
            tempErrors.description = 'Description is required';
        } else if (!/[a-zA-Z]/.test(description)) {
            tempErrors.description = 'Description must contain letters';
        } else if (description.length < 10) {
            tempErrors.description = 'Description must be at least 10 characters';
        }

        // Image validation
        if (!formData.image) {
            tempErrors.image = 'Project Image is required';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = new FormData();
        data.append('name', formData.name.trim());
        data.append('description', formData.description.trim());
        data.append('image', formData.image);

        try {
            await axios.post(`${API_URL}/api/projects`, data);
            alert('Project Added Successfully!');
            setFormData({ name: '', description: '', image: null });

            const inputEl = document.getElementById('fileInput');
            if (inputEl) inputEl.value = ''; // Reset file input

            fetchProjects();
        } catch (err) {
            console.error(err);
            alert('Error adding project');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await axios.delete(`${API_URL}/api/projects/${id}`);
            alert('Project deleted successfully');
            fetchProjects();
        } catch (err) {
            console.error('Delete Error:', err);
            alert('Error deleting project');
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
                    Manage Projects
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
                                Existing Projects
                            </h3>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            {projects.length === 0 && (
                                <p style={{ color: '#64748B', textAlign: 'center' }}>
                                    No projects found.
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
                                {projects.map((p) => {
                                    const imageUrl =
                                        p.image && typeof p.image === 'string'
                                            ? p.image.startsWith('http')
                                                ? p.image
                                                : `${API_URL}${p.image}`
                                            : 'https://via.placeholder.com/450x350?text=No+Image';

                                    return (
                                        <div
                                            key={p._id}
                                            style={{
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '0.5rem',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={p.name}
                                                style={{
                                                    width: '100%',
                                                    height: '140px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <div style={{ padding: '1rem' }}>
                                                <h4
                                                    style={{
                                                        margin: '0 0 0.5rem',
                                                        fontSize: '1rem',
                                                    }}
                                                >
                                                    {p.name}
                                                </h4>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '0.85rem',
                                                        color: '#64748B',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {p.description}
                                                </p>
                                                <button
                                                    onClick={() => handleDelete(p._id)}
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
                                Add New Project
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                            {/* Project Name */}
                            <div className="mb-4">
                                <label
                                    className="mb-1"
                                    style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="E.g. E-Commerce App"
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

                            {/* Description */}
                            <div className="mb-4">
                                <label
                                    className="mb-1"
                                    style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Project details..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="input"
                                    style={{
                                        minHeight: '120px',
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

                            {/* Project Image */}
                            <div className="mb-4">
                                <label
                                    className="mb-1"
                                    style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    Project Image
                                </label>
                                <input
                                    id="fileInput"
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
                                Add Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Cropper */}
            {showCropper && (
                <ImageCropper
                    imageSrc={tempImage}
                    aspect={450 / 350}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}
        </div>
    );
};

export default AdminProjects;
