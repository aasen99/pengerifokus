export type AmexChannel = "store" | "online" | "app" | "onboard";
export type AmexStatus = "yes" | "reported" | "conditional" | "no" | "unknown";

export interface AmexSource {
  label: string;
  url?: string;
  kind: "official" | "reader";
  /** Limit evidence to the channels it actually covers. Omitted means the merchant note describes its scope. */
  channels?: AmexChannel[];
  /** Source-review date, or receipt date for a reader statement; never a payment-confirmation date. */
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

export const amexUpdatedOn = "2026-11-17";

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
 * "reported" is reserved for directly received positive reader reports.
 * Other directories may provide research leads, never acceptance evidence.
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
        "status": "unknown",
        "note": "Vi mangler en selvstendig bekreftelse på Amex i den aktuelle kjeden. Coopays støttede kort sier ikke hvilke kort som tas i butikkterminalen. Sjekk med butikken."
      }
    ],
    "sources": []
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
        "status": "unknown",
        "note": "Vi mangler en selvstendig bekreftelse på Amex i den aktuelle kjeden. Coopays støttede kort sier ikke hvilke kort som tas i butikkterminalen. Sjekk med butikken."
      }
    ],
    "sources": []
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
        "status": "unknown",
        "note": "Obs bekrefter kortbetaling i varehus, men betalingsinformasjonen navngir ikke Amex. Vi har ikke en selvstendig bekreftelse på Amex i butikk."
      },
      {
        "type": "online",
        "status": "unknown",
        "note": "Obs.no omtaler Visa og Mastercard, men bekrefter ikke Amex. Nettbutikk og fysisk varehus vurderes hver for seg."
      }
    ],
    "sources": [
      {
        "label": "Obs: betalingsalternativer i butikk og på nett",
        "url": "https://www.obs.no/kundeservice/betalingsalternativer",
        "kind": "official",
        "checkedOn": "2026-11-17"
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
        "status": "unknown",
        "note": "Vi mangler en selvstendig bekreftelse på Amex i den aktuelle kjeden. Coopays støttede kort sier ikke hvilke kort som tas i butikkterminalen. Sjekk med butikken."
      }
    ],
    "sources": []
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
        "status": "unknown",
        "note": "Vi har ikke en selvstendig bekreftelse på Amex i fysiske butikker. Kontakt den aktuelle butikken."
      },
      {
        "type": "online",
        "status": "unknown",
        "note": "Anton Sport oppgir kort, faktura og Vipps, men den tilgjengelige kjøpsinformasjonen navngir ikke Amex. Kontroller betalingsvalget i nettbutikkens kasse."
      }
    ],
    "sources": [
      {
        "label": "Anton Sport: kjøpsinformasjon",
        "url": "https://www.antonsport.no/kjopsinformasjon",
        "kind": "official",
        "checkedOn": "2026-11-17"
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
        "status": "unknown",
        "note": "Jernias generelle betalingsinformasjon gir ikke en selvstendig bekreftelse på Amex i hver butikk. Spør den aktuelle butikken."
      },
      {
        "type": "online",
        "status": "unknown",
        "note": "Jernias kortveiledning omtaler Visa og Mastercard. En annen betalingsside omtaler Walley. Amex er ikke bekreftet i disse kildene; sjekk dagens kasse."
      }
    ],
    "sources": [
      {
        "label": "Jernia: betalingsmuligheter",
        "url": "https://www.jernia.no/betaling",
        "kind": "official",
        "checkedOn": "2026-11-17"
      },
      {
        "label": "Jernia: kortbetaling i nettbutikken",
        "url": "https://www.jernia.no/kundeservice/bestilling-og-kjop/kan-jeg-betale-med-kredittkort",
        "kind": "official",
        "checkedOn": "2026-11-17",
        "channels": [
          "online"
        ]
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
        "status": "conditional",
        "note": "Circle K oppgir at Amex kan brukes gjennom Apple Pay og andre støttede betalingsapper på stasjonene. Bekreft den aktuelle terminalen; dette er ikke en bekreftelse på alle kort-, app- og ladeløsninger."
      }
    ],
    "sources": [
      {
        "label": "Circle K: betalingsapper og Amex",
        "url": "https://www.circlek.no/extra/betalingsapper",
        "kind": "official",
        "checkedOn": "2026-11-17"
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
        "status": "yes",
        "note": "Egon beskriver på sin egen EuroBonus-side at du kan betale med EuroBonus Amex og tjene kortpoeng. Dette gjelder betaling på restauranten."
      }
    ],
    "sources": [
      {
        "label": "Egon: EuroBonus og betaling med Amex",
        "url": "https://egon.no/egoneurobonus",
        "kind": "official",
        "checkedOn": "2026-11-17"
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
        "status": "no",
        "note": "Leseropplysning mottatt 17. november 2026: Amex kan ikke brukes som betalingskort i Vy-appen. Opplysningen gjelder appen, ikke vy.no eller andre salgskanaler."
      }
    ],
    "sources": [
      {
        "label": "Vy: nyere billettinformasjon",
        "url": "https://www.vy.no/kundeservice/sporsmal-og-svar/sporsmal-og-svar-om-tog/billetter-og-setereservasjon",
        "kind": "official",
        "checkedOn": "2026-11-16",
        "channels": [
          "online"
        ]
      },
      {
        "label": "Vy: betalingsmuligheter i appen",
        "url": "https://www.vy.no/kundeservice/sporsmal-og-svar/hvilke-betalingsmuligheter-har-jeg-i-vy-appen",
        "kind": "official",
        "checkedOn": "2026-11-16",
        "channels": [
          "app"
        ]
      },
      {
        "label": "Vy: eldre betalingsveiledning",
        "url": "https://www.vy.no/kundeservice/sporsmal-og-svar/hvordan-kjoper-jeg-billett-og-hvordan-betaler-jeg",
        "kind": "official",
        "checkedOn": "2026-11-16",
        "channels": [
          "online"
        ]
      },
      {
        "label": "Leseropplysning til Penger i Fokus",
        "kind": "reader",
        "checkedOn": "2026-11-17",
        "channels": [
          "app"
        ]
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
        "status": "unknown",
        "note": "Spotify viser betalingsalternativene for landet og abonnementet ditt i kassen. Vi mangler en selvstendig bekreftelse på Amex for en norsk konto."
      }
    ],
    "sources": [
      {
        "label": "Spotify: godkjente betalingsmåter",
        "url": "https://support.spotify.com/no-nb/article/payment-methods/",
        "kind": "official",
        "checkedOn": "2026-11-17"
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
        "status": "unknown",
        "note": "Apples norske betalingsoversikt sier at de fleste kreditt- og debetkort godtas, men navngir ikke Amex. Vi har ikke bekreftet Amex særskilt for norsk Apple-konto."
      }
    ],
    "sources": [
      {
        "label": "Apple: betalingsmåter for Apple-kontoen i Norge",
        "url": "https://support.apple.com/no-no/111741",
        "kind": "official",
        "checkedOn": "2026-11-17"
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
        "status": "reported",
        "note": "Leseropplysning mottatt 17. november 2026: Amex kunne legges inn som nytt betalingskort for direkteabonnement hos TV 2 Play. Opplysningen gjelder registrering av kortet; den dokumenterer ikke et gjennomført abonnementstrekk. Betaling gjennom en TV-leverandør vurderes separat."
      }
    ],
    "sources": [
      {
        "label": "Leseropplysning til Penger i Fokus",
        "kind": "reader",
        "checkedOn": "2026-11-17",
        "channels": [
          "online"
        ]
      }
    ]
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
