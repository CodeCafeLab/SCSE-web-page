// // Example backend API for sending emails
// import type { NextApiRequest, NextApiResponse } from 'next';
// import nodemailer from 'nodemailer';

// const emailConfig = {
//   host: process.env.VITE_EMAIL_HOST || 'mail.hostedemail.com',
//   port: parseInt(process.env.VITE_EMAIL_PORT || '465'),
//   secure: process.env.VITE_EMAIL_SECURE === 'true',
//   auth: {
//     user: process.env.VITE_EMAIL_USER || 'noreply@suncitysolar.in',
//     pass: process.env.VITE_EMAIL_PASSWORD || 'Sunc!ty@4711',
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { to, otp, subject = 'Email Verification - Suncity Solar' } = req.body;

//   if (!to || !otp) {
//     return res.status(400).json({ error: 'Email and OTP are required' });
//   }

//   try {
//     const transporter = nodemailer.createTransport(emailConfig);

//     const mailOptions = {
//       from: process.env.VITE_EMAIL_FROM || 'noreply@suncitysolar.in',
//       to,
//       subject,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #1f2937;">Email Verification</h2>
//           <p>Your one time code for DOS enrollment is:</p>
//           <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
//             ${otp}
//           </div>
//           <p>This OTP will expire in 10 minutes.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//           <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
//           <p style="color: #6b7280; font-size: 14px;">Suncity Solar</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error('Email sending error:', error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// }