import React, { useState, useEffect } from 'react';
import { Briefcase, Send, CheckCircle2 } from 'lucide-react';

export default function Careers() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Customs Clearance Executive',
    experience: '1-3 Years',
    coverLetter: ''
  });

  useEffect(() => {
    document.title = "Join Our Panel | Careers | EXIM Guru Mantra";
    window.scrollTo(0, 0);
  }, []);

  const openRoles = [
    {
      title: "Customs Clearance Executive",
      dept: "Customs Operations",
      location: "New Delhi Port / Remote",
      type: "Full-Time",
      desc: "Liaison with customs officials, handle HSN classifications, compile bill of entries, and coordinate shipping clearances."
    },
    {
      title: "Direct Tax CA Assistant",
      dept: "Taxation & Audit",
      location: "New Delhi Office",
      type: "Full-Time",
      desc: "Assist in preparing corporate and individual income tax returns, TDS filings, and resolving assessment notifications."
    },
    {
      title: "Logistics Coordination Associate",
      dept: "Freight & Shipping",
      location: "New Delhi / Hybrid",
      type: "Full-Time",
      desc: "Manage ocean and air cargo logs, verify carrier bookings, and update customers on transit timelines."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API application submission
    setSubmitted(true);
  };

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
          <span className="section-subtitle">Work With Us</span>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Careers at EXIM Guru Mantra
          </h1>
          <p className="section-desc" style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto' }}>
            Join our panel of chartered accountants, customs clearance specialists, and trade legal experts to simplify global commerce.
          </p>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4.5rem', alignItems: 'start' }}>
          
          {/* Job Listings Column */}
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}>
              <Briefcase size={22} style={{ color: 'var(--primary)' }} />
              <span>Current Open Positions</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {openRoles.map((role, idx) => (
                <div 
                  key={idx} 
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--bg-tertiary)',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.01)',
                    transition: 'transform 0.2s ease'
                  }}
                  className="role-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{role.title}</h3>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      background: 'var(--bg-secondary)', 
                      padding: '0.25rem 0.6rem', 
                      borderRadius: '4px', 
                      fontWeight: 600, 
                      color: 'var(--primary)',
                      alignSelf: 'start'
                    }}>{role.type}</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: 500 }}>
                    <span>{role.dept}</span>
                    <span>•</span>
                    <span>{role.location}</span>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                    {role.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Apply Column */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '12px', padding: '2.5rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Apply Online</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Submit your CV details and cover letter to be considered for our expert advisory panel.
            </p>

            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '2.5rem 1rem',
                background: '#ffffff',
                border: '1px solid var(--bg-tertiary)',
                borderRadius: '8px'
              }}>
                <CheckCircle2 size={48} style={{ color: 'var(--success)', marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Application Submitted!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  Thank you for applying. Our talent acquisition team will review your qualifications and reach out within 3-5 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
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
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Target Role</label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                  >
                    <option>Customs Clearance Executive</option>
                    <option>Direct Tax CA Assistant</option>
                    <option>Logistics Coordination Associate</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Years of Experience</label>
                  <select 
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                  >
                    <option>Fresh Graduate</option>
                    <option>1-3 Years</option>
                    <option>3-5 Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Brief Profile / Cover Letter</label>
                  <textarea 
                    name="coverLetter"
                    rows="4"
                    required
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Summarize your qualifications and interest in working with EXIM Guru Mantra..."
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none', resize: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Send size={14} />
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
