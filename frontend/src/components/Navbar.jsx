import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, PhoneCall, ChevronDown, Sun, Moon } from 'lucide-react';

const fallbackNavbarCategories = [
  {
    key: 'import-export-and-customs-clearance',
    title: 'Import-Export & Customs',
    division: 'import-export',
    services: [
      'Customs Broking & Clearance',
      'Sea & Air Freight Forwarding',
      'DGFT Liaisoning & Licensing',
      'Incentive & Duty Drawbacks Claims',
      'FEMA & Trade Compliance Advisory',
      'IEC Update & Maintenance'
    ]
  },
  {
    key: 'taxation-and-compliances',
    title: 'Taxation And Compliances',
    division: 'taxation',
    services: [
      'Overview - Direct And Indirect Tax',
      'Corporate Tax',
      'Income Tax Return Filing Services',
      'Income Tax Litigation Services',
      'Certification And Attestation Services',
      'TDS Return Filing'
    ]
  },
  {
    key: 'audit-and-assurance',
    title: 'Audit And Assurance',
    division: 'taxation',
    services: [
      'Overview - Audit And Assurance',
      'Statutory Audit',
      'Tax Audit',
      'Internal Audit',
      'Stock Audit',
      'Fixed Assets Audit'
    ]
  },
  {
    key: 'goods-and-service-tax',
    title: 'Goods And Service Tax (GST)',
    division: 'taxation',
    services: [
      'Overview - Goods And Services Tax',
      'GST Compliance Services',
      'GST Audit',
      'GST Litigation Services',
      'GST Refund'
    ]
  },
  {
    key: 'company-and-llp-compliances',
    title: 'Company & LLP Compliances',
    division: 'certification',
    services: [
      'Company Registration',
      'LLP Formation',
      'Company Annual Compliances',
      'Company Strike Off',
      'Company Annual Return Filing',
      'LLP Annual Return Filing',
      'One Person Company Registration'
    ]
  },
  {
    key: 'business-registrations',
    title: 'Business Registrations',
    division: 'certification',
    services: [
      'Trust Registration',
      'Society Registration',
      'IEC Registration',
      'MSME Registration',
      'FSSAI Registration',
      'ESI Registration'
    ]
  },
  {
    key: 'intellectual-property',
    title: 'Intellectual Property (IPR)',
    division: 'certification',
    services: [
      'Trademark Registration',
      'Trademark Assignment',
      'Trademark Renewal',
      'Trademark Objection Reply'
    ]
  }
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer open state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop services mega-dropdown state
  const [categories, setCategories] = useState(fallbackNavbarCategories);
  useEffect(() => {
    document.body.classList.remove('dark-theme');
    localStorage.removeItem('theme');
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
          }
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
              onClick={(e) => {
                // Toggle dropdown instead of navigation on screens under 1200px
                if (window.innerWidth < 1200) {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                } else {
                  handleLinkClick();
                }
              }}
            >
              <span>Services</span>
              <ChevronDown 
                size={14} 
                className="dropdown-arrow" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
              />
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
                  categories.filter(c => c.division === 'import-export').map((cat) => {
                    const isActive = location.pathname === `/services/category/${cat.key}`;
                    return (
                      <div key={cat.key} className="mega-group" style={{ marginBottom: '1.5rem' }}>
                        <Link to={`/services/category/${cat.key}`} className={isActive ? "mega-title-link active" : "mega-title-link"} onClick={handleLinkClick}>
                          <h4 
                            className="mega-title" 
                            style={{ 
                              fontSize: '0.88rem', 
                              fontWeight: '800', 
                              color: 'var(--primary)', 
                              textTransform: 'uppercase',
                              opacity: isActive ? 0.45 : 1,
                              transition: 'opacity 0.25s ease'
                            }}
                          >
                            {cat.title}
                          </h4>
                        </Link>
                        {cat.services.map((svc, sIdx) => {
                          const isSvcActive = location.pathname === `/inquire/${encodeURIComponent(svc)}`;
                          return (
                            <Link 
                              key={sIdx} 
                              to={`/inquire/${encodeURIComponent(svc)}`} 
                              className={isSvcActive ? "mega-link active" : "mega-link"} 
                              onClick={handleLinkClick}
                              style={{ fontSize: '0.82rem', padding: '0.15rem 0' }}
                            >
                              {svc}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })
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
                  categories.filter(c => c.division === 'taxation').map((cat) => {
                    const isActive = location.pathname === `/services/category/${cat.key}`;
                    return (
                      <div key={cat.key} className="mega-group" style={{ marginBottom: '1.5rem' }}>
                        <Link to={`/services/category/${cat.key}`} className={isActive ? "mega-title-link active" : "mega-title-link"} onClick={handleLinkClick}>
                          <h4 
                            className="mega-title" 
                            style={{ 
                              fontSize: '0.88rem', 
                              fontWeight: '800', 
                              color: 'var(--primary)', 
                              textTransform: 'uppercase',
                              opacity: isActive ? 0.45 : 1,
                              transition: 'opacity 0.25s ease'
                            }}
                          >
                            {cat.title}
                          </h4>
                        </Link>
                        {cat.services.map((svc, sIdx) => {
                          const isSvcActive = location.pathname === `/inquire/${encodeURIComponent(svc)}`;
                          return (
                            <Link 
                              key={sIdx} 
                              to={`/inquire/${encodeURIComponent(svc)}`} 
                              className={isSvcActive ? "mega-link active" : "mega-link"} 
                              onClick={handleLinkClick}
                              style={{ fontSize: '0.82rem', padding: '0.15rem 0' }}
                            >
                              {svc}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })
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
                  categories.filter(c => c.division === 'certification').map((cat) => {
                    const isActive = location.pathname === `/services/category/${cat.key}`;
                    return (
                      <div key={cat.key} className="mega-group" style={{ marginBottom: '1.5rem' }}>
                        <Link to={`/services/category/${cat.key}`} className={isActive ? "mega-title-link active" : "mega-title-link"} onClick={handleLinkClick}>
                          <h4 
                            className="mega-title" 
                            style={{ 
                              fontSize: '0.88rem', 
                              fontWeight: '800', 
                              color: 'var(--primary)', 
                              textTransform: 'uppercase',
                              opacity: isActive ? 0.45 : 1,
                              transition: 'opacity 0.25s ease'
                            }}
                          >
                            {cat.title}
                          </h4>
                        </Link>
                        {cat.services.map((svc, sIdx) => {
                          const isSvcActive = location.pathname === `/inquire/${encodeURIComponent(svc)}`;
                          return (
                            <Link 
                              key={sIdx} 
                              to={`/inquire/${encodeURIComponent(svc)}`} 
                              className={isSvcActive ? "mega-link active" : "mega-link"} 
                              onClick={handleLinkClick}
                              style={{ fontSize: '0.82rem', padding: '0.15rem 0' }}
                            >
                              {svc}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })
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
            <NavLink to="/buying-house" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Buying House
            </NavLink>
          </li>
          <li>
            <NavLink to="/insurance" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Insurance
            </NavLink>
          </li>
          <li>
            <NavLink to="/certificates" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Certificates
            </NavLink>
          </li>
          <li>
            <NavLink to="/careers" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink to="/doc-check" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Doc Check
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={handleLinkClick}>
              Contact & Support
            </NavLink>
          </li>
        </ul>

        <div className="pc-only" style={{ display: 'flex', alignItems: 'center' }}>
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
          <NavLink to="/buying-house" className="nav-link" onClick={handleLinkClick}>Buying House</NavLink>
          <NavLink to="/insurance" className="nav-link" onClick={handleLinkClick}>Insurance Services</NavLink>
          <NavLink to="/certificates" className="nav-link" onClick={handleLinkClick}>Licensing & Certificates</NavLink>
          <NavLink to="/doc-check" className="nav-link" onClick={handleLinkClick}>Doc Check</NavLink>
          <NavLink to="/faq" className="nav-link" onClick={handleLinkClick}>FAQ</NavLink>
          <NavLink to="/careers" className="nav-link" onClick={handleLinkClick}>Careers</NavLink>
          <NavLink to="/portfolios" className="nav-link" onClick={handleLinkClick}>Portfolios</NavLink>
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
