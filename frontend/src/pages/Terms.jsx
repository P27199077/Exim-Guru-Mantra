import React, { useEffect } from 'react';

export default function Terms() {
  useEffect(() => {
    document.title = "Terms & Privacy Policy | EXIM Guru Mantra";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '5rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="section-subtitle">Legal & Regulatory</span>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Terms of Service & Privacy Policy
          </h1>
          <p className="section-desc" style={{ fontSize: '1.05rem', margin: '0 auto' }}>
            Please read these terms and privacy guidelines carefully before using our custom consulting and tax submission portals.
          </p>
        </div>

        {/* Legal Text Content */}
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontWeight: 800 }}>
            1. Terms of Consulting Engagement
          </h2>
          <p>
            By booking a diagnostic session or registering for compliance services (IEC, ITR, GST, Trademark filings) with EXIM Guru Mantra, you agree that our chartered accountants, company secretaries, and customs clearance coordinators represent your filings based solely on the records, balances, address proofs, and bills of entry provided by your firm.
          </p>
          <p>
            EXIM Guru Mantra takes reasonable precautions to verify HSN code classifications and tax credit registers, but final liability for interest, customs penalties, or DGFT audit objection responses remains the responsibility of the business owner.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontWeight: 800 }}>
            2. Privacy Policy & Document Retention
          </h2>
          <p>
            We take your corporate privacy seriously. All files uploaded to our servers—including individual PAN cards, bank account details, DSC (Digital Signature Certificates), and business address deeds—are encrypted in transit and at rest.
          </p>
          <p>
            We do not share your corporate identifiers or shipping volume metrics with third-party advertising companies. Your files are retained strictly for the duration necessary to satisfy DGFT licensing, ROC filing, and custom audit compliance audits.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontWeight: 800 }}>
            3. Disclaimer & Limitation of Liability
          </h2>
          <p>
            Consultation tips, duty calculators, and document checklists offered on our website are for informative guidance only. They do not constitute binding legal representation. Final clearance rates, duty assessments, and licensing approvals depend on the decisions of relevant regulatory bodies (DGFT, Customs Commissionerates, IT Department).
          </p>
        </div>

      </div>
    </div>
  );
}
