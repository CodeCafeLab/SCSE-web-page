// src/routes/otp.routes.ts
import { Router } from 'express';
import otpController from '../controllers/otp.controller';

const router = Router();

// Send OTP to email
router.post('/send-otp', otpController.sendOTP);

// Verify OTP
router.post('/verify-otp', otpController.verifyOTP);

// Send WhatsApp OTP
router.post('/send-whatsapp-otp', otpController.sendWhatsAppOTP);

// Verify WhatsApp OTP
router.post('/verify-whatsapp-otp', otpController.verifyWhatsAppOTP);

export default router;