import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Globe, Menu, X, PhoneCall, ChevronDown, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer open state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop services mega-dropdown state
  const [categories, setCategories] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error('Failed to fetch services in navbar:', err);
      }
    };
    fetchServices();
  }, []);

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <NavLink to="/" className="logo logo-img-container" onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="EXIM Guru Mantra Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Home
            </NavLink>
          </li>
          
          {/* Services Link with Mega Dropdown */}
          <li 
            className="nav-item-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? "nav-link active nav-link-flex" : "nav-link nav-link-flex"}
              onClick={handleLinkClick}
            >
              <span>Services</span>
              <ChevronDown size={14} className="dropdown-arrow" />
            </NavLink>
            
            {/* Mega Dropdown Panel */}
            <div className={`mega-dropdown ${dropdownOpen ? 'open' : ''}`}>
              
              {/* Column 1: Import-Export Services */}
              <div className="mega-column">
                <div style={{ marginBottom: '1.25rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.5px' }}>IMPORT & EXPORT</h3>
                </div>
                {categories.filter(c => c.division === 'import-export').length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No services configured</p>
                ) : (
                  categories.filter(c => c.division === 'import-export').map((cat) => (
                    <div key={cat.key} className="mega-group" style={{ marginBottom: '1.5rem' }}>
                      <Link to={`/services/category/${cat.key}`} className="mega-title-link" onClick={handleLinkClick}>
                        <h4 className="mega-title" style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase' }}>{cat.title}</h4>
                      </Link>
                      {cat.services.map((svc, sIdx) => (
                        <Link 
                          key={sIdx} 
                          to={`/inquire/${encodeURIComponent(svc)}`} 
                          className="mega-link" 
                          onClick={handleLinkClick}
                          style={{ fontSize: '0.82rem', padding: '0.15rem 0', color: 'var(--text-secondary)' }}
                        >
                          {svc}
                        </Link>
                      ))}
                    </div>
                  ))
                )}
              </div>

              {/* Column 2: Taxation & Compliances */}
              <div className="mega-column">
                <div style={{ marginBottom: '1.25rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.5px' }}>TAXATION & COMPLIANCE</h3>
                </div>
                {categories.filter(c => c.division === 'taxation').length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No services configured</p>
                ) : (
                  categories.filter(c => c.division === 'taxation').map((cat) => (
                    <div key={cat.key} className="mega-group" style={{ marginBottom: '1.5rem' }}>
                      <Link to={`/services/category/${cat.key}`} className="mega-title-link" onClick={handleLinkClick}>
                        <h4 className="mega-title" style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase' }}>{cat.title}</h4>
                      </Link>
                      {cat.services.map((svc, sIdx) => (
                        <Link 
                          key={sIdx} 
                          to={`/inquire/${encodeURIComponent(svc)}`} 
                          className="mega-link" 
                          onClick={handleLinkClick}
                          style={{ fontSize: '0.82rem', padding: '0.15rem 0', color: 'var(--text-secondary)' }}
                        >
                          {svc}
                        </Link>
                      ))}
                    </div>
                  ))
                )}
              </div>

              {/* Column 3: Certification & Licensing */}
              <div className="mega-column">
                <div style={{ marginBottom: '1.25rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.5px' }}>CERTIFICATION & LICENSING</h3>
                </div>
                {categories.filter(c => c.division === 'certification').length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No services configured</p>
                ) : (
                  categories.filter(c => c.division === 'certification').map((cat) => (
                    <div key={cat.key} className="mega-group" style={{ marginBottom: '1.5rem' }}>
                      <Link to={`/services/category/${cat.key}`} className="mega-title-link" onClick={handleLinkClick}>
                        <h4 className="mega-title" style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase' }}>{cat.title}</h4>
                      </Link>
                      {cat.services.map((svc, sIdx) => (
                        <Link 
                          key={sIdx} 
                          to={`/inquire/${encodeURIComponent(svc)}`} 
                          className="mega-link" 
                          onClick={handleLinkClick}
                          style={{ fontSize: '0.82rem', padding: '0.15rem 0', color: 'var(--text-secondary)' }}
                        >
                          {svc}
                        </Link>
                      ))}
                    </div>
                  ))
                )}
              </div>

            </div>
          </li>
          
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              About Us
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/calculator" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Duty Estimator
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Contact & Support
            </NavLink>
          </li>
        </ul>

        <div className="pc-only" style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: '#0f0f10',
              border: '1px solid var(--bg-tertiary)',
              borderRadius: '50px',
              padding: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '64px',
              height: '32px',
              position: 'relative',
              marginRight: '1.25rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              verticalAlign: 'middle'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: theme === 'light' ? '#ff7236' : '#1b365d',
              position: 'absolute',
              top: '3px',
              left: theme === 'light' ? '3px' : '35px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              {theme === 'light' ? <Sun size={12} color="#ffffff" /> : <Moon size={12} color="#ffffff" />}
            </div>
            <Sun size={12} color="#ff7236" style={{ marginLeft: '6px', opacity: theme === 'light' ? 0.3 : 1 }} />
            <Moon size={12} color="#1b365d" style={{ marginRight: '6px', opacity: theme === 'dark' ? 0.3 : 1 }} />
          </button>

          <NavLink to="/contact" className="btn btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }} onClick={handleLinkClick}>
            <PhoneCall size={14} />
            <span>Book Consultation</span>
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#fbf9f4',
          borderBottom: '1px solid var(--bg-tertiary)',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          zIndex: 99
        }}>
          <NavLink to="/" className="nav-link" onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/services" className="nav-link" onClick={handleLinkClick}>Services</NavLink>
          <NavLink to="/about" className="nav-link" onClick={handleLinkClick}>About Us</NavLink>
          <NavLink to="/calculator" className="nav-link" onClick={handleLinkClick}>Duty Estimator</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={handleLinkClick}>Contact & Support</NavLink>
          <NavLink to="/contact" className="btn btn-primary" style={{ marginTop: '0.5rem' }} onClick={handleLinkClick}>
            <PhoneCall size={16} />
            <span>Book Consultation</span>
          </NavLink>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', borderTop: '1px solid var(--bg-tertiary)', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Dark Theme</span>
            <button 
              onClick={toggleTheme}
              style={{
                background: '#0f0f10',
                border: '1px solid var(--bg-tertiary)',
                borderRadius: '50px',
                padding: '4px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '64px',
                height: '32px',
                position: 'relative',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              aria-label="Toggle Theme"
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: theme === 'light' ? '#ff7236' : '#1b365d',
                position: 'absolute',
                top: '3px',
                left: theme === 'light' ? '3px' : '35px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                {theme === 'light' ? <Sun size={12} color="#ffffff" /> : <Moon size={12} color="#ffffff" />}
              </div>
              <Sun size={12} color="#ff7236" style={{ marginLeft: '6px', opacity: theme === 'light' ? 0.3 : 1 }} />
              <Moon size={12} color="#1b365d" style={{ marginRight: '6px', opacity: theme === 'dark' ? 0.3 : 1 }} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
