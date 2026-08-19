import Link from "next/link";
import { CookiePreferencesLink } from "@/components/layout/CookiePreferencesLink";
import { popularTools, primaryNav, secondaryNav } from "@/data/nav";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-stone-800">{title}</p>
      <ul className="mt-3 flex flex-col gap-1.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-stone-600 hover:text-orange-600"
      >
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-stone-900">Penger i Fokus</p>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
              Forstå, spare og bruke penger smartere.
            </p>
          </div>

          <FooterColumn title="Innhold">
            {primaryNav.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
            <FooterLink href="/emner" label="Emner" />
          </FooterColumn>

          <FooterColumn title="Mer">
            {secondaryNav.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </FooterColumn>

          <FooterColumn title="Populære verktøy">
            {popularTools.slice(0, 6).map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </FooterColumn>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-stone-200 pt-6 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Penger i Fokus. Informasjonen er
            veiledende og erstatter ikke individuell rådgivning.
          </p>
          <CookiePreferencesLink />
        </div>
      </div>
    </footer>
  );
}
