// Update payment.routes.ts
import { Router } from 'express';
import { createOrder, paymentWebhook, verifyPayment } from '../controllers/payment.controller';

const router = Router();

// Create a new payment order
router.post('/orders', createOrder);

// Verify payment status
router.get('/verify/:orderId', verifyPayment);

// Webhook endpoint for payment status updates
router.post('/webhook', paymentWebhook);

export default router;