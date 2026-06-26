import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import https from 'https';
import nodemailer from 'nodemailer';
import dns from 'dns';
import { fileURLToPath } from 'url';

// Force DNS resolution to prioritize IPv4 over IPv6 globally
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

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

// Configure Nodemailer SMTP Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use STARTTLS (upgraded connection) on port 587
  auth: {
    user: process.env.EMAIL_USER, // eximgurumantra@gmail.com
    pass: process.env.EMAIL_PASS  // Google App Password
  },
  // Force DNS lookup to return IPv4 only (resolves ENETUNREACH IPv6 errors on Render)
  lookup: (hostname, options, callback) => {
    const cb = typeof options === 'function' ? options : callback;
    dns.lookup(hostname, { family: 4 }, cb);
  }
});

// Helper: Update emailsSent status in queries database
const updateQueryEmailStatus = (id, status) => {
  try {
    const queries = readQueries();
    const updated = queries.map(q => {
      if (q.id === id) {
        return { ...q, emailsSent: status };
      }
      return q;
    });
    writeQueries(updated);
  } catch (err) {
    console.error('Error updating query email status:', err);
  }
};

// Helper: Send Automated Consultation Emails (runs asynchronously in background)
const sendConsultationEmails = async (queryData) => {
  const { name, email, phone, company, message, serviceType, id } = queryData;
  console.log(`[Nodemailer] Initiating email dispatch for Ticket #${id}. Target Customer: ${email}`);

  // Check if credentials are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('[Nodemailer] Email notifications skipped: EMAIL_USER or EMAIL_PASS environment variables are not configured.');
    return false;
  }

  try {
    // Email 1: Notification Ticket to EXIM Guru Mantra (eximgurumantra@gmail.com)
    const adminMailOptions = {
      from: `"EXIM Guru Mantra WebDesk" <${process.env.EMAIL_USER}>`,
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
      from: `"Exim Guru Mantra Support" <${process.env.EMAIL_USER}>`,
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

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    console.log(`[Nodemailer] Successfully dispatched consultation emails for Ticket #${id}`);
    updateQueryEmailStatus(id, true);
    return true;
  } catch (error) {
    console.error(`[Nodemailer] Failed to dispatch consultation emails for Ticket #${id}:`, error);
    updateQueryEmailStatus(id, false);
    return false;
  }
};

// Route: Submit Consultation Request
app.post('/api/consultation', (req, res) => {
  console.log('[API] Received POST request on /api/consultation from IP:', req.ip || req.headers['x-forwarded-for']);
  console.log('[API] Request payload:', req.body);
  const { name, email, phone, company, message, serviceType } = req.body;

  if (!name || !email || !message) {
    console.warn('[API] Validation failed: missing name, email, or message.');
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
    status: 'Pending',
    emailsSent: false // Tracks outbox queue state
  };

  queries.push(newQuery);
  writeQueries(queries);

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
    const queries = readQueries();
    const pendingQueries = queries.filter(q => q.emailsSent === false);
    
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
