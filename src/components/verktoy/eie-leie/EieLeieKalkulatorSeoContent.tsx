import Link from "next/link";

export function EieLeieKalkulatorSeoContent() {
  return (
    <div className="mt-10 space-y-8">
      <section>
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          Slik sammenligner du eie og leie
        </h2>
        <p className="mt-3 max-w-3xl text-stone-600 leading-relaxed">
          Kalkulatoren regner ut nettoformue over tid: hva du sitter igjen med
          ved å kjøpe bolig mot å leie. Den holder kontantstrømmen lik måned for
          måned — hvis eie koster mer enn leie, investerer leieren differansen,
          og omvendt. Avdrag bygger egenkapital i boligen og investeres ikke på
          nytt.
        </p>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-stone-600">
          <li>
            Start med kjøpesum, egenkapital, boliglånsrente og husleie
          </li>
          <li>
            Se break-even — når eie «går forbi» leie økonomisk
          </li>
          <li>
            Utvid med vedlikehold, salgskostnader og lønnsvekst i avansert
            modus
          </li>
        </ul>
        <p className="mt-4 max-w-3xl text-stone-600 leading-relaxed">
          Les{" "}
          <Link
            href="/guider/eie-eller-leie-bolig"
            className="font-medium text-emerald-700 underline decoration-emerald-700/30 underline-offset-2 hover:decoration-emerald-700"
          >
            guiden om eie eller leie bolig
          </Link>{" "}
          for tidshorisont, dokumentavgift, alternativkostnad og andre
          forhold utover det rene tallet.
        </p>
      </section>
    </div>
  );
}
