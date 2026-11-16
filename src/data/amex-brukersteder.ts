export type AmexChannel = "store" | "online" | "app" | "onboard";
export type AmexStatus = "yes" | "reported" | "conditional" | "no" | "unknown";

export interface AmexSource {
  label: string;
  url: string;
  kind: "official" | "directory";
  /** Date the source was reviewed; never a payment-confirmation date. */
  checkedOn: string;
}

export interface AmexMerchant {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  channels: {
    type: AmexChannel;
    status: AmexStatus;
    note: string;
  }[];
  sources: AmexSource[];
}

export const amexUpdatedOn = "2026-11-16";

export const amexChannelLabels: Record<AmexChannel, string> = {
  store: "I butikk",
  online: "På nett",
  app: "I app",
  onboard: "Om bord",
};

export const amexStatusLabels: Record<AmexStatus, string> = {
  yes: "Ja",
  reported: "Rapportert ja",
  conditional: "Med forbehold",
  no: "Nei",
  unknown: "Uavklart",
};

/**
 * Acceptance is scoped to each channel. Missing channels are NOT a rejection.
 * "reported" identifies a secondary directory, not a Penger i Fokus user report.
 * Company guidance may cover a chain without guaranteeing each branch.
 */
export const amexMerchants: AmexMerchant[] = [
  {
    "id": "kiwi",
    "name": "KIWI",
    "category": "Dagligvarer",
    "keywords": [
      "NorgesGruppen",
      "mat",
      "Trumf"
    ],
    "channels": [
      {
        "type": "store",
        "status": "conditional",
        "note": "NorgesGruppen oppgir at Amex godtas i de fleste butikker. Sjekk lokale unntak."
      }
    ],
    "sources": [
      {
        "label": "NorgesGruppen: betalingsformer",
        "url": "https://www.norgesgruppen.no/om-oss/det-norske-dagligvaremarkedet/fakta-om-betaling-i-norgesgruppens-butikker/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "meny",
    "name": "MENY",
    "category": "Dagligvarer",
    "keywords": [
      "NorgesGruppen",
      "mat",
      "Trumf"
    ],
    "channels": [
      {
        "type": "store",
        "status": "conditional",
        "note": "NorgesGruppen oppgir at Amex godtas i de fleste butikker. Sjekk lokale unntak."
      }
    ],
    "sources": [
      {
        "label": "NorgesGruppen: betalingsformer",
        "url": "https://www.norgesgruppen.no/om-oss/det-norske-dagligvaremarkedet/fakta-om-betaling-i-norgesgruppens-butikker/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "spar",
    "name": "SPAR",
    "category": "Dagligvarer",
    "keywords": [
      "NorgesGruppen",
      "mat",
      "Trumf"
    ],
    "channels": [
      {
        "type": "store",
        "status": "conditional",
        "note": "NorgesGruppen oppgir at Amex godtas i de fleste butikker. Sjekk lokale unntak."
      }
    ],
    "sources": [
      {
        "label": "NorgesGruppen: betalingsformer",
        "url": "https://www.norgesgruppen.no/om-oss/det-norske-dagligvaremarkedet/fakta-om-betaling-i-norgesgruppens-butikker/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "eurospar",
    "name": "EUROSPAR",
    "category": "Dagligvarer",
    "keywords": [
      "NorgesGruppen",
      "mat",
      "Trumf"
    ],
    "channels": [
      {
        "type": "store",
        "status": "conditional",
        "note": "NorgesGruppen oppgir at Amex godtas i de fleste butikker. Sjekk lokale unntak."
      }
    ],
    "sources": [
      {
        "label": "NorgesGruppen: betalingsformer",
        "url": "https://www.norgesgruppen.no/om-oss/det-norske-dagligvaremarkedet/fakta-om-betaling-i-norgesgruppens-butikker/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "joker",
    "name": "Joker",
    "category": "Dagligvarer",
    "keywords": [
      "NorgesGruppen",
      "mat",
      "Trumf"
    ],
    "channels": [
      {
        "type": "store",
        "status": "conditional",
        "note": "NorgesGruppen oppgir at Amex godtas i de fleste butikker. Sjekk lokale unntak."
      }
    ],
    "sources": [
      {
        "label": "NorgesGruppen: betalingsformer",
        "url": "https://www.norgesgruppen.no/om-oss/det-norske-dagligvaremarkedet/fakta-om-betaling-i-norgesgruppens-butikker/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "narbutikken",
    "name": "Nærbutikken",
    "category": "Dagligvarer",
    "keywords": [
      "NorgesGruppen",
      "mat",
      "Trumf"
    ],
    "channels": [
      {
        "type": "store",
        "status": "conditional",
        "note": "NorgesGruppen oppgir at Amex godtas i de fleste butikker. Sjekk lokale unntak."
      }
    ],
    "sources": [
      {
        "label": "NorgesGruppen: betalingsformer",
        "url": "https://www.norgesgruppen.no/om-oss/det-norske-dagligvaremarkedet/fakta-om-betaling-i-norgesgruppens-butikker/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "jacobs",
    "name": "Jacobs",
    "category": "Dagligvarer",
    "keywords": [
      "NorgesGruppen",
      "mat",
      "Trumf"
    ],
    "channels": [
      {
        "type": "store",
        "status": "conditional",
        "note": "NorgesGruppen oppgir at Amex godtas i de fleste butikker. Sjekk lokale unntak."
      }
    ],
    "sources": [
      {
        "label": "NorgesGruppen: betalingsformer",
        "url": "https://www.norgesgruppen.no/om-oss/det-norske-dagligvaremarkedet/fakta-om-betaling-i-norgesgruppens-butikker/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "extra",
    "name": "Extra",
    "category": "Dagligvarer",
    "keywords": [
      "Coop",
      "mat"
    ],
    "channels": [
      {
        "type": "store",
        "status": "reported",
        "note": "Oppført som Amex-brukersted hos AMEXguiden. Lokale unntak kan forekomme. Dette bekrefter ikke Coopay."
      }
    ],
    "sources": [
      {
        "label": "AMEXguiden: Extra",
        "url": "https://amexguiden.no/sted/coop-extra",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "coop-mega",
    "name": "Coop Mega",
    "category": "Dagligvarer",
    "keywords": [
      "Coop",
      "mat"
    ],
    "channels": [
      {
        "type": "store",
        "status": "reported",
        "note": "Oppført som Amex-brukersted hos AMEXguiden. Lokale unntak kan forekomme. Dette bekrefter ikke Coopay."
      }
    ],
    "sources": [
      {
        "label": "AMEXguiden: Coop Mega",
        "url": "https://amexguiden.no/sted/coop-mega",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "obs",
    "name": "Obs",
    "category": "Dagligvarer",
    "keywords": [
      "Coop",
      "mat"
    ],
    "channels": [
      {
        "type": "store",
        "status": "reported",
        "note": "Oppført som Amex-brukersted hos AMEXguiden. Lokale unntak kan forekomme. Dette bekrefter ikke Coopay."
      }
    ],
    "sources": [
      {
        "label": "AMEXguiden: Obs",
        "url": "https://amexguiden.no/sted/coop-obs",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "coop-prix",
    "name": "Coop Prix",
    "category": "Dagligvarer",
    "keywords": [
      "Coop",
      "mat"
    ],
    "channels": [
      {
        "type": "store",
        "status": "reported",
        "note": "Oppført som Amex-brukersted hos AMEXguiden. Lokale unntak kan forekomme. Dette bekrefter ikke Coopay."
      }
    ],
    "sources": [
      {
        "label": "AMEXguiden: Coop Prix",
        "url": "https://amexguiden.no/sted/coop-prix",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "rema-1000",
    "name": "REMA 1000",
    "category": "Dagligvarer",
    "keywords": [
      "Rema",
      "mat",
      "REMA-appen",
      "Æ",
      "Spenn"
    ],
    "channels": [
      {
        "type": "store",
        "status": "conditional",
        "note": "Hver kjøpmann avgjør om butikken tilbyr Amex. Kontakt den aktuelle butikken."
      },
      {
        "type": "app",
        "status": "no",
        "note": "REMA oppgir uttrykkelig at Amex ikke kan kobles som betalingsmiddel i REMA-appen."
      }
    ],
    "sources": [
      {
        "label": "REMA 1000: spørsmål og svar",
        "url": "https://www.rema.no/om-rema/kundeservice/ofte-stilte-sporsmal/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "ikea",
    "name": "IKEA",
    "category": "Hjem og bygg",
    "keywords": [
      "møbler",
      "interiør",
      "varehus"
    ],
    "channels": [
      {
        "type": "store",
        "status": "yes",
        "note": "Amex er oppgitt som betalingskort i varehus."
      },
      {
        "type": "online",
        "status": "yes",
        "note": "Amex er oppgitt for IKEA.no."
      },
      {
        "type": "app",
        "status": "yes",
        "note": "Amex er oppgitt i IKEA-appen."
      }
    ],
    "sources": [
      {
        "label": "IKEA: hvordan kan jeg betale?",
        "url": "https://www.ikea.com/no/no/customer-service/knowledge/articles/b86a27a7-1ea7-45d1-85a7-19cf04368a2d.html",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "elkjop",
    "name": "Elkjøp",
    "category": "Elektronikk",
    "keywords": [
      "Elkjop",
      "mobil",
      "TV",
      "PC"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Elkjøp oppgir Amex som betalingsalternativ i nettbutikken."
      },
      {
        "type": "store",
        "status": "conditional",
        "note": "Elkjøp oppgir Amex i de fleste varehus, med mulige lokale unntak."
      }
    ],
    "sources": [
      {
        "label": "Elkjøp: betalingsalternativer",
        "url": "https://www.elkjop.no/kundeservice/betalingslosninger",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "netonnet",
    "name": "NetOnNet",
    "category": "Elektronikk",
    "keywords": [
      "net on net",
      "PC",
      "mobil",
      "TV"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Amex er oppgitt under kortbetaling. Siden har et eget forbehold om utenlandske bankkort; sjekk kassen hvis kortet avvises."
      },
      {
        "type": "store",
        "status": "yes",
        "note": "Betalingsinformasjonen omfatter også kortbetaling i Lagershop."
      }
    ],
    "sources": [
      {
        "label": "NetOnNet: betalingsmåter",
        "url": "https://www.netonnet.no/content/customerservice/betalingsmater",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "clas-ohlson",
    "name": "Clas Ohlson",
    "category": "Hjem og bygg",
    "keywords": [
      "verktøy",
      "jernvare",
      "Clas Olson"
    ],
    "channels": [
      {
        "type": "store",
        "status": "yes",
        "note": "Amex er uttrykkelig oppgitt for fysiske butikker."
      },
      {
        "type": "online",
        "status": "unknown",
        "note": "Vilkårene for netthandel navngir ikke Amex like tydelig. Bekreft kortvalget i nettbutikkens kasse."
      }
    ],
    "sources": [
      {
        "label": "Clas Ohlson: kjøpsvilkår",
        "url": "https://www.clasohlson.com/no/terms-and-conditions",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "zalando",
    "name": "Zalando",
    "category": "Klær og sport",
    "keywords": [
      "klær",
      "sko",
      "løpesko"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Zalando oppgir American Express som støttet kredittkort."
      }
    ],
    "sources": [
      {
        "label": "Zalando: betaling med kredittkort",
        "url": "https://www.zalando.no/faq/Payments/how-do-i-pay-by-credit-card.html",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "zara",
    "name": "Zara",
    "category": "Klær og sport",
    "keywords": [
      "klær",
      "mote"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "American Express er oppgitt blant betalingsmetodene på Zara.com."
      }
    ],
    "sources": [
      {
        "label": "Zara: betalingsmetoder",
        "url": "https://www.zara.com/no/no/help-center/PaymentMethods",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "adidas",
    "name": "adidas",
    "category": "Klær og sport",
    "keywords": [
      "løpesko",
      "sko",
      "CONFIRMED",
      "trening"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Amex er oppgitt for adidas.no."
      },
      {
        "type": "app",
        "status": "yes",
        "note": "Amex er oppgitt for adidas- og CONFIRMED-appen."
      }
    ],
    "sources": [
      {
        "label": "adidas: betalingsmetoder",
        "url": "https://www.adidas.no/hjelp/betaling/hvilke-betalingsmetoder-godtar-dere",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "sparmax",
    "name": "Sparmax",
    "category": "Hjem og bygg",
    "keywords": [
      "bad",
      "møbler",
      "Svea"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Sparmax oppgir direkte støtte for Amex gjennom betalingsleverandøren Svea."
      }
    ],
    "sources": [
      {
        "label": "Sparmax: betalingsalternativer",
        "url": "https://www.sparmax.no/betalingsalternativer",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "anton-sport",
    "name": "Anton Sport",
    "category": "Klær og sport",
    "keywords": [
      "løpesko",
      "trening",
      "Gaitline",
      "OBOS"
    ],
    "channels": [
      {
        "type": "store",
        "status": "reported",
        "note": "Fysisk handel er oppført hos AMEXguiden. Bekreft med den aktuelle butikken."
      },
      {
        "type": "online",
        "status": "reported",
        "note": "Netthandel er oppført hos AMEXguiden. Velg kortbetaling og kontroller i kassen."
      }
    ],
    "sources": [
      {
        "label": "AMEXguiden: Anton Sport",
        "url": "https://amexguiden.no/sted/anton-sport",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "jernia",
    "name": "Jernia",
    "category": "Hjem og bygg",
    "keywords": [
      "kjøkken",
      "verktøy",
      "jernvare"
    ],
    "channels": [
      {
        "type": "store",
        "status": "reported",
        "note": "Butikkbetaling er oppført hos AMEXguiden."
      },
      {
        "type": "online",
        "status": "reported",
        "note": "Netthandel er oppført hos AMEXguiden. Kontroller betalingsvalget før kjøp."
      }
    ],
    "sources": [
      {
        "label": "AMEXguiden: Jernia",
        "url": "https://amexguiden.no/sted/jernia",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "circle-k",
    "name": "Circle K",
    "category": "Bil og drivstoff",
    "keywords": [
      "bensin",
      "diesel",
      "drivstoff",
      "stasjon"
    ],
    "channels": [
      {
        "type": "store",
        "status": "reported",
        "note": "Oppført som fysisk brukersted hos AMEXguiden. Oppføringen bekrefter ikke alle pumper, apper eller ladeløsninger."
      }
    ],
    "sources": [
      {
        "label": "AMEXguiden: Circle K",
        "url": "https://amexguiden.no/sted/circle-k",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "egon",
    "name": "Egon",
    "category": "Mat og drikke",
    "keywords": [
      "restaurant",
      "middag",
      "kafé"
    ],
    "channels": [
      {
        "type": "store",
        "status": "reported",
        "note": "Oppført hos AMEXguiden. Dette er informasjon om kjeden, ikke en bekreftelse på hver restaurant."
      }
    ],
    "sources": [
      {
        "label": "AMEXguiden: Egon",
        "url": "https://amexguiden.no/sted/egon",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "klm",
    "name": "KLM",
    "category": "Reise og transport",
    "keywords": [
      "fly",
      "flybilletter",
      "Air France"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "KLM oppgir American Express blant kortene som godtas ved bestilling."
      }
    ],
    "sources": [
      {
        "label": "KLM: betalingsmåter",
        "url": "https://www.klm.no/information/ticket-services/payment-methods",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "norwegian",
    "name": "Norwegian",
    "category": "Reise og transport",
    "keywords": [
      "fly",
      "flybilletter",
      "Spenn",
      "CashPoints",
      "gebyr"
    ],
    "channels": [
      {
        "type": "online",
        "status": "conditional",
        "note": "Betalingssiden omtaler personlige Amex-kort med 1,99 % betalingsgebyr. Kontroller tilgjengelighet og totalpris i bestillingen."
      },
      {
        "type": "onboard",
        "status": "no",
        "note": "Norwegians informasjon om kjøp om bord oppgir Visa og Mastercard, og utelukker Amex."
      }
    ],
    "sources": [
      {
        "label": "Norwegian: betalingsmuligheter",
        "url": "https://www.norwegian.com/no/booking/bestillingsinformasjon/betalingsmater",
        "kind": "official",
        "checkedOn": "2026-11-16"
      },
      {
        "label": "Norwegian: betaling om bord",
        "url": "https://www.norwegian.com/globalassets/ip/media/travelling-with-us/on-board/food-and-drinks/norwegian_reprint_sept_2025_low_dps.pdf",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "flytoget",
    "name": "Flytoget",
    "category": "Reise og transport",
    "keywords": [
      "tog",
      "Gardermoen",
      "Oslo lufthavn",
      "flyplass"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Amex er uttrykkelig oppgitt for billettkjøp på flytoget.no. Dette bekrefter ikke kortet som billett i sperrene."
      }
    ],
    "sources": [
      {
        "label": "Flytoget: kjøp billetter på nett",
        "url": "https://flytoget.no/reiseinformasjon/billetter-og-priser/kjop-billett-pa-flytoget.no/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "ruter",
    "name": "Ruter",
    "category": "Reise og transport",
    "keywords": [
      "Oslo",
      "Akershus",
      "buss",
      "trikk",
      "T-bane",
      "kollektiv",
      "periodebillett"
    ],
    "channels": [
      {
        "type": "app",
        "status": "yes",
        "note": "Ruters informasjon om appen oppgir Amex blant betalingsmulighetene."
      }
    ],
    "sources": [
      {
        "label": "Ruter: betalingsmuligheter i appen",
        "url": "https://ruter.no/ruter-appen",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "vy",
    "name": "Vy",
    "category": "Reise og transport",
    "keywords": [
      "tog",
      "buss",
      "periodebillett",
      "Vy-appen"
    ],
    "channels": [
      {
        "type": "online",
        "status": "unknown",
        "note": "Eldre Vy-sider oppgir Amex, mens nyere billettinformasjon oppgir Visa og Mastercard. Støtten må bekreftes i dagens kasse."
      },
      {
        "type": "app",
        "status": "unknown",
        "note": "Vys nyere appinformasjon oppgir Visa og Mastercard, mens eldre veiledning også nevner Amex. Vi har ikke bekreftet gjeldende støtte."
      }
    ],
    "sources": [
      {
        "label": "Vy: nyere billettinformasjon",
        "url": "https://www.vy.no/kundeservice/sporsmal-og-svar/sporsmal-og-svar-om-tog/billetter-og-setereservasjon",
        "kind": "official",
        "checkedOn": "2026-11-16"
      },
      {
        "label": "Vy: betalingsmuligheter i appen",
        "url": "https://www.vy.no/kundeservice/sporsmal-og-svar/hvilke-betalingsmuligheter-har-jeg-i-vy-appen",
        "kind": "official",
        "checkedOn": "2026-11-16"
      },
      {
        "label": "Vy: eldre betalingsveiledning",
        "url": "https://www.vy.no/kundeservice/sporsmal-og-svar/hvordan-kjoper-jeg-billett-og-hvordan-betaler-jeg",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "apollo",
    "name": "Apollo",
    "category": "Reise og transport",
    "keywords": [
      "charter",
      "pakkereise",
      "ferie"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Apollo oppgir Amex. Kortet må være fra EU/EØS, og kortbetalingen krever 3D Secure."
      }
    ],
    "sources": [
      {
        "label": "Apollo: betaling",
        "url": "https://www.apollo.no/min-reise/betaling",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "strawberry",
    "name": "Strawberry",
    "category": "Hotell",
    "keywords": [
      "Clarion",
      "Quality",
      "Comfort",
      "Spenn",
      "hotell"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "American Express er oppgitt for bestilling via Strawberrys nettsider."
      },
      {
        "type": "store",
        "status": "yes",
        "note": "Amex er oppgitt som akseptert kredittkort ved betaling på hotell."
      }
    ],
    "sources": [
      {
        "label": "Strawberry: generelle betingelser",
        "url": "https://www.strawberry.no/om/vilkar/generelle-betingelser/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "scandic",
    "name": "Scandic",
    "category": "Hotell",
    "keywords": [
      "Scandic Friends",
      "hotell",
      "overnatting"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Scandics spørsmål og svar oppgir Amex som støttet kort."
      },
      {
        "type": "store",
        "status": "yes",
        "note": "Scandic oppgir at Amex aksepteres i resepsjonen."
      }
    ],
    "sources": [
      {
        "label": "Scandic: spørsmål og svar",
        "url": "https://www.scandichotels.com/no/kundeservice/sporsmal-svar",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "thon",
    "name": "Thon Hotels",
    "category": "Hotell",
    "keywords": [
      "Thon",
      "THON+",
      "hotell",
      "overnatting"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Amex er oppgitt for betaling på Thons nettsider. Betaling ved ankomst avhenger av valgt pris og hotell."
      }
    ],
    "sources": [
      {
        "label": "Thon Hotels: bestilling og betaling",
        "url": "https://www.thonhotels.no/kundeservice/bestillinger-reservasjoner/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "viaplay",
    "name": "Viaplay",
    "category": "Abonnement",
    "keywords": [
      "strømming",
      "sport",
      "TV",
      "film"
    ],
    "channels": [
      {
        "type": "online",
        "status": "yes",
        "note": "Viaplay oppgir Amex ved direkte kortbetaling. Et abonnement fakturert av en TV-leverandør følger leverandørens betalingsvalg."
      }
    ],
    "sources": [
      {
        "label": "Viaplay: gyldige betalingsmåter",
        "url": "https://help.viaplay.com/nb/change-payment-method/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "netflix",
    "name": "Netflix",
    "category": "Abonnement",
    "keywords": [
      "strømming",
      "film",
      "TV",
      "serier"
    ],
    "channels": [
      {
        "type": "online",
        "status": "conditional",
        "note": "Netflix oppgir Amex, men presiserer at betalingsmåter varierer med land. Kortet må støtte løpende netthandelsbetalinger; sjekk norsk konto."
      }
    ],
    "sources": [
      {
        "label": "Netflix: betalingsalternativer",
        "url": "https://help.netflix.com/nb/node/116380",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "spotify",
    "name": "Spotify",
    "category": "Abonnement",
    "keywords": [
      "musikk",
      "podkast",
      "premium"
    ],
    "channels": [
      {
        "type": "online",
        "status": "reported",
        "note": "Oppført hos AMEXguiden. Spotify viser de faktiske betalingsvalgene for landet og abonnementet ditt i kassen."
      }
    ],
    "sources": [
      {
        "label": "Spotify: betalingsmåter",
        "url": "https://support.spotify.com/no-nb/article/payment-methods/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      },
      {
        "label": "AMEXguiden: Spotify",
        "url": "https://amexguiden.no/sted/spotify",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "apple-abonnement",
    "name": "Apple · App Store og iCloud",
    "category": "Abonnement",
    "keywords": [
      "Apple Music",
      "Apple TV",
      "iPhone",
      "Apple-konto",
      "apper"
    ],
    "channels": [
      {
        "type": "app",
        "status": "reported",
        "note": "Oppført hos AMEXguiden. Apples norske oversikt sier «de fleste kreditt- og debetkort» uten å navngi Amex; kontroller egen Apple-konto."
      }
    ],
    "sources": [
      {
        "label": "Apple: betalingsmåter i Norge",
        "url": "https://support.apple.com/no-no/111741",
        "kind": "official",
        "checkedOn": "2026-11-16"
      },
      {
        "label": "AMEXguiden: Apple",
        "url": "https://amexguiden.no/sted/apple",
        "kind": "directory",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "tv2-play",
    "name": "TV 2 Play",
    "category": "Abonnement",
    "keywords": [
      "TV2",
      "TV2 Play",
      "TV 2",
      "Sumo",
      "sport",
      "strømming"
    ],
    "channels": [
      {
        "type": "online",
        "status": "unknown",
        "note": "Vi mangler en bekreftet opplysning om direkte Amex-betaling. Abonnement via en TV-leverandør må vurderes separat."
      }
    ],
    "sources": []
  },
  {
    "id": "telia",
    "name": "Telia",
    "category": "Abonnement",
    "keywords": [
      "mobil",
      "bredbånd",
      "faktura",
      "TV",
      "Viaplay"
    ],
    "channels": [
      {
        "type": "online",
        "status": "unknown",
        "note": "Telia oppgir Visa og Mastercard for kortbetaling av faktura. Amex er ikke bekreftet. Dette gjelder fakturabetaling, ikke alle kjøp i Telia-butikker."
      }
    ],
    "sources": [
      {
        "label": "Telia: faktura og betaling",
        "url": "https://www.telia.no/hjelp/faktura/",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "coopay",
    "name": "Coopay",
    "category": "Betalingsapper",
    "keywords": [
      "Coop",
      "Extra",
      "app",
      "Coop Medlem",
      "QR"
    ],
    "channels": [
      {
        "type": "app",
        "status": "unknown",
        "note": "Coops veiledning nevner blant annet Visa og Mastercard, men bekrefter ikke Amex. Amex i butikkterminalen sier ikke om kortet kan legges inn i Coopay."
      }
    ],
    "sources": [
      {
        "label": "Coop: aktivere og bruke Coopay",
        "url": "https://coopnoprod.service-now.com/kb?id=kb_article_view&sysparm_article=KB0017455",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  },
  {
    "id": "vipps",
    "name": "Vipps",
    "category": "Betalingsapper",
    "keywords": [
      "MobilePay",
      "vennebetaling",
      "tæpp",
      "QR"
    ],
    "channels": [
      {
        "type": "app",
        "status": "no",
        "note": "Vipps oppgir norsk Visa eller Mastercard som betalingskort. Amex er ikke et støttet kortnettverk i den oppgitte løsningen."
      }
    ],
    "sources": [
      {
        "label": "Vipps: krav for å bruke tjenesten",
        "url": "https://help.vippsmobilepay.com/nb-NO/articles/what-do-i-need",
        "kind": "official",
        "checkedOn": "2026-11-16"
      },
      {
        "label": "Vipps: tæpping med kredittkort",
        "url": "https://help.vippsmobilepay.com/en-NO/articles/tap-with-mastercard",
        "kind": "official",
        "checkedOn": "2026-11-16"
      }
    ]
  }
];
