import { getStoredCookieConsent } from "@/lib/cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(
  eventName: string,
  params?: Record<string, string>,
): void {
  if (typeof window === "undefined") return;
  if (getStoredCookieConsent() !== "accepted") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}
