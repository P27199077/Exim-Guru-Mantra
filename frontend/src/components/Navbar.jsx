import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Globe, Menu, X, PhoneCall, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer open state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop services mega-dropdown state
  const [categories, setCategories] = useState([]);

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
              {/* Dynamically chunk categories into groups of 2 for the 4-column layout */}
              {Array.from({ length: Math.ceil(categories.length / 2) }).map((_, colIdx) => (
                <div key={colIdx} className="mega-column">
                  {categories.slice(colIdx * 2, colIdx * 2 + 2).map((cat) => (
                    <div key={cat.key} className="mega-group">
                      <Link to={`/services/category/${cat.key}`} className="mega-title-link" onClick={handleLinkClick}>
                        <h4 className="mega-title">{cat.title}</h4>
                      </Link>
                      {cat.services.map((svc, sIdx) => (
                        <Link 
                          key={sIdx} 
                          to={`/inquire/${encodeURIComponent(svc)}`} 
                          className="mega-link" 
                          onClick={handleLinkClick}
                        >
                          {svc}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
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

        <div className="pc-only">
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
        </div>
      )}
    </nav>
  );
}
