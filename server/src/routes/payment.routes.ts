// Update payment.routes.ts
import { Router } from 'express';
import { createOrder, paymentWebhook, verifyPayment, getPhonePeToken } from '../controllers/payment.controller';

const router = Router();

// Create a new payment order
router.post('/orders', createOrder);

// Verify payment status
router.get('/verify/:orderId', verifyPayment);

// Webhook endpoint for payment status updates
router.post('/webhook', paymentWebhook);

// PhonePe helper endpoints
router.post('/phonepe/token', getPhonePeToken);

export default router;