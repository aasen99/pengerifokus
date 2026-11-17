export type InvoiceCardNetwork = "visa" | "mastercard" | "amex";
export type InvoiceCardStatus = "yes" | "reported" | "no" | "unknown";
export interface InvoiceCardSource {
  label: string;
  url?: string;
  kind: "official" | "reader";
  /** Review date for company sources; receipt date for reader information. */
  date: string;
}
export interface InvoiceCardProvider {
  id: string;
  name: string;
  category: string;
  cardPayment: boolean;
  route: string;
  mode: string;
  processor: string | null;
  processorBasis: string | null;
  networks: Record<InvoiceCardNetwork, { status: InvoiceCardStatus; note: string }>;
  fees: string;
  reports: {
    card: string;
    result: "worked" | "registered" | "failed" | "unclear";
    detail: string;
  }[];
  bonus: string;
  notes: string[];
  sources: InvoiceCardSource[];
}
export const invoiceCardsUpdatedOn = "2026-11-17";
/** Payment network support, card registration, successful charges and reward accrual are separate facts. */
export const invoiceCardProviders: InvoiceCardProvider[] = [
  {
    "id": "telia",
    "name": "Telia",
    "category": "Mobil, TV og bredbånd",
    "cardPayment": true,
    "route": "Velg faktura på Min Side eller i Telia-appen, og bruk kortbetalingen som tilbys der.",
    "mode": "Manuell betaling",
    "processor": "Nets",
    "processorBasis": "Oppgitt i leserens betalingsforsøk.",
    "networks": {
      "visa": {
        "status": "yes",
        "note": "Telia oppgir Visa."
      },
      "mastercard": {
        "status": "yes",
        "note": "Telia oppgir Mastercard."
      },
      "amex": {
        "status": "no",
        "note": "En leser fikk ikke lagt inn Amex i kortbetalingen."
      }
    },
    "fees": "Gebyr for selvbetjent kortbetaling er ikke bekreftet her. Telias oppgitte gebyr på 69 kr gjelder betaling med kredittkort via kundeservice; det er ikke brukt som pris på Min Side.",
    "reports": [
      {
        "card": "Bank Norwegian",
        "result": "worked",
        "detail": "En leser opplyser at kortbetalingen fungerte."
      },
      {
        "card": "Lunar",
        "result": "unclear",
        "detail": "En leser fikk problemer under forsøket. Årsaken er uavklart; dette er ikke en bekreftelse på at alle Lunar-kort avvises."
      },
      {
        "card": "Amex",
        "result": "failed",
        "detail": "Kortet kunne ikke legges inn i løsningen."
      }
    ],
    "bonus": "Bonus på akkurat denne transaksjonen er ikke bekreftet. Kontroller bokført kjøp og poeng eller cashback hos kortutstederen.",
    "notes": [
      "Gjelder Telias fakturaløsning. Telia Finance har en separat oppføring.",
      "Visa eller Mastercard som støttet nettverk garanterer ikke at hvert kort og hver godkjenning går gjennom."
    ],
    "sources": [
      {
        "label": "Telia: faktura og kortbetaling",
        "url": "https://www.telia.no/hjelp/faktura/",
        "kind": "official",
        "date": "2026-11-17"
      },
      {
        "label": "Telia: gebyrer og andre kostnader",
        "url": "https://www.telia.no/priser-i-norge/gebyrer-og-andre-kostnader/",
        "kind": "official",
        "date": "2026-11-17"
      },
      {
        "label": "Leseropplysninger: kortforsøk hos Telia",
        "kind": "reader",
        "date": "2026-11-17"
      }
    ]
  },
  {
    "id": "skyttelpass",
    "name": "SkyttelPASS",
    "category": "Bompenger og ferje",
    "cardPayment": true,
    "route": "Registrer kreditt- eller debetkort på Min Side. Kortet trekkes automatisk når passeringer for over 200 kr er registrert, maksimalt én gang i uken.",
    "mode": "Automatisk korttrekk",
    "processor": "Nets",
    "processorBasis": "Navngitt i SkyttelPASS sin betalingsinformasjon.",
    "networks": {
      "visa": {
        "status": "reported",
        "note": "Visa er oppgitt som tilgjengelig i en lesers kortløsning."
      },
      "mastercard": {
        "status": "reported",
        "note": "Mastercard er oppgitt som tilgjengelig i en lesers kortløsning."
      },
      "amex": {
        "status": "no",
        "note": "En leser kunne ikke legge inn Amex."
      }
    },
    "fees": "For bedriftskort oppgir SkyttelPASS 2 % av beløpet pluss 0,50 kr per betaling. Denne satsen gjelder bedriftskort. Eget gebyr for privatkort er ikke oppgitt i kilden.",
    "reports": [
      {
        "card": "Lunar",
        "result": "registered",
        "detail": "En leser har tidligere fått registrert Lunar som betalingskort. Registrering er ikke en bekreftelse på et gjennomført trekk eller opptjente poeng."
      },
      {
        "card": "Amex",
        "result": "failed",
        "detail": "Amex kunne ikke legges inn som betalingskort."
      }
    ],
    "bonus": "Korttrekk er dokumentert, men bonus på den enkelte korttypen hos SkyttelPASS er ikke bekreftet i denne oversikten.",
    "notes": [
      "Dette er registrering for fremtidige korttrekk. Oppføringen bekrefter ikke at en allerede utstedt faktura blir betalt ved å registrere kortet.",
      "Eventuelle ferjeavtaler kan avregnes separat."
    ],
    "sources": [
      {
        "label": "SkyttelPASS: betaling og faktura",
        "url": "https://skyttelpass.no/kundeservice/betaling-og-faktura/",
        "kind": "official",
        "date": "2026-11-17"
      },
      {
        "label": "Leseropplysninger: tilgjengelige kort og Lunar-registrering",
        "kind": "reader",
        "date": "2026-11-17"
      }
    ]
  },
  {
    "id": "telenor",
    "name": "Telenor",
    "category": "Mobil, TV og bredbånd",
    "cardPayment": true,
    "route": "Velg ubetalt faktura i Mitt Telenor eller på Mine Sider. Velg kortbetaling og følg betalingsløpet.",
    "mode": "Manuell betaling",
    "processor": null,
    "processorBasis": null,
    "networks": {
      "visa": {
        "status": "unknown",
        "note": "Den gjennomgåtte veiledningen bekrefter kortbetaling, men spesifiserer ikke nettverket."
      },
      "mastercard": {
        "status": "unknown",
        "note": "Den gjennomgåtte veiledningen bekrefter kortbetaling, men spesifiserer ikke nettverket."
      },
      "amex": {
        "status": "unknown",
        "note": "Amex-støtte er ikke bekreftet i de gjennomgåtte kildene."
      }
    },
    "fees": "Kredittkort: 39 kr per betaling. Debetkort: 0 kr. Vipps: 10 kr. Satsene gjelder betaling via Mine Sider eller Mitt Telenor.",
    "reports": [],
    "bonus": "Kontroller om gebyret er større enn eventuell kortbonus. Et bonuskort kan være debetkort eller kredittkort, og Telenor priser disse forskjellig.",
    "notes": [
      "Kortbetaling er bekreftet; konkrete kortnettverk står som uavklart til de er dokumentert.",
      "Tjenestens betalingsgebyr kommer i tillegg til eventuelle kostnader fra kortutstederen."
    ],
    "sources": [
      {
        "label": "Telenor: betal faktura med kort",
        "url": "https://www.telenor.no/kundeservice/faktura/betale-faktura/",
        "kind": "official",
        "date": "2026-11-17"
      },
      {
        "label": "Telenor: gebyrer for betaling av faktura",
        "url": "https://www.telenor.no/kundeservice/faktura/",
        "kind": "official",
        "date": "2026-11-17"
      }
    ]
  },
  {
    "id": "ice",
    "name": "ice",
    "category": "Mobil",
    "cardPayment": true,
    "route": "Åpne faktura på Min Side og gå til betalingsløsningen fra Visma Amili/AmiliPay.",
    "mode": "Manuell betaling",
    "processor": "Visma Amili / AmiliPay",
    "processorBasis": "Navngitt av ice.",
    "networks": {
      "visa": {
        "status": "unknown",
        "note": "Kortbetaling er bekreftet, men Visa er ikke særskilt navngitt i kilden."
      },
      "mastercard": {
        "status": "unknown",
        "note": "Kortbetaling er bekreftet, men Mastercard er ikke særskilt navngitt i kilden."
      },
      "amex": {
        "status": "unknown",
        "note": "Amex-støtte er ikke bekreftet i kilden."
      }
    },
    "fees": "Eget gebyr for kortbetalingen er ikke avklart i den gjennomgåtte veiledningen. Kontroller beløpet før du godkjenner.",
    "reports": [],
    "bonus": "Bonus på fakturabetaling hos ice er ikke bekreftet her. Se bokført kjøp og kortutstederens vilkår.",
    "notes": [
      "ice bekrefter kortbetaling og Vipps i betalingsløsningen. Det bekrefter ikke hvert kortnettverk.",
      "Veiledningen omtaler også betalingslenker ved for sen betaling; kortbetaling krever ikke at du venter på en purring."
    ],
    "sources": [
      {
        "label": "ice: fakturabetaling med kort og Vipps",
        "url": "https://www.ice.no/produkt/vismapay/",
        "kind": "official",
        "date": "2026-11-17"
      }
    ]
  },
  {
    "id": "telia-finance",
    "name": "Telia Finance",
    "category": "Finansiering",
    "cardPayment": false,
    "route": "Kortbetaling på Mine sider ble avsluttet etter 31. oktober 2026. Fra 1. november brukes betalingsopplysningene på fakturaen.",
    "mode": "Kortbetaling avsluttet",
    "processor": null,
    "processorBasis": null,
    "networks": {
      "visa": {
        "status": "no",
        "note": "Kortbetaling på Mine sider er avsluttet."
      },
      "mastercard": {
        "status": "no",
        "note": "Kortbetaling på Mine sider er avsluttet."
      },
      "amex": {
        "status": "no",
        "note": "Kortbetaling på Mine sider er avsluttet."
      }
    },
    "fees": "Ikke aktuelt for den avsluttede kortløsningen. Telia Finance oppgir at faktura eller ekstra innbetaling med fakturaopplysningene kan gjøres uten ekstra kostnad.",
    "reports": [],
    "bonus": "Denne betalingsruten er ikke tilgjengelig for kortopptjening.",
    "notes": [
      "Telia Finance og Telias ordinære fakturabetaling er forskjellige tjenester. Avslutningen her er ikke en beskjed om at Telia har sluttet å tilby kortbetaling generelt."
    ],
    "sources": [
      {
        "label": "Telia Finance: kortbetaling avsluttet fra november 2026",
        "url": "https://www.teliafinance.com/no/privat/nyheter/Vi-fjerner-muligheten-for-kortbetaling-pa-mine-sider",
        "kind": "official",
        "date": "2026-11-17"
      }
    ]
  }
];
