// src/utils/verifyPayment.ts
export const verifyPayment = async (orderId: string) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    console.groupCollapsed("%c[verifyPayment] Starting verification request", "color:#f97316; font-weight:bold;");
    console.log("[verifyPayment] Request details:", {
      orderId,
      apiUrl: `${API_BASE_URL}/api/payments/verify/${orderId}`,
      runtimeMode: import.meta.env.MODE,
    });
    const response = await fetch(
      `${API_BASE_URL}/api/payments/verify/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.warn("[verifyPayment] Verification failed with status:", response.status, response.statusText);
      throw new Error("Failed to verify payment");
    }

    const data = await response.json();
    console.log("[verifyPayment] Verification successful:", data);
    console.groupEnd();
    return data;
  } catch (error) {
    console.error("Payment verification error:", error);
    console.groupEnd();
    throw error;
  }
};
