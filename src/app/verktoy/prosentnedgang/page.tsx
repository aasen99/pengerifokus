import type { Metadata } from "next";
import Link from "next/link";
import { ProsentKalkulator } from "@/components/verktoy/ProsentKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { getFaqPageJsonLd } from "@/lib/structured-data";

const toolDescription =
  "Prosentnedgang-kalkulator: regn ut hvor mange prosent en verdi har falt, eller redusér et beløp med prosent.";

const faq = [
  {
    question: "Hvordan regner jeg ut prosentnedgang?",
    answer:
      "Bruk samme formel som prosentøkning: ((ny − gammel) ÷ gammel) × 100. Negativt svar betyr nedgang. Fra 1 200 til 999 er −16,75 %.",
  },
  {
    question: "Hvordan finner jeg ny pris etter rabatt?",
    answer:
      "Bruk modus Øk/reduser og velg Reduser. 899 kr med 15 % rabatt blir 764,15 kr.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Prosentnedgang-kalkulator",
  description: toolDescription,
  path: "/verktoy/prosentnedgang",
  keywords: [
    "prosentnedgang",
    "prosentnedgang kalkulator",
    "regne ut prosentnedgang",
    "rabatt i prosent",
    "prosentkalkulator",
  ],
});

export default function ProsentnedgangPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Prosentnedgang-kalkulator"
        description={toolDescription}
        path="/verktoy/prosentnedgang"
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
          Prosentnedgang-kalkulator
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-stone-600">
          Regn ut prosentvis nedgang, eller se ny pris etter rabatt.
        </p>
      </header>

      <ProsentKalkulator
        initialMode="adjust"
        initialAdjustDirection="decrease"
      />

      <section className="mt-14 max-w-3xl space-y-4 text-stone-600 leading-relaxed">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          Formel for prosentnedgang
        </h2>
        <p className="font-mono text-sm text-orange-800">
          ((ny verdi − gammel verdi) ÷ gammel verdi) × 100
        </p>
        <p>
          Negativt svar er nedgang. Vil du heller vite ny pris etter rabatt?
          Bruk modus <em>Øk / reduser</em>: ny verdi = tall × (1 − prosent ÷
          100).
        </p>
        <p>
          Se også{" "}
          <Link
            href="/verktoy/prosentokning"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            prosentøkning
          </Link>
          , den fulle{" "}
          <Link
            href="/verktoy/prosentkalkulator"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            prosentkalkulatoren
          </Link>{" "}
          og guiden{" "}
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
          { label: "Prosentøkning-kalkulator", href: "/verktoy/prosentokning" },
          { label: "Prosentnedgang i ordboken", href: "/ordbok/prosentnedgang" },
        ]}
      />
    </div>
  );
}
