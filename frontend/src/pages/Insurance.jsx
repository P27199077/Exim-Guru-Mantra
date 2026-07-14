import React, { useState, useEffect } from 'react';
import { Shield, Plane, Anchor, Truck, Warehouse, User, Building, Heart, Car, HelpCircle, Send, CheckCircle2 } from 'lucide-react';

export default function Insurance() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    insuranceType: 'Marine Cargo Insurance (Ocean Transit)',
    value: '',
    details: ''
  });

  useEffect(() => {
    document.title = "Global Cargo & Transit Insurance | EXIM Guru Mantra";
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const insuranceCategories = [
    {
      title: "Air Cargo Insurance",
      icon: Plane,
      desc: "Protects high-value, time-sensitive goods in air transit against loss, damage, theft, or flight handling errors."
    },
    {
      title: "Marine Cargo Insurance",
      icon: Anchor,
      desc: "Secures ocean transit shipments against perils of the sea, damage, container losses, and general average declarations."
    },
    {
      title: "Surface Cargo / Land Transit",
      icon: Truck,
      desc: "Covers local and cross-border road/rail cargo freight movements against collision, theft, or delay damages."
    },
    {
      title: "Warehouse Cover & Storage",
      icon: Warehouse,
      desc: "Protects goods stored in transit depots, custom-bonded areas, or third-party logistics (3PL) warehousing."
    },
    {
      title: "Individual Coverage",
      icon: User,
      desc: "Tailored ad-hoc insurance coverage profiles for single-shipment exports or spot LCL cargo runs."
    },
    {
      title: "Company Liability Insurance",
      icon: Building,
      desc: "Comprehensive error-and-omission protection, commercial liabilities, and business financial risks coverage."
    },
    {
      title: "Personal / Person Accident Protection",
      icon: Heart,
      desc: "Accident liability coverage for logistics crew members, warehousing workers, and cargo loaders."
    },
    {
      title: "Vehicle Cargo Insurance",
      icon: Car,
      desc: "Insures truck fleets, specialized cargo trailers, and transport vehicles assets against physical damages."
    },
    {
      title: "General Transit Liability Cover",
      icon: Shield,
      desc: "Standard third-party cargo claims, compliance error liability, and terminal handling security cover."
    }
  ];

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
          <span className="section-subtitle">Risk Mitigation</span>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Global Cargo & Transit Insurance
          </h1>
          <p className="section-desc" style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto' }}>
            Protect your cross-border supply chain investments. Our expert risk panel matches your logistics routes with maximum liability insurance protection plans.
          </p>
        </div>

        {/* Insurance Grid */}
        <div className="responsive-grid-about-3" style={{ marginBottom: '5rem' }}>
          {insuranceCategories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
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
                  <IconComp size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                  {cat.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Insurance Request Form */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--bg-tertiary)',
          borderRadius: '12px',
          padding: '3.5rem 3rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Request Insurance Quote</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
              Let our compliance specialists verify your transit parameters and obtain the most competitive insurance policy options.
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
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Quote Request Logged!</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                Thank you. Our transit risk advisory desk will audit your shipment value and coordinate with leading marine/transit insurance underwriters to send you options within 24 hours.
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
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Coverage Profile</label>
                <select 
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                >
                  <option>Air Cargo Insurance</option>
                  <option>Marine Cargo Insurance (Ocean Transit)</option>
                  <option>Surface / Land Transit Cover</option>
                  <option>Warehouse Cover & Storage Insurance</option>
                  <option>Company & Corporate Liability Cover</option>
                  <option>General Transit Liability / Individual Spot Cover</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Declared Shipment CIF Value (INR)</label>
                <input 
                  type="text" 
                  name="value"
                  required
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="e.g. ₹20,00,000"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Shipment Route, Commodities, & Details</label>
                <textarea 
                  name="details"
                  rows="4"
                  required
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Enter loading port, destination port, shipping line name, commodities details..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', background: '#ffffff', outline: 'none', resize: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 700 }}>
                  <Send size={16} />
                  <span>Request Quote Options</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
