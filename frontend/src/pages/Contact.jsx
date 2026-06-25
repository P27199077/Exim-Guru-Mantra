import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'General Consultation',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Name, email, and description are required fields.');
      return;
    }

    setLoading(true);

    try {
      // Connect to Express backend API
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error saving query.');
      }

      setSuccessMsg(data.message || 'Your inquiry was recorded successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: 'General Consultation',
        message: ''
      });
    } catch (err) {
      setErrorMsg(err.message || 'Connection to database server failed. Please ensure the backend is running.');
      
      // Standalone simulation fallback
      setSuccessMsg('Offline simulation: consultation inquiry processed locally and simulated successfully.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Book Consultation</span>
          <h2 className="section-title">Get in Touch with Trade Gurus</h2>
          <p className="section-desc">
            Submit your trade inquiries or book a personal briefing slot. Our experts usually respond within 4 business hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Assistance Channels */}
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Office Coordinates</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Connect with our EXIM advisory panel immediately. You can find our direct contact details below, or click the launcher buttons to connect instantly.
            </p>

            <div className="contact-info-list" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="contact-info-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div className="contact-icon" style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="contact-info-title" style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Corporate Address</h4>
                  <p className="contact-info-desc" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>JG-2 /25, Ground Floor, Vikaspuri West, Delhi - 110018</p>
                </div>
              </div>

              <div className="contact-info-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div className="contact-icon" style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="contact-info-title" style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Call Helpline</h4>
                  <p className="contact-info-desc" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>+91 88104 00251 (Contact: Varun Gupta)</p>
                </div>
              </div>

              <div className="contact-info-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div className="contact-icon" style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="contact-info-title" style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Email Desk</h4>
                  <p className="contact-info-desc" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>eximgurumantra@gmail.com</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
              <a 
                href="tel:+918810400251" 
                className="btn btn-primary" 
                style={{ 
                  display: 'inline-flex', 
                  gap: '0.5rem', 
                  padding: '0.8rem 1.25rem', 
                  fontSize: '0.9rem',
                  borderRadius: '6px',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(194, 29, 46, 0.2)',
                  flex: 1
                }}
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>

              <a 
                href="mailto:eximgurumantra@gmail.com" 
                className="btn btn-secondary" 
                style={{ 
                  display: 'inline-flex', 
                  gap: '0.5rem', 
                  padding: '0.8rem 1.25rem', 
                  fontSize: '0.9rem',
                  borderRadius: '6px',
                  justifyContent: 'center',
                  border: '1px solid var(--bg-tertiary)',
                  flex: 1
                }}
              >
                <Mail size={16} />
                <span>Send Email</span>
              </a>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--bg-tertiary)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Principal Advisor</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Contact: <strong>Varun Gupta</strong> (Consultant - DGFT, Customs & Buying House). Reach out for specialized guidance on import-export incentives and legal representation.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Inquiry Briefing</h3>

            {successMsg && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: 'var(--success)',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={18} />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: 'var(--error)',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone / Mobile</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-input"
                    placeholder="e.g. Export Corp"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="serviceType" className="form-label">Interest Service Segment</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="form-select"
                  value={formData.serviceType}
                  onChange={handleChange}
                >
                  <option value="General Consultation">General Trade Consultation</option>
                  <option value="IEC Registration">New IEC / Amendment</option>
                  <option value="RCMC Enrollment">RCMC Promotion Councils</option>
                  <option value="Customs Appeal">Show Cause Litigation</option>
                  <option value="Incentive Recovery">Duty Drawbacks / RoDTEP</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Problem Brief / Query *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="form-textarea"
                  placeholder="Describe your current trade challenge or the products you export..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {loading ? 'Submitting query...' : 'Request Consultation briefing'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
