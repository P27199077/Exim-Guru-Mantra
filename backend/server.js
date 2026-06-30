import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Setup
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/exim_guru_mantra';
const client = new MongoClient(MONGODB_URI);
let db;
let queriesCollection;
let settingsCollection;
let servicesCollection;

const defaultServices = [
  {
    key: 'import-export-clearance',
    title: 'Import-Export & Customs Clearance',
    subtitle: 'Customs Broking, Freight Forwarding & Trade Logistics',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80',
    desc: 'Navigate the complexities of global trade with our comprehensive import-export solutions. From customs clearance and freight forwarding to compliance advisory and DGFT liaisoning, we keep your cargo moving.',
    details: [
      { heading: 'Customs Broking & CHA', body: 'Filing Bill of Entry, Shipping Bills, and managing custom examinations at sea ports, air cargo complexes, and ICDs.' },
      { heading: 'Freight Forwarding', body: 'Coordination of international cargo shipments via sea (FCL/LCL) and air freight routes with real-time tracking.' },
      { heading: 'DGFT Liaisoning', body: 'Obtaining and managing Advance Authorization, EPCG licenses, RoDTEP claims, and star export house status certificates.' },
      { heading: 'Trade Compliance Advisory', body: 'Reviewing trade agreements, HSN classifications, import restrictions, and anti-dumping duties to prevent penalties.' }
    ],
    tips: [
      'Always verify the correct HSN code to avoid customs penalty notices.',
      'Update your Import Export Code (IEC) annually on the DGFT portal between April and June.',
      'Utilize Free Trade Agreements (FTAs) to claim preferential customs duty discounts.'
    ],
    services: [
      'Customs Broking & Clearance',
      'Sea & Air Freight Forwarding',
      'DGFT Liaisoning & Licensing',
      'Incentive & Duty Drawbacks Claims',
      'FEMA & Trade Compliance Advisory',
      'IEC Update & Maintenance'
    ],
    position: 'top',
    division: 'import-export'
  },
  {
    key: 'taxation-and-compliances',
    title: 'Taxation And Compliances',
    subtitle: 'Direct and Indirect Tax Advisory & Filing Services',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    desc: 'Managing corporate and individual direct taxation is critical for regulatory standing and cash flow optimization. Our team of expert CAs handles end-to-end filing, planning, and dispute representation.',
    details: [
      { heading: 'Corporate Income Tax (CIT)', body: 'Compliance services for domestic and foreign entities. Advisory on minimum alternate tax (MAT), dividend distribution, and tax-efficient corporate structures.' },
      { heading: 'ITR Return Filings', body: 'Preparation and filing of ITR-1 to ITR-7 for individuals, HUFs, firms, LLPs, and companies under standard guidelines.' },
      { heading: 'TDS & TCS Returns', body: 'Quarterly filing of TDS (Tax Deducted at Source) certificates, Form 24Q, 26Q, and correction statements to ensure no penal interest under Section 234E.' },
      { heading: 'Assessment & Litigation Support', body: 'Drafting structured replies to notices under Section 143(2), 148, or income tax searches. Representation before CIT (Appeals) and ITAT.' }
    ],
    tips: [
      'ITR filing due date for corporate audits is usually October 31st.',
      'TDS quarterly filings are due on the 31st of the month following the quarter end.',
      'Ensure link between PAN and Aadhaar card is completed to avoid high rate TDS deductors.'
    ],
    services: [
      'Overview - Direct And Indirect Tax',
      'Corporate Tax',
      'Income Tax Return Filing Services',
      'Income Tax Litigation Services',
      'Certification And Attestation Services',
      'TDS Return Filing'
    ],
    position: 'top',
    division: 'taxation'
  },
  {
    key: 'audit-and-assurance',
    title: 'Audit And Assurance',
    subtitle: 'Independent Financial Audits & Attestation Services',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    desc: 'Providing transparency, accountability, and reliability to investors and regulatory boards. We carry out audits in accordance with standard auditing standards (SA) issued by ICAI.',
    details: [
      { heading: 'Statutory Audits', body: 'Evaluating whether corporate accounts show a true and fair view in accordance with Company Law and Accounting Standards.' },
      { heading: 'Tax Audits (Form 3CD)', body: 'Mandatory verification of business accounts for taxpayers crossing turnover thresholds under Section 44AB of the Income Tax Act.' },
      { heading: 'Internal & Operational Audits', body: 'Risk assessment, evaluating corporate governance processes, and internal financial control (IFC) reviews.' },
      { heading: 'Stock & Asset Verification', body: 'Physical inventory verification, fixed asset ledger reconciliations, and reporting on obsolete stock values.' }
    ],
    tips: [
      'Maintain clean voucher logs and cross-linked digital bank statements for audit readiness.',
      'Form 3CD filings must be completed online by CA before September 30th.',
      'Stock audits should be done periodically to prevent warehouse leaks.'
    ],
    services: [
      'Overview - Audit And Assurance',
      'Statutory Audit',
      'Tax Audit',
      'Internal Audit',
      'Stock Audit',
      'Fixed Assets Audit'
    ],
    position: 'bottom',
    division: 'taxation'
  },
  {
    key: 'goods-and-service-tax',
    title: 'Goods And Service Tax (GST)',
    subtitle: 'Indirect Taxation, Filing & Audit Support',
    img: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fa39?w=800&auto=format&fit=crop&q=80',
    desc: 'GST compliance is transaction-heavy and requires strict data reconciliation (GSTR-2B vs GSTR-3B). Our automated indirect tax desk helps manage monthly returns, audits, and litigation.',
    details: [
      { heading: 'GST Registration', body: 'New registrations, amendments, and cancellation of GSTIN for local or composite firms.' },
      { heading: 'Monthly GSTR Return Filings', body: 'Filing GSTR-1 (Outward Supplies), GSTR-3B (Summary Return), and annual reconciliation GSTR-9/9C.' },
      { heading: 'Input Tax Credit (ITC) Audits', body: 'Systematic matching of GSTR-2B purchase logs to prevent blocked credits and avoid GST ITC reclaim penalties.' },
      { heading: 'GST Refund Claims', body: 'Filing zero-rated export refund applications (LUT or IGST route) and inverted duty structure refunds.' }
    ],
    tips: [
      'GSTR-1 is due on the 11th of every month, while GSTR-3B is due on the 20th.',
      'Always reconcile GSTR-2B purchase data with purchase registers before locking GSTR-3B ITC claims.',
      'Exporters should file Form RFD-01 promptly to unlock stuck capital.'
    ],
    services: [
      'Overview - Goods And Services Tax',
      'GST Compliance Services',
      'GST Audit',
      'GST Litigation Services',
      'GST Refund'
    ],
    position: 'top',
    division: 'taxation'
  },
  {
    key: 'company-and-llp-compliances',
    title: 'Company And LLP Compliances',
    subtitle: 'Corporate Registrations & MCA Filings',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    desc: 'Ongoing compliance under MCA rules is essential to keep your business active and avoid heavy daily late fees (₹100/day for default filings). We help keep your ROC status Active.',
    details: [
      { heading: 'Company Incorporation', body: 'Registration of Private Limited, One Person Company (OPC), Section 8 Companies, or Limited Liability Partnerships (LLP).' },
      { heading: 'Director KYC & DIN', body: 'Obtaining Director Identification Numbers, Digital Signature Certificates (DSC), and annual DIR-3 KYC filings.' },
      { heading: 'Annual ROC Filings', body: 'Filing Form AOC-4 (Financial Statements) and Form MGT-7 (Annual Return) with the Registrar of Companies.' },
      { heading: 'Strike Off & Wind Up', body: 'Assisting in voluntary closing of dormant companies under Fast Track Exit (FTE) rules.' }
    ],
    tips: [
      'DIR-3 KYC filings are due by September 30th annually.',
      'Annual general meeting (AGM) must be held within 6 months of financial year close.',
      'Defaulting on ROC filings attracts ₹100/day penalty per form without upper limit.'
    ],
    services: [
      'Company Registration',
      'LLP Formation',
      'Company Annual Compliances',
      'Company Strike Off',
      'Company Annual Return Filing',
      'LLP Annual Return Filing',
      'One Person Company Registration'
    ],
    position: 'bottom',
    division: 'certification'
  },
  {
    key: 'international-taxation',
    title: 'International Taxation',
    subtitle: 'Cross-Border Tax Planning & Transfer Pricing',
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=80',
    desc: 'Managing cross-border tax liabilities requires deep understanding of Double Taxation Avoidance Agreements (DTAA) and Transfer Pricing guidelines under Chapter X of the Income Tax Act.',
    details: [
      { heading: 'NRI Taxation Advisory', body: 'Consultation on tax residency, managing NRE/NRO accounts, and obtaining lower tax withholding certificates (Form 13).' },
      { heading: 'Transfer Pricing (TP)', body: 'Filing Form 3CEB, drafting transfer pricing study reports, and benchmarking arm\'s length prices for international transactions.' },
      { heading: 'DTAA Relief Benefits', body: 'Helping expats and firms claim relief under Section 90/91 utilizing tax residency certificates (TRC).' },
      { heading: 'FEMA & Outward Remittance', body: 'Assisting in Form 15CA/15CB documentation required for international currency remittals.' }
    ],
    tips: [
      'Obtain a Tax Residency Certificate (TRC) to claim DTAA tax rate benefits.',
      'Remitting funds abroad requires a CA signed Form 15CB.',
      'Transfer pricing documentation is mandatory if international transaction exceeds ₹20 Crores.'
    ],
    services: [
      'Overview - International Taxation',
      'NRI Taxation',
      'Transfer Pricing',
      'Double Taxation Avoidance Agreement',
      'Taxation Of Expats'
    ],
    position: 'top',
    division: 'taxation'
  },
  {
    key: 'registration',
    title: 'Business Registrations',
    subtitle: 'Government Licenses & MSME Setup',
    img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    desc: 'Kickstart your business setup with essential licensing. We cover MSME registrations, food licenses, export registration codes, and labor department registrations.',
    details: [
      { heading: 'IEC (Import Export Code)', body: 'Secure DGFT registration certificate required to clear international cargo through customs.' },
      { heading: 'MSME (Udyam Registration)', body: 'Gain government credit schemes, subsidy benefits, and protection against delayed buyer payments.' },
      { heading: 'FSSAI (Food License)', body: 'Mandatory license for manufacturing, packaging, or distributing food items in India.' },
      { heading: 'ESI & EPF Registration', body: 'Registration under employee security schemes when headcount exceeds statutory thresholds.' }
    ],
    tips: [
      'Udyam registration is free and requires only Aadhaar and PAN linkage.',
      'IEC must be updated on the DGFT portal once a year between April and June.',
      'MSMEs enjoy 45-day payment security under Section 43B(h) of the Income Tax Act.'
    ],
    services: [
      'Trust Registration',
      'Society Registration',
      'IEC Registration',
      'MSME Registration',
      'FSSAI Registration',
      'ESI Registration'
    ],
    position: 'bottom',
    division: 'certification'
  },
  {
    key: 'account-outsourcing-and-bookkeeping',
    title: 'Account Outsourcing & Bookkeeping',
    subtitle: 'Ledger Maintenance & Payroll Outsourcing',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    desc: 'Focus on scaling your business while we handle day-to-day books. We deploy modern accounting tools (Tally, QuickBooks) to ensure audit-ready ledger structures.',
    details: [
      { heading: 'Bookkeeping Ledger Maintenance', body: 'Daily cash/bank statement postings, sales/purchase ledger entry, and periodic bank reconciliations.' },
      { heading: 'Payroll Processing Desk', body: 'Calculating salary slips, processing professional tax deductions, and handling monthly PF/ESI challenges.' },
      { heading: 'MIS Management Reports', body: 'Supplying corporate directors with key balance sheet snapshots, cash flow charts, and debtors aging lists.' },
      { heading: 'Year-End Ledger Closings', body: 'Drafting financial statements, depreciation tables, and trial balances for CA audit teams.' }
    ],
    tips: [
      'Monthly bookkeeping helps in prompt GST filing reconciliation.',
      'Ensure standard payroll processes account for professional tax regulations.',
      'Audit readiness is maintained through systematic voucher tagging.'
    ],
    services: [
      'Overview - Accounts Outsourcing And Bookkeeping',
      'Accounting And Book Keeping',
      'Payroll Management'
    ],
    position: 'top',
    division: 'taxation'
  },
  {
    key: 'intellectual-property',
    title: 'Intellectual Property (IPR)',
    subtitle: 'Brand Protection & Trademark Registrations',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    desc: 'Protect your unique brand identity, logo, or proprietary software. We handle trademark searches, assignments, renewals, and legal responses to trademark objections.',
    details: [
      { heading: 'Trademark Registration', body: 'Filing trademark application under the Trademarks Act, 1999 across appropriate classes to secure the exclusive ® symbol.' },
      { heading: 'Trademark Search & Clearance', body: 'Conducting comprehensive searches in the public registry database to check for matching or deceptively similar marks.' },
      { heading: 'Trademark Objection Replies', body: 'Drafting legal replies for objections raised under Section 9 (absolute grounds) or Section 11 (relative grounds) of the Act.' },
      { heading: 'Trademark Renewal', body: 'Maintaining trademark validity by filing renewal applications every 10 years.' }
    ],
    tips: [
      'A trademark application can be filed under the "Proposed to be used" status or showing current usage.',
      'Trademark examinations are usually issued within 1 to 3 months of filing.',
      'Using TM is permitted once the application is filed, while ® is only for registered marks.'
    ],
    services: [
      'Trademark Registration',
      'Trademark Assignment',
      'Trademark Renewal',
      'Trademark Search',
      'Trademark Objection'
    ],
    position: 'bottom',
    division: 'certification'
  }
];

const seedDefaultServices = async () => {
  try {
    if (!servicesCollection) return;

    // Check if the seeded categories already have a division field.
    // If not (legacy data), clear and rebuild so everything matches the new structure!
    const sample = await servicesCollection.findOne({});
    if (sample && !sample.division) {
      console.log('[MongoDB] Legacy services detected without division field. Clearing and rebuilding...');
      await servicesCollection.deleteMany({});
    }

    const count = await servicesCollection.countDocuments();
    if (count > 0) {
      console.log('[MongoDB] Services collection already pre-populated.');
      return;
    }

    console.log('[MongoDB] Seeding initial service categories...');
    await servicesCollection.insertMany(defaultServices);
    console.log('[MongoDB] Successfully seeded default service categories!');
  } catch (err) {
    console.error('Error seeding default services in MongoDB:', err);
  }
};

async function connectDB() {
  try {
    await client.connect();
    console.log('[MongoDB] Connected successfully to database');
    db = client.db();
    queriesCollection = db.collection('queries');
    settingsCollection = db.collection('settings');
    servicesCollection = db.collection('services');
    await seedDefaultServices();
  } catch (err) {
    console.error('[MongoDB] Connection failed:', err);
  }
}
connectDB();

// Route: Base Status
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', message: 'Exim Guru Mantra Backend API is running' });
});

// Helper: Retrieve active admin credentials from MongoDB or environment fallback
const getAdminCredentials = async () => {
  const defaultUser = process.env.ADMIN_USER || 'exim_admin';
  const defaultPassword = process.env.ADMIN_PASSWORD || 'exim_pass_2026';
  
  try {
    if (!settingsCollection) {
      return { username: defaultUser, password: defaultPassword };
    }
    const doc = await settingsCollection.findOne({ key: 'admin_credentials' });
    if (doc) {
      return {
        username: doc.username || defaultUser,
        password: doc.password || defaultPassword
      };
    }
  } catch (err) {
    console.error('Error fetching admin credentials from DB:', err);
  }
  return { username: defaultUser, password: defaultPassword };
};

// Route: Verify admin credentials
app.post('/api/admin/verify', async (req, res) => {
  const { username, password } = req.body;
  const creds = await getAdminCredentials();
  
  if (username === creds.username && password === creds.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid admin username or password' });
  }
});

// Heuristic Unsplash image matching for AI categories
const getUnsplashImage = (title) => {
  const t = title.toLowerCase();
  if (t.includes('customs') || t.includes('export') || t.includes('import') || t.includes('trade') || t.includes('shipping')) {
    return 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80'; // Shipping cargo containers
  }
  if (t.includes('tax') || t.includes('gst') || t.includes('finance') || t.includes('accounting') || t.includes('bookkeeping')) {
    return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80'; // Financial charts/accounting
  }
  if (t.includes('audit') || t.includes('verify') || t.includes('assurance')) {
    return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80'; // Analytics/consulting desk
  }
  if (t.includes('legal') || t.includes('law') || t.includes('court') || t.includes('trademark') || t.includes('patent') || t.includes('intellectual')) {
    return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'; // Gavel / law book
  }
  if (t.includes('startup') || t.includes('company') || t.includes('registration') || t.includes('incorporation')) {
    return 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'; // Business registration sign contract
  }
  return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'; // Modern office workspace
};

// Route: Get all service categories
app.get('/api/services', async (req, res) => {
  try {
    if (!servicesCollection) {
      console.warn('[MongoDB] Database not initialized. Serving default static services.');
      return res.json(defaultServices);
    }
    const list = await servicesCollection.find({}).toArray();
    if (list.length === 0) {
      return res.json(defaultServices);
    }
    res.json(list);
  } catch (err) {
    console.error('[API] Error fetching services list, serving fallback:', err);
    res.json(defaultServices);
  }
});

// Route: Get single service category details
app.get('/api/services/category/:key', async (req, res) => {
  try {
    if (!servicesCollection) {
      console.warn('[MongoDB] Database not initialized. Serving default static category details.');
      const cat = defaultServices.find(c => c.key === req.params.key);
      if (cat) return res.json(cat);
      return res.status(404).json({ error: 'Service category not found' });
    }
    const category = await servicesCollection.findOne({ key: req.params.key });
    if (category) {
      res.json(category);
    } else {
      // Fallback lookup in defaultServices array
      const cat = defaultServices.find(c => c.key === req.params.key);
      if (cat) {
        res.json(cat);
      } else {
        res.status(404).json({ error: 'Service category not found' });
      }
    }
  } catch (err) {
    console.error('[API] Error fetching service category, serving fallback:', err);
    const cat = defaultServices.find(c => c.key === req.params.key);
    if (cat) {
      res.json(cat);
    } else {
      res.status(500).json({ error: 'Failed to retrieve service category details' });
    }
  }
});

// Route: Dynamic Category Creation (Heuristics-based "AI Content Generator")
app.post('/api/admin/services/category', async (req, res) => {
  const { username, password, title, division } = req.body;
  const creds = await getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Category title is required.' });
  }

  try {
    if (!servicesCollection) {
      return res.status(500).json({ error: 'Database is not ready' });
    }

    const key = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .trim()
      .replace(/\s+/g, '-'); // replace spaces with hyphens

    // Check if key already exists
    const exists = await servicesCollection.findOne({ key });
    if (exists) {
      return res.status(400).json({ error: `Service Category with title "${title}" already exists.` });
    }

    const activeDivision = ['import-export', 'taxation', 'certification'].includes(division)
      ? division
      : 'taxation';

    const subtitle = `${title} & Strategic Advisory`;
    const desc = `Ensure complete compliance and strategic regulatory alignment for your business with our dedicated ${title} desk, managed by senior corporate professionals.`;
    const img = getUnsplashImage(title);

    const details = [
      { heading: `${title} Documentation`, body: `End-to-end filing guidance and documentation templates for all mandatory licensing, compliance, and regulatory reports under government guidelines.` },
      { heading: `${title} Audit Representation`, body: `Assistance in preparing transaction ledgers, audit records, and professional representation before regulatory assessment officers.` },
      { heading: `Advisory & Structural Optimization`, body: `Advising on optimal structures, credit reclaims, tax benefits, and compliance relief policies to minimize enterprise risk.` },
      { heading: `Objections & Dispute Responders`, body: `Drafting robust legal examinations, object replies, and representation for corporate notices, clarifications, or assessments.` }
    ];

    const tips = [
      `Keep digital records and transaction details ready to ensure smooth file validation.`,
      `Verify applicable thresholds and regulatory dates before submitting final reports.`,
      `Seek early advisor representation to tackle dispute examinations and objections effectively.`
    ];

    // Alternate timeline positions based on count
    const count = await servicesCollection.countDocuments();
    const position = count % 2 === 0 ? 'top' : 'bottom';

    const newCategory = {
      key,
      title,
      subtitle,
      desc,
      img,
      details,
      tips,
      services: [`Overview - ${title}`],
      position,
      division: activeDivision
    };

    await servicesCollection.insertOne(newCategory);
    res.json({ success: true, message: `Category "${title}" created dynamically under division "${activeDivision}"!`, category: newCategory });
  } catch (err) {
    console.error('[API] Error creating service category:', err);
    res.status(500).json({ error: 'Failed to generate and create service category.' });
  }
});

// Route: Add service item under category
app.post('/api/admin/services/item', async (req, res) => {
  const { username, password, categoryKey, serviceName } = req.body;
  const creds = await getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  if (!categoryKey || !serviceName) {
    return res.status(400).json({ error: 'Category key and service name are required.' });
  }

  try {
    if (!servicesCollection) {
      return res.status(500).json({ error: 'Database is not ready' });
    }

    const category = await servicesCollection.findOne({ key: categoryKey });
    if (!category) {
      return res.status(404).json({ error: 'Service category not found.' });
    }

    // Check if service already exists in list
    if (category.services.includes(serviceName)) {
      return res.status(400).json({ error: `Service item "${serviceName}" already exists in this category.` });
    }

    await servicesCollection.updateOne(
      { key: categoryKey },
      { $push: { services: serviceName } }
    );

    res.json({ success: true, message: `Service "${serviceName}" added successfully to category "${category.title}".` });
  } catch (err) {
    console.error('[API] Error adding service item:', err);
    res.status(500).json({ error: 'Failed to add service item.' });
  }
});

// Route: Delete Service Category
app.delete('/api/admin/services/category/:key', async (req, res) => {
  const { username, password } = req.body;
  const creds = await getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  try {
    if (!servicesCollection) {
      return res.status(500).json({ error: 'Database is not ready' });
    }

    const key = req.params.key;
    const result = await servicesCollection.deleteOne({ key });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Service category not found.' });
    }

    res.json({ success: true, message: 'Service category deleted successfully.' });
  } catch (err) {
    console.error('[API] Error deleting service category:', err);
    res.status(500).json({ error: 'Failed to delete service category.' });
  }
});

// Route: Delete Service Item from Category
app.delete('/api/admin/services/item', async (req, res) => {
  const { username, password, categoryKey, serviceName } = req.body;
  const creds = await getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  if (!categoryKey || !serviceName) {
    return res.status(400).json({ error: 'Category key and service name are required.' });
  }

  try {
    if (!servicesCollection) {
      return res.status(500).json({ error: 'Database is not ready' });
    }

    const result = await servicesCollection.updateOne(
      { key: categoryKey },
      { $pull: { services: serviceName } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Service item not found or category not matched.' });
    }

    res.json({ success: true, message: `Service "${serviceName}" removed successfully.` });
  } catch (err) {
    console.error('[API] Error deleting service item:', err);
    res.status(500).json({ error: 'Failed to delete service item.' });
  }
});

// Route: Reorder Service Items inside Category
app.post('/api/admin/services/reorder', async (req, res) => {
  const { username, password, categoryKey, services } = req.body;
  const creds = await getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  }

  if (!categoryKey || !Array.isArray(services)) {
    return res.status(400).json({ error: 'Category key and services array are required.' });
  }

  try {
    if (!servicesCollection) {
      return res.status(500).json({ error: 'Database is not ready' });
    }

    await servicesCollection.updateOne(
      { key: categoryKey },
      { $set: { services: services } }
    );

    res.json({ success: true, message: 'Services reordered successfully.' });
  } catch (err) {
    console.error('[API] Error reordering services:', err);
    res.status(500).json({ error: 'Failed to reorder services.' });
  }
});

// Route: Get social links configuration
app.get('/api/settings/socials', async (req, res) => {
  try {
    if (!settingsCollection) {
      return res.json([
        { platform: 'YouTube', url: 'https://www.youtube.com/channel/UCKRUu69BuybTj4C-w-PHCLg', icon: 'Youtube' }
      ]);
    }
    
    const settings = await settingsCollection.findOne({ key: 'social_links' });
    if (settings && settings.links) {
      res.json(settings.links);
    } else {
      res.json([
        { platform: 'YouTube', url: 'https://www.youtube.com/channel/UCKRUu69BuybTj4C-w-PHCLg', icon: 'Youtube' }
      ]);
    }
  } catch (err) {
    console.error('[API] Error fetching social links:', err);
    res.status(500).json({ error: 'Failed to retrieve social links' });
  }
});

// Route: Save/update social links configuration
app.post('/api/settings/socials', async (req, res) => {
  const { username, password, links } = req.body;
  const creds = await getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin credentials' });
  }

  if (!Array.isArray(links)) {
    return res.status(400).json({ error: 'Links must be an array' });
  }

  try {
    if (!settingsCollection) {
      return res.status(500).json({ error: 'Database is not ready' });
    }

    await settingsCollection.updateOne(
      { key: 'social_links' },
      { $set: { links: links, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    res.json({ success: true, message: 'Social links updated successfully' });
  } catch (err) {
    console.error('[API] Error saving social links:', err);
    res.status(500).json({ error: 'Failed to update social links' });
  }
});

// Route: Forgot Password (triggers email link to eximgurumantra@gmail.com)
app.post('/api/admin/forgot-password', async (req, res) => {
  try {
    if (!settingsCollection) {
      return res.status(500).json({ error: 'Database is not ready' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour expiry

    await settingsCollection.updateOne(
      { key: 'reset_token' },
      { $set: { token, expiry } },
      { upsert: true }
    );

    const referer = req.headers.referer || req.headers.origin || 'https://eximgurumantra.com/admin';
    let baseOrigin;
    try {
      baseOrigin = new URL(referer).origin;
    } catch (e) {
      baseOrigin = 'https://eximgurumantra.com';
    }
    const resetUrl = `${baseOrigin}/admin?token=${token}`;

    console.log(`[Forgot Password] Reset URL generated: ${resetUrl}`);

    // If Resend API Key is not configured, we print to console and return success for testing
    if (!process.env.RESEND_API_KEY) {
      console.warn('[Resend] Skipping email dispatch: RESEND_API_KEY is not configured.');
      return res.json({ 
        success: true, 
        message: 'Reset link generated (printed in server logs for local verification).' 
      });
    }

    const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const emailPayload = {
      from: `EXIM Guru Mantra Security <${fromEmail}>`,
      to: 'eximgurumantra@gmail.com',
      subject: 'Reset Password Request - EXIM Guru Mantra',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 550px; border: 1px solid #eae3d2; border-radius: 8px; padding: 25px; background-color: #fbf9f4;">
          <h2 style="color: #2b2b2b; margin-top: 0;">Password Reset Request</h2>
          <p style="color: #555; line-height: 1.5;">We received a request to reset your admin password for the EXIM Guru Mantra dashboard.</p>
          <p style="color: #555; line-height: 1.5;">Click the button below to choose a new password. This link is valid for <strong>1 hour</strong>.</p>
          <div style="text-align: center; margin: 2rem 0;">
            <a href="${resetUrl}" style="background-color: #2b6cb0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #777; font-size: 0.85rem; line-height: 1.5; border-top: 1px dashed #eae3d2; padding-top: 15px;">
            If you did not request this, please ignore this email. Your credentials will remain unchanged.
          </p>
        </div>
      `
    };

    await sendEmailViaResend(emailPayload);
    res.json({ success: true, message: 'A secure reset link has been sent to your official email.' });
  } catch (err) {
    console.error('[Forgot Password] Error triggering reset:', err);
    res.status(500).json({ error: 'Failed to process forgot password request.' });
  }
});

// Route: Reset Password (validates token and saves new password)
app.post('/api/admin/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required.' });
  }

  try {
    if (!settingsCollection) {
      return res.status(500).json({ error: 'Database is not ready' });
    }

    const doc = await settingsCollection.findOne({ key: 'reset_token' });
    if (!doc || doc.token !== token) {
      return res.status(400).json({ error: 'Invalid or expired reset token.' });
    }

    const isExpired = new Date() > new Date(doc.expiry);
    if (isExpired) {
      return res.status(400).json({ error: 'Reset token has expired.' });
    }

    // Save updated credentials in DB settings doc
    const currentCreds = await getAdminCredentials();
    await settingsCollection.updateOne(
      { key: 'admin_credentials' },
      { $set: { username: currentCreds.username, password: newPassword, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    // Invalidate the token
    await settingsCollection.deleteOne({ key: 'reset_token' });

    res.json({ success: true, message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('[Reset Password] Error resetting password:', err);
    res.status(500).json({ error: 'Failed to reset password.' });
  }
});

// Helper: Update emailsSent status in queries database
const updateQueryEmailStatus = async (id, status) => {
  try {
    if (!queriesCollection) return;
    await queriesCollection.updateOne({ id: id }, { $set: { emailsSent: status } });
  } catch (err) {
    console.error('Error updating query email status in MongoDB:', err);
  }
};

// Helper: Dispatch Email via Resend HTTP API (No port blocking issues)
const sendEmailViaResend = (options) => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return reject(new Error('RESEND_API_KEY environment variable is not configured.'));
    }

    const payload = JSON.stringify(options);

    const reqOptions = {
      hostname: 'api.resend.com',
      port: 443,
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve({ raw: data });
          }
        } else {
          reject(new Error(`Resend API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(payload);
    req.end();
  });
};

// Helper: Send Automated Consultation Emails (runs asynchronously in background)
const sendConsultationEmails = async (queryData) => {
  const { name, email, phone, company, message, serviceType, id } = queryData;
  console.log(`[Resend] Initiating email dispatch for Ticket #${id}. Target Customer: ${email}`);

  if (!process.env.RESEND_API_KEY) {
    console.warn('[Resend] Email notifications skipped: RESEND_API_KEY environment variable is not configured.');
    return false;
  }

  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  try {
    // Email 1: Notification Ticket to EXIM Guru Mantra (eximgurumantra@gmail.com)
    const adminMailOptions = {
      from: `EXIM Guru Mantra WebDesk <${fromEmail}>`,
      to: 'eximgurumantra@gmail.com', // Always notify the official email
      subject: `[New Ticket #${id}] - Inquiry from ${name} (${serviceType})`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; border: 1px solid #eae3d2; border-radius: 8px; padding: 20px; background-color: #fbf9f4;">
          <h2 style="color: #c21d2e; border-bottom: 2px solid #c21d2e; padding-bottom: 10px; margin-top: 0;">New Consultation Request</h2>
          <p style="font-size: 0.95rem; color: #5c554e;">A client has submitted a query via the Exim Guru Mantra website. Here are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px;">
            <tr style="background-color: #f4eee1;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eae3d2; width: 30%; color: #1e1b18;">Ticket ID</td>
              <td style="padding: 10px; border: 1px solid #eae3d2; color: #5c554e;">#${id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eae3d2; color: #1e1b18;">Client Name</td>
              <td style="padding: 10px; border: 1px solid #eae3d2; color: #5c554e;">${name}</td>
            </tr>
            <tr style="background-color: #f4eee1;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eae3d2; color: #1e1b18;">Email</td>
              <td style="padding: 10px; border: 1px solid #eae3d2; color: #5c554e;"><a href="mailto:${email}" style="color: #c21d2e; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eae3d2; color: #1e1b18;">Phone Number</td>
              <td style="padding: 10px; border: 1px solid #eae3d2; color: #5c554e;">${phone ? `<a href="tel:${phone}" style="color: #c21d2e; text-decoration: none;">${phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr style="background-color: #f4eee1;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eae3d2; color: #1e1b18;">Company</td>
              <td style="padding: 10px; border: 1px solid #eae3d2; color: #5c554e;">${company || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #eae3d2; color: #1e1b18;">Service Segment</td>
              <td style="padding: 10px; border: 1px solid #eae3d2; color: #5c554e;"><strong>${serviceType}</strong></td>
            </tr>
          </table>

          <div style="background-color: #ffffff; border-left: 4px solid #c21d2e; padding: 15px; border-radius: 4px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
            <h4 style="margin-top: 0; color: #1e1b18; margin-bottom: 8px;">Detailed Client Query:</h4>
            <p style="white-space: pre-wrap; margin: 0; font-size: 0.92rem; line-height: 1.5; color: #1e1b18;">${message}</p>
          </div>
          
          <p style="font-size: 0.8rem; color: #8c8278; margin-top: 25px; text-align: center; border-top: 1px solid #eae3d2; padding-top: 15px;">
            This is an automated system dispatch. Please reply directly to the client's email above.
          </p>
        </div>
      `
    };

    // Email 2: Confirmation Receipt to Customer (email)
    const clientMailOptions = {
      from: `Exim Guru Mantra Support <${fromEmail}>`,
      to: email,
      subject: `We've Received Your Inquiry - Exim Guru Mantra Associates`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; border: 1px solid #eae3d2; border-radius: 8px; padding: 20px; background-color: #fbf9f4;">
          <div style="text-align: center; border-bottom: 2px solid #c21d2e; padding-bottom: 15px; margin-bottom: 20px;">
            <h1 style="color: #c21d2e; margin: 0; font-size: 1.6rem; letter-spacing: 0.05em;">EXIM GURU MANTRA</h1>
            <span style="font-size: 0.75rem; color: #5c554e; text-transform: uppercase; letter-spacing: 0.1em;">Corporate Legal & Trade Advisory Desk</span>
          </div>

          <h3 style="color: #1e1b18; margin-top: 0;">Dear ${name},</h3>
          <p style="font-size: 0.95rem; color: #5c554e; line-height: 1.6;">
            Thank you for reaching out to Exim Guru Mantra Associates. Your inquiry regarding <strong>${serviceType}</strong> has been successfully registered and is **officially in process**.
          </p>
          
          <div style="background-color: #f4eee1; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #eae3d2;">
            <h4 style="margin-top: 0; color: #c21d2e; margin-bottom: 5px;">What happens next?</h4>
            <p style="margin: 0; font-size: 0.88rem; color: #5c554e; line-height: 1.5;">
              - A ticket (<strong>#${id}</strong>) has been generated for your query.<br>
              - Our team led by principal advisor <strong>Varun Gupta</strong> is reviewing your submission details.<br>
              - A trade compliance specialist will get back to you within **24 to 48 hours** with diagnostic insights.
            </p>
          </div>

          <p style="font-size: 0.95rem; color: #5c554e; line-height: 1.6;">
            If you need urgent assistance or want to expedite your IEC Code / GST audit briefing, you can also reach us directly at <a href="tel:+918810400251" style="color: #c21d2e; text-decoration: none; font-weight: bold;">+91 88104 00251</a> or reply directly to this email.
          </p>

          <p style="font-size: 0.95rem; color: #5c554e; margin-top: 25px;">
            Best Regards,<br>
            <strong>Exim Guru Mantra Associates</strong><br>
            <span style="font-size: 0.8rem; color: #8c8278;">Delhi - 110018, India</span>
          </p>

          <p style="font-size: 0.72rem; color: #8c8278; margin-top: 30px; text-align: center; border-top: 1px solid #eae3d2; padding-top: 15px;">
            This is an automated system response confirming receipt of your submission.
          </p>
        </div>
      `
    };

    // Send both emails in parallel via Resend HTTP API
    await Promise.all([
      sendEmailViaResend(adminMailOptions),
      sendEmailViaResend(clientMailOptions)
    ]);

    console.log(`[Resend] Successfully dispatched consultation emails for Ticket #${id}`);
    await updateQueryEmailStatus(id, true);
    return true;
  } catch (error) {
    console.error(`[Resend] Failed to dispatch consultation emails for Ticket #${id}:`, error);
    await updateQueryEmailStatus(id, false);
    return false;
  }
};

// Route: Submit Consultation Request
app.post('/api/consultation', async (req, res) => {
  console.log('[API] Received POST request on /api/consultation from IP:', req.ip || req.headers['x-forwarded-for']);
  console.log('[API] Request payload:', req.body);
  const { name, email, phone, company, message, serviceType } = req.body;

  if (!name || !email || !message) {
    console.warn('[API] Validation failed: missing name, email, or message.');
    return res.status(400).json({ error: 'Name, email, and message are required fields' });
  }

  const newQuery = {
    id: Date.now().toString(),
    name,
    email,
    phone: phone || '',
    company: company || '',
    message,
    serviceType: serviceType || 'General Consultation',
    createdAt: new Date().toISOString(),
    status: 'Pending',
    emailsSent: false // Tracks outbox queue state
  };

  try {
    if (queriesCollection) {
      await queriesCollection.insertOne(newQuery);
    }
  } catch (err) {
    console.error('[MongoDB] Failed to save query:', err);
  }

  // Trigger automated email dispatches in the background (non-blocking)
  sendConsultationEmails(newQuery);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been successfully submitted. Our EXIM consultant will reach out shortly.',
    data: newQuery
  });
});

// Background Worker: Retry failed email dispatches every 5 minutes
setInterval(async () => {
  try {
    if (!queriesCollection) return;
    const pendingQueries = await queriesCollection.find({ emailsSent: false }).toArray();
    
    if (pendingQueries.length > 0) {
      console.log(`[Email Queue Worker] Found ${pendingQueries.length} pending email dispatches. Retrying...`);
      for (const query of pendingQueries) {
        await sendConsultationEmails(query);
      }
    }
  } catch (err) {
    console.error('[Email Queue Worker] Error in background email retry loop:', err);
  }
}, 5 * 60 * 1000); // Run every 5 minutes

// Route: Fetch Consultations (Dashboard/Verification purposes)
app.get('/api/consultations', async (req, res) => {
  try {
    if (!queriesCollection) {
      return res.status(503).json({ error: 'Database not initialized' });
    }
    const queries = await queriesCollection.find({}).sort({ createdAt: -1 }).toArray();
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Calculate Import/Export Custom Duties & Drawbacks (Simulator)
app.post('/api/duty-estimate', (req, res) => {
  const { hsCode, flowType, country, cifValue } = req.body;

  if (!hsCode || !flowType || !cifValue) {
    return res.status(400).json({ error: 'HS Code, Flow Type, and Value are required' });
  }

  const val = parseFloat(cifValue);
  if (isNaN(val) || val <= 0) {
    return res.status(400).json({ error: 'CIF/FOB value must be a positive number' });
  }

  // Generate deterministic rates based on first 2 digits of HS Code
  const chapter = parseInt(hsCode.substring(0, 2)) || 84; // default to machinery chapter 84
  
  let basicDutyRate = 7.5; // default 7.5%
  let additionalTaxRate = 18; // default 18% GST/IGST
  let drawbackRate = 1.5; // default drawback

  if (chapter >= 1 && chapter <= 24) {
    // Agri products
    basicDutyRate = flowType === 'import' ? 15.0 : 0.0;
    additionalTaxRate = 5;
    drawbackRate = 2.5;
  } else if (chapter >= 84 && chapter <= 85) {
    // Electronics / Machinery
    basicDutyRate = flowType === 'import' ? 10.0 : 0.0;
    additionalTaxRate = 18;
    drawbackRate = 1.2;
  } else if (chapter >= 50 && chapter <= 63) {
    // Textiles
    basicDutyRate = flowType === 'import' ? 12.5 : 0.0;
    additionalTaxRate = 12;
    drawbackRate = 3.8;
  } else if (chapter >= 72 && chapter <= 83) {
    // Metals
    basicDutyRate = flowType === 'import' ? 7.5 : 5.0; // steel export duty occasionally exists
    additionalTaxRate = 18;
    drawbackRate = 1.8;
  } else {
    // General
    basicDutyRate = flowType === 'import' ? 7.5 : 0.0;
    additionalTaxRate = 18;
    drawbackRate = 1.5;
  }

  const basicDuty = val * (basicDutyRate / 100);
  const socialWelfareSurcharge = flowType === 'import' ? basicDuty * 0.10 : 0; // 10% of BCD
  const subTotalForIGST = val + basicDuty + socialWelfareSurcharge;
  const additionalTax = subTotalForIGST * (additionalTaxRate / 100);
  const totalDuty = basicDuty + socialWelfareSurcharge + additionalTax;
  
  const estimatedDrawback = flowType === 'export' ? val * (drawbackRate / 100) : 0;

  res.json({
    hsCode,
    flowType,
    country,
    cifValue: val,
    rates: {
      basicDutyRate,
      socialWelfareSurchargeRate: flowType === 'import' ? 10 : 0,
      additionalTaxRate, // GST
      drawbackRate
    },
    breakdown: {
      basicDuty,
      socialWelfareSurcharge,
      additionalTax,
      totalDuty: flowType === 'import' ? totalDuty : 0,
      estimatedDrawback
    }
  });
});

// Route: Fetch YouTube Videos from RSS feed dynamically
app.get('/api/youtube-videos', async (req, res) => {
  const fallbackVideos = [
    {
      id: '5BkyvOq8Uts',
      title: 'How to Start Import Export Business in India - Step-by-Step Guide',
      desc: 'Learn the complete operational workflow of starting an EXIM startup, setting up logistics, and finding international buyers.',
      duration: '12:45'
    },
    {
      id: 'vVeeN_hEobU',
      title: 'IEC Registration Online Tutorial | Apply for Import Export Code',
      desc: 'A complete walk-through of the DGFT portal application process to get your IEC issued in under 24 hours.',
      duration: '08:30'
    },
    {
      id: 'z-F1mYlQ_j8',
      title: 'Understanding Indian Customs Duty & Clearance Procedures',
      desc: 'How customs duty is calculated (CIF, Basic Customs Duty, Social Welfare Surcharge, IGST) and port clearance steps.',
      duration: '10:15'
    },
    {
      id: 'k83lB1V0z-o',
      title: 'DGFT Export Incentive Schemes: RoDTEP, Duty Drawback & EPCG',
      desc: 'Evaluate how your trade firm can utilize key government incentive schemes to maximize duty savings and export drawbacks.',
      duration: '14:20'
    }
  ];

  try {
    const channelId = 'UCKRUu69BuybTj4C-w-PHCLg';
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    // Fetch XML feed using standard HTTPS request
    const xmlText = await new Promise((resolve, reject) => {
      https.get(feedUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to fetch RSS feed, status code: ${response.statusCode}`));
          return;
        }
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => { resolve(data); });
      }).on('error', (err) => { reject(err); });
    });

    // Simple robust regex parsing of entries
    const entries = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    
    while ((match = entryRegex.exec(xmlText)) !== null) {
      const entryContent = match[1];
      
      const idMatch = entryContent.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || 
                      entryContent.match(/<id>yt:video:([^<]+)<\/id>/);
      const titleMatch = entryContent.match(/<title>([^<]+)<\/title>/);
      const descMatch = entryContent.match(/<media:description>([^<]*)<\/media:description>/);
      const publishedMatch = entryContent.match(/<published>([^<]+)<\/published>/);
      
      if (idMatch && titleMatch) {
        // Clean up entity encoding in titles
        const cleanTitle = titleMatch[1]
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");

        const cleanDesc = descMatch 
          ? descMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").slice(0, 150) + '...'
          : '';

        entries.push({
          id: idMatch[1],
          title: cleanTitle,
          desc: cleanDesc,
          published: publishedMatch ? publishedMatch[1] : '',
          duration: 'Watch'
        });
      }
    }

    if (entries.length > 0) {
      res.json(entries.slice(0, 5)); // Return top 5 latest videos
    } else {
      res.json(fallbackVideos);
    }
  } catch (error) {
    console.error('Error fetching YouTube RSS feed, serving fallbacks:', error);
    res.json(fallbackVideos);
  }
});

// ==========================================
// Google Drive Banner Auto-Sync System
// ==========================================
const BANNER_DIR = path.join(__dirname, 'data', 'banner');
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(BANNER_DIR)) {
  fs.mkdirSync(BANNER_DIR, { recursive: true });
}

// Download file helper (handles HTTP redirects recursively)
const downloadFile = (url, destPath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400) {
        if (res.headers.location) {
          downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        } else {
          reject(new Error(`Redirected with status ${res.statusCode} but no location header found`));
        }
      } else if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
        fileStream.on('error', (err) => {
          fs.unlink(destPath, () => {});
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download, status code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

// Sync banner images with the Google Drive folder
const syncGoogleDriveBanner = async () => {
  const folderId = '1M_MNxZaygjS9Ku_FzFBYBGLADOhL8PAf';
  const url = `https://drive.google.com/drive/folders/${folderId}`;
  
  console.log('[Banner Sync] Initiating synchronization with Google Drive...');
  
  try {
    const html = await new Promise((resolve, reject) => {
      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
        }
      };
      https.get(url, options, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Google Drive returned HTTP status: ${res.statusCode}`));
          return;
        }
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => { resolve(data); });
      }).on('error', reject);
    });

    // Decode escaped hexadecimal strings
    const decodedHtml = html
      .replace(/\\x22/g, '"')
      .replace(/\\x5b/g, '[')
      .replace(/\\x5d/g, ']')
      .replace(/\\\//g, '/');

    // Match public shared file structures inside folder HTML payload
    const regex = /"([a-zA-Z0-9_\-]{28,45})"\s*,\s*\[\s*"1M_MNxZaygjS9Ku_FzFBYBGLADOhL8PAf"\s*\]\s*,\s*"([^"]+\.(?:jpg|jpeg|png|webp))"/gi;
    
    const driveFiles = [];
    let match;
    while ((match = regex.exec(decodedHtml)) !== null) {
      driveFiles.push({
        id: match[1],
        name: match[2]
      });
    }

    console.log(`[Banner Sync] Resolved ${driveFiles.length} images from Google Drive folder.`);

    if (driveFiles.length === 0) {
      console.warn('[Banner Sync] No valid images matched. Skipping sync to prevent deleting local assets.');
      return false;
    }

    const localFiles = fs.readdirSync(BANNER_DIR);
    const driveFileNames = driveFiles.map(f => f.name);

    // 1. Download missing/new images
    for (const file of driveFiles) {
      if (!localFiles.includes(file.name)) {
        console.log(`[Banner Sync] Fetching new image: ${file.name}`);
        const downloadUrl = `https://docs.google.com/uc?export=download&id=${file.id}`;
        const destPath = path.join(BANNER_DIR, file.name);
        try {
          await downloadFile(downloadUrl, destPath);
          console.log(`[Banner Sync] Successfully downloaded asset: ${file.name}`);
        } catch (downloadErr) {
          console.error(`[Banner Sync] Download failure for ${file.name}:`, downloadErr.message);
        }
      }
    }

    // 2. Remove deleted images
    for (const localFile of localFiles) {
      if (localFile !== '.DS_Store' && !driveFileNames.includes(localFile)) {
        console.log(`[Banner Sync] Deleting unreferenced local image: ${localFile}`);
        try {
          fs.unlinkSync(path.join(BANNER_DIR, localFile));
        } catch (unlinkErr) {
          console.error(`[Banner Sync] File deletion failure for ${localFile}:`, unlinkErr.message);
        }
      }
    }

    console.log('[Banner Sync] Google Drive synchronization completed successfully.');
    return true;
  } catch (err) {
    console.error('[Banner Sync] Synchronization error:', err.message);
    return false;
  }
};

// Serve banner images statically under /api/banner-static/*
app.use('/api/banner-static', express.static(BANNER_DIR));

// Route: Get banner images list
app.get('/api/banner-images', (req, res) => {
  try {
    if (!fs.existsSync(BANNER_DIR)) {
      return res.json([]);
    }
    const files = fs.readdirSync(BANNER_DIR)
      .filter(file => file !== '.DS_Store' && /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    const bannerList = files.map(file => ({
      src: `/api/banner-static/${file}`,
      alt: file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
    }));
    
    res.json(bannerList);
  } catch (err) {
    console.error('[API] Error retrieving banner images:', err);
    res.status(500).json({ error: 'Failed to retrieve banner assets' });
  }
});

// Route: Manually trigger sync
app.post('/api/banner-sync', async (req, res) => {
  const success = await syncGoogleDriveBanner();
  if (success) {
    res.json({ success: true, message: 'Google Drive sync completed successfully' });
  } else {
    res.status(500).json({ error: 'Sync failed, see backend console logs' });
  }
});

// Initial background sync on startup
setTimeout(syncGoogleDriveBanner, 5000); // delay by 5 seconds to let server start up

// Run auto-sync background worker every 10 minutes
setInterval(syncGoogleDriveBanner, 10 * 60 * 1000);

// Serve static assets from frontend build in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback for all other routes to support React SPA Routing (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Exim Guru Mantra server running on port ${PORT}`);
});
