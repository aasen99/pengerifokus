"use client";

import { openCookieSettings } from "@/lib/cookie-consent";

export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-stone-600 hover:text-orange-600"
    >
      Informasjonskapsler
    </button>
  );
}
