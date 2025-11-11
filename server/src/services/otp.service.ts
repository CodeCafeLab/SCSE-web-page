import { AppDataSource } from '../config/database';
import { OTP } from '../models/otp.model';
import emailService from './email.service';

class OTPService {
  private otpRepository = AppDataSource.getRepository(OTP);
  private OTP_EXPIRY_MINUTES = 10; // OTP validity in minutes

  async generateAndSendOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Delete any existing OTPs for this email
      await this.otpRepository.delete({ email });

      // Generate new OTP
      const otp = emailService.generateOTP();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + this.OTP_EXPIRY_MINUTES);

      // Save OTP to database
      const newOTP = this.otpRepository.create({
        email,
        otp,
        expiresAt,
        isVerified: false,
      });
      await this.otpRepository.save(newOTP);

      // Send OTP via email
      const emailSent = await emailService.sendOTP(email, otp);
      
      if (!emailSent) {
        throw new Error('Failed to send OTP email');
      }

      return {
        success: true,
        message: 'OTP sent successfully',
      };
    } catch (error) {
      console.error('Error in generateAndSendOTP:', error);
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.'
      };
    }
  }

  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; message: string }> {
    try {
      const otpRecord = await this.otpRepository.findOne({
        where: { email, otp, isVerified: false },
        order: { createdAt: 'DESC' },
      });

      if (!otpRecord) {
        return { success: false, message: 'Invalid OTP' };
      }

      // Check if OTP has expired
      if (new Date() > otpRecord.expiresAt) {
        return { success: false, message: 'OTP has expired' };
      }

      // Mark OTP as verified
      otpRecord.isVerified = true;
      await this.otpRepository.save(otpRecord);

      return {
        success: true,
        message: 'Email verified successfully',
      };
    } catch (error) {
      console.error('Error in verifyOTP:', error);
      return {
        success: false,
        message: 'Failed to verify OTP. Please try again.'
      };
    }
  }

  async isEmailVerified(email: string): Promise<boolean> {
    try {
      const verifiedOTP = await this.otpRepository.findOne({
        where: { email, isVerified: true },
        order: { updatedAt: 'DESC' },
      });
      return !!verifiedOTP;
    } catch (error) {
      console.error('Error checking email verification status:', error);
      return false;
    }
  }
}

export default new OTPService();
