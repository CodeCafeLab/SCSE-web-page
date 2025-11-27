import type { Request } from "express";
import { Response } from "express";
import { config } from "../config";
import {
  createPhonePeCheckout,
  fetchPhonePeAccessToken,
  fetchPhonePeOrderStatus,
  verifyPhonePeWebhookSignature,
} from "../services/phonepe.service";
type RawBodyRequest = Request & { rawBody?: string };

interface PhonePeWebhookPayload {
  code?: string;
  success?: boolean;
  message?: string;
  data?: {
    merchantId?: string;
    merchantOrderId?: string;
    transactionId?: string;
    amount?: number;
    state?: "PENDING" | "FAILED" | "COMPLETED";
    paymentDetails?: Array<Record<string, unknown>>;
    error?: {
      code?: string;
      message?: string;
    };
  };
}

export const getPhonePeToken = async (_req: Request, res: Response) => {
  try {
    if (!config.phonepe?.clientId || !config.phonepe?.clientSecret) {
      return res.status(400).json({
        success: false,
        message: "PhonePe credentials are not configured on the server.",
      });
    }

    const tokenResponse = await fetchPhonePeAccessToken();

    return res.status(200).json({
      success: true,
      data: {
        access_token: tokenResponse.access_token,
        expires_at: tokenResponse.expires_at,
        issued_at: tokenResponse.issued_at,
        token_type: tokenResponse.token_type,
        environment: config.phonepe?.env ?? "SANDBOX",
      },
    });
  } catch (error) {
    console.error("[PaymentController] PhonePe token fetch failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch PhonePe access token";
    return res.status(500).json({
      success: false,
      message,
    });
  }
};

export const createOrder = async (_req: Request, res: Response) => {
  try {
    const { amount, customer, formData } = _req.body as {
      amount: number;
      customer?: { name?: string; email?: string; phone?: string };
      formData?: Record<string, string>;
    };

    if (!amount || Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount is required and must be greater than zero.",
      });
    }

    if (!config.phonepe?.clientId || !config.phonepe?.clientSecret) {
      return res.status(500).json({
        success: false,
        message: "PhonePe credentials are not configured on the server.",
      });
    }

    const merchantOrderId = `SCSE_${Date.now()}`;
    const redirectBase = config.app?.frontendUrl || "http://localhost:8080";
    const sanitizedRedirectBase = redirectBase.endsWith("/")
      ? redirectBase.slice(0, -1)
      : redirectBase;
    const redirectUrl = `${sanitizedRedirectBase}/payment/callback?merchantOrderId=${merchantOrderId}`;

    const amountInPaisa = Math.round(amount * 100);
    const metaInfo: Record<string, string> = {
      udf1: customer?.name || "",
      udf2: customer?.email || "",
      udf3: customer?.phone || "",
    };

    if (formData) {
      Object.entries(formData).forEach(([key, value], index) => {
        if (value && index < 12) {
          metaInfo[`udf${index + 4}`] = String(value);
        }
      });
    }

    const checkoutResponse = await createPhonePeCheckout({
      merchantOrderId,
      amount: amountInPaisa,
      expireAfter: 1200,
      redirectUrl,
      metaInfo,
    });

    return res.status(200).json({
      success: true,
      data: {
        redirectUrl: checkoutResponse.redirectUrl,
        merchantOrderId,
        phonePeOrderId: checkoutResponse.orderId,
        state: checkoutResponse.state,
        expireAt: checkoutResponse.expireAt,
      },
    });
  } catch (error) {
    console.error("[PaymentController] createOrder failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create PhonePe payment order";
    return res.status(500).json({
      success: false,
      message,
    });
  }
};

export const paymentWebhook = async (req: RawBodyRequest, res: Response) => {
  try {
    const rawBody = req.rawBody;
    const providedSignature = req.headers["x-verify"];
    const signatureValid = verifyPhonePeWebhookSignature(rawBody, providedSignature);

    if (!signatureValid) {
      console.warn("[PaymentController] PhonePe webhook signature validation failed.");
      return res.status(401).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    const payload = req.body as PhonePeWebhookPayload | undefined;
    const webhookData = payload?.data;

    console.info("[PaymentController] Raw PhonePe webhook payload:", payload);

    if (!webhookData?.merchantOrderId) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook payload: merchantOrderId missing",
      });
    }

    console.info("[PaymentController] PhonePe webhook received", {
      merchantOrderId: webhookData.merchantOrderId,
      merchantId: webhookData.merchantId,
      state: webhookData.state,
      amount: webhookData.amount,
      transactionId: webhookData.transactionId,
      error: webhookData.error,
    });

    // TODO: Persist payment status to database when schema is ready.

    return res.status(200).json({
      success: true,
      message: "Webhook processed",
    });
  } catch (error) {
    console.error("[PaymentController] paymentWebhook failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process webhook";
    return res.status(500).json({
      success: false,
      message,
    });
  }
};

export const verifyPayment = async (_req: Request, res: Response) => {
  try {
    const { orderId } = _req.params;
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    if (!config.phonepe?.clientId || !config.phonepe?.clientSecret) {
      return res.status(500).json({
        success: false,
        message: "PhonePe credentials are not configured on the server.",
      });
    }

    const detailsParam = _req.query.details;
    const errorContextParam = _req.query.errorContext;
    const details =
      typeof detailsParam !== "undefined" ? detailsParam === "true" : false;
    const errorContext =
      typeof errorContextParam !== "undefined" ? errorContextParam === "true" : true;

    const statusResponse = await fetchPhonePeOrderStatus(orderId, {
      details,
      errorContext,
    });

    return res.status(200).json({
      success: true,
      data: statusResponse,
    });
  } catch (error) {
    console.error("[PaymentController] verifyPayment failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to verify PhonePe order status";
    return res.status(500).json({
      success: false,
      message,
    });
  }
};
