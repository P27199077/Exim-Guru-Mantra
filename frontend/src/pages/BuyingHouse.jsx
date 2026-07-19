import React, { useState, useEffect } from 'react';
import { Search, CheckSquare, Coins, Box, Send, CheckCircle2 } from 'lucide-react';

export default function BuyingHouse() {
  const [submitted, setSubmitted] = useState(false);
  const [buyingHouseServices, setBuyingHouseServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Textiles & Apparel',
    volume: 'LCL (Less than Container)',
    targetPrice: '',
    requirements: ''
  });

  useEffect(() => {
    document.title = "Buying House & Procurement Services | EXIM Guru Mantra";
    window.scrollTo(0, 0);

    const loadContent = async () => {
      try {
        const res = await fetch('/api/page-content/buying-house');
        if (res.ok) {
          const data = await res.json();
          setBuyingHouseServices(data);
        }
      } catch (err) {
        console.error('Failed to load buying house content:', err);
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

  const getIcon = (title) => {
    const key = title ? title.toLowerCase() : '';
    if (key.includes('source') || key.includes('audit') || key.includes('supplier')) return Search;
    if (key.includes('quality') || key.includes('inspect') || key.includes('control') || key.includes('check')) return CheckSquare;
    if (key.includes('negotiate') || key.includes('cost') || key.includes('price') || key.includes('opti')) return Coins;
    return Box;
  };

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
          <span className="section-subtitle">Procurement Desk</span>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Buying House & Sourcing Services
          </h1>
          <p className="section-desc" style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto' }}>
            We act as your dedicated sourcing office in India, managing everything from supplier audit verifications and product inspections to price negotiations and export consolidations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="responsive-grid-about-2" style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {buyingHouseServices.map((svc, idx) => {
              const IconComp = getIcon(svc.title);
              return (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--bg-tertiary)',
                    borderRadius: '10px',
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
                    transition: 'transform 0.2s ease'
                  }}
                  className="role-card"
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
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div>
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80" 
              alt="Logistics Consolidation Center" 
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '1px solid var(--bg-tertiary)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
              }}
            />
          </div>
        </div>

        {/* Inquiry Form Section */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--bg-tertiary)',
          borderRadius: '12px',
          padding: '3.5rem 3rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Sourcing Inquiry Form</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
              Submit your product specifications, target pricing, and estimated order volumes for direct factory vetting.
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
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Sourcing Inquiry Logged!</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                Thank you. Our procurement coordinators will check matching verified supplier databases in India and contact you with a diagnostic pricing sheet within 48 hours.
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
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Product Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                >
                  <option>Textiles & Apparel</option>
                  <option>Agricultural Commodities</option>
                  <option>Machinery & Hardware</option>
                  <option>Chemicals & Plastics</option>
                  <option>Handicrafts & Decoratives</option>
                  <option>Other / Customs Category</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Estimated Order Volume</label>
                <select 
                  name="volume"
                  value={formData.volume}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                >
                  <option>LCL (Less than Container)</option>
                  <option>1x 20ft FCL Container</option>
                  <option>1x 40ft HQ Container</option>
                  <option>Multiple containers monthly</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Target Unit Price / Specifications</label>
                <input 
                  type="text" 
                  name="targetPrice"
                  required
                  value={formData.targetPrice}
                  onChange={handleInputChange}
                  placeholder="e.g. $2.50 FOB Mumbai / Detailed specifications"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Special Material & Quality Requirements</label>
                <textarea 
                  name="requirements"
                  rows="4"
                  required
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Summarize product standard certificates needed (AQL specifications, packaging styles, certifications)..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none', resize: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 700 }}>
                  <Send size={16} />
                  <span>Submit Sourcing Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
