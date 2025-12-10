import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/contact');
                setContacts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div>
            <h2 style={{ fontSize: '1.875rem', color: '#1E293B', marginBottom: '2rem' }}>Contact Submissions</h2>
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                            <tr>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Mobile</th>
                                <th style={thStyle}>City</th>
                                <th style={thStyle}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>No submissions yet.</td>
                                </tr>
                            ) : (
                                contacts.map(contact => (
                                    <tr key={contact._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                                        <td style={tdStyle}>
                                            <span style={{ fontWeight: '500', color: '#1E293B' }}>{contact.fullName}</span>
                                        </td>
                                        <td style={tdStyle}>{contact.email}</td>
                                        <td style={tdStyle}>{contact.mobileNumber}</td>
                                        <td style={tdStyle}>{contact.city}</td>
                                        <td style={tdStyle}>{new Date(contact.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const thStyle = {
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
};

const tdStyle = {
    padding: '1rem',
    fontSize: '0.95rem',
    color: '#475569'
};

export default AdminContacts;
