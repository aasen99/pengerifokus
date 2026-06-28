import Link from "next/link";
import { CookiePreferencesLink } from "@/components/layout/CookiePreferencesLink";
import {
  FORDELSPROGRAMMER_TITLE,
  TILBUD_TITLE,
} from "@/data/content-labels";
import { FORMUESBYGGERE_TITLE } from "@/data/formuesbyggere-labels";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-stone-900">Penger i Fokus</p>
            <p className="mt-1 text-sm text-stone-600">
              Forstå, spare og bruke penger smartere.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/guider" className="text-stone-600 hover:text-orange-600">
              Guider
            </Link>
            <Link
              href="/formuesbyggere"
              className="text-stone-600 hover:text-orange-600"
            >
              {FORMUESBYGGERE_TITLE}
            </Link>
            <Link
              href="/fordeler"
              className="text-stone-600 hover:text-orange-600"
            >
              {FORDELSPROGRAMMER_TITLE}
            </Link>
            <Link
              href="/tilbud"
              className="text-stone-600 hover:text-orange-600"
            >
              {TILBUD_TITLE}
            </Link>
            <Link
              href="/verktoy"
              className="text-stone-600 hover:text-orange-600"
            >
              Verktøy
            </Link>
            <Link
              href="/ordbok"
              className="text-stone-600 hover:text-orange-600"
            >
              Ordbok
            </Link>
            <CookiePreferencesLink />
          </nav>
        </div>
        <p className="mt-8 text-xs text-stone-500">
          © {new Date().getFullYear()} Penger i Fokus. Informasjonen er
          veiledende og erstatter ikke individuell rådgivning.
        </p>
      </div>
    </footer>
  );
}
