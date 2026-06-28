import Link from "next/link";
import {
  FORDELSPROGRAMMER_INTRO,
  FORDELSPROGRAMMER_TITLE,
  TILBUD_INTRO,
  TILBUD_TITLE,
} from "@/data/content-labels";

const entries = [
  {
    href: "/guider",
    title: "Guider",
    description:
      "Steg-for-steg veiledning for sparing, investering, gjeld og hverdagsøkonomi.",
    icon: "📘",
    color: "hover:border-stone-300 hover:bg-stone-50/80",
  },
  {
    href: "/formuesbyggere",
    title: "Formuesbyggerne",
    description:
      "Profiler av kjente formuesbyggere, hvordan de startet, og hva vi kan lære av eierskap.",
    cta: "formuesbyggerne",
    icon: "🏗️",
    color: "hover:border-orange-300 hover:bg-orange-50/50",
  },
  {
    href: "/fordeler",
    title: FORDELSPROGRAMMER_TITLE,
    description: FORDELSPROGRAMMER_INTRO,
    cta: "fordelsprogrammer",
    icon: "🎁",
    color: "hover:border-orange-300 hover:bg-orange-50/50",
  },
  {
    href: "/tilbud",
    title: TILBUD_TITLE,
    description: TILBUD_INTRO,
    cta: "tilbud",
    icon: "🏷️",
    color: "hover:border-orange-200 hover:bg-orange-50/30",
  },
  {
    href: "/verktoy",
    title: "Verktøy",
    description:
      "Kalkulatorer og praktiske verktøy for å regne, planlegge og sammenligne.",
    icon: "🔧",
    color: "hover:border-stone-300 hover:bg-stone-50/80",
  },
  {
    href: "/ordbok",
    title: "Ordbok",
    description:
      "Forklaringer på økonomiske begreper, uten bankjargong og fine ord.",
    icon: "📖",
    color: "hover:border-orange-200 hover:bg-orange-50/30",
  },
];

export function MainEntries() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-900">Utforsk innholdet</h2>
      <p className="mt-2 max-w-2xl text-stone-600">
        Penger i Fokus samler praktisk kunnskap og verktøy for personlig
        økonomi. Start der det passer deg best.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
              <p className="mt-1 text-sm text-stone-600">{entry.description}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-orange-600">
                Gå til {entry.cta ?? entry.title.toLowerCase()} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
