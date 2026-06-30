import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Link as LinkIcon 
} from 'lucide-react';

// Custom SVG Brand Icons
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0-.46-5.12 29 29 0 0 0-.46-5.12z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);

const iconMap = {
  Youtube: YoutubeIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  Facebook: FacebookIcon,
  Linkedin: LinkedinIcon,
  Phone: Phone,
  Mail: Mail,
  Link: LinkIcon
};

export default function Footer() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await fetch('/api/settings/socials');
        if (res.ok) {
          const data = await res.json();
          setSocials(data);
        }
      } catch (err) {
        console.error('Failed to load social links in footer:', err);
      }
    };
    fetchSocials();
  }, []);

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
            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              {socials.map((social, idx) => {
                const IconComp = iconMap[social.icon] || LinkIcon;
                return (
                  <a 
                    key={idx}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.platform}
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
                    <IconComp size={18} />
                  </a>
                );
              })}
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
            <Link to="/admin" className="footer-link" style={{ opacity: 0.4 }}>Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
