import Link from "next/link";
import { CookiePreferencesLink } from "@/components/layout/CookiePreferencesLink";
import { extraNav, popularTools, primaryNav, secondaryNav } from "@/data/nav";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold text-stone-900">Penger i Fokus</p>
            <p className="mt-1 text-sm text-stone-600">
              Forstå, spare og bruke penger smartere.
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {[...primaryNav, ...secondaryNav, ...extraNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-stone-600 hover:text-orange-600"
                >
                  {item.label}
                </Link>
              ))}
              <CookiePreferencesLink />
            </nav>
            <nav aria-label="Populære verktøy" className="text-sm">
              <p className="font-semibold text-stone-800">Populære verktøy</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {popularTools.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-stone-600 hover:text-orange-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <p className="mt-6 text-xs text-stone-500">
          © {new Date().getFullYear()} Penger i Fokus. Informasjonen er
          veiledende og erstatter ikke individuell rådgivning.
        </p>
      </div>
    </footer>
  );
}
