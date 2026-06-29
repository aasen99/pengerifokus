import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 px-6 py-16 text-white sm:px-10 sm:py-20">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-stone-600/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-orange-500/25 blur-3xl" />

      <div className="relative max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-200">
          Guider, verktøy, ordbok og mer
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Forstå, spare og bruke penger smartere.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-stone-300">
          Penger i Fokus samler praktisk kunnskap for personlig økonomi i Norge:
          kalkulatorer for bolig, gjeld og bonuspoeng, guider, ordbok,
          fordelsprogrammer, tilbud og profiler av formuesbyggere. Uten
          bankjargong.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/verktoy/okonomisk-rontgen" variant="secondary">
            Økonomisk røntgen
          </Button>
          <Button href="/verktoy" variant="secondary">
            Alle verktøy
          </Button>
          <Button
            href="/guider"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20 hover:text-white"
          >
            Guider
          </Button>
        </div>
      </div>
    </section>
  );
}
