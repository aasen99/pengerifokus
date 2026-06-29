import Link from "next/link";
import {
  FORDELSPROGRAMMER_TITLE,
  TILBUD_TITLE,
} from "@/data/content-labels";
import { FORMUESBYGGERE_TITLE } from "@/data/formuesbyggere-labels";
import { getHomeStats } from "@/lib/home";

export function MainEntries() {
  const stats = getHomeStats();

  const entries = [
    {
      href: "/verktoy",
      title: "Verktøy",
      description: `${stats.tools} kalkulatorer og tester: bolig, gjeld, sparing, BSU, bonuspoeng og mer.`,
      cta: "verktøy",
      icon: "🔧",
      color: "hover:border-orange-300 hover:bg-orange-50/50",
    },
    {
      href: "/guider",
      title: "Guider",
      description: `${stats.guides} steg-for-steg guider om sparing, fond, gjeld, bolig og hverdagsøkonomi.`,
      cta: "guider",
      icon: "📘",
      color: "hover:border-stone-300 hover:bg-stone-50/80",
    },
    {
      href: "/ordbok",
      title: "Ordbok",
      description: `${stats.ordbok} forklaringer på økonomiske begreper, fra ASK til effektiv rente.`,
      cta: "ordboken",
      icon: "📖",
      color: "hover:border-orange-200 hover:bg-orange-50/30",
    },
    {
      href: "/formuesbyggere",
      title: FORMUESBYGGERE_TITLE,
      description: `${stats.formuesbyggere} profiler om hvordan kjente formuesbyggere startet, og hva vi kan lære av eierskap.`,
      cta: "formuesbyggerne",
      icon: "🏗️",
      color: "hover:border-orange-300 hover:bg-orange-50/50",
    },
    {
      href: "/fordeler",
      title: FORDELSPROGRAMMER_TITLE,
      description: `${stats.fordeler} programmer forklart. Lær hva Trumf, Coop og andre faktisk er.`,
      cta: "fordelsprogrammer",
      icon: "🎁",
      color: "hover:border-orange-300 hover:bg-orange-50/50",
    },
    {
      href: "/tilbud",
      title: TILBUD_TITLE,
      description: `${stats.tilbud} konkrete rabatter og bonuser. Filtrer etter fordelsprogram og kategori.`,
      cta: "tilbud",
      icon: "🏷️",
      color: "hover:border-orange-200 hover:bg-orange-50/30",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-900">Alt innhold samlet</h2>
      <p className="mt-2 max-w-2xl text-stone-600">
        Hele portalen på ett sted, fra kalkulatorer og ordbok til tilbud og
        fordelsprogrammer.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className={`group flex gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all ${entry.color}`}
          >
            <span className="text-3xl" aria-hidden="true">
              {entry.icon}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-stone-900 group-hover:text-orange-700">
                {entry.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">
                {entry.description}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-orange-600">
                Gå til {entry.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
