interface EmailOTPResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  remainingAttempts?: number;
}

interface EmailOTPData {
  email: string;
  otp: string;
  timestamp: number;
  attempts: number;
}

const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes in milliseconds
const MAX_ATTEMPTS = 5;
const OTP_COOLDOWN = 30 * 1000; // 30 seconds

// Get OTP data from localStorage
const getEmailOTPData = (): EmailOTPData | null => {
  if (typeof window === 'undefined') return null;
  
  const data = localStorage.getItem('email_otp');
  return data ? JSON.parse(data) : null;
};

// Save OTP data to localStorage
const saveEmailOTPData = (data: EmailOTPData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('email_otp', JSON.stringify(data));
  }
};

// Clear OTP data from localStorage
export const clearEmailOTPData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('email_otp');
  }
};

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Verifies if the provided OTP matches the one sent to the email
 * @param email - Email address to verify
 * @param otp - One-time password to verify
 * @returns Object with success status and remaining attempts if any
 */
export const verifyOTP = (email: string, otp: string): { success: boolean; remainingAttempts?: number } => {
  const otpData = getEmailOTPData();
  const now = Date.now();

  // Check if OTP data exists and is not expired
  if (!otpData || now - otpData.timestamp > OTP_EXPIRY) {
    clearEmailOTPData();
    return { success: false };
  }

  // Check if email matches
  if (otpData.email !== email) {
    return { success: false };
  }

  // Check if max attempts exceeded
  if (otpData.attempts >= MAX_ATTEMPTS) {
    clearEmailOTPData();
    return { success: false };
  }

  // Check if OTP matches
  if (otpData.otp === otp) {
    clearEmailOTPData();
    return { success: true };
  }

  // Increment attempts
  otpData.attempts += 1;
  const remainingAttempts = MAX_ATTEMPTS - otpData.attempts;
  saveEmailOTPData(otpData);

  return {
    success: false,
    remainingAttempts: remainingAttempts > 0 ? remainingAttempts : 0
  };
};

/**
 * Requests a new OTP to be sent to the provided email
 * @param email - Email address to send OTP to
 * @returns Promise with the result of the OTP request
 */
export const requestOTP = async (email: string): Promise<EmailOTPResponse> => {
  try {
    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Check rate limiting
    const otpData = getEmailOTPData();
    const now = Date.now();
    
    if (otpData && now - otpData.timestamp < OTP_COOLDOWN) {
      const timeLeft = Math.ceil((OTP_COOLDOWN - (now - otpData.timestamp)) / 1000);
      throw new Error(`Please wait ${timeLeft} seconds before requesting a new OTP`);
    }

    // Call the API to send OTP
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send OTP. Please try again.');
    }

    // Generate a random 6-digit OTP (in a real app, this would come from the server)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP data to localStorage
    saveEmailOTPData({
      email,
      otp, // In production, this would be handled securely on the server
      timestamp: now,
      attempts: 0,
    });

    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('Error requesting OTP:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to request OTP. Please try again later.',
    };
  }
};
