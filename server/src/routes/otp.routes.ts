// src/routes/otp.routes.ts
import { Router } from 'express';
import otpController from '../controllers/otp.controller';

const router = Router();

// Send OTP to email
router.post('/send-otp', otpController.sendOTP);

// Verify OTP
router.post('/verify-otp', otpController.verifyOTP);

export default router;