import { Request, Response } from "express";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { config } from "../config";

// Initialize Cashfree instance
const cashfree = new Cashfree(
  config.cashfree.env === "PRODUCTION"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX,
  config.cashfree.clientId,
  config.cashfree.clientSecret
);

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

    const orderRequest = {
      order_amount: amount.toString(),
      order_currency: "INR",
      order_id: orderId || "order_" + Date.now(),
      customer_details: {
        customer_id:
          customer.id || "cust_" + Math.random().toString(36).slice(2, 10),
        customer_name: customer.name || "User",
        customer_email: customer.email || "noemail@example.com",
        customer_phone: customer.phone,
      },
      order_meta: {
        return_url: `${config.app.frontendUrl}/payment/callback?order_id={order_id}`,
      },
      order_note: "Payment for Suncity Enrollment",
    };

    const response = await cashfree.PGCreateOrder(orderRequest);
    const sessionId = response.data?.payment_session_id;

    return res.status(200).json({
      success: true,
      data: response.data,
      paymentLink: sessionId
        ? `https://payments.cashfree.com/checkout/pay/${sessionId}`
        : null,
    });
  } catch (error: any) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.response?.data?.message || error.message,
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

    const response = await cashfree.PGFetchOrder(orderId);
    const orderData = response.data as any;

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
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || "Failed to verify payment",
    });
  }
};
