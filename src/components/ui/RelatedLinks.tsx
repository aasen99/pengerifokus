import Link from "next/link";

export interface RelatedLink {
  label: string;
  href: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  className?: string;
}

/** Lett «Les også»-blokk uten tung kort-stil. */
export function RelatedLinks({
  title = "Les også",
  links,
  className = "mt-10",
}: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <nav aria-label={title} className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
        {title}
      </h2>
      <ul className="mt-2 space-y-1.5">
        {links.map((link) => (
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
    </nav>
  );
}
