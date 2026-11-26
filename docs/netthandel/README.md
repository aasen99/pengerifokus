# Bonus ved netthandel

Oppdatert 26. november 2026. Den eksisterende `/tilbud`-siden, søket, kategoriene, butikksgrupperingen og URL-ene er videreført.

## Datadekning

| Program | Registrerte butikker inkl. historikk og kartleggingsfunn | Gjeldende sats kontrollert |
| --- | ---: | ---: |
| Trumf Netthandel | 274 | 272 (hele offentlig katalog) |
| Klarna Cashback | 126 | 106 (hele offentlig katalog) |
| SAS Online Shopping | 286 | 0 |
| Spenn | 155 | 1 (Lensway, kontokobling) |

SAS: 282 funn fra tredjepart pluss fire eksisterende oppføringer som ikke gjenfantes der. Ingen tredjepartssatser publiseres. SAS-butikksidene returnerer en intern Nuxt-feil; nettsidens offentlige datakilde returnerte HTTP 403. Generelle vilkår hos SAS kunne leses. Fullstendig, fersk butikkontroll var ikke mulig.

Spenn: appkatalogen er ikke offentlig tilgjengelig. 214 navnefunn ligger i forskningsgrunnlaget uten satser; bare navn som også kunne identifiseres som netthandelsaktører i øvrig kartlegging, eller ble navngitt i primærkilder, er føyd til siden. Andre funn krever manuell kategorisering. Gamle markedsføringssider bekrefter ikke automatisk fortsatt deltakelse. Lensway har en særskilt kontokobling med 10 Spenn per 10 kr og et uttrykkelig forbud mot kombinasjon med andre tilbud.

SAS EuroBonus Shop er beholdt som egen butikk. Et Rituals-produkt brukes bare som eksempel. Zupergift er separat gavekortkanal for seks butikker som SAS uttrykkelig navngir. Gavekortbonus behandles ikke som vanlig portalbonus eller som bekreftelse på at innløsningsbutikken tar Amex.

478 unike butikker er registrert i de fire hovedprogrammene. 329 har minst én kontrollert sats. Blant alle registrerte, også uavklarte, finnes 111 i to, 84 i tre og 28 i fire programmer. Med bare kontrollerte satser er tallene 48 i to, én i tre og ingen i fire. Tallene angir programmer, ikke antall opptjeningskanaler. Shop og gavekort er holdt utenfor disse programtallene.

Alle 437 tidligere oppføringer og slugs er bevart. Det er 601 nye kanaloppføringer, hvorav 256 har kontrollerte satser. 102 eksisterende høyeste publiserte prosent-/poengsatser er endret. Det er ingen sikkert dokumenterte avviklinger. 22 eldre oppføringer mangler fra de nye, komplette Trumf-/Klarna-katalogene og er flagget for kontroll. De vises uten en gjeldende numerisk sats. Åtte Klarna-kampanjer har eksplisitt sluttdato og tidspunkt. Detaljer og hele endringslisten finnes i `status.json`.

## Sammenligningen

- Juster EuroBonus og Spenn individuelt i øre, kjøpsbeløp, inkludert frakt, mva og ny/eksisterende kunde. Innstillingene bevares i URL-en.
- Trumf kan beholdes som kroner eller omregnes til EuroBonus: 10 poeng/kr ved engang og 13,5 poeng/kr ved automatisk overføring. Kurs kontrollert mot Trumf.
- SAS Online Shopping og Trumf beregnes uten mva/frakt/gebyrer. Uavklart grunnlag gir et intervall med og uten mva. Klarna har ikke tilstrekkelig presise generelle grunnlagsvilkår offentlig; produktunntak vises i detaljene.
- Rangering bruker nedre intervallgrense. «Høyest av kontrollerte» krever at nedre grense er høyere enn alle andre kontrollerte alternativers øvre grense. Uavklarte kanaler kan ikke rangeres.
- Faste beløp/poeng beholdes, men rangeres ikke som prosenter. Kampanjer stanser i beregningen ved nøyaktig utløp. Tidligere overstrøket Klarna-sats regnes ikke automatisk som tilbakevendende normalsats.
- Satser eldre enn 14 dager merkes og utelates fra rangeringen. Det er ikke en garanti om uendrede satser innen 14 dager.
- Amex-registeret gjenbrukes med nettkanal, dokumentert/rapportert/betinget/nei/uavklart status og kilde. Kortbonus presenteres separat. Ingen summering mellom konkurrerende portaler. Ingen slutning om Amex-aksept fra portalmedlemskap. Klarna krever betaling med Klarna.

## Faktisk automatisert vedlikehold

GitHub Actions `tilbud-kontroll.yml` kjører daglig klokken 07:17 UTC og kan startes manuelt. Den leser åpne Trumf- og Klarna-sider, med offentlig paginering og lav parallellitet. Ingen ekstra Python-pakker er nødvendige.

1. Collectorene kontrollerer skjemastruktur, sidefullstendighet og duplikater. Feil stopper innhentingen. Ingen omgåelse av innlogging, sperrer eller robots-regler.
2. Normalisering gjør offentlig data til kandidater. Eksisterende aliaser brukes på samme måte i kontrollscript og nettsted.
3. Kontrollrapport viser nye butikker, endrede satser/vilkår, manglende partnere og utløpte kampanjer.
4. Kandidater og rapport lagres som Actions-artifakter i 30 dager. Ingen automatisk publisering eller sletting.
5. En redaktør undersøker usikkerhet, oppdaterer relevante rader i `src/data/netthandel/catalogue.json`, og kjører tester/bygg før commit til `master`. Vercel publiserer gjennom eksisterende Git-integrasjon.

SAS, Spenn-app, innloggede Klarna-medlemsnivåer, nye Amex-kilder og uklare produktunntak krever fortsatt manuell kontroll. Klarna-lenken `cashback-update` returnerte 404; den offentlige FAQ-en kunne leses. Arbeidsflyten er implementert; første planlagte kjøring må kontrolleres i Actions. Innhentings-, normaliserings- og sammenligningsscript er kjørt lokalt med denne gjennomgangens data.

## Validering

`npm test` kjører eksisterende kalkulatortester og nye, meningsfulle tester for beløp, poengverdi, konvertering, mva, frakt, kundetype, kampanjeutløp, ukjente satser, aliaser, bevaring av alle gamle ID-er/URL-slugs og komplette kontrollerte kataloger. `npm run typecheck` og `npm run build` kontrollerer produksjonskoden. Testkjøringen er gjort deterministisk ved å ta `tsx` inn som utviklingsavhengighet. En eksisterende typefeil i en formuesbygger-testfixture er rettet uten å endre produktatferd.

Miljøets forhåndsvisning feilet fordi det legger Vite-argumenter (`--host`, `--strictPort`) på prosjektets Next.js-kommando. Ingen fungerende applikasjonskode ble endret for å kompensere for dette. Lokal visuell mobil-/PC-kontroll var derfor utilgjengelig. Publiserings- og produksjonskontroll dokumenteres i sluttrapporten.

## Primærkilder

- [Alle Trumf-butikker](https://trumfnetthandel.no/kategori), hver butikkside er lenket i dataene.
- [Trumf-vilkår og beregningsgrunnlag](https://trumfnetthandel.no/termsandconditions).
- [Trumf til EuroBonus](https://www.trumf.no/fordeler/sas-eurobonus).
- [Klarna cashback-katalog](https://www.klarna.com/no/store/?type=CASHBACK), fem sider, hver butikk lenket i dataene.
- [Klarna offentlig cashback-FAQ](https://www.klarna.com/no/cashback/).
- [SAS generelle portalvilkår](https://onlineshopping.flysas.com/nb-NO/kundeservice).
- [SAS EuroBonus Shop, Zupergift](https://www.saseurobonusshop.com/no/zupergift).
- [SAS Shop, Rituals](https://www.saseurobonusshop.com/no/brand/Rituals).
- [Spenn, om tjenesten](https://spenngroup.com/nb-NO/about).
- [Lensways Spenn-vilkår](https://www.lensway.no/faq/article/11553/hvordan-fungerer-norwegian-reward).
- [Amex-opptjening og unntak](https://www.americanexpress.com/nb-no/fordeler/oppdag-fordelene/poeng/index.html/).

Forskningsfiler er kildefunn, ikke et separat publiseringsgrunnlag. Den gjennomgåtte `catalogue.json` og synlig kontrollstatus er autoritative for siden.
