import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo footer-logo">
              <Globe size={24} style={{ color: 'var(--primary)', strokeWidth: 2.5 }} />
              <span>EXIM <span className="logo-sub">GURU MANTRA</span></span>
            </div>
            <p className="footer-about">
              Empowering global trade through seamless legal, taxation, and customs compliance services. Your reliable partner in Import-Export consultancy.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a 
                href="https://www.youtube.com/channel/UCKRUu69BuybTj4C-w-PHCLg" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube Channel"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--primary)',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.background = 'var(--primary)'; 
                  e.currentTarget.style.color = '#ffffff'; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.background = 'var(--bg-secondary)'; 
                  e.currentTarget.style.color = 'var(--primary)'; 
                }}
              >
                <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.002 3.002 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Consulting Services</h4>
            <ul className="footer-links">
              <li><Link to="/services" className="footer-link">IEC Registration</Link></li>
              <li><Link to="/services" className="footer-link">RCMC & Council Profile</Link></li>
              <li><Link to="/services" className="footer-link">Customs Clearance</Link></li>
              <li><Link to="/services" className="footer-link">Incentive Drawbacks</Link></li>
              <li><Link to="/services" className="footer-link">FEMA Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Interactive Utilities</h4>
            <ul className="footer-links">
              <li><Link to="/calculator" className="footer-link">Duty Estimator</Link></li>
              <li><Link to="/calculator" className="footer-link">Drawback Calculator</Link></li>
              <li><Link to="/services" className="footer-link">HS Code Reference</Link></li>
              <li><Link to="/contact" className="footer-link">DGFT Helpdesk</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Direct Contact</h4>
            <ul className="footer-links" style={{ gap: '0.75rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  JG-2 /25, Ground Floor, Vikaspuri West, Delhi - 110018
                </span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>+91 88104 00251</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>eximgurumantra@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Exim Guru Mantra Associates. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about" className="footer-link">About Us</Link>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
