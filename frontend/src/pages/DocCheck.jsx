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

  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(prev => prev === index ? null : index);
  };

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

        {/* Business-Specific Documentation Accordions */}
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--bg-tertiary)', paddingTop: '4rem' }}>
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              Detailed Requirements by <span>Business Structure</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
              Select your business type below to view the exhaustive checklist of documents required for legal registrations and import-export licenses.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {businessChecklists.map((business, index) => {
              const isOpen = activeAccordion === index;
              return (
                <div 
                  key={index} 
                  style={{
                    background: isOpen ? 'var(--bg-secondary)' : '#ffffff',
                    border: '1px solid var(--bg-tertiary)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    style={{
                      width: '100%',
                      padding: '1.5rem 2rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      outline: 'none'
                    }}
                  >
                    <span style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '800', 
                      color: 'var(--primary)',
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '0.2px'
                    }}>
                      {business.title}
                    </span>
                    <span style={{
                      fontSize: '1.25rem',
                      color: 'var(--primary)',
                      fontWeight: '600',
                      transition: 'transform 0.3s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      ▼
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div style={{
                      padding: '0 2rem 2rem 2.25rem',
                      borderTop: '1px solid var(--bg-tertiary)',
                      background: '#ffffff',
                      paddingTop: '1.5rem'
                    }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '1.25rem' }}>
                        Please keep the following documents ready:
                      </p>

                      <ol style={{ 
                        margin: 0, 
                        paddingLeft: '1.25rem', 
                        color: 'var(--text-secondary)', 
                        fontSize: '0.92rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        lineHeight: '1.6'
                      }}>
                        {business.docs.map((doc, dIdx) => (
                          <li key={dIdx}>
                            <span>{doc.text}</span>
                            {doc.subs && (
                              <ul style={{ 
                                listStyleType: 'circle', 
                                marginTop: '0.4rem', 
                                paddingLeft: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.3rem',
                                color: 'var(--text-muted)'
                              }}>
                                {doc.subs.map((sub, sIdx) => (
                                  <li key={sIdx}>{sub}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ol>

                      {business.note && (
                        <div style={{
                          marginTop: '1.75rem',
                          background: 'rgba(255, 114, 54, 0.05)',
                          border: '1px solid rgba(255, 114, 54, 0.15)',
                          borderRadius: '8px',
                          padding: '1.25rem 1.5rem',
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'start'
                        }}>
                          <ShieldAlert size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                          <div>
                            <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                              Important Note
                            </strong>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                              {business.note}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

const businessChecklists = [
  {
    title: "Documents Required for an Individual / Proprietorship Firm",
    docs: [
      { text: "PAN Card of the Proprietor." },
      { text: "Aadhaar Card of the Proprietor." },
      { text: "Passport-size Photograph." },
      { text: "Mobile Number linked with Aadhaar." },
      { text: "Active Email ID." },
      { 
        text: "Business Address Proof (any one):", 
        subs: [
          "Electricity Bill",
          "Property Tax Receipt",
          "Rent Agreement (if rented)",
          "Sale Deed (if owned)"
        ] 
      },
      { text: "No Objection Certificate (NOC) from the property owner (if the premises are rented), if applicable." },
      { text: "Cancelled Cheque or Bank Passbook/Bank Statement showing the account holder's name and account number." },
      { text: "GST Registration Certificate (if applicable)." },
      { text: "Import Export Code (IEC) Certificate (if applicable)." },
      { text: "Digital Signature Certificate (DSC), if already available." },
      { text: "Any other document required by the concerned department, if requested during the verification process." }
    ]
  },
  {
    title: "Documents Required for a Partnership Firm",
    docs: [
      { text: "PAN Card of the Partnership Firm." },
      { text: "PAN Card of all Partners." },
      { text: "Aadhaar Card of all Partners." },
      { text: "Partnership Deed." },
      { text: "Certificate of Registration of the Partnership Firm (if registered)." },
      { text: "GST Registration Certificate (if applicable)." },
      { text: "Import Export Code (IEC) Certificate (if applicable)." },
      { 
        text: "Business Address Proof (any one):", 
        subs: [
          "Electricity Bill",
          "Property Tax Receipt",
          "Rent Agreement (if rented)",
          "Sale Deed (if owned)"
        ] 
      },
      { text: "No Objection Certificate (NOC) from the property owner (if the premises are rented), if applicable." },
      { text: "Cancelled Cheque or Bank Passbook/Bank Statement of the firm's current account." },
      { text: "Passport-size Photograph of the authorized partner." },
      { text: "Mobile Number and Email ID of the authorized signatory." },
      { text: "Digital Signature Certificate (DSC) of the authorized partner (if already available)." },
      { text: "Authorization Letter or Board/Partner Resolution authorizing the partner to complete the registration, if required." },
      { text: "Any other document required by the concerned department during verification." }
    ],
    note: "The authorized partner must have access to the registered mobile number and email ID throughout the registration process. Multiple OTPs may be sent to the registered mobile number and email ID. Kindly share these OTPs immediately to avoid delays in processing."
  },
  {
    title: "Documents Required for a Limited Liability Partnership (LLP)",
    docs: [
      { text: "PAN Card of the LLP." },
      { text: "LLP Incorporation Certificate." },
      { text: "LLP Agreement." },
      { text: "PAN Card of all Designated Partners." },
      { text: "Aadhaar Card of all Designated Partners." },
      { text: "GST Registration Certificate (if applicable)." },
      { text: "Import Export Code (IEC) Certificate (if applicable)." },
      { 
        text: "Business Address Proof (any one):", 
        subs: [
          "Electricity Bill",
          "Property Tax Receipt",
          "Rent Agreement (if rented)",
          "Sale Deed (if owned)"
        ] 
      },
      { text: "No Objection Certificate (NOC) from the property owner (if the premises are rented), if applicable." },
      { text: "Cancelled Cheque or Bank Passbook/Bank Statement of the LLP's current account." },
      { text: "Passport-size Photograph of the Authorized Signatory." },
      { text: "Mobile Number and Email ID of the Authorized Signatory." },
      { text: "Digital Signature Certificate (DSC) of the Authorized Signatory (if already available)." },
      { text: "Authorization Letter or Resolution authorizing the Designated Partner/Authorized Signatory to complete the registration, if required." },
      { text: "Any other document required by the concerned department during verification." }
    ],
    note: "The Authorized Signatory must have access to the registered mobile number and email ID throughout the registration process. Multiple OTPs may be sent to the registered mobile number and email ID during the registration process. Kindly share these OTPs immediately to avoid delays in processing."
  },
  {
    title: "Documents Required for a Private Limited Company",
    docs: [
      { text: "Certificate of Incorporation." },
      { text: "PAN Card of the Company." },
      { text: "PAN Card of all Directors." },
      { text: "Aadhaar Card of all Directors." },
      { text: "Memorandum of Association (MOA)." },
      { text: "Articles of Association (AOA)." },
      { text: "GST Registration Certificate (if applicable)." },
      { text: "Import Export Code (IEC) Certificate (if applicable)." },
      { 
        text: "Business Address Proof (any one):", 
        subs: [
          "Electricity Bill",
          "Property Tax Receipt",
          "Rent Agreement (if rented)",
          "Sale Deed (if owned)"
        ] 
      },
      { text: "No Objection Certificate (NOC) from the property owner (if the premises are rented), if applicable." },
      { text: "Cancelled Cheque or Bank Passbook/Bank Statement of the Company's Current Account." },
      { text: "Board Resolution authorizing the Authorized Signatory to complete the registration." },
      { text: "PAN Card and Aadhaar Card of the Authorized Signatory (if different from the Directors)." },
      { text: "Passport-size Photograph of the Authorized Signatory." },
      { text: "Mobile Number and Email ID of the Authorized Signatory." },
      { text: "Digital Signature Certificate (DSC) of the Authorized Signatory (if already available)." },
      { text: "Any other document required by the concerned department during verification." }
    ],
    note: "The Authorized Signatory must have access to the registered mobile number and email ID throughout the registration process. Multiple OTPs may be sent to the registered mobile number and email ID during the registration process. Kindly share these OTPs immediately to avoid delays in processing. Delays in sharing OTPs may result in the application session expiring or the registration process being delayed."
  },
  {
    title: "Documents Required for a Public Limited Company",
    docs: [
      { text: "Certificate of Incorporation." },
      { text: "PAN Card of the Company." },
      { text: "PAN Card of all Directors." },
      { text: "Aadhaar Card of all Directors." },
      { text: "Memorandum of Association (MOA)." },
      { text: "Articles of Association (AOA)." },
      { text: "GST Registration Certificate (if applicable)." },
      { text: "Import Export Code (IEC) Certificate (if applicable)." },
      { 
        text: "Business Address Proof (any one):", 
        subs: [
          "Electricity Bill",
          "Property Tax Receipt",
          "Rent Agreement (if rented)",
          "Sale Deed (if owned)"
        ] 
      },
      { text: "No Objection Certificate (NOC) from the property owner (if the premises are rented), if applicable." },
      { text: "Cancelled Cheque or Bank Passbook/Bank Statement of the Company's Current Account." },
      { text: "Board Resolution authorizing the Authorized Signatory to complete the registration." },
      { text: "PAN Card and Aadhaar Card of the Authorized Signatory (if different from the Directors)." },
      { text: "Passport-size Photograph of the Authorized Signatory." },
      { text: "Mobile Number and Email ID of the Authorized Signatory." },
      { text: "Digital Signature Certificate (DSC) of the Authorized Signatory (if already available)." },
      { text: "Any other document required by the concerned department during verification." }
    ],
    note: "The Authorized Signatory must have access to the registered mobile number and email ID throughout the registration process. Multiple OTPs may be sent to the registered mobile number and email ID during the registration process. Kindly share these OTPs immediately to avoid delays in processing. Delays in sharing OTPs may result in the application session expiring or the registration process being delayed."
  },
  {
    title: "Documents Required for a Hindu Undivided Family (HUF)",
    docs: [
      { text: "PAN Card of the HUF." },
      { text: "PAN Card of the Karta." },
      { text: "Aadhaar Card of the Karta." },
      { text: "HUF Declaration/Deed (if available)." },
      { text: "GST Registration Certificate (if applicable)." },
      { text: "Import Export Code (IEC) Certificate (if applicable)." },
      { 
        text: "Business Address Proof (any one):", 
        subs: [
          "Electricity Bill",
          "Property Tax Receipt",
          "Rent Agreement (if rented)",
          "Sale Deed (if owned)"
        ] 
      },
      { text: "No Objection Certificate (NOC) from the property owner (if the premises are rented), if applicable." },
      { text: "Cancelled Cheque or Bank Passbook/Bank Statement of the HUF Bank Account." },
      { text: "Passport-size Photograph of the Karta." },
      { text: "Mobile Number and Email ID of the Karta." },
      { text: "Digital Signature Certificate (DSC) of the Karta (if already available)." },
      { text: "Authorization Letter (if any person other than the Karta is authorized to complete the registration)." },
      { text: "Any other document required by the concerned department during the verification process." }
    ],
    note: "The Karta or Authorized Signatory must have access to the registered mobile number and email ID throughout the registration process. Multiple OTPs may be sent to the registered mobile number and email ID during the registration process. Kindly share these OTPs immediately to avoid delays in processing. Delays in sharing OTPs may result in the application session expiring or the registration process being delayed."
  }
];
