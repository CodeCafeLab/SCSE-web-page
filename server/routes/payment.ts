import { Router, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

const router = Router();

interface PaymentRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface CashfreeResponse {
  payment_session_id: string;
  order_id: string;
  [key: string]: unknown;
}

router.post('/create-session', async (req: Request, res: Response) => {
  try {
    const {
      orderId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
    } = req.body as PaymentRequest;

    // Validate required fields
    if (!orderId || !amount || !customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    // Use production domain if available, otherwise check environment variable, fallback to localhost
    const baseUrl = process.env.APP_URL 
      ? process.env.APP_URL 
      : isProduction 
        ? 'https://dos.suncitysolar.in'
        : process.env.VITE_APP_URL || 'http://localhost:8080';

    // Determine Cashfree API URL based on environment
    const cashfreeApiUrl = process.env.CASHFREE_API_URL || 'https://sandbox.cashfree.com/pg/orders';
    const clientId = process.env.CASHFREE_APP_ID || '';
    const secretKey = process.env.CASHFREE_SECRET_KEY || '';

    if (!clientId || !secretKey) {
      return res.status(500).json({ error: 'Cashfree credentials not configured' });
    }

    // Call Cashfree API to create payment order
    const response = await axios.post<CashfreeResponse>(
      cashfreeApiUrl,
      {
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        order_note: 'Course Enrollment Fee - Discovery of Success',
        customer_details: {
          customer_id: customerEmail,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        },
        order_meta: {
          return_url: `${baseUrl}/payment/callback?order_id={order_id}`,
          notify_url: `${baseUrl}/api/payment/webhook`,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': clientId,
          'x-client-secret': secretKey,
          'x-api-version': '2023-08-01',
        },
      }
    );

    return res.status(200).json({
      paymentSessionId: response.data.payment_session_id,
      orderId: response.data.order_id,
    });
  } catch (error: unknown) {
    console.error('Payment error:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Failed to create payment session';
      return res.status(axiosError.response?.status || 500).json({ 
        error: errorMessage 
      });
    }
    return res.status(500).json({ 
      error: 'An unexpected error occurred' 
    });
  }
});

// Webhook endpoint for payment status updates
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    console.log('Payment webhook received:', payload);
    
    // Verify webhook signature in production
    // TODO: Implement signature verification
    
    const { data, event } = payload;
    
    // Handle different payment events
    switch (event) {
      case 'PAYMENT_SUCCESS':
        console.log('Payment successful:', data);
        // Update database or trigger other actions
        break;
        
      case 'PAYMENT_FAILED':
        console.log('Payment failed:', data);
        break;
        
      case 'PAYMENT_PENDING':
        console.log('Payment pending:', data);
        break;
        
      default:
        console.log('Unhandled event type:', event);
    }
    
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Error processing webhook' });
  }
});

export default router;

