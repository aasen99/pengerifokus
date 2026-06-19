"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  clearStoredCookieConsent,
  getStoredCookieConsent,
  setStoredCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

function CookieBanner({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-stone-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-5"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p
            id="cookie-consent-title"
            className="text-sm font-semibold text-stone-900 sm:text-base"
          >
            Informasjonskapsler
          </p>
          <p
            id="cookie-consent-description"
            className="mt-2 text-sm leading-relaxed text-stone-600"
          >
            Vi bruker valgfri analyse via Google Analytics for å forstå hvordan
            siden brukes. Du kan godta eller avslå. Valget ditt lagres lokalt i
            nettleseren og kan endres når som helst via lenken i bunnteksten.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onReject}
            className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-50"
          >
            Avslå
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
          >
            Godta
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsentChoice | null>(null);

  useEffect(() => {
    setConsent(getStoredCookieConsent());
    setReady(true);

    const handleOpenSettings = () => {
      clearStoredCookieConsent();
      setConsent(null);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpenSettings);
    };
  }, []);

  const accept = () => {
    setStoredCookieConsent("accepted");
    setConsent("accepted");
  };

  const reject = () => {
    setStoredCookieConsent("rejected");
    setConsent("rejected");
  };

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}
      {ready && consent === null && (
        <CookieBanner onAccept={accept} onReject={reject} />
      )}
    </>
  );
}
