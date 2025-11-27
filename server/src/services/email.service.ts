// src/services/email.service.ts
import nodemailer from "nodemailer";
import { config } from "../config/index";

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private usingTestAccount = false;

  /**
   * Lazily create the transporter so we can gracefully fall back
   * to an Ethereal test account when EMAIL_* env vars are missing
   * or the configured SMTP server is unreachable during local dev.
   */
  private async getTransporter(
    options: { forceTestTransport?: boolean } = {}
  ): Promise<nodemailer.Transporter> {
    if (
      this.transporter &&
      (!options.forceTestTransport || this.usingTestAccount)
    ) {
      return this.transporter;
    }

    const hasEmailConfig =
      Boolean(config.email.host) &&
      Boolean(config.email.user) &&
      Boolean(config.email.password);

    if (hasEmailConfig && !options.forceTestTransport) {
      try {
        const transporter = nodemailer.createTransport({
          host: config.email.host,
          port: config.email.port,
          secure: config.email.secure ?? config.email.port === 465,
          auth: {
            user: config.email.user,
            pass: config.email.password,
          },
        });

        if (config.nodeEnv !== "production") {
          try {
            await transporter.verify();
          } catch (verifyError) {
            if (this.shouldRetryWithTestAccount(verifyError)) {
              console.warn(
                `[EmailService] SMTP server ${
                  config.email.host
                } is unreachable in ${config.nodeEnv}. Falling back to Ethereal test account.`
              );
              return this.getTransporter({ forceTestTransport: true });
            }

            console.error(
              "[EmailService] Failed to verify configured SMTP transporter:",
              verifyError
            );
            throw verifyError;
          }
        }

        this.usingTestAccount = false;
        this.transporter = transporter;
        return this.transporter;
      } catch (error) {
        if (
          config.nodeEnv !== "production" &&
          this.shouldRetryWithTestAccount(error)
        ) {
          console.warn(
            "[EmailService] Falling back to Ethereal test account due to SMTP initialization failure."
          );
          return this.getTransporter({ forceTestTransport: true });
        }

        throw error;
      }
    }

    if (config.nodeEnv !== "production") {
      const testAccount = await nodemailer.createTestAccount();
      this.usingTestAccount = true;
      const infoMessage = options.forceTestTransport
        ? "[EmailService] Falling back to Ethereal test account due to SMTP failure."
        : "[EmailService] EMAIL_* env vars missing. Using Ethereal test account.";
      console.warn(infoMessage);
      this.transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      return this.transporter;
    }

    throw new Error(
      "Email configuration is missing. Please set EMAIL_* environment variables."
    );
  }

  private shouldRetryWithTestAccount(error: unknown): boolean {
    if (config.nodeEnv === "production" || this.usingTestAccount) {
      return false;
    }

    const err = error as NodeJS.ErrnoException | undefined;
    if (!err) return false;

    const retryableCodes = new Set([
      "ENOTFOUND",
      "EDNS",
      "ECONNECTION",
      "ECONNREFUSED",
      "ETIMEDOUT",
    ]);

    return (
      Boolean(err.syscall && err.syscall.includes("getaddrinfo")) ||
      (err.code ? retryableCodes.has(err.code) : false)
    );
  }

  public generateOTP(): string {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  public async sendOTP(to: string, otp: string): Promise<boolean> {
    const fromAddress =
      config.email.from || "Suncity Solar <no-reply@suncitysolar.test>";

    const mailOptions = {
      from: fromAddress,
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

    const send = async (
      activeTransporter: nodemailer.Transporter
    ): Promise<boolean> => {
      const info = await activeTransporter.sendMail(mailOptions);

      if (this.usingTestAccount) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.info(
          `[EmailService] Preview email at: ${previewUrl ?? "unavailable"}`
        );
      }

      return true;
    };

    try {
      const transporter = await this.getTransporter();
      return await send(transporter);
    } catch (error) {
      const canRetry =
        config.nodeEnv !== "production" && this.shouldRetryWithTestAccount(error);

      if (canRetry) {
        this.transporter = null;
        try {
          const fallbackTransporter = await this.getTransporter({
            forceTestTransport: true,
          });
          return await send(fallbackTransporter);
        } catch (fallbackError) {
          console.error(
            "Error sending email using fallback transporter:",
            fallbackError
          );
        }
      }

      console.error("Error sending email:", error);
      return false;
    }
  }
}

export default new EmailService();
