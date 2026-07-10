import Link from "next/link";
import { getHomeStats } from "@/lib/home";

const statLabels: {
  key: keyof ReturnType<typeof getHomeStats>;
  label: string;
  href: string;
}[] = [
  { key: "tools", label: "kalkulatorer", href: "/verktoy" },
  { key: "guides", label: "guider", href: "/guider" },
  { key: "fordeler", label: "fordelsprogrammer", href: "/fordeler" },
  { key: "tilbud", label: "tilbud", href: "/tilbud" },
  { key: "ordbok", label: "ordbok", href: "/ordbok" },
  { key: "formuesbyggere", label: "profiler", href: "/formuesbyggere" },
];

export function HomeStats() {
  const stats = getHomeStats();

  return (
    <section
      aria-label="Oversikt over innhold"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
    >
      {statLabels.map(({ key, label, href }) => (
        <Link
          key={key}
          href={href}
          className="group rounded-xl border border-stone-200 bg-white px-3 py-3 text-center shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
        >
          <p className="text-xl font-bold text-stone-900 group-hover:text-orange-700">
            {stats[key]}
          </p>
          <p className="mt-1 text-xs font-medium text-stone-500 group-hover:text-orange-600">
            {label}
          </p>
        </Link>
      ))}
    </section>
  );
}
