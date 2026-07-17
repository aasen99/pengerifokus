import Link from "next/link";

const paths = [
  {
    href: "/verktoy/okonomisk-rontgen",
    title: "Kartlegg økonomien",
    description:
      "Få en score og tre konkrete prioriteringer med Økonomisk røntgen.",
    icon: "🩺",
  },
  {
    href: "/tilbud",
    title: "Finn medlemsrabatter",
    description:
      "Søkbare tilbud fra OBOS, Trumf, Usbl, Klarna, EuroBonus og mer. Huk av «Jeg er student» for studentrabatter.",
    icon: "🏷️",
  },
  {
    href: "/guider",
    title: "Les guider",
    description:
      "Fra bufferkonto og gjeld til bolig og kredittkort, steg for steg.",
    icon: "📚",
  },
  {
    href: "/verktoy",
    title: "Regn på store valg",
    description:
      "Eie vs. leie, lånets reelle verdi, sparing, BSU og bonuspoeng.",
    icon: "🧮",
  },
  {
    href: "/ordbok",
    title: "Slå opp begreper",
    description:
      "Fra ASK og effektiv rente til lavinemetode og bonuspoeng.",
    icon: "📖",
  },
  {
    href: "/fordeler",
    title: "Fordelsprogrammer",
    description:
      "Trumf, OBOS, Usbl, Spenn, Norwegian Reward, Student og mer.",
    icon: "🎁",
  },
];

export function QuickPaths() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-900">Hvor vil du starte?</h2>
      <p className="mt-2 max-w-2xl text-stone-600">
        Velg det som passer situasjonen din nå. Du kan alltid hoppe videre til
        flere verktøy, tilbud eller profiler senere.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => (
          <Link
            key={path.href}
            href={path.href}
            className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden="true">
              {path.icon}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-stone-900 group-hover:text-orange-700">
              {path.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {path.description}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-orange-600 group-hover:text-orange-700">
              Gå dit →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
