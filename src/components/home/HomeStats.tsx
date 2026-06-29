import { getHomeStats } from "@/lib/home";

const statLabels: { key: keyof ReturnType<typeof getHomeStats>; label: string }[] =
  [
    { key: "tools", label: "kalkulatorer" },
    { key: "guides", label: "guider" },
    { key: "ordbok", label: "ordbok-artikler" },
    { key: "formuesbyggere", label: "profiler" },
    { key: "tilbud", label: "tilbud" },
  ];

export function HomeStats() {
  const stats = getHomeStats();

  return (
    <section
      aria-label="Oversikt over innhold"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
    >
      {statLabels.map(({ key, label }) => (
        <div
          key={key}
          className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-center shadow-sm"
        >
          <p className="text-2xl font-bold text-stone-900">{stats[key]}</p>
          <p className="mt-1 text-xs font-medium text-stone-500">{label}</p>
        </div>
      ))}
    </section>
  );
}
