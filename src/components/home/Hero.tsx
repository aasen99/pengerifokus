import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <header>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
        {siteConfig.name}
      </p>
      <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl sm:leading-[1.1]">
        {siteConfig.tagline}
      </h1>
      <p className="mt-4 max-w-xl text-base text-stone-600 sm:text-lg">
        Guider, kalkulatorer og tilbud for personlig økonomi i Norge — uten
        bankjargong.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/verktoy/okonomisk-rontgen" variant="secondary">
          Ta økonomisk røntgen
        </Button>
        <Button href="/verktoy" variant="outline">
          Alle verktøy
        </Button>
      </div>
      <p className="mt-4 text-sm text-stone-500">
        Eller gå direkte til{" "}
        <Link
          href="/tilbud"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          medlemstilbud
        </Link>
        .
      </p>
    </header>
  );
}
