import Link from "next/link";

interface HubLink {
  href: string;
  label: string;
}

interface HubCrossLinksProps {
  links: HubLink[];
}

/** Korte interne lenker under hub-sider for crawlbar tematisk kobling. */
export function HubCrossLinks({ links }: HubCrossLinksProps) {
  if (links.length === 0) return null;

  return (
    <nav aria-label="Relaterte sider" className="mt-10">
      <p className="text-sm text-stone-600">
        Se også:{" "}
        {links.map((link, index) => (
          <span key={link.href}>
            {index > 0 && <span className="text-stone-400"> · </span>}
            <Link
              href={link.href}
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              {link.label}
            </Link>
          </span>
        ))}
      </p>
    </nav>
  );
}
