import type { Metadata } from "next";
import Link from "next/link";
import { FakturaMedKort } from "@/components/verktoy/FakturaMedKort";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { JsonLd } from "@/components/seo/JsonLd";
import { invoiceCardProviders, invoiceCardsUpdatedOn } from "@/data/faktura-med-kort";
import { createPageMetadata } from "@/lib/seo";
import { getFaqPageJsonLd } from "@/lib/structured-data";

const path = "/verktoy/faktura-med-kort";
const description = "Hvor kan du betale faktura med Visa, Mastercard eller Amex? Se leverandører, betalingsmåte, kortforsøk og gebyrer. Skill kortbetaling fra regningsbetaling i banken.";
export const metadata: Metadata = createPageMetadata({
  title: "Betale faktura med kort – leverandører, gebyrer og bonus",
  description,
  path,
  keywords: ["betale faktura med kort", "faktura Visa Mastercard", "Telia kortbetaling", "SkyttelPASS kort", "faktura EuroBonus", "Spenn kortbetaling"],
});

const faqs = [
  {
    question: "Kan jeg få bonus når jeg betaler en faktura med kort?",
    answer: "Det avhenger av hvordan betalingen gjennomføres og bokføres, og av kortutstederens vilkår. Kortbetaling direkte hos leverandøren og regningsbetaling fra kredittkortkontoen i bankens app er forskjellige betalingsruter. Vi bekrefter ikke bonus bare fordi et kort blir godtatt.",
  },
  {
    question: "Hvorfor fungerte Bank Norwegian, mens Lunar ga en feil?",
    answer: "En vellykket betaling med ett kort bekrefter bare det forsøket. En feil med et annet kort kan ha flere årsaker som vi ikke kjenner. Derfor er Lunar-forsøket hos Telia registrert som uavklart, ikke som et generelt avslag på alle Lunar-kort.",
  },
  {
    question: "Er kortregistrering det samme som en vellykket betaling?",
    answer: "Nei. Et kort kan bli registrert før første trekk. Vi skiller mellom registrert kort, gjennomført betaling og registrert bonus. En leseropplysning om ett trinn bekrefter ikke automatisk de andre.",
  },
];

const programs = [
  {
    name: "SAS EuroBonus Mastercard",
    text: "Kortets vilkår unntar blant annet overføring fra kort til konto og overføring mellom personer. Kontroller hvordan betalingen blir registrert.",
    label: "Kortutstederens vilkår for EuroBonus",
    url: "https://saseurobonusmastercard.no/kortene/sammenligne-kort/",
  },
  {
    name: "Bank Norwegian",
    text: "Banken skiller mellom regningsbetaling i sin egen app og vanlige abonnementstrekk. Førstnevnte gir ikke bonus og har rente fra første dag; vanlige abonnementstrekk kan gi CashPoints eller cashback.",
    label: "Bank Norwegian om regninger og abonnementer",
    url: "https://link.banknorwegian.no/kredittkort/betale-regninger-med-kredittkort/",
  },
  {
    name: "Spenn med Strawberry Mastercard",
    text: "Kortet gir Spenn på kvalifiserende kjøp. Vilkårene unntar blant annet overføring fra kort til konto og mellom personer. Amex-støtte er ikke et krav for å bruke dette Mastercard-kortet.",
    label: "Strawberry Mastercard: opptjening og unntak",
    url: "https://www.strawberry.no/medlemskap/partnere/strawberry-mastercard/",
  },
];

export default function FakturaMedKortPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo name="Faktura med kort" description={description} path={path} />
      <JsonLd data={getFaqPageJsonLd(faqs)} />
      <Link href="/verktoy" className="text-sm font-medium text-orange-700 hover:underline">← Alle verktøy</Link>
      <header className="mb-6 mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">Kortbetaling · Faste utgifter</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Hvor kan du betale faktura med kort?</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">Finn leverandører som tilbyr kortbetaling eller automatisk korttrekk. Se hvilke kort som er oppgitt, hva lesere har fått til, og hvilke gebyrer som kan spise opp bonusen.</p>
        <p className="mt-3 text-xs text-stone-500">{invoiceCardProviders.length} leverandører · Oppdatert <time dateTime={invoiceCardsUpdatedOn}>{new Date(invoiceCardsUpdatedOn + "T12:00:00Z").toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}</time> · Gratis · Ingen annonselenker</p>
      </header>

      <aside className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
        <h2 className="text-sm font-semibold text-stone-900">Kortaksept og bonus er to ulike bekreftelser</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">Her viser vi leverandørens kortkasse og korttrekk. Bonus avhenger også av kortvilkårene og hvordan betalingen bokføres. Sjekk gebyr, bokført kjøp og faktisk opptjening før du gjør dette til en fast rutine.</p>
      </aside>

      <FakturaMedKort />

      <section className="mt-8" aria-labelledby="invoice-bonus-heading">
        <h2 id="invoice-bonus-heading" className="text-xl font-semibold text-stone-900">EuroBonus, CashPoints, cashback eller Spenn?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">Visa og Mastercard åpner for flere kort enn Amex. Vilkårene nedenfor beskriver mulige bonusprogrammer; vi har ikke bekreftet bonus fra hvert enkelt kort hos leverandørene i listen.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {programs.map((program) => (
            <article key={program.name} className="rounded-xl border border-stone-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-stone-900">{program.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{program.text}</p>
              <a href={program.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-medium text-orange-700 underline underline-offset-2">{program.label}<span className="sr-only"> (åpnes i ny fane)</span></a>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-stone-100 p-4 text-sm leading-relaxed text-stone-700">
          <p><strong>Regn på gebyret:</strong> Hvis en betaling på 1 000 kr gir 0,5 % bonus, er verdien 5 kr. Med et betalingsgebyr på 39 kr blir nettoen −34 kr. Dette er et regneeksempel, ikke en bekreftelse på bonus hos en bestemt leverandør.</p>
          <Link href="/verktoy/bonuskalkulator" className="mt-2 inline-block font-medium text-orange-700 underline underline-offset-2">Regn med dine egne tall →</Link>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="invoice-faq-heading">
        <h2 id="invoice-faq-heading" className="text-xl font-semibold text-stone-900">Vanlige spørsmål</h2>
        <div className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="py-4">
              <summary className="cursor-pointer text-sm font-medium text-stone-900">{faq.question}</summary>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-6 text-xs leading-relaxed text-stone-500">Oversikten utvides etter hvert som opplysninger kontrolleres. «Oppgitt ja» bygger på selskapets informasjon. Leseropplysninger dateres separat. At et betalingsnettverk eller Nets er nevnt, brukes ikke alene som bekreftelse på et bestemt kort eller bonusopptjening.</p>
      <Link href="/verktoy/amex-brukersteder" className="mt-5 inline-block text-sm font-medium text-orange-700 underline underline-offset-2">Se også Amex-brukersteder →</Link>
    </div>
  );
}
