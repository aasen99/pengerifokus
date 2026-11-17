"use client";

import { useState } from "react";
import {
  invoiceCardProviders,
  type InvoiceCardNetwork,
  type InvoiceCardProvider,
  type InvoiceCardStatus,
} from "@/data/faktura-med-kort";

const networks: InvoiceCardNetwork[] = ["visa", "mastercard", "amex"];
const networkLabels: Record<InvoiceCardNetwork, string> = { visa: "Visa", mastercard: "Mastercard", amex: "Amex" };
const statusLabels: Record<InvoiceCardStatus, string> = { yes: "Oppgitt ja", reported: "Leseropplysning: ja", no: "Nei", unknown: "Uavklart" };
const styles: Record<InvoiceCardStatus, string> = {
  yes: "border-emerald-200 bg-emerald-50 text-emerald-900",
  reported: "border-sky-200 bg-sky-50 text-sky-900",
  no: "border-rose-200 bg-rose-50 text-rose-900",
  unknown: "border-stone-200 bg-stone-100 text-stone-700",
};
const reportLabels = { worked: "Fungerte", registered: "Kort registrert", failed: "Mislykket forsøk", unclear: "Uavklart feil" };

function normalize(value: string) {
  return value.toLocaleLowerCase("nb-NO").replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function searchableText(item: InvoiceCardProvider) {
  return normalize([item.name, item.category, item.route, item.processor ?? "", ...item.reports.map((report) => report.card)].join(" "));
}

function dateLabel(value: string) {
  return value.split("-").reverse().join(".");
}

export function FakturaMedKort() {
  const [query, setQuery] = useState("");
  const [network, setNetwork] = useState<InvoiceCardNetwork | "all">("all");
  const [availability, setAvailability] = useState("all");
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  const results = invoiceCardProviders.filter((item) =>
    words.every((word) => searchableText(item).includes(word))
    && (availability === "all" || (availability === "available" ? item.cardPayment : !item.cardPayment))
    && (network === "all" || ["yes", "reported"].includes(item.networks[network].status)));
  const hasFilters = query !== "" || network !== "all" || availability !== "all";

  function reset() {
    setQuery("");
    setNetwork("all");
    setAvailability("all");
  }

  const fieldClass = "mt-1.5 w-full min-w-0 rounded-lg border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200";

  return (
    <section aria-label="Finn leverandører med fakturabetaling via kort">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
        <label htmlFor="invoice-search" className="block text-sm font-semibold text-stone-900">
          Finn leverandør, kort eller betalingsleverandør
          <input id="invoice-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" placeholder="For eksempel Telia, SkyttelPASS, Lunar eller Nets" className={fieldClass} aria-controls="invoice-card-results" />
        </label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label htmlFor="invoice-network" className="text-xs font-medium text-stone-600">
            Dokumentert eller oppgitt kortstøtte
            <select id="invoice-network" value={network} onChange={(event) => setNetwork(event.target.value as InvoiceCardNetwork | "all")} className={fieldClass} aria-controls="invoice-card-results">
              <option value="all">Alle kortnettverk</option>
              {networks.map((value) => <option key={value} value={value}>{networkLabels[value]}</option>)}
            </select>
          </label>
          <label htmlFor="invoice-availability" className="text-xs font-medium text-stone-600">
            Betalingsløsning
            <select id="invoice-availability" value={availability} onChange={(event) => setAvailability(event.target.value)} className={fieldClass} aria-controls="invoice-card-results">
              <option value="all">Tilgjengelige og avsluttede</option>
              <option value="available">Tilbyr kortbetaling</option>
              <option value="closed">Kortbetaling avsluttet</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-stone-500">Et kortfilter viser bare oppføringer med oppgitt støtte. «Uavklart» betyr at vi mangler bekreftelse, ikke at kortet er avvist.</p>
      </div>

      <div className="my-4 flex flex-wrap items-center justify-between gap-2">
        <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-stone-600"><strong className="tabular-nums text-stone-900">{results.length}</strong> av {invoiceCardProviders.length} leverandører</p>
        {hasFilters && <button type="button" onClick={reset} className="rounded px-2 py-1 text-sm font-medium text-orange-700 hover:underline focus-visible:outline-2 focus-visible:outline-orange-600">Nullstill filtre</button>}
      </div>

      <div id="invoice-card-results" className="grid items-start gap-4 lg:grid-cols-2">
        {results.map((item) => (
          <article key={item.id} id={"faktura-" + item.id} className="min-w-0 scroll-mt-6 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-medium text-stone-500">{item.category}</p>
              <span className={"rounded-full px-2.5 py-1 text-xs font-medium " + (item.cardPayment ? "bg-emerald-50 text-emerald-900" : "bg-stone-100 text-stone-700")}>{item.mode}</span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-stone-900">{item.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.route}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {networks.map((value) => (
                <span key={value} className={"rounded-md border px-2 py-1.5 text-xs " + styles[item.networks[value].status]}>
                  {networkLabels[value]}: <strong className="font-semibold">{statusLabels[item.networks[value].status]}</strong>
                </span>
              ))}
            </div>
            {item.processor && <p className="mt-3 text-xs leading-relaxed text-stone-500">Betalingsleverandør: <span className="font-medium text-stone-700">{item.processor}</span>. {item.processorBasis}</p>}

            <div className="mt-4 rounded-xl bg-stone-50 p-3">
              <h3 className="text-sm font-semibold text-stone-900">Gebyrer</h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.fees}</p>
            </div>

            {item.reports.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-stone-900">Opplysninger fra lesere</h3>
                <ul className="mt-2 space-y-3">
                  {item.reports.map((report) => (
                    <li key={report.card} className="text-sm leading-relaxed text-stone-600">
                      <span className="font-semibold text-stone-900">{report.card}</span>
                      <span className="ml-2 text-xs font-medium text-stone-500">{reportLabels[report.result]}</span>
                      <p className="mt-0.5">{report.detail}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-stone-500">Opplysninger mottatt 17.11.2026. Kortregistrering, gjennomført betaling og bonusopptjening er ulike bekreftelser.</p>
              </div>
            )}

            <details className="mt-4 border-t border-stone-200 pt-3">
              <summary className="cursor-pointer text-sm font-medium text-orange-700">Kortstøtte, bonusvilkår og kilder</summary>
              <dl className="mt-3 space-y-2 text-xs leading-relaxed">
                {networks.map((value) => <div key={value}><dt className="font-semibold text-stone-800">{networkLabels[value]}</dt><dd className="mt-0.5 text-stone-600">{item.networks[value].note}</dd></div>)}
              </dl>
              <h3 className="mt-4 text-sm font-semibold text-stone-900">Bonusstatus</h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.bonus}</p>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-stone-600">
                {item.notes.map((note) => <li key={note}>{note}</li>)}
              </ul>
              <h3 className="mt-4 text-sm font-semibold text-stone-900">Grunnlag</h3>
              <ul className="mt-2 space-y-2 text-xs leading-relaxed">
                {item.sources.map((source) => (
                  <li key={source.url ?? source.label}>
                    {source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-orange-700 underline underline-offset-2">{source.label}<span className="sr-only"> (åpnes i ny fane)</span></a> : <span className="font-medium text-stone-800">{source.label}</span>}
                    <span className="mt-0.5 block text-stone-500">{source.kind === "official" ? "Selskapets informasjon · Sjekket " : "Leseropplysning · Mottatt "}<time dateTime={source.date}>{dateLabel(source.date)}</time></span>
                  </li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </div>
      {results.length === 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white px-5 py-8 text-center">
          <h2 className="font-semibold text-stone-900">Ingen bekreftede treff med disse filtrene</h2>
          <p className="mt-2 text-sm text-stone-600">Oversikten er foreløpig liten. Manglende treff betyr ikke at et kort avvises.</p>
          <button type="button" onClick={reset} className="mt-4 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white">Vis alle leverandører</button>
        </div>
      )}
    </section>
  );
}
