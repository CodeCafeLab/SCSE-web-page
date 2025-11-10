// Server-side email configuration
export const emailConfig = {
  host: process.env.SMTP_HOST || "mail.hostedemail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "noreply@suncitysolar.in",
    pass: process.env.SMTP_PASS || "" // Leave empty to use environment variable
  },
  from: '"Suncity Solar" <noreply@suncitysolar.in>',
  replyTo: 'support@suncitysolar.in',
  // Add any additional SMTP options here
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 10
};

export const emailTemplates = {
  verification: {
    subject: 'Email Verification - Suncity Solar',
    getText: (otp: string) => `Your one time code for DOS enrollment is: ${otp}`,
    getHtml: (otp: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Your one time code for DOS enrollment is:</p>
        <div style="background: #f4f4f4; padding: 10px 20px; margin: 20px 0; font-size: 24px; font-weight: bold; letter-spacing: 2px; display: inline-block;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr>
        <p>Best regards,<br>Suncity Solar Team</p>
      </div>
    `
  }
  // Add more email templates as needed
};
