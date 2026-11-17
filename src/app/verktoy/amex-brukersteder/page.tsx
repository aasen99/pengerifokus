import type { Metadata } from "next";
import Link from "next/link";
import { AmexBrukersteder } from "@/components/verktoy/AmexBrukersteder";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { JsonLd } from "@/components/seo/JsonLd";
import { amexMerchants, amexUpdatedOn } from "@/data/amex-brukersteder";
import { createPageMetadata } from "@/lib/seo";
import { getFaqPageJsonLd } from "@/lib/structured-data";

const path = "/verktoy/amex-brukersteder";
const description = "Hvor kan du bruke American Express? Søk etter butikker, nettbutikker og abonnementer. Se egen Amex-status for butikk, nett og app, med kilder og forbehold.";

export const metadata: Metadata = createPageMetadata({
  title: "Amex brukersteder i Norge – søk etter butikk og abonnement",
  description,
  path,
  keywords: ["Amex brukersteder", "hvor kan jeg bruke Amex", "American Express butikker", "Amex nettbutikk", "Amex abonnement", "Amex Extra", "Amex Viaplay"],
});

const faqs = [
  {
    question: "Betyr «ja» at Amex fungerer i alle butikkene i en kjede?",
    answer: "Ja viser at selskapet oppgir støtte for den aktuelle betalingskanalen. Informasjon om en kjede er ikke en garanti for hver enkelt filial. «Med forbehold» brukes når selskapet selv beskriver lokale unntak eller andre begrensninger. Åpne oppføringen for å lese hva som faktisk er bekreftet.",
  },
  {
    question: "Hva betyr «rapportert ja» og «uavklart»?",
    answer: "Rapportert ja er forbeholdt positive opplysninger vi har mottatt direkte fra lesere. Slike opplysninger merkes med dato og betalingskanal, og er ikke en bekreftelse fra selskapet. Uavklart betyr at vi mangler tilstrekkelig informasjon, eller at kildene spriker. Det betyr ikke at butikken avviser Amex.",
  },
  {
    question: "Gjør Apple Pay at Amex fungerer overalt?",
    answer: "Nei. Amex oppgir at betaling med Apple Pay krever at brukerstedet støtter kontaktløs Amex-betaling. Apple Pay-logoen alene bekrefter derfor ikke Amex. Tilsvarende bør du kontrollere at Amex faktisk kan velges ved betaling gjennom PayPal eller Klarna.",
  },
  {
    question: "Kan jeg flytte et abonnement til Amex?",
    answer: "Se hvem som krever inn betalingen. En strømmetjeneste kan ta Amex direkte selv om en TV- eller mobilleverandør som fakturerer den samme tjenesten, har andre betalingsvalg. Kortbetaling til tjenesten og fakturabetaling til leverandøren må sjekkes hver for seg.",
  },
  {
    question: "Er kontroll-datoen siste gang noen betalte med Amex?",
    answer: "Nei. Datoen viser når vi sjekket en kilde eller mottok en leseropplysning. Disse merkes forskjellig og vises ikke som en betaling testet av Penger i Fokus. Oversikten gjelder oppførte kjeder og tjenester, og er ikke et register over alle enkeltbutikker i Norge.",
  },
];

export default function AmexBrukerstederPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo name="Amex brukersteder" description={description} path={path} />
      <JsonLd data={getFaqPageJsonLd(faqs)} />

      <Link href="/verktoy" className="text-sm font-medium text-orange-700 hover:underline">
        ← Alle verktøy
      </Link>

      <header className="mb-6 mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">American Express · Brukersteder</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Hvor kan du bruke Amex?</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
          Finn butikker, nettbutikker og abonnementer. Se hva som gjelder der du betaler, og hvor sikkert svaret er.
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
          <span>{amexMerchants.length} kjeder og tjenester</span>
          <span>Oppdatert <time dateTime={amexUpdatedOn}>{new Date(amexUpdatedOn + "T12:00:00Z").toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}</time></span>
          <span>Gratis · Ingen annonselenker</span>
        </p>
      </header>

      <details className="mb-5 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-stone-700">Slik leser du statusene</summary>
        <dl className="mt-3 grid gap-3 text-xs leading-relaxed sm:grid-cols-2">
          <div><dt className="font-semibold text-emerald-900">Ja</dt><dd className="mt-1 text-stone-600">Selskapet oppgir Amex-støtte for denne betalingskanalen.</dd></div>
          <div><dt className="font-semibold text-sky-900">Rapportert ja</dt><dd className="mt-1 text-stone-600">Positiv opplysning mottatt direkte fra en leser. Merket med dato og betalingskanal.</dd></div>
          <div><dt className="font-semibold text-amber-900">Med forbehold</dt><dd className="mt-1 text-stone-600">For eksempel lokale unntak, landbegrensning eller betalingsgebyr. Les detaljene.</dd></div>
          <div><dt className="font-semibold text-rose-900">Nei</dt><dd className="mt-1 text-stone-600">Kilden eller en mottatt leseropplysning sier at betalingsløsningen ikke støtter Amex. Les grunnlaget i detaljene.</dd></div>
          <div><dt className="font-semibold text-stone-700">Uavklart</dt><dd className="mt-1 text-stone-600">Mangler bekreftelse, eller kildene spriker. Dette er ikke et nei.</dd></div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-stone-500">Kjedestatus bekrefter ikke hver filial. Grunnlaget er selskapets egne opplysninger eller informasjon vi har mottatt direkte fra lesere. Datoene gjelder kildekontroll eller mottatt opplysning, ikke en betaling testet av oss.</p>
      </details>

      <AmexBrukersteder />

      <div className="mt-6 rounded-xl border border-stone-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-stone-900">Skal du betale en faktura?</h2>
        <p className="mt-1 text-sm leading-relaxed text-stone-600">Vi har en egen oversikt over fakturabetaling med Visa, Mastercard og Amex, med gebyrer og konkrete kortforsøk.</p>
        <Link href="/verktoy/faktura-med-kort" className="mt-2 inline-block text-sm font-medium text-orange-700 underline underline-offset-2">Se faktura med kort →</Link>
      </div>

      <aside className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4 sm:p-5">
        <h2 className="font-semibold text-stone-900">Sjekk ekstra bonus før du handler</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          Kortpoeng og bonus fra en handleportal er forskjellige ting. Finn riktig betalingsmåte først, og sjekk deretter portalens vilkår og totalprisen.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-orange-800">
          <Link className="underline underline-offset-2" href="/tilbud?program=eurobonus">EuroBonus-tilbud</Link>
          <Link className="underline underline-offset-2" href="/fordeler/trumf">Trumf</Link>
          <Link className="underline underline-offset-2" href="/verktoy/bonuskalkulator">Hva er poengene verdt?</Link>
        </div>
      </aside>

      <section className="mt-8" aria-labelledby="amex-faq-heading">
        <h2 id="amex-faq-heading" className="text-xl font-semibold text-stone-900">Greit å vite før du betaler</h2>
        <div className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="py-4">
              <summary className="cursor-pointer text-sm font-medium text-stone-900">{faq.question}</summary>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">{faq.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-stone-500">
          Kilde til Apple Pay:{" "}
          <a href="https://www.americanexpress.com/nb-no/fordeler/betalingsmater/" target="_blank" rel="noopener noreferrer" className="text-orange-700 underline underline-offset-2">American Express om betalingsmåter</a>.
          {" "}Butikkspesifikke kilder finner du under hver oppføring.
        </p>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-stone-500">
        Oversikten utvides etter hvert som opplysninger kontrolleres. Manglende oppføring betyr ikke at stedet avviser Amex. Penger i Fokus er uavhengig av American Express og brukerstedene.
      </p>
    </div>
  );
}
