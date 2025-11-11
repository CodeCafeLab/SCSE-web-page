// src/services/email.service.ts
import nodemailer from "nodemailer";
import { config } from "../config/index";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure, // true for 465, false for other ports
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  public generateOTP(): string {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  public async sendOTP(to: string, otp: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: config.email.from,
        to,
        subject: "Your OTP for Verification",
        text: `Your OTP is: ${otp}\n\nThis OTP is valid for 10 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Email Verification</h2>
            <p>Your OTP for verification is:</p>
            <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0; padding: 15px; background: #f5f5f5; display: inline-block;">
              ${otp}
            </div>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr>
            <p>Best regards,<br>Suncity Solar Team</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
}

export default new EmailService();
