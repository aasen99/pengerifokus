import Link from "next/link";

export function Hero() {
  return (
    <header>
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        Forstå, spare og bruke penger smartere.
      </h1>
      <p className="mt-2 max-w-2xl text-base text-stone-600 sm:text-lg">
        Guider, kalkulatorer, ordbok, tilbud og mer for personlig økonomi i
        Norge, uten bankjargong.
      </p>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
        <Link
          href="/verktoy/okonomisk-rontgen"
          className="text-orange-600 hover:text-orange-700"
        >
          Økonomisk røntgen →
        </Link>
        <Link href="/verktoy" className="text-orange-600 hover:text-orange-700">
          Alle verktøy →
        </Link>
        <Link href="/guider" className="text-orange-600 hover:text-orange-700">
          Guider →
        </Link>
      </p>
    </header>
  );
}
