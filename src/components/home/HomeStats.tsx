import Link from "next/link";
import { getHomeStats } from "@/lib/home";

const statLabels: {
  key: keyof ReturnType<typeof getHomeStats>;
  label: string;
  href: string;
}[] = [
  { key: "tools", label: "kalkulatorer", href: "/verktoy" },
  { key: "guides", label: "guider", href: "/guider" },
  { key: "tilbud", label: "tilbud", href: "/tilbud" },
  { key: "fordeler", label: "fordeler", href: "/fordeler" },
  { key: "ordbok", label: "ordbok", href: "/ordbok" },
  { key: "formuesbyggere", label: "profiler", href: "/formuesbyggere" },
];

export function HomeStats() {
  const stats = getHomeStats();

  return (
    <section aria-label="Oversikt over innhold">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm text-stone-600">
        {statLabels.map(({ key, label, href }) => (
          <Link
            key={key}
            href={href}
            className="hover:text-orange-700"
          >
            <span className="font-semibold text-stone-900">{stats[key]}</span>{" "}
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
