const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send email
const sendEmail = async (options) => {
  const transporter = createTransporter();

  const message = {
    from: `${process.env.SMTP_FROM || 'Tiranga Green Energy'} <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html || options.text
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Send enquiry notification to admin
const sendEnquiryNotification = async (enquiry) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2d5016;">New Enquiry Received</h2>
      <p>You have received a new enquiry from your website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${enquiry.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${enquiry.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${enquiry.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Service Type:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${enquiry.serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Location:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${enquiry.city || 'N/A'}, ${enquiry.state || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${enquiry.message}</td>
        </tr>
      </table>
      
      <p style="margin-top: 20px;">
        <a href="${process.env.FRONTEND_URL}/admin/enquiries/${enquiry._id}" 
           style="background-color: #2d5016; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          View in Dashboard
        </a>
      </p>
      
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        This is an automated notification from Tiranga Green Energy Solutions.
      </p>
    </div>
  `;

  await sendEmail({
    email: process.env.ADMIN_EMAIL,
    subject: `New Enquiry from ${enquiry.name}`,
    html
  });
};

// Send acknowledgment to customer
const sendCustomerAcknowledgment = async (enquiry) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2d5016;">Thank You for Your Interest!</h2>
      
      <p>Dear ${enquiry.name},</p>
      
      <p>Thank you for contacting Tiranga Green Energy Solutions. We have received your enquiry and our team will get back to you within 24-48 hours.</p>
      
      <h3 style="color: #2d5016;">Your Enquiry Details:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Service Type:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${enquiry.serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Your Message:</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${enquiry.message}</td>
        </tr>
      </table>
      
      <p>In the meantime, you can:</p>
      <ul>
        <li>Explore our <a href="${process.env.FRONTEND_URL}/solutions">Solar Solutions</a></li>
        <li>Check out our <a href="${process.env.FRONTEND_URL}/projects">Recent Projects</a></li>
        <li>Read our <a href="${process.env.FRONTEND_URL}/blog">Latest Blog Posts</a></li>
      </ul>
      
      <p>For urgent queries, feel free to call us at: <strong>+91-XXXXXXXXXX</strong></p>
      
      <p style="margin-top: 30px;">Best regards,<br>
      <strong>Tiranga Green Energy Solutions Team</strong></p>
      
      <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px;">
        This is an automated email. Please do not reply to this email.
      </p>
    </div>
  `;

  await sendEmail({
    email: enquiry.email,
    subject: 'Thank You for Your Enquiry - Tiranga Green Energy',
    html
  });
};

module.exports = {
  sendEmail,
  sendEnquiryNotification,
  sendCustomerAcknowledgment
};
