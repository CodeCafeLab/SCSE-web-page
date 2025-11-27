import crypto from "crypto";
import { config } from "../config";

const SANDBOX_TOKEN_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";
const PRODUCTION_TOKEN_URL = "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";
const SANDBOX_CHECKOUT_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay";
const PRODUCTION_CHECKOUT_URL = "https://api.phonepe.com/apis/pg/checkout/v2/pay";
const SANDBOX_STATUS_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order";
const PRODUCTION_STATUS_BASE_URL = "https://api.phonepe.com/apis/pg/checkout/v2/order";

export interface PhonePeTokenResponse {
  access_token: string;
  encrypted_access_token?: string;
  expires_in?: number | null;
  issued_at?: number;
  expires_at?: number;
  session_expires_at?: number;
  token_type?: string;
}

export interface PhonePeCheckoutRequest {
  merchantOrderId: string;
  amount: number; // in paisa
  expireAfter?: number;
  metaInfo?: Record<string, string>;
  redirectUrl: string;
}

export interface PhonePeCheckoutResponse {
  orderId: string;
  state: string;
  redirectUrl: string;
  expireAt?: number;
}

export interface PhonePeOrderStatusOptions {
  details?: boolean;
  errorContext?: boolean;
}

export interface PhonePeOrderStatusResponse {
  orderId: string;
  state: "PENDING" | "FAILED" | "COMPLETED";
  amount: number;
  expireAt?: number;
  metaInfo?: Record<string, string>;
  paymentDetails?: Array<Record<string, unknown>>;
  errorCode?: string;
  detailedErrorCode?: string;
  errorContext?: Record<string, unknown>;
}

const resolveTokenUrl = () => {
  if (config.phonepe?.env === "PRODUCTION") {
    return PRODUCTION_TOKEN_URL;
  }
  return SANDBOX_TOKEN_URL;
};

const resolveCheckoutUrl = () => {
  if (config.phonepe?.env === "PRODUCTION") {
    return PRODUCTION_CHECKOUT_URL;
  }
  return SANDBOX_CHECKOUT_URL;
};

const resolveStatusBaseUrl = () => {
  if (config.phonepe?.env === "PRODUCTION") {
    return PRODUCTION_STATUS_BASE_URL;
  }
  return SANDBOX_STATUS_BASE_URL;
};

export const fetchPhonePeAccessToken = async (): Promise<PhonePeTokenResponse> => {
  if (!config.phonepe?.clientId || !config.phonepe?.clientSecret) {
    throw new Error("PhonePe credentials are not configured");
  }

  const tokenUrl = resolveTokenUrl();
  const params = new URLSearchParams();
  params.append("client_id", config.phonepe.clientId);
  params.append("client_secret", config.phonepe.clientSecret);
  params.append("client_version", config.phonepe.clientVersion || "1");
  params.append("grant_type", "client_credentials");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `PhonePe token request failed with status ${response.status}: ${errorBody}`,
    );
  }

  return (await response.json()) as PhonePeTokenResponse;
};

export const createPhonePeCheckout = async (
  payload: PhonePeCheckoutRequest,
): Promise<PhonePeCheckoutResponse> => {
  const token = await fetchPhonePeAccessToken();
  const checkoutUrl = resolveCheckoutUrl();

  const requestBody = {
    merchantOrderId: payload.merchantOrderId,
    amount: payload.amount,
    ...(payload.expireAfter ? { expireAfter: payload.expireAfter } : {}),
    ...(payload.metaInfo ? { metaInfo: payload.metaInfo } : {}),
    paymentFlow: {
      type: "PG_CHECKOUT",
      message: "Suncity Enrollment Payment",
      merchantUrls: {
        redirectUrl: payload.redirectUrl,
      },
    },
  };

  const response = await fetch(checkoutUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token.access_token}`,
    },
    body: JSON.stringify(requestBody),
  });

  const responseBody = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    const errorMessage =
      typeof responseBody?.message === "string" ? responseBody.message : undefined;
    throw new Error(
      `PhonePe create payment failed: ${errorMessage || response.statusText}`,
    );
  }

  return responseBody as unknown as PhonePeCheckoutResponse;
};

export const fetchPhonePeOrderStatus = async (
  merchantOrderId: string,
  options?: PhonePeOrderStatusOptions,
): Promise<PhonePeOrderStatusResponse> => {
  if (!merchantOrderId) {
    throw new Error("merchantOrderId is required to fetch PhonePe order status");
  }

  const token = await fetchPhonePeAccessToken();
  const baseUrl = resolveStatusBaseUrl();
  const url = new URL(`${baseUrl}/${merchantOrderId}/status`);

  if (options?.details !== undefined) {
    url.searchParams.append("details", String(options.details));
  }

  if (options?.errorContext !== undefined) {
    url.searchParams.append("errorContext", String(options.errorContext));
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token.access_token}`,
    },
  });

  const responseBody = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    const errorMessage =
      typeof responseBody?.message === "string" ? responseBody.message : undefined;
    throw new Error(
      errorMessage || `PhonePe order status failed with ${response.status}`,
    );
  }

  return responseBody as unknown as PhonePeOrderStatusResponse;
};

export const verifyPhonePeWebhookSignature = (
  rawBody: string | undefined,
  providedSignature: string | string[] | undefined,
): boolean => {
  const saltKey = config.phonepe?.webhookSaltKey;
  const saltIndex = config.phonepe?.webhookSaltIndex;

  if (!saltKey || !saltIndex) {
    // No secret configured – assume sandbox/testing and accept
    return true;
  }

  if (!rawBody || typeof providedSignature !== "string") {
    return false;
  }

  const hash = crypto.createHash("sha256").update(rawBody + saltKey).digest("hex");
  const expectedSignature = `${hash}###${saltIndex}`;

  return providedSignature === expectedSignature;
};

