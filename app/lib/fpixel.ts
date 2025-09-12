// Facebook Pixel event parameters based on Facebook's documentation
interface FacebookPixelEventParams {
  // Standard e-commerce parameters
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  search_string?: string;
  status?: string;

  // Lead generation parameters
  content?: string;

  // Custom parameters (string, number, boolean only)
  [key: string]: string | number | boolean | string[] | undefined;
}

// Facebook Pixel standard events (most commonly used ones)
type FacebookPixelStandardEvents =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "AddToWishlist"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "CustomizeProduct"
  | "Donate"
  | "FindLocation"
  | "Schedule"
  | "StartTrial"
  | "SubmitApplication"
  | "Subscribe";

// Facebook Pixel actions
type FacebookPixelAction = "track" | "trackCustom" | "init" | "consent";

// Type definition for Facebook Pixel
declare global {
  interface Window {
    fbq: (
      action: FacebookPixelAction,
      eventName: string,
      options?: FacebookPixelEventParams
    ) => void;
  }
}

export const FB_PIXEL_ID: string | undefined =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// Ensure Facebook Pixel is available before calling track
export const pageView = (): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  } else {
    console.warn("Facebook Pixel is not initialized.");
  }
};

// Standard Facebook Pixel events with proper typing
export const trackStandardEvent = (
  eventName: FacebookPixelStandardEvents,
  options: FacebookPixelEventParams = {}
): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, options);
  } else {
    console.warn("Facebook Pixel is not initialized.");
  }
};

// Custom events (for events not in the standard list)
export const trackCustomEvent = (
  eventName: string,
  options: FacebookPixelEventParams = {}
): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, options);
  } else {
    console.warn("Facebook Pixel is not initialized.");
  }
};

// Generic event function (backwards compatible with your existing code)
export const event = (
  name: string,
  options: FacebookPixelEventParams = {}
): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    // Check if it's a standard event
    const standardEvents: FacebookPixelStandardEvents[] = [
      "PageView",
      "ViewContent",
      "Search",
      "AddToCart",
      "AddToWishlist",
      "InitiateCheckout",
      "AddPaymentInfo",
      "Purchase",
      "Lead",
      "CompleteRegistration",
      "Contact",
      "CustomizeProduct",
      "Donate",
      "FindLocation",
      "Schedule",
      "StartTrial",
      "SubmitApplication",
      "Subscribe",
    ];

    if (standardEvents.includes(name as FacebookPixelStandardEvents)) {
      window.fbq("track", name, options);
    } else {
      window.fbq("trackCustom", name, options);
    }
  } else {
    console.warn("Facebook Pixel is not initialized.");
  }
};

// Helper functions for common e-commerce events
export const trackPurchase = (
  value: number,
  currency: string = "USD",
  contentIds?: string[]
): void => {
  trackStandardEvent("Purchase", {
    value,
    currency,
    content_ids: contentIds,
  });
};

export const trackAddToCart = (
  contentName: string,
  value?: number,
  currency?: string
): void => {
  trackStandardEvent("AddToCart", {
    content_name: contentName,
    value,
    currency,
  });
};

export const trackLead = (content?: string, value?: number): void => {
  trackStandardEvent("Lead", {
    content,
    value,
  });
};

export const trackSearch = (searchString: string): void => {
  trackStandardEvent("Search", {
    search_string: searchString,
  });
};
