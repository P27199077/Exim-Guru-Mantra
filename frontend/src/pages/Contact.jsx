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
      const response = await fetch('http://localhost:5005/api/consultation', {
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
          {/* Company Coordinates */}
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Office Head Office</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Located centrally in New Delhi, our advisory counsels are fully equipped to represent imports/exports across ICD Tuglakabad, Patparganj, and IGI Airport.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="contact-info-title">Corporate Address</h4>
                  <p className="contact-info-desc">JG-2 /25, Ground Floor, Vikaspuri West, Delhi - 110018</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="contact-info-title">Call Helpline (Contact: Varun Gupta)</h4>
                  <p className="contact-info-desc">+91 88104 00251</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="contact-info-title">Email Desk</h4>
                  <p className="contact-info-desc">eximgurumantra@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Stylized Visual Placeholder Map */}
            <div style={{
              marginTop: '3rem',
              height: '180px',
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0, left: 0,
                backgroundImage: 'radial-gradient(var(--card-border) 1px, transparent 0)',
                backgroundSize: '20px 20px',
                opacity: 0.5
              }}></div>
              <div style={{ zIndex: 1, textAlign: 'center' }}>
                <MapPin size={24} style={{ color: 'var(--accent)', marginBottom: '0.25rem' }} />
                <h5 style={{ color: '#ffffff', fontSize: '0.95rem' }}>Delhi - Vikaspuri West Circle</h5>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>28.6369° N, 77.0705° E</span>
              </div>
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
