import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { Gjeldsbremsen } from "@/components/verktoy/gjeldsbremsen/Gjeldsbremsen";
import { GjeldsbremsenFaq } from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenFaq";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { getFaqPageJsonLd, getHowToJsonLd } from "@/lib/structured-data";
import { gjeldsbremsenFaq } from "@/data/gjeldsbremsen";

const toolDescription =
  "Betaler du gjeld, men må bruke kreditt igjen? Gjeldsbremsen viser den reelle nedbetalingen og lager en plan for å bryte lånespiralen.";

export const metadata: Metadata = createPageMetadata({
  title: "Gjeldsbremsen – stopp lånespiralen",
  description: toolDescription,
  path: "/verktoy/gjeldsbremsen",
  keywords: [
    "gjeldsbremsen",
    "lånespiral",
    "kredittkort",
    "forbrukslån",
    "nedbetaling",
    "finansieringsgap",
    "reell gjeldsreduksjon",
  ],
});

export default function GjeldsbremsenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Gjeldsbremsen"
        description={toolDescription}
        path="/verktoy/gjeldsbremsen"
      />
      <JsonLd data={getFaqPageJsonLd(gjeldsbremsenFaq)} />
      <JsonLd
        data={getHowToJsonLd({
          name: "Slik bruker du Gjeldsbremsen",
          description:
            "Lag en plan for å betale gjeld uten å måtte bruke ny kreditt like etterpå.",
          path: "/verktoy/gjeldsbremsen",
          steps: [
            {
              name: "Velg gjeldstype",
              text: "Velg kredittkort, smålån, faktura, kontokreditt, privat lån eller annet.",
            },
            {
              name: "Fyll inn nåsituasjonen",
              text: "Oppgi konto, forfall, inntekter og utgifter. Finansieringsgapet vises med en gang.",
            },
            {
              name: "Legg inn tidligere runder",
              text: "Valgfritt: registrer tidligere betalinger og ny kredittbruk for å se den reelle utviklingen.",
            },
            {
              name: "Velg bremsefart og tiltak",
              text: "Velg stopp ved neste inntekt, nedtrapping eller å stanse veksten, og dekk gapet med egne tiltak.",
            },
          ],
        })}
      />
      <ToolPageHeader
        title="Gjeldsbremsen"
        description="Finn ut hvor mye gjelden faktisk faller – og hva som skal til for å unngå neste lån."
      />

      <Gjeldsbremsen />

      <GjeldsbremsenFaq />

      <ToolRelatedGuides
        guides={[
          { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
          { label: "Nedbetalingskalkulator", href: "/verktoy/nedbetalingskalkulator" },
          { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
          { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
          { label: "Forbruksgjeld i ordboken", href: "/ordbok/forbruksgjeld" },
          { label: "Emne: gjeld", href: "/emner/gjeld" },
        ]}
      />
    </div>
  );
}
