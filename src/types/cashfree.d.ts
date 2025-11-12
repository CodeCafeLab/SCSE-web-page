interface Cashfree {
  (): {
    /**
     * Initialize the payment form
     * @param options Payment form options
     */
    initialize: (options: {
      paymentSessionId: string;
      returnUrl?: string;
      redirectTarget?: string;
      ui?: {
        theme?: {
          backgroundColor?: string;
          color?: string;
          fontFamily?: string;
          fontSize?: string;
          inputBorderRadius?: string;
          inputBackgroundColor?: string;
          inputBorderColor?: string;
          inputColor?: string;
          placeholderColor?: string;
          errorColor?: string;
          buttonColor?: string;
          buttonTextColor?: string;
        };
      };
    }) => void;

    /**
     * Check if the payment was successful
     */
    isSuccess: () => boolean;

    /**
     * Check if the payment failed
     */
    isFailed: () => boolean;

    /**
     * Close the payment form
     */
    close: () => void;
  };
}

export {};

declare global {
  interface Window {
    Cashfree: typeof Cashfree;
  }
}
