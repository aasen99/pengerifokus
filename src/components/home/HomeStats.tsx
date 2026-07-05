import { getHomeStats } from "@/lib/home";

const statLabels: { key: keyof ReturnType<typeof getHomeStats>; label: string }[] =
  [
    { key: "tools", label: "kalkulatorer" },
    { key: "guides", label: "guider" },
    { key: "fordeler", label: "fordelsprogrammer" },
    { key: "tilbud", label: "tilbud" },
    { key: "ordbok", label: "ordbok" },
    { key: "formuesbyggere", label: "profiler" },
  ];

export function HomeStats() {
  const stats = getHomeStats();

  return (
    <section
      aria-label="Oversikt over innhold"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
    >
      {statLabels.map(({ key, label }) => (
        <div
          key={key}
          className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-center shadow-sm"
        >
          <p className="text-xl font-bold text-stone-900">{stats[key]}</p>
          <p className="mt-1 text-xs font-medium text-stone-500">{label}</p>
        </div>
      ))}
    </section>
  );
}
