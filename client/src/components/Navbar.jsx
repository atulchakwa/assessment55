import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            style={{
                background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                padding: '1.25rem 0',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            <div
                className="container nav-content"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >

                <Link
                    to="/"
                    className="nav-logo"
                    style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                    }}
                >
                    <span
                        style={{
                            fontSize: "1.6rem",
                            fontWeight: "800",
                            color: "#2563eb", // Blue
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Vision
                    </span>
                    <span
                        style={{
                            fontSize: "1.6rem",
                            fontWeight: "800",
                            color: "#10B981",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Craft
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div
                    className="nav-links desktop-only"
                    style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}
                >
                    <a href="#projects" className="nav-item">Projects</a>
                    <a href="#clients" className="nav-item">Clients</a>
                    <a href="#contact" className="nav-item">Contact</a>

                    {/* Admin Panel same style as others */}
                    <Link to="/admin" className="nav-item">Admin Panel</Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="mobile-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        color: 'var(--dark)',
                    }}
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    <a href="#projects" onClick={toggleMenu}>Projects</a>
                    <a href="#clients" onClick={toggleMenu}>Clients</a>
                    <a href="#contact" onClick={toggleMenu}>Contact</a>
                    <Link to="/admin" onClick={toggleMenu}>Admin Panel</Link>
                </div>
            </div>

            <style>{`
        .nav-item {
          position: relative;
          text-decoration: none;
          color: var(--gray);
          font-weight: 500;
          transition: color 0.3s;
        }
        .nav-item:hover {
          color: var(--primary);
        }
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: var(--primary);
          transition: width 0.3s ease;
        }
        .nav-item:hover::after {
          width: 100%;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 992px) {
          .desktop-only {
            display: none !important;
          }

          .mobile-toggle {
            display: block !important;
          }

          .mobile-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #e2e8f0;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
            transform: translateY(-150%);
            transition: transform 0.3s ease;
            z-index: 999;
            box-shadow: var(--shadow-lg);
          }

          .mobile-menu.open {
            transform: translateY(0);
          }

          .mobile-menu a {
            text-decoration: none;
            font-size: 1.2rem;
            color: var(--dark);
            font-weight: 600;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
