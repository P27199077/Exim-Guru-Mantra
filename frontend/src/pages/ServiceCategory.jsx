import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Calendar, FileText, ArrowLeft, BookOpen, Clock } from 'lucide-react';

const categoryData = {
  'taxation-and-compliances': {
    title: 'Taxation And Compliances',
    subtitle: 'Direct and Indirect Tax Advisory & Filing Services',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    desc: 'Managing corporate and individual direct taxation is critical for regulatory standing and cash flow optimization. Our team of expert CAs handles end-to-end filing, planning, and dispute representation.',
    details: [
      {
        heading: 'Corporate Income Tax (CIT)',
        body: 'Compliance services for domestic and foreign entities. Advisory on minimum alternate tax (MAT), dividend distribution, and tax-efficient corporate structures.'
      },
      {
        heading: 'ITR Return Filings',
        body: 'Preparation and filing of ITR-1 to ITR-7 for individuals, HUFs, firms, LLPs, and companies under standard guidelines.'
      },
      {
        heading: 'TDS & TCS Returns',
        body: 'Quarterly filing of TDS (Tax Deducted at Source) certificates, Form 24Q, 26Q, and correction statements to ensure no penal interest under Section 234E.'
      },
      {
        heading: 'Assessment & Litigation Support',
        body: 'Drafting structured replies to notices under Section 143(2), 148, or income tax searches. Representation before CIT (Appeals) and ITAT.'
      }
    ],
    tips: [
      'ITR filing due date for corporate audits is usually October 31st.',
      'TDS quarterly filings are due on the 31st of the month following the quarter end.',
      'Ensure link between PAN and Aadhaar card is completed to avoid high rate TDS deductors.'
    ]
  },
  'audit-and-assurance': {
    title: 'Audit And Assurance',
    subtitle: 'Independent Financial Audits & Attestation Services',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    desc: 'Providing transparency, accountability, and reliability to investors and regulatory boards. We carry out audits in accordance with standard auditing standards (SA) issued by ICAI.',
    details: [
      {
        heading: 'Statutory Financial Audits',
        body: 'Independent examination of financial statements under the Companies Act, 2013 to verify a true and fair view of balance sheets.'
      },
      {
        heading: 'Tax Audit (Section 44AB)',
        body: 'Mandatory tax audits for businesses with turnovers exceeding threshold limits (generally ₹10 crores if digital transactions exceed 95%) or professions exceeding ₹50 lakhs.'
      },
      {
        heading: 'Internal & Operational Audits',
        body: 'Evaluating internal control systems, checking standard operating procedures (SOPs), and auditing security systems to prevent fraud.'
      },
      {
        heading: 'Stock & Fixed Assets Audits',
        body: 'Physical verification of inventory levels and asset reconciliation logs to identify discrepancies or leakages.'
      }
    ],
    tips: [
      'Tax Audits must be filed online through Form 3CD by September 30th.',
      'Companies must document their internal financial controls (IFC) in director reports.',
      'Verify CARO 2020 reporting requirements apply to your audited company.'
    ]
  },
  'goods-and-service-tax': {
    title: 'Goods And Service Tax (GST)',
    subtitle: 'Indirect Tax Registrations, Returns & Litigations',
    img: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fa39?w=800&auto=format&fit=crop&q=80',
    desc: 'GST compliance is transaction-heavy and requires strict data reconciliation (GSTR-2B vs GSTR-3B). Our automated indirect tax desk helps manage monthly returns, audits, and litigation.',
    details: [
      {
        heading: 'Monthly Return Filings',
        body: 'Filing GSTR-1 (sales ledger), GSTR-3B (consolidated tax summary), and GSTR-9/9C (Annual returns) for regular and composition taxpayers.'
      },
      {
        heading: 'GST Audits & Assessments',
        body: 'Assistance during departmental audits, drafting arguments for discrepancy logs, and compiling reconciliations.'
      },
      {
        heading: 'GST Refund Claims',
        body: 'Securing refunds for exporters under inverted duty structure or zero-rated supply without payment of IGST (LUT route).'
      },
      {
        heading: 'Litigation & Notice Support',
        body: 'Drafting structured replies to notices (ASMT-10, DRC-01) and representing clients before appellate authorities.'
      }
    ],
    tips: [
      'Always reconcile your input tax credit (ITC) with GSTR-2B before filing GSTR-3B.',
      'Filing of GSTR-1 is generally due by the 11th of the following month.',
      'Exporters should file Letter of Undertaking (LUT) in Form GST RFD-11 annually.'
    ]
  },
  'company-and-llp-compliances': {
    title: 'Company And LLP Compliances',
    subtitle: 'Corporate Secretarial Services & ROC Compliance',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    desc: 'Ongoing compliance under MCA rules is essential to keep your business active and avoid heavy daily late fees (₹100/day for default filings). We help keep your ROC status Active.',
    details: [
      {
        heading: 'Company Annual Return Filings',
        body: 'Filing of mandatory forms: Form AOC-4 (financial statements) and MGT-7 (annual list of shareholders) within due timelines.'
      },
      {
        heading: 'LLP Annual Compliances',
        body: 'Filing of Form 8 (Statement of Accounts & Solvency) and Form 11 (Annual Return) to ROC.'
      },
      {
        heading: 'Director KYC & active declarations',
        body: 'Filing of DIR-3 KYC annually and Active Company Tagging (INC-22A) compliance checklists.'
      },
      {
        heading: 'Striking Off / Winding Up',
        body: 'Assisting companies that want to close operations voluntarily via the fast-track ROC exit scheme (Form STK-2).'
      }
    ],
    tips: [
      'Form 11 (LLP Annual Return) must be filed by May 30th each year.',
      'Form 8 (LLP Statement of Solvency) is due by October 30th each year.',
      'AOC-4 for private limited companies is due within 30 days of the AGM.'
    ]
  },
  'international-taxation': {
    title: 'International Taxation',
    subtitle: 'Cross-Border Deals, DTAA, and Transfer Pricing',
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80',
    desc: 'Managing cross-border tax liabilities requires deep understanding of Double Taxation Avoidance Agreements (DTAA) and Transfer Pricing guidelines under Chapter X of the Income Tax Act.',
    details: [
      {
        heading: 'Transfer Pricing Studies',
        body: 'Drafting documentation under Section 92D, conducting benchmarking studies, and filing Form 3CEB for international associated enterprise deals.'
      },
      {
        heading: 'Double Taxation Relief (DTAA)',
        body: 'Obtaining Tax Residency Certificates (TRC) and filing Form 10F to secure lower withholding tax rates under DTAA clauses.'
      },
      {
        heading: 'NRI Taxation advisory',
        body: 'Filing income tax returns for non-resident Indians, capital gains taxation advice, and securing lower TDS certificates under Section 197.'
      },
      {
        heading: 'Taxation of Expats',
        body: 'Residential status determination, taxability of global ESOPs, and social security compliance guidelines for expatriate employees.'
      }
    ],
    tips: [
      'Form 3CEB (Transfer Pricing report) must be filed by October 31st.',
      'Verify the presence of a Permanent Establishment (PE) clause in the DTAA agreement.',
      'TRC is mandatory to claim treaty benefits under DTAA.'
    ]
  },
  'registration': {
    title: 'Business Registrations',
    subtitle: 'Startup Licenses and Statutory Registrations',
    img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
    desc: 'Kickstart your business setup with essential licensing. We cover MSME registrations, food licenses, export registration codes, and labor department registrations.',
    details: [
      {
        heading: 'Import Export Code (IEC)',
        body: 'Mandatory 10-digit registration code from DGFT required to clear shipping bills or custom declarations in import-export trade.'
      },
      {
        heading: 'MSME / Udyam Registration',
        body: 'Secure government subsidies, collateral-free loans, and strict 45-day payment protections under the MSMED Act.'
      },
      {
        heading: 'FSSAI License',
        body: 'Food safety registration and state/central licenses required for manufacturing, importing, or selling food products.'
      },
      {
        heading: 'ESI & EPF Registration',
        body: 'Statutory social security registration for firms with employee sizes exceeding threshold limits (10/20 employees).'
      }
    ],
    tips: [
      'IEC profile must be updated on the DGFT portal annually between April and June.',
      'Udyam registration is free and requires only a PAN and Aadhaar number.',
      'Exporters of food products must have a Central FSSAI License.'
    ]
  },
  'account-outsourcing-and-bookkeeping': {
    title: 'Account Outsourcing & Bookkeeping',
    subtitle: 'Outsourced Accounting, Payroll, and reporting',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    desc: 'Focus on scaling your business while we handle day-to-day books. We deploy modern accounting tools (Tally, QuickBooks) to ensure audit-ready ledger structures.',
    details: [
      {
        heading: 'Outsourced Accounting Desk',
        body: 'Recording purchase/sales entries, reconciling bank ledgers, maintaining fixed asset logs, and compiling balance sheets.'
      },
      {
        heading: 'Payroll Outsourcing',
        body: 'Calculating employee salaries, TDS deductions, provident fund contributions (PF), employee state insurance (ESI), and slips.'
      },
      {
        heading: 'MIS Reporting Desk',
        body: 'Creating cash flow logs, accounts receivable/payable aging statements, and profitability analysis for corporate management.'
      }
    ],
    tips: [
      'Monthly bookkeeping helps in prompt GST filing reconciliation.',
      'Ensure standard payroll processes account for professional tax regulations.',
      'Audit readiness is maintained through systematic voucher tagging.'
    ]
  },
  'intellectual-property': {
    title: 'Intellectual Property Rights (IPR)',
    subtitle: 'Brand Protection & Trademark Registrations',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    desc: 'Protect your unique brand identity, logo, or proprietary software. We handle trademark searches, assignments, renewals, and legal responses to trademark objections.',
    details: [
      {
        heading: 'Trademark Registration',
        body: 'Filing trademark application under the Trademarks Act, 1999 across appropriate classes to secure the exclusive ® symbol.'
      },
      {
        heading: 'Trademark Search & Clearance',
        body: 'Conducting comprehensive searches in the public registry database to check for matching or deceptively similar marks.'
      },
      {
        heading: 'Trademark Objection (Examination replies)',
        body: 'Drafting legal replies for objections raised under Section 9 (absolute grounds) or Section 11 (relative grounds) of the Act.'
      },
      {
        heading: 'Trademark Renewal',
        body: 'Maintaining trademark validity by filing renewal applications every 10 years.'
      }
    ],
    tips: [
      'A trademark application can be filed under the "Proposed to be used" status or showing current usage.',
      'Trademark examinations are usually issued within 1 to 3 months of filing.',
      'Using TM is permitted once the application is filed, while ® is only for registered marks.'
    ]
  }
};

export default function ServiceCategory() {
  const { categoryKey } = useParams();
  const category = categoryData[categoryKey];

  React.useEffect(() => {
    if (category) {
      document.title = `${category.title} | EXIM Guru Mantra`;
    } else {
      document.title = "Service Details | EXIM Guru Mantra";
    }
  }, [categoryKey, category]);

  if (!category) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Service Category Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The requested category page does not exist or has been relocated.</p>
          <Link to="/services" className="btn btn-primary">Return to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '2.5rem' }}>
          <ArrowLeft size={16} />
          <span>All Services</span>
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <span className="section-subtitle" style={{ textTransform: 'uppercase' }}>{category.subtitle}</span>
            <h1 style={{ fontSize: '2.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{category.title}</h1>
            
            {/* Premium Category Graphic Banner */}
            <img 
              src={category.img} 
              alt={category.title} 
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid var(--bg-tertiary)',
                marginBottom: '2rem',
                boxShadow: '0 4px 16px rgba(30, 27, 24, 0.04)'
              }}
            />

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: '1.6' }}>
              {category.desc}
            </p>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--bg-tertiary)', paddingBottom: '0.5rem' }}>
              Specific Compliance Modules
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {category.details.map((item, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: '#ffffff',
                  border: '1px solid var(--bg-tertiary)',
                  borderRadius: '6px',
                  boxShadow: '0 2px 6px rgba(30, 27, 24, 0.02)'
                }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.15rem' }}>{item.heading}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside style={{
            position: 'sticky',
            top: '120px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--bg-tertiary)',
            borderRadius: '8px',
            padding: '2.25rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} style={{ color: 'var(--primary)' }} />
              <span>Compliance Briefs & Tips</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {category.tips.map((tip, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.75rem' }}>
                  <Clock size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '4px' }} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{tip}</p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--bg-tertiary)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Need representation or custom tax analysis for your corporate structure?
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                Contact Advisor Now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
