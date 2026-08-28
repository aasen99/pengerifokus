import { buildFormuesbyggerArticle } from "./helpers";
import { forbesBillionairesSource, kapital400Source } from "./source-tiers";

/** Nye norske profiler (august 2026): Hagen Kjos, Kygo, Carlsen */
export const norskeProfilerBatch4 = {
  "caroline-hagen-kjos": buildFormuesbyggerArticle({
    slug: "caroline-hagen-kjos",
    seoAngle:
      "Caroline Hagen Kjos og Canica: Eierskap, kontroll og arv etter Stein Erik Hagen",
    metaDescription:
      "Forbes anslår Caroline Hagen Kjos til ca. 2,6 mrd. USD. Kapital tilordnet Canica-formuen til faren. Slik skiller eierskap, stemmer og familiesfære seg etter 2026.",
    seoKeywords: [
      "Caroline Hagen Kjos formue",
      "Caroline Hagen Kjos Canica",
      "hvem eier Canica",
      "Hagen Kjos Orkla",
      "Stein Erik Hagen datter",
      "Tvist 1 AS",
      "Canica eierandel Orkla",
    ],
    shortAnswer:
      "Caroline Hagen Kjos er arving og medeier i Canica-sfæren, ikke grunnlegger av Rimi eller Orkla. Forbes anslo formuen til rundt 2,6 milliarder dollar i 2026, knyttet til familieselskapet. Kapital 2025 tilordnet 33,1 milliarder kroner til Stein Erik Hagen via samme Canica-sfære. Tallene må ikke summeres: det er to måter å tilordne én familiesfære på, ikke to separate formuer. Etter Hagens død 4. mai 2026 tok hun kontroll over Tvist 1 AS og dermed indirekte kontroll over Canica. Familieselskapene inngikk samtidig en aksjonæravtale som samler stemmeretten i Orkla hos Canica AS, selv om aksjene er spredt på flere selskaper og boet.",
    timeline: [
      {
        date: "1984",
        title: "Født",
        description:
          "Orklas styreprofil oppgir fødselsåret 1984. Bachelor of Business Administration fra Parsons The New School for Design.",
      },
      {
        date: "2014–2015",
        title: "Styreleder og majoritet i Canica",
        description:
          "Hun ble styreleder i familieselskapet Canica. En klar majoritet av aksjekapitalen ble overført til henne, mens stemmereglene i familieselskapet kan skille seg fra den økonomiske andelen.",
      },
      {
        date: "2016",
        title: "Inn i Orklas styre",
        description:
          "Første gang valgt til Orklas styre. Orkla opplyser at hun og nærstående eide 250 386 411 Orkla-aksjer per 31. desember 2024, familiesfærens samlede post, ikke nødvendigvis hennes personlige aksjer alene.",
      },
      {
        date: "4. mai 2026",
        title: "Stein Erik Hagen dør",
        description:
          "Hagen døde brått, 69 år gammel. Canica hadde historisk vært kontrollert av ham som offentlig ansikt, selv når datteren allerede eide majoriteten.",
      },
      {
        date: "mai 2026",
        title: "Kontroll via Tvist 1 AS",
        description:
          "Hun overtok kontrollen i Tvist 1 AS og dermed indirekte kontroll over Canica AS, ifølge DN og E24. Canica AS, Canica Investor AS, Tvist 1 AS og boet inngikk aksjonæravtale om felles Orkla-eierskap.",
      },
      {
        date: "mai 2026",
        title: "25 prosent av Orkla samlet",
        description:
          "Partene eide til sammen 25,003 prosent av Orkla (250 386 000 aksjer). Canica AS eide 196 351 000, Canica Investor AS 50 050 000, Tvist 1 AS 3 885 000 og boet 100 000. Canica AS skal utøve stemmeretten for alle.",
      },
    ],
    wealthSources: [
      {
        category: "arv",
        description:
          "Majoritet i Canica-sfæren overført fra Stein Erik Hagen, med Rimi-salget som historisk utgangspunkt for familieselskapet.",
      },
      {
        category: "aksjer",
        description:
          "Indirekte eierskap i Orkla og øvrige Canica-investeringer. Orkla-posten er spredt på flere selskaper og boet, med samlet stemmeutøvelse hos Canica AS.",
      },
      {
        category: "selskaper",
        description:
          "Holdingselskaper som Canica AS, Canica Investor AS og Tvist 1 AS, der kontroll kan sitte et annet sted enn den største aksjeposten.",
      },
    ],
    ownershipVsControl:
      "I 2014–2015 fikk hun økonomisk majoritet i Canica, mens faren fortsatt var det offentlige kontrollansiktet. Etter mai 2026 sitter indirekte Canica-kontroll hos henne via Tvist 1 AS, samtidig som Orkla-aksjene er fordelt på flere selskaper og boet. Aksjonæravtalen samler stemmeretten hos Canica AS. Økonomisk eierskap, juridisk eierskap, stemmer og «hvem Kapital tilordner formuen» er fire ulike spørsmål. Forbes-anslaget på 2,6 milliarder dollar og Kapitals 33,1 milliarder til Hagen beskriver overlapping, ikke to formuer som kan legges sammen.",
    decisiveMove:
      "Å ta indirekte kontroll over Canica via Tvist 1 AS etter farens død, og samtidig binde familiesfærens Orkla-stemmer i én avtale, slik at spredt eierskap ikke splitter innflytelsen.",
    whatCouldGoWrong: [
      "Å summere Forbes-anslaget og Kapitals Hagen-tall gir dobbelttelling av samme Canica-sfære.",
      "Aksjonæravtaler kan holde stemmer samlet i dag og splittes ved arv, skilsmisse eller uenighet senere.",
      "Orkla-konsentrasjon gjør familiesfæren avhengig av én børsnotert aksje.",
      "Skille mellom Sveits-basert holdingsstruktur og norsk skatterapportering gjør personlig likvide midler vanskelige å lese ut av selskapsverdi.",
    ],
    mythVsReality: [
      {
        myth: "Caroline Hagen Kjos og Stein Erik Hagen hadde to separate milliardformuer som kan summeres.",
        reality:
          "Kapital tilordnet Canica-sfæren til Hagen i 2025. Forbes anslår henne som milliardær fordi hun har hatt majoritet i samme sfære. Det er overlappende tilordning.",
      },
      {
        myth: "Hun eier 25 prosent av Orkla personlig.",
        reality:
          "25,003 prosent er familiesfærens samlede post fordelt på Canica AS, Canica Investor AS, Tvist 1 AS og boet.",
      },
      {
        myth: "Majoritet i Canica siden 2015 betydde at hun allerede styrte alt.",
        reality:
          "Økonomisk majoritet og faktisk kontroll kan ligge ulike steder. Offentlig kontrollskifte kom først med Tvist 1 AS i mai 2026.",
      },
    ],
    personalLessons: [
      "I familieselskaper må du skille arv, aksjekapital, stemmer og hvem listene tilordner formuen.",
      "En aksjonæravtale kan holde innflytelse samlet selv når aksjene er spredt på flere selskaper og et dødsbo.",
      "To anerkjente kilder kan gi ulike tall for samme sfære uten at noen av dem er «løgn».",
      "Arv gir eierskap. Struktur og avtaler avgjør kontrollen etter at arvelateren er borte.",
    ],
    sources: [
      {
        label: "Canica: historikk",
        url: "https://www.canica.no/om-canica/historikk",
        tier: "primary",
      },
      {
        label: "Orkla: investorinformasjon",
        url: "https://www.orkla.com/investor/",
        tier: "primary",
      },
      {
        label: "DN: Hagen Kjos får kontroll over farens eierselskap (mai 2026)",
        url: "https://www.dn.no/bors/orkla/oslo-bors/canica/caroline-hagen-kjos-far-kontroll-over-farens-eierselskap/2-1-1994361",
        tier: "tertiary",
      },
      {
        label: "TV2/NTB: indirekte kontroll over Canica og Orkla-avtalen (mai 2026)",
        url: "https://www.tv2.no/nyheter/stein-erik-hagens-datter-tar-indirekte-kontroll-over-familieselskapet/18878921/",
        tier: "tertiary",
      },
      forbesBillionairesSource(),
      {
        label: "Forbes: Caroline Hagen Kjos-profil",
        url: "https://www.forbes.com/profile/caroline-hagen-kjos/",
        tier: "tertiary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Stein Erik Hagen", href: "/formuesbyggere/stein-erik-hagen" },
      { label: "Johan Johannson", href: "/formuesbyggere/johan-johannson" },
      { label: "Helene Sundt", href: "/formuesbyggere/helene-sundt" },
      { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    ],
  }),

  kygo: buildFormuesbyggerArticle({
    slug: "kygo",
    seoAngle:
      "Kygo formue: Kygo AS-regnskapet og Palm Tree Crew er ikke samme tall",
    metaDescription:
      "Kygo AS hadde 153,8 mill. kr i egenkapital i 2025. Palm Tree Crew ble verdsatt til 215 mill. USD. Slik skiller utbytte, selskapsverdi og privat formue seg.",
    seoKeywords: [
      "Kygo formue",
      "Kyrre Gørvell-Dahll formue",
      "Kygo AS regnskap",
      "Kygo utbytte",
      "Palm Tree Crew verdi",
      "Kygo selskaper",
      "Kygo alder",
    ],
    shortAnswer:
      "Kygo, egentlig Kyrre Gørvell-Dahll, har dokumentert formue i det norske selskapet Kygo AS og en separat amerikansk virksomhet i Palm Tree Crew. Kygo AS hadde 153,8 millioner kroner i egenkapital ved utgangen av 2025, etter 29 millioner i tilleggsutbytte. Det er bokført selskapsegenkapital, ikke et Kapital 400-anslag for hele privatøkonomien. Palm Tree Crew, grunnlagt i 2018 med manager Myles Shear, ble i september 2025 verdsatt til 215 millioner dollar da WME ledet en kapitalinnhenting på 20 millioner dollar. Selskapsverdi er ikke det samme som Kygos eierandel, og eierandelen er ikke offentlig i detalj.",
    timeline: [
      {
        date: "11. sep. 1991",
        title: "Født i Singapore",
        description:
          "SNL oppgir fødselsdato og -sted. Han er oppvokst i Fana i Bergen og ble kjent som EDM-produsent og DJ.",
      },
      {
        date: "2013–2014",
        title: "Gjennombrudd som Kygo",
        description:
          "Artistnavnet og tropisk house-lyden ga globalt publikum. Publikum er distribusjon, ikke formue i seg selv.",
      },
      {
        date: "2018",
        title: "Palm Tree Crew grunnlegges",
        description:
          "Sammen med manager Myles Shear. Selskapet driver festivaler, beach clubs og artistvirksomhet, en annen modell enn spotify-royalty alene.",
      },
      {
        date: "sep. 2025",
        title: "WME inn i Palm Tree Crew",
        description:
          "Bloomberg: WME ledet en runde på 20 millioner dollar som priset selskapet til 215 millioner dollar. Kapitalen gikk til selskapet, ikke som privat lønn til Kygo.",
      },
      {
        date: "2025",
        title: "Kygo AS: 153,8 mill. i egenkapital",
        description:
          "E24: driftsinntekter 23,9 millioner, tilleggsutbytte 29 millioner, egenkapital 153,8 millioner, ned fra 171,4 millioner. Utbytte er uttak, ikke selskapsverdi.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description:
          "Kygo AS med bokført egenkapital og finansielle plasseringer, pluss medeierskap i Palm Tree Crew med ukjent eierandel.",
      },
      {
        category: "royalty",
        description:
          "Musikk- og liveinntekter som kan ligge i Kygo AS, utenlandske selskaper eller personlig. Regnskapet viser ikke hele den globale strømmen.",
      },
      {
        category: "lonn",
        description:
          "Utbytte fra Kygo AS (29 mill. i 2025) er dokumentert uttak, ikke det samme som formue eller selskapsverdi.",
      },
    ],
    ownershipVsControl:
      "Kygo AS er det synlige norske holdingselskapet. Palm Tree Crew er et amerikansk selskap med eksterne investorer etter WME-runden. En verdsettelse på 215 millioner dollar er selskapets verdi før eller etter runden, ikke Kygos private kontantbeholdning. Uten offentlig eierbok kan vi ikke omregne selskapsverdien til hans andel. Moren Kjersti Gjerde er omtalt som styreleder i Kygo AS; styreverv er ikke det samme som eierskap.",
    decisiveMove:
      "Å bygge Palm Tree Crew som eget selskap med festivaler og merkevare, slik at inntektene ikke bare er DJ-honorar, og deretter hente industriell partnerkapital (WME) uten å selge hele virksomheten.",
    whatCouldGoWrong: [
      "Å behandle 215 millioner dollar som Kygos formue ignorerer utvanning, gjeld, minoritetsrabatt og skatt.",
      "Høyt utbytte reduserer selskapets egenkapital, slik 2025-regnskapet viser.",
      "Festival- og livevirksomhet er syklisk og omdømmeutsatt.",
      "Norske regnskapstall fanger ikke automatisk opp hele den amerikanske verdien.",
    ],
    mythVsReality: [
      {
        myth: "Palm Tree Crews verdi på 215 millioner dollar er Kygos formue.",
        reality:
          "Det er en selskapsverdsettelse etter en kapitalinnhenting. Hans eierandel er ikke offentlig.",
      },
      {
        myth: "29 millioner i utbytte betyr at han tjente 29 millioner netto i 2025.",
        reality:
          "Utbytte er uttak fra oppspart egenkapital og årets resultat, og utløser skatt. Driftsinntektene i Kygo AS var 23,9 millioner.",
      },
      {
        myth: "Kygo Jo og Kygo er samme inntektshistorie.",
        reality:
          "Kygo Jo er en egen artist og Haaland-relatert historie. Kygo AS og Palm Tree Crew er Kyrre Gørvell-Dahlls selskaper.",
      },
    ],
    personalLessons: [
      "Selskapsverdi, eierandel, utbytte og privat formue er fire ulike tall.",
      "Et norsk AS-regnskap er et gulv av dokumentasjon, ikke et tak for internasjonal virksomhet.",
      "Kapitalinnsprøytning i et merkevareselskap er inntekt til selskapet, ikke lønn til artisten.",
      "Utbytte finansierer privatforbruk og skatt, og kan svekke selskapets buffer.",
    ],
    sources: [
      {
        label: "Store norske leksikon: Kygo",
        url: "https://snl.no/Kygo",
        tier: "primary",
      },
      {
        label: "E24: Kygo tok ut 29 millioner i utbytte",
        url: "https://e24.no/naeringsliv/i/vr924p/kygo-tok-ut-29-millioner-i-utbytte",
        tier: "tertiary",
      },
      {
        label: "Bloomberg: WME investerer i Palm Tree Crew til 215 mill. USD",
        url: "https://www.bloomberg.com/news/articles/2025-09-08/wme-invests-in-kygo-s-music-festival-firm-at-215-million-valuation",
        tier: "tertiary",
      },
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Kygo Jo", href: "/formuesbyggere/erling-haaland/kygo-jo" },
      { label: "Erling Braut Haaland", href: "/formuesbyggere/erling-haaland" },
      { label: "Rihanna", href: "/formuesbyggere/rihanna" },
      { label: "Taylor Swift", href: "/formuesbyggere/taylor-swift" },
      { label: "Utbytte i ordboken", href: "/ordbok/utbytte" },
    ],
  }),

  "magnus-carlsen": buildFormuesbyggerArticle({
    slug: "magnus-carlsen",
    seoAngle:
      "Magnus Carlsen formue: Magnuschess-regnskapet er ikke hele privatøkonomien",
    metaDescription:
      "Magnuschess AS hadde 128,2 mill. kr i egenkapital i 2025. Carlsen eier 87,5 %. Play Magnus ble solgt til Chess.com. Slik skiller sjakkinntekt og selskapsverdi seg.",
    seoKeywords: [
      "Magnus Carlsen formue",
      "Magnuschess regnskap",
      "Magnus Carlsen utbytte",
      "Play Magnus Chess.com",
      "Magnus Carlsen selskaper",
      "Magnus Carlsen alder",
    ],
    shortAnswer:
      "Magnus Carlsen har dokumentert formue i investeringsselskapet Magnuschess AS, ikke et offentlig Kapital 400-milliardanslag. I 2025 omsatte selskapet for 61,2 millioner kroner og hadde 128,2 millioner i egenkapital. Carlsen eier 87,5 prosent, faren Henrik Carlsen 12,5 prosent og er styreleder. Egenkapital i selskapet er ikke det samme som hans samlede privatøkonomi. Play Magnus Group, som han var med å grunnlegge i 2013, ble børsnotert i 2020 og kjøpt av Chess.com 16. desember 2022 til 13 kroner aksjen. Etter salget er han Chess.com-ambassadør, ikke storaksjonær i et uavhengig Play Magnus.",
    timeline: [
      {
        date: "30. nov. 1990",
        title: "Født i Tønsberg",
        description:
          "SNL: oppvokst i Lommedalen i Bærum. Verdensmester i langsjakk 2013–2023, med flere VM-titler i hurtig- og lynsjakk.",
      },
      {
        date: "2013",
        title: "Play Magnus grunnlegges",
        description:
          "Sammen med Espen Agdestein og Anders Brandt. App og senere gruppe med chess24 og Chessable, et forsøk på å eie plattform, ikke bare prestasjonshonorar.",
      },
      {
        date: "okt. 2020",
        title: "Børsnotering av Play Magnus Group",
        description:
          "Notering på Oslo Børs. Etter noteringen eide Magnuschess om lag 9,5 prosent. Andel etter utvanning er ikke det samme som «han eide hele selskapet».",
      },
      {
        date: "16. des. 2022",
        title: "Chess.com kjøper Play Magnus",
        description:
          "Frivillig bud på 13 kroner aksjen, gjennomført 16. desember 2022. Carlsen signerte som Chess.com-ambassadør. Børsverdien den dagen er historikk, ikke dagens formue.",
      },
      {
        date: "2025",
        title: "Magnuschess: 61,2 mill. i inntekt",
        description:
          "TV2 og E24: omsetning 61,2 millioner, opp fra 18,7 millioner. Egenkapital 128,2 millioner. Årsresultat 34,8 millioner etter skatt. 10 millioner avsatt til utbytte, mot 20 millioner i 2024.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description:
          "87,5 prosent av Magnuschess AS, der inntekter, finansielle anleggsmidler og bankinnskudd er bokført.",
      },
      {
        category: "salg",
        description:
          "Historisk gevinst eller tap ved Play Magnus-aksjene da Chess.com kjøpte selskapet i 2022. Ikke en løpende inntektsstrøm i 2025-regnskapet.",
      },
      {
        category: "lonn",
        description:
          "Premiepenger, sponsorater og ambassadøravtaler kan ligge i Magnuschess eller utenfor. Regnskapet viser selskapets inntekter, ikke en fullstendig privat lønnsslipp.",
      },
    ],
    ownershipVsControl:
      "Magnus eier 87,5 prosent av Magnuschess. Faren eier 12,5 prosent og er styreleder og daglig leder. Økonomisk majoritet og daglig kontroll sitter derfor ikke nødvendigvis hos samme person. Play Magnus er ikke lenger et uavhengig Carlsen-selskap; Chess.com eier gruppen, og Carlsen er ambassadør. En gammel børsverdi eller en 9,5 prosent-post fra 2020 kan ikke brukes som dagens formue.",
    decisiveMove:
      "Å samle inntekter og investeringer i Magnuschess over tid, og å selge Play Magnus-plattformen til Chess.com i stedet for å holde et ulønnsomt uavhengig sjakkselskap på børs.",
    whatCouldGoWrong: [
      "Å gange Magnuschess' egenkapital med 87,5 prosent og kalle det hele hans formue, ignorerer privat eiendom, skatt, pensjon og inntekter utenfor selskapet.",
      "Turneringsinntekter svinger med form og kalender, 2025 var et rekordår og er ikke en garantert run-rate.",
      "Konsentrasjon i finansielle anleggsmidler gir markedsrisiko.",
      "En tidligere børsnotering kan skape inntrykk av milliardverdier som ikke lenger eies.",
    ],
    mythVsReality: [
      {
        myth: "Carlsen eier fortsatt Play Magnus som et milliardkonsern.",
        reality:
          "Chess.com fullførte oppkjøpet 16. desember 2022. Han er ambassadør, ikke kontrollerende eier av gruppen.",
      },
      {
        myth: "128 millioner i egenkapital er det samme som 128 millioner på konto.",
        reality:
          "Egenkapitalen inkluderer langsiktige investeringer, fordringer og verdipapirer, ikke bare bankinnskudd.",
      },
      {
        myth: "Han eier 100 prosent av Magnuschess alene.",
        reality:
          "Faren eier 12,5 prosent og sitter med styrelederrollen.",
      },
    ],
    personalLessons: [
      "Idrettsinntekt blir formue først når den spares og investeres i et selskap, ikke når den vinnes som premie.",
      "Plattformselskaper kan selges. Ambassadøravtale etterpå er inntekt, ikke den gamle aksjeposten.",
      "Familieeierskap med 87,5 / 12,5 krever at du leser både aksjonærliste og hvem som er daglig leder.",
      "Et rekordår i regnskapet er et datapunkt, ikke en evig inntekt.",
    ],
    sources: [
      {
        label: "Store norske leksikon: Magnus Carlsen",
        url: "https://snl.no/Magnus_Carlsen",
        tier: "primary",
      },
      {
        label: "Magnuschess AS: Brønnøysundregistrene",
        url: "https://virksomhet.brreg.no/nb/oppslag/enheter/990508046",
        tier: "primary",
      },
      {
        label: "Chess.com: oppkjøp av Play Magnus (des. 2022)",
        url: "https://www.chess.com/news/view/chesscom-acquires-pmg",
        tier: "secondary",
      },
      {
        label: "Play Magnus: gjennomføring av Chess.com-budet (16. des. 2022)",
        url: "https://kommunikasjon.ntb.no/ir-files/16823864/1971/2637/Download%20announcement%20as%20PDF.pdf",
        tier: "secondary",
      },
      {
        label: "E24: Sjakkongen doblet resultatet",
        url: "https://e24.no/naeringsliv/i/oE1kX7/sjakkongen-doblet-resultatet",
        tier: "tertiary",
      },
      {
        label: "TV2: Magnuschess-regnskapet 2025",
        url: "https://www.tv2.no/underholdning/havet-inn-flere-titalls-millioner-i-rekordaret/19080527/",
        tier: "tertiary",
      },
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Erling Braut Haaland", href: "/formuesbyggere/erling-haaland" },
      { label: "Kygo", href: "/formuesbyggere/kygo" },
      { label: "Michael Jordan", href: "/formuesbyggere/michael-jordan" },
      { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    ],
  }),
};
