import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <div className="nav-logo" style={{ color: 'white', marginBottom: '1rem', fontWeight: '800', fontSize: '1.5rem', display: 'flex', gap: '0.3rem' }}>
                            <span style={{ color: '#2563eb' }}>Vision</span>
                            <span style={{ color: '#10B981' }}>Craft</span>
                        </div>
                        <p style={{ color: '#94a3b8' }}>Creating digital experiences that matter. We help businesses grow through design and technology.</p>
                    </div>
                    <div className="footer-col">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#clients">Clients</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Marketing</a></li>
                            <li><a href="#">Consulting</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Contact Info</h3>
                        <ul>
                            <li>123 Business Ave, Suite 100</li>
                            <li>New York, NY 10001</li>
                            <li>+1 (555) 123-4567</li>
                            <li>info@visioncraft.com</li>
                        </ul>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #334155', paddingTop: '2rem', textAlign: 'center', color: '#64748B' }}>
                    <p>&copy; 2025 VisionCraft. All rights reserved. Designed with ❤️.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
