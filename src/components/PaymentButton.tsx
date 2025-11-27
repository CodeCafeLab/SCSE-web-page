import React, { useState } from "react";

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
  onFailure?: (error: PaymentError) => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  beforePayment?: () => Promise<boolean> | boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  customer,
  onFailure,
  className = "",
  children,
  disabled = false,
  isLoading: externalLoading = false,
  beforePayment,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const isLoading = externalLoading || isProcessing;

  const openPhonePeCheckout = React.useCallback(
    (redirectUrl: string) => {
      if (typeof window === "undefined") {
        return false;
      }

      const checkout = window.PhonePeCheckout;
      if (!checkout?.transact) {
        console.warn(
          "[PaymentButton] PhonePe checkout script not available. Falling back to full redirect.",
        );
        return false;
      }

      checkout.transact({
        tokenUrl: redirectUrl,
        type: "IFRAME",
        callback: (response) => {
          console.info("[PaymentButton] PhonePe checkout closed.", { response });
          if (response === "USER_CANCEL") {
            console.warn("[PaymentButton] User cancelled PhonePe payment.");
          } else if (response === "CONCLUDED") {
            console.info("[PaymentButton] PhonePe reported terminal state. Awaiting backend verification.");
          }
        },
      });

      return true;
    },
    [],
  );

  const handlePayment = async () => {
    try {
      if (beforePayment) {
        const shouldProceed = await beforePayment();
        if (!shouldProceed) {
          console.info(
            "[PaymentButton] beforePayment returned false. Aborting payment flow."
          );
          return;
        }
      }
    } catch (error) {
      console.error("[PaymentButton] Error during beforePayment:", error);
      onFailure?.(
        error instanceof Error
          ? error
          : new Error("Pre-payment validation failed")
      );
      return;
    }

    if (isLoading) {
      console.warn("[PaymentButton] Ignoring click because payment flow is already processing.", {
        isLoading,
      });
      return;
    }

    const runtimeEnv = import.meta.env.MODE;
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    console.groupCollapsed("%c[PaymentButton] Triggered payment flow", "color:#1d4ed8; font-weight:bold;");
    console.log("[PaymentButton] Environment snapshot:", {
      runtimeEnv,
      apiBaseUrl: API_BASE_URL,
      timestamp: new Date().toISOString(),
      customerPreview: {
        name: customer?.name,
        email: customer?.email,
        phone: customer?.phone,
      },
      amount,
    });

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

      console.log("[PaymentButton] Validation passed. Creating PhonePe checkout session...", {
        amount,
        apiUrl: `${API_BASE_URL}/api/payments/orders`,
      });

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
            phone: customer.phone.replace(/\D/g, ""),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create payment order");
      }

      const responseData = await response.json();
      console.log("[PaymentButton] PhonePe order response:", responseData);

      const redirectUrl = responseData?.data?.redirectUrl;
      if (!redirectUrl) {
        throw new Error("PhonePe redirect URL missing in response");
      }

      const openedInIframe = openPhonePeCheckout(redirectUrl);
      if (!openedInIframe) {
        console.info("[PaymentButton] Redirecting user to PhonePe checkout page (full-page).");
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error("[PaymentButton] Payment flow error:", error);
      onFailure?.(
        error instanceof Error ? error : new Error("Payment processing failed")
      );
    } finally {
      setIsProcessing(false);
      console.groupEnd();
    }
  };

  return (
    <button
      onClick={handlePayment}
      className={`
        bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded 
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center min-w-[120px]
        ${isLoading ? "opacity-75" : ""}
        ${className}
      `}
      disabled={disabled || isLoading}
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
