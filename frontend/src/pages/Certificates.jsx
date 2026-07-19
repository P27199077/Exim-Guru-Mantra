import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, FileText, Send, CheckCircle2, Shield, UserCheck, Star } from 'lucide-react';

export default function Certificates() {
  const [submitted, setSubmitted] = useState(false);
  const [certificateList, setCertificateList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    certificateType: 'Import Export Code (IEC) Certificate',
    firmName: '',
    details: ''
  });

  useEffect(() => {
    document.title = "Trade Certificates & Licensing | EXIM Guru Mantra";
    window.scrollTo(0, 0);

    const loadContent = async () => {
      try {
        const res = await fetch('/api/page-content/certificates');
        if (res.ok) {
          const data = await res.json();
          setCertificateList(data);
        }
      } catch (err) {
        console.error('Failed to load certificates content:', err);
      }
    };
    loadContent();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
          <span className="section-subtitle">Licensing Desk</span>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Trade Certificates & Registrations
          </h1>
          <p className="section-desc" style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto' }}>
            Get certified to import and export globally. Our team of legal experts, CA/CS, and liaisons handles end-to-end filing and fast-tracks your certifications.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="responsive-grid-about-3" style={{ marginBottom: '5rem' }}>
          {certificateList.map((cert, idx) => (
            <div 
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid var(--bg-tertiary)',
                borderRadius: '10px',
                padding: '2.25rem 2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                background: 'rgba(27, 54, 93, 0.05)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Award size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {cert.title}
              </h3>
              <span style={{ 
                fontSize: '0.72rem', 
                color: 'var(--primary)', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px', 
                marginBottom: '0.85rem',
                display: 'block'
              }}>
                {cert.authority}
              </span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                {cert.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sourcing Form */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--bg-tertiary)',
          borderRadius: '12px',
          padding: '3.5rem 3rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Certificate Application Desk</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
              Submit your firm details for immediate filing and document verification under regional authorities.
            </p>
          </div>

          {submitted ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              background: '#ffffff',
              border: '1px solid var(--bg-tertiary)',
              borderRadius: '8px'
            }}>
              <CheckCircle2 size={54} style={{ color: 'var(--success)', marginBottom: '1.25rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Filing Request Received!</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                Thank you. Our licensing team will contact you shortly to collect your company PAN, digital signatures, and office address deeds to start the application.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="responsive-grid-calculator">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Target License / Certificate</label>
                <select 
                  name="certificateType"
                  value={formData.certificateType}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                >
                  <option>Import Export Code (IEC) Certificate</option>
                  <option>RCMC (Export Council Membership)</option>
                  <option>CPCB Pollution Consent / EPR Certificate</option>
                  <option>FSSAI Food Safety License</option>
                  <option>MSME / Udyam Business Certificate</option>
                  <option>Trademark / Logo Registration</option>
                  <option>Digital Signature (DSC) Class 3</option>
                  <option>ISO Standard Certification</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Company / Firm Name</label>
                <input 
                  type="text" 
                  name="firmName"
                  required
                  value={formData.firmName}
                  onChange={handleInputChange}
                  placeholder="Enter firm name"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Specific Requirements / Current Setup</label>
                <textarea 
                  name="details"
                  rows="4"
                  required
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Tell us if you have existing GST, PAN, address proofs or any previous registrations..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none', resize: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 700 }}>
                  <Send size={16} />
                  <span>Submit Filing Request</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
