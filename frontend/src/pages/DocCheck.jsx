import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function DocCheck() {
  const [iecCheckResult, setIecCheckResult] = useState(null);
  const [checklist, setChecklist] = useState({
    pan: false,
    bankAccount: false,
    hasDigitalSignature: false,
    commercialAddress: false
  });

  useEffect(() => {
    document.title = "Document Checklist | EXIM Guru Mantra";
    window.scrollTo(0, 0);
  }, []);

  const handleCheckboxChange = (key) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const verifyIecEligibility = (e) => {
    e.preventDefault();
    const count = Object.values(checklist).filter(Boolean).length;
    if (count === 4) {
      setIecCheckResult({
        status: 'eligible',
        title: 'Perfectly Eligible!',
        description: 'You have all the mandatory prerequisites. We can help you secure your IEC in under 24 hours.'
      });
    } else {
      setIecCheckResult({
        status: 'pending',
        title: 'Documents Pending',
        description: `You are missing some prerequisites. In particular, you need to acquire ${
          !checklist.pan ? 'Company/Individual PAN, ' : ''
        }${!checklist.bankAccount ? 'Active Current Account, ' : ''}${
          !checklist.hasDigitalSignature ? 'Digital Signature Certificate (DSC), ' : ''
        }${!checklist.commercialAddress ? 'Address Proof for place of business, ' : ''}before filing. We can help arrange these for you!`
      });
    }
  };

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Page Header */}
        <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="section-subtitle">Compliance Check</span>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Document Verification
          </h1>
          <p className="section-desc" style={{ fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto' }}>
            Verify if your firm is fully equipped to apply for an Import Export Code (IEC) instantly and check all prerequisite global trade standards.
          </p>
        </div>

        {/* Content Grid */}
        <div className="doccheck-grid" style={{ display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: '4rem', alignItems: 'start', marginTop: '2rem' }}>
          
          {/* Left Column: Information Card */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '3rem', border: '1px solid var(--bg-tertiary)' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', textAlign: 'left', margin: '0 0 1rem 0' }}>
              Prerequisites for <span>Global Trade</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
              Setting up an import-export firm in India requires specific mandatory documents under Director General of Foreign Trade (DGFT) and Customs guidelines. Use our interactive checklist tool on the right to instantly verify if your firm is ready to apply for the Import Export Code (IEC).
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--bg-tertiary)', borderRadius: '50%', display: 'flex', padding: '10px' }}>
                  <ShieldCheck size={22} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>Fast-Track Approval</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Once documents are verified and ready, get registered and have your IEC issued by the DGFT portal in under 24 hours.
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                <div style={{ background: 'var(--card-bg)', border: '1px solid var(--bg-tertiary)', borderRadius: '50%', display: 'flex', padding: '10px' }}>
                  <ShieldCheck size={22} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>100% Compliant Process</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Our team processes applications in compliance with the latest Star House exports standards and customs frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Dynamic Form Widget */}
          <div className="hero-card" style={{ background: '#ffffff', border: '1px solid var(--bg-tertiary)', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              <ShieldCheck size={22} style={{ color: 'var(--accent)' }} />
              <span>EXIM Document Checklist</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '2rem', lineHeight: '1.5' }}>
              Select the boxes below for documents you possess to check if you qualify for immediate registration.
            </p>

            <form onSubmit={verifyIecEligibility}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <label style={{ display: 'flex', gap: '0.85rem', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--text-primary)', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={checklist.pan}
                    onChange={() => handleCheckboxChange('pan')}
                    style={{ accentColor: '#ff7236', width: '18px', height: '18px' }}
                  />
                  <span>Possess Individual / Company PAN Card</span>
                </label>
                <label style={{ display: 'flex', gap: '0.85rem', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--text-primary)', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={checklist.bankAccount}
                    onChange={() => handleCheckboxChange('bankAccount')}
                    style={{ accentColor: '#ff7236', width: '18px', height: '18px' }}
                  />
                  <span>Active Bank Account with Cancelled Cheque</span>
                </label>
                <label style={{ display: 'flex', gap: '0.85rem', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--text-primary)', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={checklist.hasDigitalSignature}
                    onChange={() => handleCheckboxChange('hasDigitalSignature')}
                    style={{ accentColor: '#ff7236', width: '18px', height: '18px' }}
                  />
                  <span>Digital Signature Certificate (Class 3 DSC)</span>
                </label>
                <label style={{ display: 'flex', gap: '0.85rem', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--text-primary)', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    checked={checklist.commercialAddress}
                    onChange={() => handleCheckboxChange('commercialAddress')}
                    style={{ accentColor: '#ff7236', width: '18px', height: '18px' }}
                  />
                  <span>Proof of Business Address (Rent/Utility Bill)</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', fontWeight: '700' }}>
                Verify Setup Ready
              </button>
            </form>

            {iecCheckResult && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                borderRadius: '8px',
                background: iecCheckResult.status === 'eligible' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 114, 54, 0.08)',
                border: `1px solid ${iecCheckResult.status === 'eligible' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 114, 54, 0.2)'}`
              }}>
                <h4 style={{
                  color: iecCheckResult.status === 'eligible' ? 'var(--success)' : 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  marginBottom: '0.35rem'
                }}>
                  {iecCheckResult.status === 'eligible' ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                  {iecCheckResult.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  {iecCheckResult.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
