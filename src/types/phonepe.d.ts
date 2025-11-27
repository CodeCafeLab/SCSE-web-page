interface PhonePeCheckoutTransactOptions {
  tokenUrl: string;
  type?: "IFRAME" | "REDIRECT";
  callback?: (response: "USER_CANCEL" | "CONCLUDED") => void;
}

interface PhonePeCheckoutObject {
  transact: (options: PhonePeCheckoutTransactOptions) => void;
  closePage: () => void;
}

declare global {
  interface Window {
    PhonePeCheckout?: PhonePeCheckoutObject;
  }
}

export {};

