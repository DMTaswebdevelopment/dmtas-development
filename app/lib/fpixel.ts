// Type definition for Facebook Pixel
declare global {
  interface Window {
    fbq: (
      action: string,
      eventName: string,
      options?: Record<string, any>
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

// Define types for event options
interface EventOptions {
  [key: string]: any;
}

export const event = (name: string, options: EventOptions = {}): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, options);
  } else {
    console.warn("Facebook Pixel is not initialized.");
  }
};
