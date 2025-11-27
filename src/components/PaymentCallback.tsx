import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const PaymentCallback = () => {
  const [status, setStatus] = useState<
    "success" | "failed" | "pending" | "loading"
  >("loading");
  const [orderId, setOrderId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  interface FormData {
    first_name?: string;
    email?: string;
    mobile_no?: string;
    [key: string]: unknown;
  }

  const [formData, setFormData] = useState<FormData | null>(null);

  // Function to check if payment is verified
  const isPaymentVerified = (status: string | null) => {
    if (!status) return false;
    const normalized = status.toUpperCase();
    return normalized === "PAID" || normalized === "SUCCESS" || normalized === "COMPLETED";
  };

  useEffect(() => {
    const verifyPayment = async () => {
      console.groupCollapsed(
        "%c[PaymentCallback] Verification cycle",
        "color:#0ea5e9; font-weight:bold;"
      );
      console.log("[PaymentCallback] Current URL:", window.location.href);
      console.log("[PaymentCallback] Location state:", location.state);
      const orderIdParam =
        searchParams.get("merchantOrderId") ||
        searchParams.get("order_id") ||
        searchParams.get("cf_payment_id");
      const paymentStatus =
        searchParams.get("payment_status") ||
        searchParams.get("txStatus") ||
        searchParams.get("state");
      const normalizedStatus = paymentStatus
        ? paymentStatus.toUpperCase()
        : null;
      const paymentMessage = searchParams.get("payment_message");

      console.log("[PaymentCallback] Parsed query params:", {
        orderIdParam,
        paymentStatus,
        paymentMessage,
      });

      // If no order ID, redirect to home
      if (!orderIdParam) {
        console.warn(
          "[PaymentCallback] No order ID detected in callback URL. Redirecting home."
        );
        navigate("/", { replace: true });
        console.groupEnd();
        return;
      }

      // Try to get form data from state or localStorage
      const stateFormData = location.state?.formData;
      const storedFormData = localStorage.getItem("enrollmentFormData");

      if (stateFormData) {
        console.log("[PaymentCallback] Using form data from navigation state.");
        setFormData(stateFormData);
      } else if (storedFormData) {
        console.log("[PaymentCallback] Rehydrating form data from localStorage.");
        setFormData(JSON.parse(storedFormData));
      }

      if (!orderIdParam) {
        setStatus("failed");
        toast({
          title: "Error",
          description: "Invalid payment reference. Please try again.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setOrderId(orderIdParam);
      console.log("[PaymentCallback] Stored orderId in state:", orderIdParam);

      // If payment status is in URL, use it
      if (
        normalizedStatus === "SUCCESS" ||
        normalizedStatus === "PAYMENT_SUCCESS" ||
        normalizedStatus === "COMPLETED"
      ) {
        setStatus("success");
        console.log(
          "[PaymentCallback] Payment status in URL indicates success. Preparing thank-you redirect."
        );

        // Store payment success in localStorage
        localStorage.setItem(`payment_${orderIdParam}`, "success");

        // Redirect to thank you page with all necessary parameters
        const formDataToSend =
          stateFormData || (storedFormData ? JSON.parse(storedFormData) : {});

        // Create a URLSearchParams object with the form data
        const params = new URLSearchParams();

        // Add all form data to URL parameters
        Object.entries(formDataToSend).forEach(([key, value]) => {
          if (value) {
            params.append(key, String(value));
          }
        });

        // Add payment details
        params.append("payment_id", orderIdParam);
        params.append("payment_status", "success");
        params.append("txStatus", "SUCCESS");

        // Redirect to thank you page with all parameters
        navigate(`/thank-you?${params.toString()}`, {
          state: { paymentVerified: true },
          replace: true,
        });
      } else if (
        normalizedStatus === "FAILED" ||
        normalizedStatus === "PAYMENT_ERROR" ||
        normalizedStatus === "CANCELLED"
      ) {
        setStatus("failed");
        console.warn(
          "[PaymentCallback] Payment status in URL indicates failure. Redirecting back to enrollment form.",
          { paymentStatus, paymentMessage }
        );

        // Store payment failure in localStorage
        localStorage.setItem(`payment_${orderIdParam}`, "failed");

        // Show error message
        toast({
          title: "Payment Failed",
          description:
            paymentMessage ||
            "We couldn't process your payment. Please try again.",
          variant: "destructive",
        });

        // Redirect back to form with error state immediately
        navigate("/", {
          state: {
            paymentError: true,
            errorMessage:
              paymentMessage || "Payment was not successful. Please try again.",
          },
          replace: true,
        });
        return;
      } else {
        // Verify payment status with backend if status is not clear from URL
        try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
          console.log("[PaymentCallback] Payment status unclear. Calling verify endpoint.", {
            apiUrl: `${API_BASE_URL}/api/payments/verify/${orderIdParam}`,
          });
          const response = await fetch(
            `${API_BASE_URL}/api/payments/verify/${orderIdParam}?details=false&errorContext=true`
          );

          if (response.ok) {
            const { data: paymentData } = await response.json();
            console.log("[PaymentCallback] Verification API response:", paymentData);

            const orderState =
              paymentData?.state ||
              paymentData?.paymentDetails?.[0]?.state ||
              null;

            if (isPaymentVerified(orderState)) {
              setStatus("success");
              console.log(
                "[PaymentCallback] Backend confirmed payment success. Navigating to thank-you page."
              );

              localStorage.setItem(`payment_${orderIdParam}`, "success");

              const formDataToSend =
                location.state?.formData ||
                (localStorage.getItem("enrollmentFormData")
                  ? JSON.parse(
                      localStorage.getItem("enrollmentFormData") || "{}"
                    )
                  : {});

              const params = new URLSearchParams();
              Object.entries(formDataToSend).forEach(([key, value]) => {
                if (value) {
                  params.append(key, String(value));
                }
              });

              params.append("payment_id", paymentData?.orderId || orderIdParam);
              params.append("payment_status", "success");
              params.append("payment_state", orderState || "COMPLETED");
              params.append(
                "amount_paid",
                paymentData?.amount
                  ? (paymentData.amount / 100).toString()
                  : ""
              );

              navigate(`/thank-you?${params.toString()}`, {
                state: {
                  paymentVerified: true,
                  formData: formDataToSend,
                  paymentDetails: paymentData,
                },
                replace: true,
              });
            } else if (orderState === "FAILED") {
              setStatus("failed");
              console.warn(
                "[PaymentCallback] Backend indicates payment failure. Redirecting to enrollment form."
              );

              localStorage.setItem(`payment_${orderIdParam}`, "failed");

              toast({
                title: "Payment Failed",
                description:
                  paymentData?.errorContext?.description ||
                  paymentData?.errorCode ||
                  "We couldn't process your payment. Please try again.",
                variant: "destructive",
              });

              setTimeout(() => {
                navigate("/", {
                  state: { paymentError: true },
                  replace: true,
                });
              }, 3000);
            } else {
              setStatus("pending");
              console.warn(
                "[PaymentCallback] Backend response pending. Scheduling retry."
              );

              setTimeout(() => {
                verifyPayment();
              }, 2000);
            }
          } else {
            setStatus("pending");
            console.warn("[PaymentCallback] Verification request failed. Retrying soon.", {
              status: response.status,
              statusText: response.statusText,
            });

            setTimeout(() => {
              verifyPayment();
            }, 2000);
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setStatus("pending");
          console.warn("[PaymentCallback] Verification threw an error. Retrying soon.");

          setTimeout(() => {
            verifyPayment();
          }, 2000);
        }
      }
      console.groupEnd();
    };

    verifyPayment();
  }, [searchParams, navigate, location.state?.formData, toast]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Verifying payment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          {status === "success" && (
            <>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription className="text-base mt-2">
                Thank you for your payment. Your enrollment is now complete.
              </CardDescription>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Payment Failed</CardTitle>
              <CardDescription className="text-base mt-2">
                We couldn't process your payment. Please try again or contact
                support.
              </CardDescription>
            </>
          )}

          {status === "pending" && (
            <>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-yellow-600 animate-spin" />
              </div>
              <CardTitle className="text-2xl">Payment Pending</CardTitle>
              <CardDescription className="text-base mt-2">
                Your payment is being processed. We'll notify you once it's
                confirmed.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {orderId && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Order ID: {orderId}</p>
            </div>
          )}

          <div className="space-y-2">
            {status === "success" && (
              <Button onClick={() => navigate("/")} className="w-full">
                Return to Home
              </Button>
            )}

            {status === "failed" && (
              <>
                <Button
                  onClick={() => navigate("/#enrollment-form")}
                  className="w-full"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open("https://wa.me/919876543210", "_blank")
                  }
                  className="w-full"
                >
                  Contact Support
                </Button>
              </>
            )}

            {status === "pending" && (
              <Button onClick={() => navigate("/")} className="w-full">
                Back to Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
