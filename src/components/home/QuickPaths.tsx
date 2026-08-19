import Link from "next/link";

const paths = [
  {
    href: "/tilbud",
    title: "Finn medlemsrabatter",
    description: "OBOS, Trumf, Usbl, LOfavør, Klarna, EuroBonus og mer.",
  },
  {
    href: "/verktoy",
    title: "Regn på valgene",
    description: "Sparing, bolig, feriepenger, prosent og bonus.",
  },
  {
    href: "/guider",
    title: "Les guider",
    description: "Steg for steg om sparing, gjeld og bolig.",
  },
  {
    href: "/ordbok",
    title: "Slå opp begreper",
    description: "Korte forklaringer uten bankjargong.",
  },
];

export function QuickPaths() {
  return (
    <section>
      <h2 className="text-xl font-bold text-stone-900">Hvor vil du starte?</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {paths.map((path) => (
          <Link
            key={path.href}
            href={path.href}
            className="group rounded-xl border border-stone-200 bg-white px-5 py-4 transition-colors hover:border-orange-300"
          >
            <h3 className="text-base font-semibold text-stone-900 group-hover:text-orange-700">
              {path.title}
            </h3>
            <p className="mt-1 text-sm text-stone-600">{path.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
