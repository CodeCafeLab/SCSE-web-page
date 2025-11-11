// src/controllers/otp.controller.ts
import { Request, Response } from 'express';
import otpService from '../services/otp.service';

class OTPController {
  async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      const result = await otpService.generateAndSendOTP(email);
      
      if (!result.success) {
        return res.status(500).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error in sendOTP controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      
      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Email and OTP are required'
        });
      }

      const result = await otpService.verifyOTP(email, otp);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Error in verifyOTP controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

export default new OTPController();