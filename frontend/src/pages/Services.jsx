import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, Eye, ShieldCheck } from 'lucide-react';

const timelineServices = [
  {
    key: 'taxation-and-compliances',
    title: 'Taxation And Compliances',
    position: 'top',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    desc: 'Managing corporate and individual direct taxation is critical for regulatory standing and cash flow optimization. Our team of expert CAs handles end-to-end filing, planning, and dispute representation.'
  },
  {
    key: 'audit-and-assurance',
    title: 'Audit And Assurance',
    position: 'bottom',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    desc: 'Providing transparency, accountability, and reliability to investors and regulatory boards. We carry out audits in accordance with standard auditing standards (SA) issued by ICAI.'
  },
  {
    key: 'goods-and-service-tax',
    title: 'Goods And Service Tax (GST)',
    position: 'top',
    img: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fa39?w=600&auto=format&fit=crop&q=80',
    desc: 'GST compliance is transaction-heavy and requires strict data reconciliation (GSTR-2B vs GSTR-3B). Our automated indirect tax desk helps manage monthly returns, audits, and litigation.'
  },
  {
    key: 'company-and-llp-compliances',
    title: 'Company And LLP Compliances',
    position: 'bottom',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    desc: 'Ongoing compliance under MCA rules is essential to keep your business active and avoid heavy daily late fees (₹100/day for default filings). We help keep your ROC status Active.'
  },
  {
    key: 'international-taxation',
    title: 'International Taxation',
    position: 'top',
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=80',
    desc: 'Managing cross-border tax liabilities requires deep understanding of Double Taxation Avoidance Agreements (DTAA) and Transfer Pricing guidelines under Chapter X of the Income Tax Act.'
  },
  {
    key: 'registration',
    title: 'Business Registrations',
    position: 'bottom',
    img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    desc: 'Kickstart your business setup with essential licensing. We cover MSME registrations, food licenses, export registration codes, and labor department registrations.'
  },
  {
    key: 'account-outsourcing-and-bookkeeping',
    title: 'Account Outsourcing & Bookkeeping',
    position: 'top',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    desc: 'Focus on scaling your business while we handle day-to-day books. We deploy modern accounting tools (Tally, QuickBooks) to ensure audit-ready ledger structures.'
  },
  {
    key: 'intellectual-property',
    title: 'Intellectual Property (IPR)',
    position: 'bottom',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    desc: 'Protect your unique brand identity, logo, or proprietary software. We handle trademark searches, assignments, renewals, and legal responses to trademark objections.'
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  return (
    <div className="section" style={{ minHeight: '80vh', overflow: 'visible' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Exim Guru Mantra Portfolios</span>
          <h2 className="section-title">Interactive Compliance Landscape</h2>
          <p className="section-desc">
            Hover over any service category node along our trade timeline to preview service scopes, legal requirements, and directly navigate to full guidelines.
          </p>
        </div>

        {/* Timeline Visual Container */}
        <div className="timeline-container">
          {/* Horizontal Line (Desktop) */}
          <div className="timeline-line"></div>

          {/* Timeline Nodes Grid */}
          <div className="timeline-nodes-grid">
            {timelineServices.map((service, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div 
                  key={service.key} 
                  className={`timeline-node-wrapper ${service.position}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Node Title Link */}
                  <Link 
                    to={`/services/category/${service.key}`} 
                    className="timeline-node-title"
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

        {/* Informative Grid below for direct list representation */}
        <div style={{ marginTop: '7rem', borderTop: '1px solid var(--bg-tertiary)', paddingTop: '4rem' }}>
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.75rem' }}>What All Services We Have To Offer</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Click directly to navigate to legal compliance checklists.</p>
          </div>

          <div className="cards-grid">
            {timelineServices.map((service) => (
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
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: '700' }}>
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
      </div>
    </div>
  );
}
