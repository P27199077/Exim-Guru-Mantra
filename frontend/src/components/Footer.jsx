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
            <h4 className="footer-title">Contact Office</h4>
            <ul className="footer-links" style={{ gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <span>13, Krishna Park Ext., Tilak Nagar, New Delhi - 110018</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--primary)' }} />
                <span>+91 93541 79311</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--primary)' }} />
                <span>info@eximgurumantra.com</span>
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
