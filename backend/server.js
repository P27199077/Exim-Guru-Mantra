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

async function connectDB() {
  try {
    await client.connect();
    console.log('[MongoDB] Connected successfully to database');
    db = client.db();
    queriesCollection = db.collection('queries');
    settingsCollection = db.collection('settings');
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
