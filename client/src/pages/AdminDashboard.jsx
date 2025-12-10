import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminProjects from './AdminProjects';
import AdminClients from './AdminClients';
import AdminContacts from './AdminContacts';
import AdminSubscribers from './AdminSubscribers';
import AdminHome from './AdminHome';

const AdminDashboard = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="admin-container" style={{ display: 'flex', minHeight: '100vh', background: '#F1F5F9' }}>
            <div className="sidebar" style={{ width: '280px', background: '#1E293B', color: 'white', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid #334155' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ color: '#2563eb' }}>Vision</span>
                        <span style={{ color: '#10B981' }}>Craft</span>
                    </Link>
                </div>

                <nav style={{ padding: '1.5rem', flex: 1 }}>
                    <Link to="/admin" className={`admin-link ${location.pathname === '/admin' ? 'active' : ''}`} style={linkStyle}>
                        <span>🏠</span> Dashboard
                    </Link>

                    <p style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.75rem', marginTop: '2rem', paddingLeft: '0.75rem', letterSpacing: '0.05em' }}>Management</p>
                    <Link to="/admin/projects" className={`admin-link ${isActive('/admin/projects')}`} style={linkStyle}>
                        <span>📁</span> Projects
                    </Link>
                    <Link to="/admin/clients" className={`admin-link ${isActive('/admin/clients')}`} style={linkStyle}>
                        <span>👥</span> Clients
                    </Link>

                    <p style={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '2rem 0 1rem', paddingLeft: '0.75rem' }}>Inquiries</p>
                    <Link to="/admin/contacts" className={`admin-link ${isActive('/admin/contacts')}`} style={linkStyle}>
                        <span>✉️</span> Contact Forms
                    </Link>
                    <Link to="/admin/subscribers" className={`admin-link ${isActive('/admin/subscribers')}`} style={linkStyle}>
                        <span>📰</span> Subscribers
                    </Link>
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #334155' }}>
                    <Link to="/" style={{ ...linkStyle, color: '#94A3B8' }}>
                        <span>⬅️</span> Back to Website
                    </Link>
                </div>
            </div>

            <div className="admin-main" style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <Routes>
                    <Route path="/" element={<AdminHome />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="clients" element={<AdminClients />} />
                    <Route path="contacts" element={<AdminContacts />} />
                    <Route path="subscribers" element={<AdminSubscribers />} />
                    <Route path="*" element={
                        <div style={{ textAlign: 'center', marginTop: '5rem', color: '#64748B' }}>
                            <h2>Welcome to the Admin Dashboard</h2>
                            <p>Select an option from the sidebar to get started.</p>
                        </div>
                    } />
                </Routes>
            </div>

            <style>{`
                .admin-link {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.875rem 1rem;
                    color: #CBD5E1;
                    text-decoration: none;
                    border-radius: 0.5rem;
                    margin-bottom: 0.5rem;
                    transition: all 0.2s;
                    font-weight: 500;
                }
                .admin-link:hover, .admin-link.active {
                    background: #2563EB;
                    color: white;
                    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
                }
            `}</style>
        </div>
    );
};

const linkStyle = {
    // Basic inline styles fallback if class parsing fails momentarily
    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', color: '#CBD5E1', textDecoration: 'none', borderRadius: '0.5rem', marginBottom: '0.5rem', transition: 'all 0.2s', fontWeight: '500'
};

export default AdminDashboard;
