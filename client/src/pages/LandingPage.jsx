import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { dummyProjects, dummyClients } from '../dummyData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';

const API_URL = import.meta.env.VITE_API_URL;

const LandingPage = () => {
    const [projects, setProjects] = useState(dummyProjects);
    const [clients, setClients] = useState(dummyClients);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsRes = await axios.get(`${API_URL}/api/projects`);
                if (projectsRes.data && projectsRes.data.length > 0) {
                    setProjects(projectsRes.data);
                }
                const clientsRes = await axios.get(`${API_URL}/api/clients`);
                if (clientsRes.data && clientsRes.data.length > 0) {
                    setClients(clientsRes.data);
                }
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <header className="hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <span style={{ color: 'var(--secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            We are creative
                        </span>
                        <h1>Consultation, Design, & Marketing</h1>
                        <p>Unlock your business potential with our expert strategies and innovative design solutions. We build brands that stand out.</p>
                        <a href="#contact" className="btn btn-primary">Get Free Consultation</a>
                    </div>
                    <div className="hero-image">
                        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Team meeting" />
                        {/* Overlay Card Example */}
                        <div style={{
                            position: 'absolute',
                            bottom: '10%',
                            right: '5%',
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                            maxWidth: '250px'
                        }}>
                            <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary)' }}>25+ Years</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>Experience in digital marketing and consulting.</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Why Choose Us / Services */}
            <section className="section" style={{ background: '#fff' }}>
                <div className="container">
                    <div className="section-title">
                        <p>Why Choose Us</p>
                        <h2>We Provide Best Solutions</h2>
                    </div>
                    <div className="grid-3">
                        <div className="card" style={{ padding: '2rem', textAlign: 'center', border: 'none', boxShadow: 'none', background: '#F8FAFC' }}>
                            <div style={{ width: '60px', height: '60px', background: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)', fontSize: '1.5rem' }}>
                                🚀
                            </div>
                            <h3>Potential ROI</h3>
                            <p style={{ color: 'var(--gray)', marginTop: '1rem' }}>Maximize your return on investment with our data-driven strategies.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center', border: 'none', boxShadow: 'none', background: '#F8FAFC' }}>
                            <div style={{ width: '60px', height: '60px', background: '#FFEDD5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary)', fontSize: '1.5rem' }}>
                                🎨
                            </div>
                            <h3>Design</h3>
                            <p style={{ color: 'var(--gray)', marginTop: '1rem' }}>Crafting beautiful and functional interfaces that engage users.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center', border: 'none', boxShadow: 'none', background: '#F8FAFC' }}>
                            <div style={{ width: '60px', height: '60px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#16A34A', fontSize: '1.5rem' }}>
                                📢
                            </div>
                            <h3>Marketing</h3>
                            <p style={{ color: 'var(--gray)', marginTop: '1rem' }}>Reach your target audience effectively with our marketing campaigns.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section className="section" style={{ background: '#F8FAFC' }}>
                <div className="container hero-content">
                    <div className="hero-image">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Team Work" style={{ borderRadius: '1rem', width: '100%' }} />
                    </div>
                    <div className="hero-text">
                        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>About Us</span>
                        <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>We Help Brands Grow</h2>
                        <p>We are a team of dedicated professionals who are passionate about helping businesses succeed. From initial consultation to final execution, we are with you every step of the way.</p>
                        <button className="btn btn-outline">Read More</button>
                    </div>
                </div>
            </section>


            {/* Projects Section */}
            <section id="projects" className="section">
                <div className="container">
                    <div className="section-title">
                        <p>Our Portfolio</p>
                        <h2>Our Latest Projects</h2>
                    </div>
                    <div className="grid-3">
                        {projects.length > 0 ? projects.map(project => (
                            <ProjectCard key={project._id} project={project} />
                        )) : (
                            <p className="text-center" style={{ gridColumn: '1/-1', color: 'var(--gray)' }}>No projects added yet. Add some from the Admin Panel.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Clients Section */}
            <section id="clients" className="section" style={{ background: '#F0F9FF' }}>
                <div className="container">
                    <div className="section-title">
                        <p>Testimonials</p>
                        <h2>Happy Clients</h2>
                    </div>
                    <div className="grid-3">
                        {clients.length > 0 ? clients.map(client => (
                            <ClientCard key={client._id} client={client} />
                        )) : (
                            <p className="text-center" style={{ gridColumn: '1/-1', color: 'var(--gray)' }}>No clients added yet. Add some from the Admin Panel.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section">
                <div className="container">
                    <div className="section-title">
                        <p>Get In Touch</p>
                        <h2>Contact Us</h2>
                    </div>
                    <div className="grid-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <Newsletter />

            <Footer />
        </div>
    );
};

export default LandingPage;
