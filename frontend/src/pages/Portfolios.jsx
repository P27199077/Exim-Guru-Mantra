import React, { useEffect } from 'react';
import { Target, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Portfolios() {
  useEffect(() => {
    document.title = "Client Success Portfolios | EXIM Guru Mantra";
    window.scrollTo(0, 0);
  }, []);

  const portfoliosData = [
    {
      title: "Solar Equipment Import & Clearance",
      client: "GreenTech Energy Solutions",
      metric: "Cleared in 18 Hours",
      benefit: "Saved 12% Demurrage Fees",
      desc: "Managed high-volume customs clearance for custom solar inverters at ICD Tuglakabad. Successfully classified equipment under concessional duty tariffs, mitigating classification objection risks.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80"
    },
    {
      title: "GST Input Tax Credit Recovery",
      client: "AutoDrive Components Ltd",
      metric: "₹45 Lakhs Saved",
      benefit: "Zero Penalty Audit",
      desc: "Conducted automated GSTR-2B vs purchase register reconciliation. Recovered missing supplier inputs and defended against GST Department mismatch notices without payment of additional tax interest.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80"
    },
    {
      title: "Star Export House Incentive Setup",
      client: "IndoTex Fabrics & Apparel",
      metric: "Status Granted in 15 Days",
      benefit: "Unlocked RoDTEP Benefits",
      desc: "Compiled cumulative export turnover data to secure Star Export House certification from DGFT. Enabled self-declaration benefits, simplified custom bonding, and secured duty drawbacks.",
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=600&auto=format&fit=crop&q=80"
    },
    {
      title: "Multi-Modal Perishable Freight forwarding",
      client: "OrganicFresh Farms Exporting",
      metric: "100% On-Time Transit",
      benefit: "FSSAI & Phytosanitary Clearances",
      desc: "Coordinated cold-chain temperature-controlled air freight forwarding to European ports. Managed pre-shipment documentation, APEDA profiles, and instant health checks.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
          <span className="section-subtitle">Case Studies</span>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Our Portfolios & Client Success
          </h1>
          <p className="section-desc" style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto' }}>
            Real examples of how our advisory panel and cargo coordinators optimize logistics, secure duty savings, and maintain trade compliance.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="responsive-grid-portfolio">
          {portfoliosData.map((item, idx) => (
            <div 
              key={idx} 
              style={{
                background: '#ffffff',
                border: '1px solid var(--bg-tertiary)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Block */}
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {item.metric}
                </div>
              </div>

              {/* Text Block */}
              <div style={{ padding: '2.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Client: {item.client}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.35rem 0 1rem 0', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  borderTop: '1px solid var(--bg-tertiary)', 
                  paddingTop: '1.25rem',
                  fontSize: '0.85rem',
                  color: 'var(--success)',
                  fontWeight: 700
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={16} />
                    <span>{item.benefit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
