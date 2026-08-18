import Link from "next/link";
import { ContentCard } from "@/components/ui/ContentCard";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { getEmner, type EmneHub } from "@/data/emner";

interface EmneHubPageProps {
  emne: EmneHub;
}

function sectionActionLabel(heading: string, label: string): string {
  switch (heading) {
    case "Guider":
      return `Les guiden ${label}`;
    case "Verktøy":
    case "Verktøy og oversikter":
      return `Åpne ${label}`;
    case "Ordbok":
      return `Forklaring av ${label.toLowerCase()}`;
    case "Fordeler":
      return `Les om ${label}`;
    case "Formuesbyggere":
      return `Profilen til ${label}`;
    default:
      return label;
  }
}

export function EmneHubPage({ emne }: EmneHubPageProps) {
  const otherEmner = getEmner().filter((item) => item.slug !== emne.slug);
  const items = emne.sections.flatMap((section) =>
    section.links.map((link) => ({
      name: link.label,
      path: link.href,
      description: link.description,
    })),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <HubPageSeo
        name={emne.title}
        description={emne.description}
        path={`/emner/${emne.slug}`}
        items={items}
      />

      <Link
        href="/emner"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Alle emner
      </Link>

      <header className="mt-3 mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {emne.title}
        </h1>
        <div className="mt-3 max-w-3xl space-y-3 text-base leading-relaxed text-stone-600">
          {emne.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </header>

      <div className="space-y-10">
        {emne.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-stone-900">
              {section.heading}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.links.map((link) => (
                <ContentCard
                  key={link.href}
                  title={link.label}
                  description={link.description}
                  href={link.href}
                  actionLabel={sectionActionLabel(section.heading, link.label)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <HubCrossLinks
        links={otherEmner.map((item) => ({
          href: `/emner/${item.slug}`,
          label: item.title,
        }))}
      />
    </div>
  );
}
