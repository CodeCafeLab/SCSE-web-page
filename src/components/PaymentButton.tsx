import React, { useState, useCallback } from "react";
import useCashfree from "../hooks/useCashfree";
import { verifyPayment } from "@/utils/verifyPayment";

interface PaymentSuccessData {
  orderId: string;
  orderAmount: number;
  referenceId: string;
  txStatus: string;
  paymentMode: string;
  txMsg: string;
  txTime: string;
  signature: string;
}

interface PaymentError extends Error {
  code?: string;
  details?: unknown;
}

interface PaymentButtonProps {
  amount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  onSuccess?: (response: PaymentSuccessData) => void;
  onFailure?: (error: PaymentError) => void;
  className?: string;
  children: React.ReactNode;
  mode?: "sandbox" | "production";
  redirectTarget?: "_self" | "_blank" | "_top" | "_modal";
  disabled?: boolean;
  isLoading?: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  customer,
  onSuccess,
  onFailure,
  className = "",
  children,
  mode = "sandbox",
  redirectTarget = "_self",
  disabled = false,
  isLoading: externalLoading = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    checkout,
    isLoading: isCashfreeLoading,
    error,
    isInitialized,
  } = useCashfree(mode);
  const isLoading = externalLoading || isProcessing || isCashfreeLoading;

  const handlePayment = useCallback(async () => {
    if (isLoading || !isInitialized) return;
    setIsProcessing(true);

    try {
      // Validate customer data
      if (
        !customer?.name?.trim() ||
        !customer?.email?.trim() ||
        !customer?.phone?.trim()
      ) {
        throw new Error("Please fill in all customer details");
      }

      // Create order in your backend
      const orderId = `order_${Date.now()}`;
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/payments/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          customer: {
            name: customer.name.trim(),
            email: customer.email.trim(),
            phone: customer.phone.replace(/\D/g, ""), // Remove non-numeric characters
          },
          orderId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create payment order");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data?.payment_session_id) {
        throw new Error(
          responseData.message || "Failed to create payment session"
        );
      }

      const paymentSessionId = responseData.data.payment_session_id;

      // Initialize Cashfree checkout
      await checkout({
        paymentSessionId,
        redirectTarget,
        onSuccess: async () => {
          try {
            // Verify payment status
            const verification = await verifyPayment(orderId);
            if (verification.data.order_status === "PAID") {
              onSuccess?.({
                orderId,
                orderAmount: amount,
                referenceId: `ref_${Date.now()}`,
                txStatus: "SUCCESS",
                paymentMode: "TEST",
                txMsg: "Payment successful",
                txTime: new Date().toISOString(),
                signature: `sign_${Math.random().toString(36).substr(2, 9)}`,
              });
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            onFailure?.(
              error instanceof Error
                ? error
                : new Error("Payment verification failed")
            );
          }
        },
        onFailure: (error: Error & { code?: string }) => {
          console.error("Payment failed:", error);
          onFailure?.({
            name: "PaymentError",
            message: error?.message || "Payment was cancelled or failed",
            code: error?.code,
            details: error,
          });
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      onFailure?.(
        error instanceof Error ? error : new Error("Payment processing failed")
      );
    } finally {
      setIsProcessing(false);
    }
  }, [
    amount,
    customer,
    isInitialized,
    isLoading,
    onSuccess,
    onFailure,
    checkout,
    redirectTarget,
  ]);

  if (error) {
    return (
      <button
        className={`
          ${className} 
          bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded 
          transition-colors disabled:opacity-50 cursor-not-allowed
          flex items-center justify-center min-w-[120px]
        `}
        disabled
      >
        <span>Payment Unavailable</span>
      </button>
    );
  }

  return (
    <button
      onClick={handlePayment}
      className={`
        ${className} 
        bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded 
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center min-w-[120px]
        ${isLoading ? "opacity-75" : ""}
      `}
      disabled={disabled || isLoading || !isInitialized}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default PaymentButton;
