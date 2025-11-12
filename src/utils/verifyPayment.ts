// src/utils/verifyPayment.ts
export const verifyPayment = async (orderId: string) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
      throw new Error("Failed to verify payment");
    }

    return await response.json();
  } catch (error) {
    console.error("Payment verification error:", error);
    throw error;
  }
};
