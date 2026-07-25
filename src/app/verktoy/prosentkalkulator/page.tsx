import type { Metadata } from "next";
import Link from "next/link";
import { ProsentKalkulator } from "@/components/verktoy/ProsentKalkulator";
import {
  ProsentKalkulatorSeoContent,
  prosentKalkulatorFaq,
} from "@/components/verktoy/ProsentKalkulatorSeoContent";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { getFaqPageJsonLd, getHowToJsonLd } from "@/lib/structured-data";

const toolDescription =
  "Prosentkalkulator for prosent av et tall, prosentøkning, prosentnedgang, prosentendring og for å finne det hele tallet. Live svar med formel.";

export const metadata: Metadata = createPageMetadata({
  title: "Prosentkalkulator",
  description: toolDescription,
  path: "/verktoy/prosentkalkulator",
  keywords: [
    "prosentkalkulator",
    "prosentregning",
    "regne ut prosent",
    "prosentøkning",
    "prosentnedgang",
    "prosentendring",
    "prosent av et tall",
    "hvordan regne prosent",
    "prosentformel",
    "kalkuler prosent",
  ],
});

export default function ProsentkalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Prosentkalkulator"
        description={toolDescription}
        path="/verktoy/prosentkalkulator"
      />
      <JsonLd data={getFaqPageJsonLd(prosentKalkulatorFaq)} />
      <JsonLd
        data={getHowToJsonLd({
          name: "Hvordan regne ut prosent",
          description:
            "Slik bruker du prosentkalkulatoren til å regne ut prosentandel, økning og nedgang.",
          path: "/verktoy/prosentkalkulator",
          steps: [
            {
              name: "Velg modus",
              text: "Velg om du skal finne prosent av et tall, prosentendring, eller øke/redusere et tall.",
            },
            {
              name: "Fyll inn tallene",
              text: "Skriv inn prosent og verdi, eller gammel og ny verdi, avhengig av modus.",
            },
            {
              name: "Les svaret og formelen",
              text: "Resultatet oppdateres med en gang, med formelen under for å forstå utregningen.",
            },
          ],
        })}
      />

      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Prosentkalkulator
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-stone-600">
          Regn ut prosentandel, prosentøkning, prosentnedgang og prosentendring,
          med formelen rett under svaret.
        </p>
      </header>

      <ProsentKalkulator />

      <ProsentKalkulatorSeoContent />

      <ToolRelatedGuides
        guides={[
          { label: "Prosentregning (guide)", href: "/guider/prosentregning" },
          { label: "Prosentøkning-kalkulator", href: "/verktoy/prosentokning" },
          { label: "Prosentnedgang-kalkulator", href: "/verktoy/prosentnedgang" },
          { label: "Prosent i ordboken", href: "/ordbok/prosent" },
        ]}
      />
    </div>
  );
}
