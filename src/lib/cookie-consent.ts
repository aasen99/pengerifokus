export type CookieConsentChoice = "accepted" | "rejected";

const STORAGE_KEY = "pengerifokus-cookie-consent";

export const COOKIE_CONSENT_OPEN_EVENT = "pengerifokus:open-cookie-settings";

export function getStoredCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function setStoredCookieConsent(choice: CookieConsentChoice): void {
  window.localStorage.setItem(STORAGE_KEY, choice);
}

export function clearStoredCookieConsent(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}
