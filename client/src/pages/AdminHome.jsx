import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const [stats, setStats] = useState({
        projects: 0,
        clients: 0,
        contacts: 0,
        subscribers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projectsRes, clientsRes, contactsRes, subscribersRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/projects'),
                    axios.get('http://localhost:5000/api/clients'),
                    axios.get('http://localhost:5000/api/contact'),
                    axios.get('http://localhost:5000/api/subscribers')
                ]);

                setStats({
                    projects: projectsRes.data.length,
                    clients: clientsRes.data.length,
                    contacts: contactsRes.data.length,
                    subscribers: subscribersRes.data.length
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1E293B' }}>Dashboard Overview</h2>
            <p style={{ color: '#64748B', marginBottom: '2.5rem' }}>Welcome back, Admin. Here's what's happening today.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard
                    title="Total Projects"
                    count={stats.projects}
                    icon="📁"
                    color="blue"
                    link="/admin/projects"
                />
                <StatCard
                    title="Happy Clients"
                    count={stats.clients}
                    icon="👥"
                    color="orange"
                    link="/admin/clients"
                />
                <StatCard
                    title="New Inquiries"
                    count={stats.contacts}
                    icon="✉️"
                    color="indigo"
                    link="/admin/contacts"
                />
                <StatCard
                    title="Subscribers"
                    count={stats.subscribers}
                    icon="newspaper"
                    color="emerald"
                    link="/admin/subscribers"
                />
            </div>

            <div className="card" style={{ padding: '2rem', background: 'linear-gradient(to right, #1E293B, #0F172A)', color: 'white', border: 'none' }}>
                <div style={{ maxWidth: '600px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Need to update content?</h3>
                    <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>You can easily manage your portfolio and client testimonials from the sidebar menu. Ensure all images are high resolution for the best presentation.</p>
                    <Link to="/admin/projects" className="btn" style={{ background: 'white', color: '#1E293B' }}>Manage Projects</Link>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, count, icon, color, link }) => {
    const colors = {
        blue: { bg: '#EFF6FF', text: '#2563EB' },
        orange: { bg: '#FFF7ED', text: '#EA580C' },
        indigo: { bg: '#EEF2FF', text: '#4F46E5' },
        emerald: { bg: '#ECFDF5', text: '#059669' }
    };

    const theme = colors[color] || colors.blue;

    return (
        <Link to={link} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="card" style={{ padding: '1.5rem', transition: 'transform 0.2s', border: '1px solid #E2E8F0', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: theme.bg, color: theme.text,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
                    }}>
                        {icon === 'newspaper' ? '📰' : icon}
                    </div>
                    <span style={{ background: '#F1F5F9', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748B' }}>
                        VIEW
                    </span>
                </div>
                <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.25rem', color: '#1E293B' }}>{count}</h3>
                <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem', fontWeight: '500' }}>{title}</p>
            </div>
        </Link>
    );
};

export default AdminHome;
