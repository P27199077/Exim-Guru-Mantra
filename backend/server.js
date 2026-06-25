import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data folder exists
const DATA_DIR = path.join(__dirname, 'data');
const QUERIES_FILE = path.join(DATA_DIR, 'queries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(QUERIES_FILE)) {
  fs.writeFileSync(QUERIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Helper to read/write query records
const readQueries = () => {
  try {
    const data = fs.readFileSync(QUERIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeQueries = (queries) => {
  fs.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2), 'utf-8');
};

// Route: Base Status
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', message: 'Exim Guru Mantra Backend API is running' });
});

// Route: Submit Consultation Request
app.post('/api/consultation', (req, res) => {
  const { name, email, phone, company, message, serviceType } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields' });
  }

  const queries = readQueries();
  const newQuery = {
    id: Date.now().toString(),
    name,
    email,
    phone: phone || '',
    company: company || '',
    message,
    serviceType: serviceType || 'General Consultation',
    createdAt: new Date().toISOString(),
    status: 'Pending'
  };

  queries.push(newQuery);
  writeQueries(queries);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been successfully submitted. Our EXIM consultant will reach out shortly.',
    data: newQuery
  });
});

// Route: Fetch Consultations (Dashboard/Verification purposes)
app.get('/api/consultations', (req, res) => {
  const queries = readQueries();
  res.json(queries);
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

// Serve static assets from frontend build in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback for all other routes to support React SPA Routing (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Exim Guru Mantra server running on port ${PORT}`);
});
