"use client";

import { useState } from "react";
import {
  amexChannelLabels,
  amexMerchants,
  amexStatusLabels,
  type AmexChannel,
  type AmexMerchant,
  type AmexStatus,
} from "@/data/amex-brukersteder";

const channelOptions: AmexChannel[] = ["store", "online", "app", "onboard"];
const allStatuses: AmexStatus[] = ["yes", "reported", "conditional", "no", "unknown"];
const statusOptions = allStatuses.filter((status) => amexMerchants.some((item) => item.channels.some((entry) => entry.status === status)));
const categories = [...new Set(amexMerchants.map((item) => item.category))]
  .sort((a, b) => a.localeCompare(b, "nb"));
const merchants = [...amexMerchants].sort((a, b) => a.name.localeCompare(b.name, "nb"));

const statusStyles: Record<AmexStatus, string> = {
  yes: "border-emerald-200 bg-emerald-50 text-emerald-900",
  reported: "border-sky-200 bg-sky-50 text-sky-900",
  conditional: "border-amber-200 bg-amber-50 text-amber-900",
  no: "border-rose-200 bg-rose-50 text-rose-900",
  unknown: "border-stone-200 bg-stone-100 text-stone-700",
};

function normalize(value: string) {
  return value.toLocaleLowerCase("nb-NO")
    .replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function searchableText(item: AmexMerchant) {
  return normalize([
    item.name,
    item.category,
    ...item.keywords,
    ...item.channels.flatMap((entry) => [amexChannelLabels[entry.type], entry.note]),
  ].join(" "));
}

function sourceDate(value: string) {
  const [year, month, day] = value.split("-");
  return [day, month, year].join(".");
}

export function AmexBrukersteder() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [channel, setChannel] = useState<AmexChannel | "all">("all");
  const [status, setStatus] = useState<AmexStatus | "all">("all");

  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  const filtered = merchants.filter((item) => {
    const text = searchableText(item);
    return (category === "all" || item.category === category)
      && words.every((word) => text.includes(word))
      && item.channels.some((entry) =>
        (channel === "all" || entry.type === channel)
        && (status === "all" || entry.status === status));
  });
  const hasFilters = query !== "" || category !== "all" || channel !== "all" || status !== "all";

  function reset() {
    setQuery("");
    setCategory("all");
    setChannel("all");
    setStatus("all");
  }

  const fieldClass = "mt-1 w-full min-w-0 rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200";

  return (
    <section aria-label="Søk etter Amex-brukersteder">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
        <label htmlFor="amex-search" className="text-sm font-semibold text-stone-900">
          Hvor vil du betale med Amex?
        </label>
        <div className="relative mt-2">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-stone-400">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            id="amex-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Søk etter butikk, abonnement eller vare …"
            className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-11 pr-3 text-base text-stone-900 placeholder:text-stone-500 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
            autoComplete="off"
            aria-controls="amex-results"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-3">
          <label htmlFor="amex-category" className="min-w-0 text-xs font-medium text-stone-600">
            Kategori
            <select id="amex-category" value={category} onChange={(event) => setCategory(event.target.value)} className={fieldClass} aria-controls="amex-results">
              <option value="all">Alle kategorier</option>
              {categories.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
          <label htmlFor="amex-channel" className="min-w-0 text-xs font-medium text-stone-600">
            Hvor betaler du?
            <select id="amex-channel" value={channel} onChange={(event) => setChannel(event.target.value as AmexChannel | "all")} className={fieldClass} aria-controls="amex-results">
              <option value="all">Butikk, nett og app</option>
              {channelOptions.map((value) => <option key={value} value={value}>{amexChannelLabels[value]}</option>)}
            </select>
          </label>
          <label htmlFor="amex-status" className="min-w-0 text-xs font-medium text-stone-600">
            Betalingsstatus
            <select id="amex-status" value={status} onChange={(event) => setStatus(event.target.value as AmexStatus | "all")} className={fieldClass} aria-controls="amex-results">
              <option value="all">Alle statuser</option>
              {statusOptions.map((value) => <option key={value} value={value}>{amexStatusLabels[value]}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Hurtigvalg">
          {["Dagligvarer", "Abonnement", "Reise og transport"].map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={category === name}
              onClick={() => setCategory(category === name ? "all" : name)}
              className={"rounded-full border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-orange-600 " + (category === name ? "border-orange-300 bg-orange-50 text-orange-900" : "border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-700")}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="my-4 flex flex-wrap items-center justify-between gap-2">
        <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-stone-600">
          <strong className="font-semibold tabular-nums text-stone-900">{filtered.length}</strong>
          {" av " + merchants.length + " oppføringer"}
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="rounded px-2 py-1 text-sm font-medium text-orange-700 hover:underline focus-visible:outline-2 focus-visible:outline-orange-600">
            Nullstill filtre
          </button>
        )}
      </div>

      <div id="amex-results" className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {filtered.map((item) => {
          const visibleChannels = item.channels.filter((entry) => channel === "all" || entry.type === channel);
          const visibleSources = item.sources.filter((source) => !source.channels || visibleChannels.some((entry) => source.channels?.includes(entry.type)));
          return (
            <details key={item.id} id={"amex-" + item.id} className="group scroll-mt-6">
              <summary className="cursor-pointer list-none px-4 py-4 transition-colors hover:bg-stone-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-600 [&::-webkit-details-marker]:hidden sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-stone-900">{item.name}</h2>
                    <p className="mt-0.5 text-xs text-stone-500">{item.category}{visibleSources.some((source) => source.kind === "reader") ? " · Med leseropplysning" : ""}</p>
                  </div>
                  <span className="mt-0.5 flex shrink-0 items-center gap-1 text-xs text-stone-500">
                    <span className="hidden sm:inline">Detaljer</span>
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 transition-transform group-open:rotate-180">
                      <path d="m5 7.5 5 5 5-5" />
                    </svg>
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {visibleChannels.map((entry) => (
                    <span key={entry.type} className={"inline-flex rounded-md border px-2 py-1 text-xs leading-snug " + statusStyles[entry.status]}>
                      <span>{amexChannelLabels[entry.type]}: <strong className="font-semibold">{amexStatusLabels[entry.status]}</strong></span>
                    </span>
                  ))}
                </div>
              </summary>

              <div className="border-t border-stone-100 bg-stone-50 px-4 py-4 sm:px-5">
                <dl className="space-y-3">
                  {visibleChannels.map((entry) => (
                    <div key={entry.type}>
                      <dt className="text-sm font-semibold text-stone-800">{amexChannelLabels[entry.type]}</dt>
                      <dd className="mt-1 max-w-3xl text-sm leading-relaxed text-stone-600">{entry.note}</dd>
                    </div>
                  ))}
                </dl>
                {visibleSources.length > 0 ? (
                  <div className="mt-4 border-t border-stone-200 pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Grunnlag og kilder</p>
                    <ul className="mt-2 space-y-2">
                      {visibleSources.map((source) => (
                        <li key={source.url ?? source.label} className="text-xs leading-relaxed">
                          {source.url ? (
                            <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-orange-700 underline decoration-orange-200 underline-offset-2 hover:decoration-orange-600">
                              {source.label}<span className="sr-only"> (åpnes i ny fane)</span>
                            </a>
                          ) : (
                            <span className="font-medium text-stone-800">{source.label}</span>
                          )}
                          <span className="mt-0.5 block text-stone-500">
                            {source.kind === "official" ? "Selskapets egen informasjon · Kilde sjekket " : "Opplysning fra leser · Mottatt "}
                            <time dateTime={source.checkedOn}>{sourceDate(source.checkedOn)}</time>
                            {source.channels && " · " + source.channels.map((value) => amexChannelLabels[value]).join(", ")}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs text-stone-500">Datoen gjelder kildekontroll eller mottatt leseropplysning. Den bekrefter ikke en gjennomført betaling.</p>
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-stone-500">Avventer en selvstendig bekreftelse på betalingsstøtten.</p>
                )}
              </div>
            </details>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center">
            <h2 className="font-semibold text-stone-900">Ingen treff med disse filtrene</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
              Prøv et annet butikknavn eller fjern et filter. En butikk som mangler i listen, kan fortsatt ta Amex.
            </p>
            <button type="button" onClick={reset} className="mt-4 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
              Vis hele oversikten
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
