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
    console.groupCollapsed('%c[useCashfree] Initializing Cashfree SDK', 'color:#6366f1; font-weight:bold;');
    console.log('[useCashfree] Environment details:', {
      requestedMode: mode,
      runtimeMode: import.meta.env.MODE,
      locationHref: window.location.href,
    });

    // Check if script is already added
    const initializeCashfree = () => {
      try {
        cashfree.current = window.Cashfree({ mode });
        setIsInitialized(true);
        setError(null);
        console.log('[useCashfree] Cashfree SDK initialized successfully.', {
          mode,
          hasCheckout: typeof cashfree.current?.checkout === 'function',
        });
      } catch (err) {
        console.error('Failed to initialize Cashfree:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize Cashfree'));
      } finally {
        setIsLoading(false);
      }
    };

    if (window.Cashfree) {
      console.log('[useCashfree] Cashfree SDK already available on window. Reusing existing instance.');
      initializeCashfree();
      console.groupEnd();
      return;
    }

    // Load the script if not already loaded
    if (!document.getElementById('cashfree-sdk')) {
      console.log('[useCashfree] Cashfree SDK script not found. Injecting script tag.');
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
    } else {
      console.log('[useCashfree] Cashfree SDK script tag already present. Waiting for onload.');
    }

    return () => {
      // Cleanup
      const scriptElement = document.getElementById('cashfree-sdk');
      if (scriptElement && document.body.contains(scriptElement)) {
        console.log('[useCashfree] Cleaning up Cashfree SDK script tag.');
        document.body.removeChild(scriptElement);
      }
      console.groupEnd();
    };
  }, [mode]);

  const checkout = useCallback(async (options: CheckoutOptions) => {
    if (!cashfree.current) {
      throw new Error('Cashfree not initialized');
    }

    try {
      console.groupCollapsed('%c[useCashfree] Invoking checkout', 'color:#2563eb; font-weight:bold;');
      console.log('[useCashfree] Checkout options:', options);
      return await cashfree.current.checkout({
        paymentSessionId: options.paymentSessionId,
        redirectTarget: options.redirectTarget || '_self',
      });
    } catch (error) {
      console.error('Payment error:', error);
      options.onFailure?.(error instanceof Error ? error : new Error('Payment failed'));
      throw error;
    } finally {
      console.groupEnd();
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
