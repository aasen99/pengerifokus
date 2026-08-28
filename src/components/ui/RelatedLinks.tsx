import Link from "next/link";

export interface RelatedLink {
  label: string;
  href: string;
  description?: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  className?: string;
}

/** Lett «Les også»-blokk. Lenker med beskrivelse vises som kort. */
export function RelatedLinks({
  title = "Les også",
  links,
  className = "mt-10",
}: RelatedLinksProps) {
  if (links.length === 0) return null;

  const cards = links.filter((link) => link.description);
  const simple = links.filter((link) => !link.description);

  return (
    <nav aria-label={title} className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
        {title}
      </h2>
      {cards.length > 0 && (
        <ul className="mt-3 space-y-3">
          {cards.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group block rounded-xl border border-stone-200 bg-white px-4 py-3 transition-colors hover:border-orange-300"
              >
                <p className="font-semibold text-stone-900 group-hover:text-orange-700">
                  {link.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">
                  {link.description}
                </p>
                <p className="mt-2 text-sm font-semibold text-orange-600 group-hover:text-orange-700">
                  Les mer →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {simple.length > 0 && (
        <ul className={cards.length > 0 ? "mt-3 space-y-1.5" : "mt-2 space-y-1.5"}>
          {simple.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                {link.label} →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
