import nodemailer from 'nodemailer';
import { emailConfig, emailTemplates } from '../config/email.config';

// Create a transporter object using the SMTP transport
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

interface EmailOTPResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends an OTP to the specified email address
 * @param email - Recipient email address
 * @param otp - One-time password to send
 * @returns Promise with the result of the email sending operation
 */
export const sendEmailOTP = async (
  email: string,
  otp: string
): Promise<EmailOTPResponse> => {
  try {
    if (!isValidEmail(email)) {
      throw new Error('Invalid email address');
    }

    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: emailTemplates.verification.subject,
      text: emailTemplates.verification.getText(otp),
      html: emailTemplates.verification.getHtml(otp)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
};

/**
 * Validates an email address format
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generates a random numeric OTP
 * @param length - Length of the OTP (default: 6)
 * @returns Generated OTP string
 */
export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
