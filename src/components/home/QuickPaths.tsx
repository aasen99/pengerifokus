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
      "Fra ASK og effektiv rente til inflasjon, forklart uten bankjargong.",
    icon: "📖",
  },
  {
    href: "/formuesbyggere",
    title: "Lær av andre",
    description:
      "Hvordan kjente formuesbyggere startet, og hva vi kan lære av eierskap.",
    icon: "🏗️",
  },
];

export function QuickPaths() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-900">Hvor vil du starte?</h2>
      <p className="mt-2 max-w-2xl text-stone-600">
        Velg det som passer situasjonen din nå. Du kan alltid hoppe videre til
        guider, tilbud eller flere verktøy senere.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paths.map((path) => (
          <Link
            key={path.href}
            href={path.href}
            className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-orange-200 hover:bg-orange-50/30"
          >
            <span className="text-2xl" aria-hidden="true">
              {path.icon}
            </span>
            <h3 className="mt-3 font-semibold text-stone-900 group-hover:text-orange-700">
              {path.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
              {path.description}
            </p>
            <span className="mt-4 text-sm font-semibold text-orange-600">
              Gå dit →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
