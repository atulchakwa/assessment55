import React from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const ProjectCard = ({ project }) => {
    return (
        <div className="card">
            <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                    src={project.image.startsWith('http') ? project.image : `${API_URL}${project.image}`}
                    alt={project.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                />
            </div>
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>{project.description}</p>
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: '600', cursor: 'pointer', padding: 0 }}>
                        Read More &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
