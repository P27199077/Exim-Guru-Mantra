const fs = require('fs');
const path = require('path');

const mockQuery = {
  id: '784',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@globalexports.in',
  phone: '+91 98765 43210',
  company: 'Global Exports India Pvt Ltd',
  serviceType: 'Import-Export Services',
  message: 'Dear Exim Guru Mantra Team,\n\nWe are looking to register for a new Import Export Code (IEC) under the DGFT portal. Our company is based in Noida. We have a valid PAN card, a current account with ICICI Bank, and commercial space documents ready.\n\nCould you please help us understand the processing times, requirements for the digital signature certificate (Class 3 DSC), and how we can claim Duty Drawback / RoDTEP incentives for our electronic exports to Europe?\n\nLooking forward to your professional advisory.\n\nBest regards,\nRajesh Kumar'
};

const buildVerticalCharStack = (str) => {
  return str.split('').map(char => {
    if (char === ' ') return '<div style="height: 10px;"></div>';
    return `<div style="margin-bottom: 2px;">${char}</div>`;
  }).join('');
};

const getHeaderStyles = () => `
  <style>
    .letterhead-container {
      font-family: Arial, sans-serif;
      max-width: 680px;
      margin: 0 auto;
      border: 1px solid #d5d0c5;
      background-color: #ffffff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  </style>
`;

const renderEmail = (queryData, type) => {
  const { name, email, phone, company, message, serviceType, id } = queryData;
  const logoStack = buildVerticalCharStack("EXIM GURU MANTRA");
  const subStack = buildVerticalCharStack("IMPORT • EXPORT • FREIGHT FORWARDING • CONSULTANCY");

  const contentBoxHtml = type === 'admin' ? `
    <h3 style="margin-top: 0; color: #1b365d; border-bottom: 1px solid #eaeaea; padding-bottom: 8px; font-size: 16px; font-weight: bold; text-transform: uppercase;">
      New Consultation Ticket #${id}
    </h3>
    <table cellpadding="6" cellspacing="0" width="100%" style="font-size: 13px; color: #333; margin-bottom: 18px; border-collapse: collapse;">
      <tr style="background-color: #f7f5f0;">
        <td width="30%" style="font-weight: bold; border: 1px solid #e2ded5;">Client Name:</td>
        <td style="border: 1px solid #e2ded5;">${name}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; border: 1px solid #e2ded5;">Email Address:</td>
        <td style="border: 1px solid #e2ded5;"><a href="mailto:${email}" style="color: #1b365d; text-decoration: none;">${email}</a></td>
      </tr>
      <tr style="background-color: #f7f5f0;">
        <td style="font-weight: bold; border: 1px solid #e2ded5;">Phone Number:</td>
        <td style="border: 1px solid #e2ded5;">${phone ? `<a href="tel:${phone}" style="color: #1b365d; text-decoration: none;">${phone}</a>` : 'Not provided'}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; border: 1px solid #e2ded5;">Company:</td>
        <td style="border: 1px solid #e2ded5;">${company || 'Not provided'}</td>
      </tr>
      <tr style="background-color: #f7f5f0;">
        <td style="font-weight: bold; border: 1px solid #e2ded5;">Service Category:</td>
        <td style="border: 1px solid #e2ded5;"><strong>${serviceType}</strong></td>
      </tr>
    </table>
    
    <div style="border-top: 1px solid #eaeaea; padding-top: 15px;">
      <h4 style="margin: 0 0 8px 0; color: #1b365d; font-size: 14px;">Detailed Query / Message:</h4>
      <div style="white-space: pre-wrap; font-size: 13px; line-height: 1.5; color: #1e1b18; padding: 12px; background-color: #faf9f6; border-radius: 4px; border: 1px solid #efece6;">${message}</div>
    </div>
  ` : `
    <h3 style="margin-top: 0; color: #1b365d; font-size: 16px;">Dear ${name},</h3>
    <p style="font-size: 13.5px; line-height: 1.6; color: #444; margin-bottom: 15px;">
      Thank you for contacting <strong>Exim Guru Mantra Associates</strong>. Your advisory request has been successfully queued under Ticket ID <strong>#${id}</strong> and is currently being processed by our compliance desk.
    </p>

    <div style="background-color: #faf9f6; border: 1px solid #e2ded5; border-radius: 4px; padding: 15px; margin: 15px 0;">
      <h4 style="margin: 0 0 8px 0; color: #5e8d3b; font-size: 14px;">Next Action Steps:</h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #5c554e; line-height: 1.5;">
        <li style="margin-bottom: 6px;">Our principal consultant, <strong>Varun Gupta</strong>, is reviewing your business details and requirements.</li>
        <li style="margin-bottom: 6px;">A dedicated trade compliance specialist will get back to you within <strong>24 to 48 hours</strong> with actionable advice.</li>
        <li>We may request additional papers (such as your PAN details or current account checklist) for draft filing.</li>
      </ul>
    </div>

    <div style="border-top: 1px solid #eaeaea; padding-top: 15px; margin-top: 15px;">
      <h4 style="margin: 0 0 8px 0; color: #666; font-size: 12px; text-transform: uppercase;">Copy of your submitted query:</h4>
      <div style="white-space: pre-wrap; font-size: 12.5px; line-height: 1.4; color: #666; padding: 12px; background-color: #faf9f6; border-radius: 4px; border: 1px solid #efece6;">${message}</div>
    </div>

    <p style="font-size: 13.5px; line-height: 1.6; color: #444; margin-top: 15px; margin-bottom: 0;">
      If you need urgent assistance, please do not hesitate to contact us at <a href="tel:+918810400251" style="color: #1b365d; text-decoration: none; font-weight: bold;">+91 8810400251</a> or reply directly to this email receipt.
    </p>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>EXIM Guru Mantra Letterhead Preview</title>
      ${getHeaderStyles()}
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
      <div class="letterhead-container">
        <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border: 0;">
          <tr>
            <!-- Left Margin rotated text logo stacked character-by-character -->
            <td width="72" valign="top" style="background-color: #ffffff; text-align: center; border-right: 1.5px dashed #ccc; padding: 25px 0 25px 8px; vertical-align: top;">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <!-- EXIM GURU MANTRA stacked -->
                  <td width="50%" valign="top" style="text-align: center; font-size: 18px; font-weight: bold; font-family: 'Times New Roman', Times, Georgia, serif; color: #1b365d; line-height: 1.1; letter-spacing: 2px; text-transform: uppercase;">
                    ${logoStack}
                  </td>
                  <!-- IMPORT EXPORT stacked -->
                  <td width="50%" valign="top" style="text-align: center; font-size: 8px; font-weight: bold; font-family: Arial, sans-serif; color: #5c554e; line-height: 1.3; text-transform: uppercase; letter-spacing: 1px; border-left: 0.5px solid #eaeaea; padding-left: 4px;">
                    ${subStack}
                  </td>
                </tr>
              </table>
            </td>

            <!-- Right Main Area -->
            <td valign="top" style="background-color: #ffffff; padding: 20px 22px 25px 22px; vertical-align: top;">
              
              <!-- Centered Top Header -->
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 26px; font-weight: bold; font-family: 'Times New Roman', Times, Georgia, serif; color: #1b365d; letter-spacing: 1.5px; text-transform: uppercase; text-shadow: 1px 1px 2px rgba(27, 54, 93, 0.1);">
                  EXIM GURU MANTRA
                </h1>
                <div style="font-size: 11px; font-weight: bold; color: #5c554e; letter-spacing: 1.2px; text-transform: uppercase; margin-top: 4px; margin-bottom: 12px;">
                  Import &bull; Export &bull; Freight Forwarding &bull; Consultancy
                </div>
                
                <!-- Contact grid info styled like the header -->
                <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border-top: 1px solid #e8e3d5; border-bottom: 1px solid #e8e3d5; padding: 8px 0; font-size: 11px; font-family: Arial, sans-serif; color: #333; margin-top: 8px;">
                  <tr>
                    <!-- Left side contacts -->
                    <td width="50%" align="left" style="padding: 6px 0; vertical-align: middle;">
                      <table cellpadding="3" cellspacing="0" style="font-size: 11px;">
                        <tr>
                          <td style="color: #1b365d; font-size: 13px; line-height: 1;">✉</td>
                          <td><a href="mailto:eximgurumantra@gmail.com" style="color: #1b365d; text-decoration: none;">eximgurumantra@gmail.com</a></td>
                        </tr>
                        <tr>
                          <td style="color: #1b365d; font-size: 13px; line-height: 1;">✉</td>
                          <td><a href="mailto:info@eximgurumantra.com" style="color: #1b365d; text-decoration: none;">info@eximgurumantra.com</a></td>
                        </tr>
                        <tr>
                          <td style="color: #1b365d; font-size: 13px; line-height: 1;">🌐</td>
                          <td><a href="https://www.eximgurumantra.com" target="_blank" style="color: #1b365d; text-decoration: none;">www.eximgurumantra.com</a></td>
                        </tr>
                      </table>
                    </td>
                    
                    <!-- Right side contacts -->
                    <td width="50%" align="right" style="padding: 6px 0; vertical-align: middle;">
                      <table cellpadding="3" cellspacing="0" align="right" style="font-size: 11px;">
                        <tr>
                          <td style="color: #1b365d; font-size: 13px; line-height: 1;">📞</td>
                          <td><a href="tel:+918810400251" style="color: #1b365d; text-decoration: none;">+91 8810400251</a></td>
                        </tr>
                        <tr>
                          <!-- WhatsApp logo symbol -->
                          <td style="color: #25d366; font-size: 13px; line-height: 1; font-weight: bold;">💬</td>
                          <td><a href="https://wa.me/918368231132" target="_blank" style="color: #1b365d; text-decoration: none; font-weight: bold;">+91 8368231132</a></td>
                        </tr>
                        <tr>
                          <!-- Youtube icon play button -->
                          <td style="color: #c21d2e; font-size: 13px; line-height: 1;">▶</td>
                          <td><a href="https://www.youtube.com/channel/UCKRUu69BuybTj4C-w-PHCLg" target="_blank" style="color: #c21d2e; text-decoration: none; font-weight: bold;">YouTube Channel</a></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Green Bordered Empty Space / Query Content Box -->
              <div style="border: 2px solid #5e8d3b; padding: 22px; border-radius: 4px; min-height: 280px; background-color: #ffffff;">
                ${contentBoxHtml}
              </div>

              <!-- Subtle Footer -->
              <div style="text-align: center; font-size: 10px; color: #8c8278; margin-top: 20px; border-top: 1px dashed #e2ded5; padding-top: 12px;">
                EXIM GURU MANTRA ASSOCIATES &bull; Corporate Legal, CHA & DGFT Advisory
              </div>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
};

// Write files to verify
const adminHtml = renderEmail(mockQuery, 'admin');
const clientHtml = renderEmail(mockQuery, 'client');

const buildDir = __dirname;
fs.writeFileSync(path.join(buildDir, 'admin_preview.html'), adminHtml);
fs.writeFileSync(path.join(buildDir, 'client_preview.html'), clientHtml);
console.log("HTML Preview files generated successfully at:");
console.log(`- ${path.join(buildDir, 'admin_preview.html')}`);
console.log(`- ${path.join(buildDir, 'client_preview.html')}`);
