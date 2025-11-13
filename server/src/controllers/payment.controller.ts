import { Request, Response } from "express";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { config } from "../config";

// Debug: Log the config when the file loads
console.log('Payment controller loaded with config:', {
  cashfreeEnv: config.cashfree?.env,
  nodeEnv: config.nodeEnv,
  clientId: config.cashfree?.clientId ? '***' : 'missing',
  clientSecret: config.cashfree?.clientSecret ? '***' : 'missing'
});

// Initialize Cashfree instance with better error handling
const isProduction = config.cashfree?.env === 'PRODUCTION' || process.env.CASHFREE_ENV === 'PRODUCTION';

if (!config.cashfree?.clientId || !config.cashfree?.clientSecret) {
  console.error('FATAL ERROR: Cashfree credentials are missing!');
  console.error('Please check your .env file and ensure CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET are set');
}

const cashfree = new Cashfree(
  isProduction ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
  config.cashfree?.clientId || '',
  config.cashfree?.clientSecret || ''
);

console.log(`Cashfree initialized in ${isProduction ? 'PRODUCTION' : 'SANDBOX'} mode`);

// ✅ Create order API
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, customer, orderId } = req.body;

    if (!amount || !customer?.phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: amount or customer.phone",
      });
    }

    // Validate Cashfree credentials
    if (!config.cashfree?.clientId || !config.cashfree?.clientSecret) {
      console.error('Cashfree credentials missing in createOrder');
      return res.status(500).json({
        success: false,
        message: "Payment gateway configuration error. Please contact support.",
      });
    }

    // Always use HTTPS for production, HTTP for local development
    const isProduction = config.cashfree?.env === 'PRODUCTION' || process.env.CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://dos.suncitysolar.in' 
      : 'http://localhost:8080';
      
    console.log(`Using base URL: ${baseUrl}, isProduction: ${isProduction}`);

    // Ensure we're using HTTPS for production
    const returnUrl = isProduction
      ? 'https://dos.suncitysolar.in/payment/callback?order_id={order_id}'
      : `${baseUrl}/payment/callback?order_id={order_id}`;
      
    const notifyUrl = isProduction
      ? 'https://dos.suncitysolar.in/api/payments/webhook'
      : `${baseUrl}/api/payments/webhook`;

    const orderRequest = {
      order_amount: amount.toString(),
      order_currency: "INR",
      order_id: orderId || "order_" + Date.now(),
      customer_details: {
        customer_id: customer.id || "cust_" + Math.random().toString(36).slice(2, 10),
        customer_name: customer.name || "User",
        customer_email: customer.email || "noemail@example.com",
        customer_phone: customer.phone,
      },
      order_meta: {
        return_url: returnUrl,
        notify_url: notifyUrl
      },
      order_note: "Payment for Suncity Enrollment",
    };
    
    console.log('Order request details:', {
      ...orderRequest,
      order_meta: {
        return_url: returnUrl,
        notify_url: notifyUrl
      },
      customer_details: {
        ...orderRequest.customer_details,
        customer_phone: orderRequest.customer_details.customer_phone ? '***' : 'missing'
      }
    });

    const response = await cashfree.PGCreateOrder(orderRequest);
    const sessionId = response.data?.payment_session_id;

    if (!sessionId) {
      console.error('No payment session ID received from Cashfree:', response);
      return res.status(500).json({
        success: false,
        message: "Failed to create payment session",
      });
    }

    return res.status(200).json({
      success: true,
      data: response.data,
      paymentLink: `https://payments.cashfree.com/checkout/pay/${sessionId}`,
    });
  } catch (error: any) {
    console.error(
      "Error creating order:",
      {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        }
      }
    );
    
    // More detailed error response
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create order';
    
    // Log full error in development, sanitized in production
    const errorDetails = process.env.NODE_ENV === 'development' 
      ? {
          message: error.message,
          stack: error.stack,
          code: error.code,
          response: error.response?.data
        }
      : undefined;
    
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      ...(errorDetails && { error: errorDetails })
    });
  }
};

// ✅ Payment Webhook (server-to-server)
export const paymentWebhook = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const orderId = data?.order?.order_id;
    const paymentStatus = data?.payment?.payment_status;

    console.log(`Webhook received for order ${orderId} → ${paymentStatus}`);

    // ⚠️ Verify signature for security (mandatory for production)
    // const signature = req.headers['x-webhook-signature'] as string;
    // const isValid = cashfree.PGVerifyWebhookSignature(signature, req.body);
    // if (!isValid) {
    //   return res.status(401).json({ success: false, message: 'Invalid signature' });
    // }

    // Update DB logic here → e.g., update order/payment status

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing webhook" });
  }
};

// ✅ Verify Payment (manual check)
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    // Validate Cashfree credentials
    if (!config.cashfree?.clientId || !config.cashfree?.clientSecret) {
      console.error('Cashfree credentials missing in verifyPayment');
      return res.status(500).json({
        success: false,
        message: "Payment gateway configuration error. Please contact support.",
      });
    }

    const response = await cashfree.PGFetchOrder(orderId);
    const orderData = response.data as any;

    if (!orderData) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        order_id: orderData.order_id,
        order_amount: orderData.order_amount,
        order_status: orderData.order_status,
        payment_status: orderData.payment_status,
        cf_payment_id: orderData.cf_payment_id,
        payment_method: orderData.payment_method,
        payment_group: orderData.payment_group,
      },
    });
  } catch (error: any) {
    console.error(
      "Payment verification error:",
      {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status,
      }
    );
    
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || error.message || "Failed to verify payment";
    
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      ...(process.env.NODE_ENV === 'development' && {
        error: {
          message: error.message,
          code: error.code
        }
      })
    });
  }
};
