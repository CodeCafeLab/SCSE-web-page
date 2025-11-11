// src/controllers/otp.controller.ts
import { Request, Response } from 'express';
import otpService from '../services/otp.service';
import axios from 'axios';
import { config } from '../config';

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

  async sendWhatsAppOTP(req: Request, res: Response) {
    try {
      const { mobileNumber } = req.body;
      
      if (!mobileNumber) {
        return res.status(400).json({
          success: false,
          message: 'Mobile number is required'
        });
      }

      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Here you would typically send the OTP via WhatsApp
      // For now, we'll just log it and return success
      console.log(`WhatsApp OTP for ${mobileNumber}: ${otp}`);
      
      // Save the OTP to your database or cache
      // await otpService.saveOTP(mobileNumber, otp, 'whatsapp');

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        otp: otp // Remove this in production, only for testing
      });
    } catch (error) {
      console.error('Error in sendWhatsAppOTP controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send WhatsApp OTP'
      });
    }
  }

  async verifyWhatsAppOTP(req: Request, res: Response) {
    try {
      const { mobileNumber, otp } = req.body;
      
      if (!mobileNumber || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Mobile number and OTP are required'
        });
      }

      // Verify the OTP from your database or cache
      // const isValid = await otpService.verifyOTP(mobileNumber, otp, 'whatsapp');
      
      // For testing purposes, we'll just return success if OTP is 6 digits
      const isValid = /^\d{6}$/.test(otp);

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: 'Invalid OTP'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully'
      });
    } catch (error) {
      console.error('Error in verifyWhatsAppOTP controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to verify WhatsApp OTP'
      });
    }
  }
}

export default new OTPController();