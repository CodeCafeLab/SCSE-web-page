// src/utils/verifyPayment.ts
export const verifyPayment = async (orderId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/payments/verify/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};