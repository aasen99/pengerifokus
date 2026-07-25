import type { Metadata } from "next";
import Link from "next/link";
import { ProsentKalkulator } from "@/components/verktoy/ProsentKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { getFaqPageJsonLd } from "@/lib/structured-data";

const toolDescription =
  "Gratis prosentøkning-kalkulator uten reklame. Regn ut hvor mange prosent en verdi har steget, med formel og live svar.";

const faq = [
  {
    question: "Hvordan regner jeg ut prosentøkning?",
    answer:
      "Trekk gammel verdi fra ny verdi, del på gammel verdi og gang med 100. Eksempel: (495 000 − 450 000) ÷ 450 000 × 100 = 10 %.",
  },
  {
    question: "Kan jeg også se økning i kroner?",
    answer:
      "Ja. Kalkulatoren viser både prosent og differanse i kroner når du bruker modus Endring.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Prosentøkning-kalkulator: regn ut økning i prosent",
  description: toolDescription,
  path: "/verktoy/prosentokning",
  keywords: [
    "prosentøkning",
    "prosentøkning kalkulator",
    "regne ut prosentøkning",
    "prosentkalkulator",
    "prosentendring",
  ],
});

export default function ProsentokningPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Prosentøkning-kalkulator"
        description={toolDescription}
        path="/verktoy/prosentokning"
      />
      <JsonLd data={getFaqPageJsonLd(faq)} />

      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Prosentøkning-kalkulator
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-stone-600">
          Finn ut hvor mye en verdi har steget i prosent. Perfekt for lønn,
          priser, portefølje og budsjett, uten reklame.
        </p>
      </header>

      <ProsentKalkulator initialMode="change" />

      <section className="mt-14 max-w-3xl space-y-4 text-stone-600 leading-relaxed">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          Formel for prosentøkning
        </h2>
        <p className="font-mono text-sm text-orange-800">
          ((ny verdi − gammel verdi) ÷ gammel verdi) × 100
        </p>
        <p>
          Eksempel: lønn fra 450 000 til 495 000 kroner. Differansen er 45 000,
          altså 10 % økning. Bruk modus <em>Endring</em> over for å få både
          prosent og kronebeløp.
        </p>
        <p>
          Trenger du flere modi? Åpne den fulle{" "}
          <Link
            href="/verktoy/prosentkalkulator"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            prosentkalkulatoren
          </Link>{" "}
          eller les guiden om{" "}
          <Link
            href="/guider/prosentregning"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            prosentregning
          </Link>
          .
        </p>
      </section>

      <ToolRelatedGuides
        guides={[
          { label: "Prosentregning", href: "/guider/prosentregning" },
          { label: "Prosentnedgang-kalkulator", href: "/verktoy/prosentnedgang" },
          { label: "Prosentøkning i ordboken", href: "/ordbok/prosentokning" },
        ]}
      />
    </div>
  );
}
