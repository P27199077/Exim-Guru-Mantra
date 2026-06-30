import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, Eye, ShieldCheck } from 'lucide-react';

export default function Services() {
  const [hoveredKey, setHoveredKey] = useState(null);
  const [timelineServices, setTimelineServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.title = "Our Services | EXIM Guru Mantra";
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setTimelineServices(data);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const divisions = [
    { key: 'import-export', name: 'Import-Export Services', subtitle: 'Global Logistics, CHA & Trade Compliance' },
    { key: 'taxation', name: 'Taxation & Auditing Services', subtitle: 'Direct & Indirect Tax Filings & Attestations' },
    { key: 'certification', name: 'Certification & Licensing Services', subtitle: 'Corporate Setup, MCA Filings & IPR Registrations' }
  ];

  return (
    <div className="section" style={{ minHeight: '80vh', overflow: 'visible' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '4rem' }}>
          <span className="section-subtitle">Exim Guru Mantra Portfolios</span>
          <h2 className="section-title">Interactive Compliance Landscape</h2>
          <p className="section-desc">
            Explore our business offerings divided across three core divisions. Hover over any service category node along our trade timelines to preview scopes and navigate directly to full guidelines.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
            Loading Trade Timelines...
          </div>
        ) : (
          divisions.map((divInfo) => {
            const groupServices = timelineServices.filter(s => s.division === divInfo.key);
            if (groupServices.length === 0) return null;

            return (
              <div key={divInfo.key} style={{ marginBottom: '6rem' }}>
                <div style={{ marginBottom: '2.5rem', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {divInfo.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{divInfo.subtitle}</p>
                </div>

                {/* Timeline Visual Container for this group */}
                <div className="timeline-container" style={{ padding: '6rem 0', margin: '2rem 0' }}>
                  {/* Horizontal Line (Desktop) */}
                  <div className="timeline-line"></div>

                  {/* Timeline Nodes Grid */}
                  <div className="timeline-nodes-grid" style={{ '--timeline-cols': groupServices.length }}>
                    {groupServices.map((service, index) => {
                      const isHovered = hoveredKey === service.key;
                      return (
                        <div 
                          key={service.key} 
                          className={`timeline-node-wrapper ${index % 2 === 0 ? 'top' : 'bottom'}`}
                          onMouseEnter={() => setHoveredKey(service.key)}
                          onMouseLeave={() => setHoveredKey(null)}
                        >
                          {/* Node Title Link */}
                          <Link 
                            to={`/services/category/${service.key}`} 
                            className="timeline-node-title"
                            style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                          >
                            {service.title}
                          </Link>

                          {/* Connecting Node Point on Timeline */}
                          <div className={`timeline-dot ${isHovered ? 'active' : ''}`}>
                            <div className="timeline-dot-inner"></div>
                          </div>

                          {/* Micro Preview Card Box */}
                          <div className={`timeline-preview-card ${isHovered ? 'visible' : ''}`}>
                            <img 
                              src={service.img} 
                              alt={service.title} 
                              className="timeline-preview-img"
                            />
                            <div className="timeline-preview-body">
                              <h4 className="timeline-preview-title">{service.title}</h4>
                              <p className="timeline-preview-desc">{service.desc}</p>
                              <Link 
                                to={`/services/category/${service.key}`} 
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', gap: '0.25rem' }}
                              >
                                <Eye size={12} />
                                <span>View Detailed Guidelines</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Informative Grid below for direct list representation */}
        <div style={{ marginTop: '7rem', borderTop: '1px solid var(--bg-tertiary)', paddingTop: '4rem' }}>
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <h3 style={{ fontSize: '1.75rem' }}>What All Services We Have To Offer</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Click directly to navigate to legal compliance checklists.</p>
          </div>

          {!loading && divisions.map((divInfo) => {
            const groupServices = timelineServices.filter(s => s.division === divInfo.key);
            if (groupServices.length === 0) return null;

            return (
              <div key={divInfo.key} style={{ marginBottom: '4rem' }}>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {divInfo.name}
                </h4>
                
                <div className="cards-grid">
                  {groupServices.map((service) => (
                    <div 
                      key={service.key} 
                      className="card advisory-card" 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        padding: 0,
                        overflow: 'hidden'
                      }}
                    >
                      {/* Image at the top of the card */}
                      <img 
                        src={service.img} 
                        alt={service.title} 
                        style={{
                          width: '100%',
                          height: '190px',
                          objectFit: 'cover',
                          borderBottom: '1px solid var(--bg-tertiary)'
                        }}
                      />
                      
                      {/* Text content details */}
                      <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: '700' }}>
                          {service.title}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', flexGrow: 1, marginBottom: '1.5rem', lineHeight: '1.5' }}>
                          {service.desc}
                        </p>
                        <Link 
                          to={`/services/category/${service.key}`} 
                          className="card-link" 
                          style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700' }}
                        >
                          <span>Check eligibility criteria</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
