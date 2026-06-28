import Link from "next/link";

interface RelatedGuide {
  label: string;
  href: string;
}

interface ToolRelatedGuidesProps {
  guides: RelatedGuide[];
}

export function ToolRelatedGuides({ guides }: ToolRelatedGuidesProps) {
  if (guides.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50 p-6">
      <h2 className="text-lg font-semibold text-stone-900">Relaterte guider</h2>
      <ul className="mt-3 space-y-2">
        {guides.map((guide) => (
          <li key={guide.href}>
            <Link
              href={guide.href}
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              {guide.label} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
