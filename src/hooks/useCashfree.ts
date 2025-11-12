import { useEffect, useRef, useState, useCallback } from 'react';

type CashfreeInstance = ReturnType<Window['Cashfree']>;

interface CheckoutOptions {
  paymentSessionId: string;
  redirectTarget?: '_self' | '_blank' | '_top' | '_modal' | HTMLElement;
  onSuccess?: () => void;
  onFailure?: (error: Error) => void;
}

export const useCashfree = (mode: 'sandbox' | 'production' = 'sandbox') => {
  const cashfree = useRef<CashfreeInstance | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize Cashfree SDK
  useEffect(() => {
    // Check if script is already added
    const initializeCashfree = () => {
      try {
        cashfree.current = window.Cashfree({ mode });
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize Cashfree:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize Cashfree'));
      } finally {
        setIsLoading(false);
      }
    };

    if (window.Cashfree) {
      initializeCashfree();
      return;
    }

    // Load the script if not already loaded
    if (!document.getElementById('cashfree-sdk')) {
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.id = 'cashfree-sdk';
      script.async = true;
      script.onload = initializeCashfree;
      script.onerror = () => {
        const error = new Error('Failed to load Cashfree SDK');
        console.error(error);
        setError(error);
        setIsLoading(false);
      };

      document.body.appendChild(script);
    }

    return () => {
      // Cleanup
      const scriptElement = document.getElementById('cashfree-sdk');
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [mode]);

  const checkout = useCallback(async (options: CheckoutOptions) => {
    if (!cashfree.current) {
      throw new Error('Cashfree not initialized');
    }

    try {
      return await cashfree.current.checkout({
        paymentSessionId: options.paymentSessionId,
        redirectTarget: options.redirectTarget || '_self',
      });
    } catch (error) {
      console.error('Payment error:', error);
      options.onFailure?.(error instanceof Error ? error : new Error('Payment failed'));
      throw error;
    }
  }, []);

  return {
    checkout,
    isInitialized,
    isLoading,
    error,
  };
};

export default useCashfree;
