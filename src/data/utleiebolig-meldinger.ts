import type { UtleieboligInput } from "@/types/utleiebolig";
import type { UtleieboligResult } from "@/types/utleiebolig";

export interface UtleieboligVurderingContext {
  input: UtleieboligInput;
  result: UtleieboligResult;
  ownerOccupiedOverHalf: boolean;
  alternativeMonthlyRent: number | null;
  ltvPercent: number;
  equityPercent: number;
  breakEvenMarginPercent: number;
  rentCoversLoan: boolean;
  rentCoversOperating: boolean;
  operatingCostShareOfRent: number;
  loanPaymentShareOfRent: number;
  maintenanceShareOfValue: number;
  purchaseCostsShareOfEquity: number;
  netHousingCostMonthly: number | null;
  housingSavingsMonthly: number | null;
  taxShareOfCashFlow: number;
  rentGapToBreakEven: number;
}

export type MeldingKategori =
  | "summary"
  | "pro"
  | "con"
  | "risk"
  | "insight"
  | "whenOk";

export interface UtleieboligMelding {
  id: string;
  kategori: MeldingKategori;
  priority: number;
  when: (ctx: UtleieboligVurderingContext) => boolean;
  text: (ctx: UtleieboligVurderingContext) => string;
}

function fmtKr(amount: number): string {
  return `${Math.round(amount).toLocaleString("nb-NO")} kr`;
}

function fmtPct(value: number): string {
  return `${value.toFixed(1).replace(".", ",")} %`;
}

export const UTLEIEBOLIG_MELDINGER: UtleieboligMelding[] = [
  // ── Sammendrag (8) ──────────────────────────────────────────────
  {
    id: "summary-elite",
    kategori: "summary",
    priority: 100,
    when: (c) =>
      c.result.coversAllCosts &&
      c.result.cashOnCashReturnPercent >= 6 &&
      c.result.grossYieldPercent >= 5 &&
      c.breakEvenMarginPercent >= 12 &&
      !c.ownerOccupiedOverHalf,
    text: () =>
      "Et av de sterkeste tallene vi ser: leien dekker alt med god margin, og avkastningen på egenkapitalen er høy for en ren utleiebolig.",
  },
  {
    id: "summary-solid-rental",
    kategori: "summary",
    priority: 90,
    when: (c) =>
      c.result.coversAllCosts &&
      c.breakEvenMarginPercent >= 8 &&
      !c.ownerOccupiedOverHalf,
    text: () =>
      "Solid utleiecase. Leien dekker lån og kostnader, og du har buffer mot tomgang og uforutsette utgifter.",
  },
  {
    id: "summary-thin-margin",
    kategori: "summary",
    priority: 85,
    when: (c) =>
      c.result.coversAllCosts &&
      c.breakEvenMarginPercent < 10 &&
      c.breakEvenMarginPercent >= 0 &&
      !c.ownerOccupiedOverHalf,
    text: () =>
      "Tallene går i pluss, men marginen er tynn. En renteoppgang, tomgang eller større reparasjon kan snu resultatet raskt.",
  },
  {
    id: "summary-speculative",
    kategori: "summary",
    priority: 80,
    when: (c) =>
      !c.result.coversAllCosts &&
      c.result.grossYieldPercent < 4.5 &&
      !c.ownerOccupiedOverHalf,
    text: (c) =>
      `Du legger inn ca. ${fmtKr(c.result.monthlyShortfall)} per måned. Dette ligner mer på en prisspekulasjon enn en leieinvestering — avkastningen må komme fra verdistigning.`,
  },
  {
    id: "summary-heavy-loss",
    kategori: "summary",
    priority: 75,
    when: (c) =>
      !c.result.coversAllCosts &&
      c.result.monthlyShortfall > 5_000 &&
      !c.ownerOccupiedOverHalf,
    text: (c) =>
      `Stort månedlig underskudd på ${fmtKr(c.result.monthlyShortfall)}. Uten en tydelig plan for oppgradering, høyere leie eller sterk prisvekst er dette et høyrisiko-case.`,
  },
  {
    id: "summary-hybrid-saves",
    kategori: "summary",
    priority: 95,
    when: (c) =>
      c.ownerOccupiedOverHalf &&
      c.housingSavingsMonthly !== null &&
      c.housingSavingsMonthly > 1_000,
    text: (c) =>
      `Utleiedelen ser svak ut isolert, men du sparer ${fmtKr(c.housingSavingsMonthly!)}/mnd mot å leie tilsvarende. Da handler det om boligkostnad — ikke ren leieavkastning.`,
  },
  {
    id: "summary-hybrid-cashflow-plus",
    kategori: "summary",
    priority: 98,
    when: (c) => c.ownerOccupiedOverHalf && c.result.coversAllCosts,
    text: () =>
      "Sjeldent bra hybrid-case: du bor der, leien dekker felles kostnader, og du sitter igjen med positiv kontantstrøm.",
  },
  {
    id: "summary-hybrid-tough",
    kategori: "summary",
    priority: 70,
    when: (c) =>
      c.ownerOccupiedOverHalf &&
      c.housingSavingsMonthly !== null &&
      c.housingSavingsMonthly < -2_000,
    text: () =>
      "Du betaler mer for å bo enn alternativ leie, og utleieinntekten redder deg ikke. Sjekk om du betaler for noe du faktisk verdsetter — beliggenhet, plass, eierskap.",
  },

  // ── Fordeler (12) ─────────────────────────────────────────────────
  {
    id: "pro-positive-cashflow",
    kategori: "pro",
    priority: 95,
    when: (c) => c.result.monthlyCashFlow > 0,
    text: (c) =>
      `Positiv kontantstrøm på ${fmtKr(c.result.monthlyCashFlow)}/mnd før skatt — boligen bærer seg uten at du fyller på.`,
  },
  {
    id: "pro-positive-after-tax",
    kategori: "pro",
    priority: 88,
    when: (c) => c.result.cashFlowAfterTaxMonthly > 0,
    text: (c) =>
      `Etter estimert skatt sitter du igjen med +${fmtKr(c.result.cashFlowAfterTaxMonthly)}/mnd.`,
  },
  {
    id: "pro-gross-yield-high",
    kategori: "pro",
    priority: 85,
    when: (c) => c.result.grossYieldPercent >= 6,
    text: (c) =>
      `Brutto leieavkastning på ${fmtPct(c.result.grossYieldPercent)} er høy i norsk sammenheng.`,
  },
  {
    id: "pro-gross-yield-good",
    kategori: "pro",
    priority: 75,
    when: (c) =>
      c.result.grossYieldPercent >= 4.5 && c.result.grossYieldPercent < 6,
    text: (c) =>
      `Brutto leieavkastning på ${fmtPct(c.result.grossYieldPercent)} er i overkant av typisk nivå i mange markeder.`,
  },
  {
    id: "pro-cash-on-cash-strong",
    kategori: "pro",
    priority: 90,
    when: (c) => c.result.cashOnCashReturnPercent >= 7,
    text: (c) =>
      `Kontantavkastning på ${fmtPct(c.result.cashOnCashReturnPercent)} av egenkapitalen slår det meste av trygg sparing — før verdistigning.`,
  },
  {
    id: "pro-wide-margin",
    kategori: "pro",
    priority: 82,
    when: (c) => c.breakEvenMarginPercent >= 18,
    text: (c) =>
      `Break-even-leien er ${fmtKr(c.rentGapToBreakEven)} under markedsleie — du tåler tomgang og kostnadssprekk bedre.`,
  },
  {
    id: "pro-rent-covers-loan-well",
    kategori: "pro",
    priority: 78,
    when: (c) => c.rentCoversLoan && c.result.effectiveMonthlyRent >= c.result.monthlyLoanPayment * 1.25,
    text: () =>
      "Leieinntekten dekker låneterminen med god margin — lånet er ikke den største bekymringen her.",
  },
  {
    id: "pro-low-ltv",
    kategori: "pro",
    priority: 72,
    when: (c) => c.ltvPercent <= 65,
    text: (c) =>
      `Belåningsgrad på ${fmtPct(c.ltvPercent)} gir lavere rente- og refinansieringsrisiko enn et tungt belånt case.`,
  },
  {
    id: "pro-low-opex",
    kategori: "pro",
    priority: 68,
    when: (c) => c.operatingCostShareOfRent < 35 && c.result.effectiveMonthlyRent > 0,
    text: (c) =>
      `Driftskostnadene utgjør bare ${fmtPct(c.operatingCostShareOfRent)} av leieinntekten — effektiv drift.`,
  },
  {
    id: "pro-equity-building",
    kategori: "pro",
    priority: 50,
    when: (c) => c.result.loanAmount > 0,
    text: () =>
      "Avdrag bygger formue over tid — en del av terminbeløpet er sparing, ikke kastet bort.",
  },
  {
    id: "pro-hybrid-subsidy",
    kategori: "pro",
    priority: 86,
    when: (c) =>
      c.ownerOccupiedOverHalf &&
      c.housingSavingsMonthly !== null &&
      c.housingSavingsMonthly > 0,
    text: (c) =>
      `Leieinntekten subsidierer boligen din med ${fmtKr(c.housingSavingsMonthly!)}/mnd sammenlignet med å leie.`,
  },
  {
    id: "pro-net-yield-solid",
    kategori: "pro",
    priority: 70,
    when: (c) => c.result.netYieldPercent >= 3.5,
    text: (c) =>
      `Netto leieavkastning på ${fmtPct(c.result.netYieldPercent)} etter driftskostnader er solid.`,
  },

  // ── Ulemper (12) ──────────────────────────────────────────────────
  {
    id: "con-negative-cashflow",
    kategori: "con",
    priority: 95,
    when: (c) => c.result.monthlyCashFlow < 0 && !c.ownerOccupiedOverHalf,
    text: (c) =>
      `Negativ kontantstrøm på ${fmtKr(c.result.monthlyShortfall)}/mnd — du må fylle på fra lønn eller annen sparing.`,
  },
  {
    id: "con-negative-after-tax",
    kategori: "con",
    priority: 88,
    when: (c) =>
      c.result.cashFlowAfterTaxMonthly < 0 &&
      c.result.monthlyCashFlow >= 0,
    text: (c) =>
      `Skatt spiser overskuddet — etter skatt går du ${fmtKr(Math.abs(c.result.cashFlowAfterTaxMonthly))}/mnd i minus.`,
  },
  {
    id: "con-break-even-above-rent",
    kategori: "con",
    priority: 92,
    when: (c) => c.breakEvenMarginPercent < 0,
    text: (c) =>
      `Break-even-leien (${fmtKr(c.result.breakEvenMonthlyRent)}/mnd) er høyere enn markedsleie — matematikken går ikke opp uten endringer.`,
  },
  {
    id: "con-thin-margin",
    kategori: "con",
    priority: 80,
    when: (c) =>
      c.breakEvenMarginPercent >= 0 && c.breakEvenMarginPercent < 8,
    text: () =>
      "Svært liten buffer mellom faktisk leie og break-even — lite rom for overraskelser.",
  },
  {
    id: "con-low-gross-yield",
    kategori: "con",
    priority: 85,
    when: (c) => c.result.grossYieldPercent > 0 && c.result.grossYieldPercent < 3.5,
    text: (c) =>
      `Brutto leieavkastning på bare ${fmtPct(c.result.grossYieldPercent)} — mye må komme fra prisstigning, ikke leie.`,
  },
  {
    id: "con-mediocre-yield",
    kategori: "con",
    priority: 70,
    when: (c) =>
      c.result.grossYieldPercent >= 3.5 && c.result.grossYieldPercent < 4.2,
    text: () =>
      "Leieavkastningen er middels — du konkurrerer ikke med gode fond eller andre investeringer på cash flow alene.",
  },
  {
    id: "con-high-ltv",
    kategori: "con",
    priority: 88,
    when: (c) => c.ltvPercent > 85,
    text: (c) =>
      `Belåningsgrad på ${fmtPct(c.ltvPercent)} — lite egenkapitalbuffer ved prisfall eller refinansiering.`,
  },
  {
    id: "con-stretched-ltv",
    kategori: "con",
    priority: 75,
    when: (c) => c.ltvPercent > 75 && c.ltvPercent <= 85,
    text: (c) =>
      `Belåningsgrad på ${fmtPct(c.ltvPercent)} — du er utsatt for renteoppgang og strengere bankkrav.`,
  },
  {
    id: "con-rent-not-cover-loan",
    kategori: "con",
    priority: 90,
    when: (c) => !c.rentCoversLoan,
    text: () =>
      "Leieinntekten dekker ikke engang låneterminen — du betaler boliglånet i stor grad selv.",
  },
  {
    id: "con-high-opex",
    kategori: "con",
    priority: 78,
    when: (c) => c.operatingCostShareOfRent > 50,
    text: (c) =>
      `Driftskostnadene sluker ${fmtPct(c.operatingCostShareOfRent)} av leieinntekten — lite igjen til lån og overskudd.`,
  },
  {
    id: "con-high-vacancy",
    kategori: "con",
    priority: 72,
    when: (c) => c.input.vacancyMonthsPerYear >= 1.2,
    text: (c) =>
      `Du har lagt inn ${c.input.vacancyMonthsPerYear.toFixed(1).replace(".", ",")} måneder tomgang per år — det tyder på usikkert leiemarked eller sesongvariasjon.`,
  },
  {
    id: "con-concentration",
    kategori: "con",
    priority: 45,
    when: () => true,
    text: (c) =>
      `${fmtKr(c.result.equityInvested)} bundet i én eiendom — lite diversifisering og treg likviditet ved salg.`,
  },

  // ── Risiko (10) ───────────────────────────────────────────────────
  {
    id: "risk-interest-sensitivity",
    kategori: "risk",
    priority: 90,
    when: (c) => c.input.annualRatePercent >= 6 || c.ltvPercent > 75,
    text: () =>
      "Renteoppgang på 1–2 prosentpoeng kan øke terminbeløpet mer enn du kan heve leien på kort sikt.",
  },
  {
    id: "risk-vacancy",
    kategori: "risk",
    priority: 85,
    when: (c) => c.breakEvenMarginPercent < 15,
    text: () =>
      "Tomgang og leietakerbytte koster tid og penger — tynn margin tåler det dårlig.",
  },
  {
    id: "risk-maintenance-clump",
    kategori: "risk",
    priority: 80,
    when: (c) => c.maintenanceShareOfValue < 0.8,
    text: () =>
      "Vedlikeholdsbudsjettet ser lavt ut — store reparasjoner kommer ofte i klumper og kan sprenge årsbudsjettet.",
  },
  {
    id: "risk-income-dependency",
    kategori: "risk",
    priority: 92,
    when: (c) => c.result.monthlyCashFlow < 0,
    text: () =>
      "Negativ kontantstrøm gjør deg avhengig av fast jobbinntekt — stress ved jobbtap, sykdom eller renteoppgang.",
  },
  {
    id: "risk-regulatory",
    kategori: "risk",
    priority: 55,
    when: () => true,
    text: () =>
      "Skatteregler, utleiereglar og formuesbeskatning kan endres og påvirke lønnsomheten.",
  },
  {
    id: "risk-refinance",
    kategori: "risk",
    priority: 82,
    when: (c) => c.ltvPercent > 80,
    text: () =>
      "Høy belåning gjør refinansiering vanskeligere hvis boligprisene faller eller banken strammer inn.",
  },
  {
    id: "risk-tenant",
    kategori: "risk",
    priority: 75,
    when: (c) => c.ownerOccupiedOverHalf,
    text: () =>
      "Leietaker i samme bolig — konflikter, støy og skader påvirker hverdagen din direkte.",
  },
  {
    id: "risk-hybrid-tax",
    kategori: "risk",
    priority: 70,
    when: (c) => c.ownerOccupiedOverHalf,
    text: () =>
      "Skattemessig fordeling mellom egen bruk og utleie krever riktig dokumentasjon — feil kan bli dyrt.",
  },
  {
    id: "risk-sell-with-tenant",
    kategori: "risk",
    priority: 65,
    when: (c) => c.ownerOccupiedOverHalf || !c.result.coversAllCosts,
    text: () =>
      "Bolig med leietaker eller svake tall kan være vanskeligere å selge — færre kjøpere og lavere bud.",
  },
  {
    id: "risk-high-rate-now",
    kategori: "risk",
    priority: 78,
    when: (c) => c.input.annualRatePercent >= 6.5,
    text: (c) =>
      `Rente på ${fmtPct(c.input.annualRatePercent)} er høy — lånekostnaden dominerer regnestykket.`,
  },

  // ── Observasjoner / innsikt (15) ────────────────────────────────────
  {
    id: "insight-rate-stress",
    kategori: "insight",
    priority: 88,
    when: (c) => c.result.monthlyLoanPayment > 0,
    text: (c) => {
      const stressed = c.result.monthlyLoanPayment * 1.15;
      const gap = c.result.effectiveMonthlyRent - c.result.monthlyOperatingCosts - stressed;
      return gap < 0
        ? `Ved 15 % høyere rente må du fylle på ca. ${fmtKr(Math.abs(gap))}/mnd.`
        : `Selv med 15 % høyere rente holder tallene — du har buffer mot renteoppgang.`;
    },
  },
  {
    id: "insight-loan-share",
    kategori: "insight",
    priority: 70,
    when: (c) => c.loanPaymentShareOfRent > 0,
    text: (c) =>
      `Låneterminen utgjør ${fmtPct(c.loanPaymentShareOfRent)} av leieinntekten etter tomgang.`,
  },
  {
    id: "insight-opex-share",
    kategori: "insight",
    priority: 68,
    when: (c) => c.operatingCostShareOfRent > 0,
    text: (c) =>
      `Driftskostnader utgjør ${fmtPct(c.operatingCostShareOfRent)} av leieinntekten — sjekk at vedlikehold er realistisk.`,
  },
  {
    id: "insight-rent-raise-needed",
    kategori: "insight",
    priority: 85,
    when: (c) => c.rentGapToBreakEven < 0,
    text: (c) =>
      `Du må heve leien med ca. ${fmtKr(Math.abs(c.rentGapToBreakEven))}/mnd for å nå break-even.`,
  },
  {
    id: "insight-cash-cow",
    kategori: "insight",
    priority: 92,
    when: (c) =>
      c.result.coversAllCosts &&
      c.result.grossYieldPercent >= 5.5 &&
      c.result.cashOnCashReturnPercent >= 6,
    text: () =>
      "Dette ligner en «cash cow» — leien driver avkastningen mer enn prisstigning.",
  },
  {
    id: "insight-appreciation-bet",
    kategori: "insight",
    priority: 90,
    when: (c) =>
      !c.result.coversAllCosts && c.result.grossYieldPercent < 4,
    text: () =>
      "Du satser i praksis på verdistigning — ikke leieinntekt. Vær ærlig med deg selv om det er strategien.",
  },
  {
    id: "insight-fund-comparison",
    kategori: "insight",
    priority: 60,
    when: (c) =>
      c.result.cashOnCashReturnPercent < 5 && c.result.cashOnCashReturnPercent > -10,
    text: (c) =>
      `Kontantavkastning på ${fmtPct(c.result.cashOnCashReturnPercent)} konkurrerer med indeksfond over tid — med langt mindre arbeid og bredere risiko.`,
  },
  {
    id: "insight-purchase-costs",
    kategori: "insight",
    priority: 72,
    when: (c) => c.purchaseCostsShareOfEquity > 8,
    text: (c) =>
      `Omkostninger ved kjøp utgjør ${fmtPct(c.purchaseCostsShareOfEquity)} av egenkapitalen — det tar tid å «tjene inn» disse.`,
  },
  {
    id: "insight-low-maintenance",
    kategori: "insight",
    priority: 75,
    when: (c) => c.maintenanceShareOfValue < 0.7 && c.input.purchasePrice > 0,
    text: () =>
      "Vedlikeholdsbudsjettet er under 1 % av boligverdien årlig — mange rådgivere anbefaler minst det over tid.",
  },
  {
    id: "insight-management-fee",
    kategori: "insight",
    priority: 65,
    when: (c) => c.input.monthlyManagementFee > 0,
    text: (c) =>
      `Forvaltningshonorar på ${fmtKr(c.input.monthlyManagementFee)}/mnd reduserer kontantstrømmen direkte.`,
  },
  {
    id: "insight-hybrid-net-cost",
    kategori: "insight",
    priority: 88,
    when: (c) => c.ownerOccupiedOverHalf && c.netHousingCostMonthly !== null,
    text: (c) =>
      `Din netto boligkostnad er ${fmtKr(c.netHousingCostMonthly!)}/mnd (lån + kostnader − leie). Det er det viktigste tallet i et hybrid-case.`,
  },
  {
    id: "insight-tax-bite",
    kategori: "insight",
    priority: 78,
    when: (c) => c.taxShareOfCashFlow > 25 && c.result.estimatedTaxAnnual > 0,
    text: (c) =>
      `Estimert skatt utgjør ${fmtPct(c.taxShareOfCashFlow)} av kontantstrømmen før skatt — vurder fradrag og dokumentasjon nøye.`,
  },
  {
    id: "insight-small-shortfall",
    kategori: "insight",
    priority: 82,
    when: (c) =>
      !c.result.coversAllCosts &&
      c.result.monthlyShortfall > 0 &&
      c.result.monthlyShortfall <= 2_500 &&
      !c.ownerOccupiedOverHalf,
    text: (c) =>
      `Lite underskudd på ${fmtKr(c.result.monthlyShortfall)}/mnd kan aksepteres hvis du forventer høyere leie, lavere rente eller prisvekst.`,
  },
  {
    id: "insight-equity-cushion",
    kategori: "insight",
    priority: 68,
    when: (c) => c.equityPercent >= 35,
    text: (c) =>
      `Egenkapitalandelen på ${fmtPct(c.equityPercent)} gir rom for prisfall uten at du havner under vann.`,
  },
  {
    id: "insight-all-green",
    kategori: "insight",
    priority: 95,
    when: (c) =>
      c.result.coversAllCosts &&
      c.result.cashFlowAfterTaxMonthly > 0 &&
      c.breakEvenMarginPercent >= 12 &&
      c.ltvPercent <= 75,
    text: () =>
      "De fleste nøkkeltallene er grønne samtidig — det er uvanlig bra og bør fortsatt verifiseres mot lokalt leiemarked.",
  },

  // ── Når svakt case likevel er greit (10) ────────────────────────────
  {
    id: "whenOk-hybrid-anyway",
    kategori: "whenOk",
    priority: 90,
    when: (c) => c.ownerOccupiedOverHalf,
    text: () =>
      "Du trenger uansett et sted å bo — utleiedelen er et tillegg, ikke hele investeringscaset.",
  },
  {
    id: "whenOk-cheaper-than-rent",
    kategori: "whenOk",
    priority: 95,
    when: (c) =>
      c.housingSavingsMonthly !== null && c.housingSavingsMonthly > 0,
    text: () =>
      "Netto boligkostnad er lavere enn alternativ leie — da er du foran, selv om utleiedelen isolert ser svak ut.",
  },
  {
    id: "whenOk-unused-space",
    kategori: "whenOk",
    priority: 80,
    when: (c) => c.ownerOccupiedOverHalf,
    text: () =>
      "Du leier ut areal du uansett ikke bruker — hybel, kjeller eller etasje som ellers stod tomt.",
  },
  {
    id: "whenOk-long-term-home",
    kategori: "whenOk",
    priority: 75,
    when: (c) => c.ownerOccupiedOverHalf,
    text: () =>
      "Du planlegger å bo der i mange år — kortsiktig svak leieavkastning betyr mindre.",
  },
  {
    id: "whenOk-small-shortfall-rental",
    kategori: "whenOk",
    priority: 85,
    when: (c) =>
      !c.ownerOccupiedOverHalf &&
      c.result.monthlyShortfall > 0 &&
      c.result.monthlyShortfall <= 3_000,
    text: () =>
      "Lite månedlig underskudd kan være OK hvis du oppgraderer, øker leien, eller tror på prisvekst i strøket.",
  },
  {
    id: "whenOk-value-add",
    kategori: "whenOk",
    priority: 82,
    when: (c) =>
      c.result.grossYieldPercent < 4.5 &&
      (c.input.monthlyMaintenance > 2_000 || c.result.monthlyShortfall > 0),
    text: () =>
      "Planlagt oppussing eller bedre utnyttelse kan løfte leien mer enn kostnaden — da er dagens tall et utgangspunkt, ikke sluttresultat.",
  },
  {
    id: "whenOk-location-premium",
    kategori: "whenOk",
    priority: 70,
    when: (c) =>
      c.ownerOccupiedOverHalf &&
      c.housingSavingsMonthly !== null &&
      c.housingSavingsMonthly >= -3_000,
    text: () =>
      "Du betaler kanskje litt mer enn leiemarkedet, men får eierskap, trygghet og beliggenhet du verdsetter.",
  },
  {
    id: "whenOk-low-rate-lock",
    kategori: "whenOk",
    priority: 72,
    when: (c) =>
      c.input.annualRatePercent <= 4.5 &&
      !c.result.coversAllCosts &&
      c.result.monthlyShortfall <= 4_000,
    text: () =>
      "Med lav rente kan det lønne seg å tåle et lite underskudd midlertidig — særlig hvis du forventer leievekst.",
  },
  {
    id: "whenOk-amortization",
    kategori: "whenOk",
    priority: 65,
    when: (c) =>
      !c.result.coversAllCosts &&
      c.result.monthlyCashFlow >= -4_000 &&
      c.ltvPercent < 80,
    text: () =>
      "Avdrag bygger formue selv med svak kontantstrøm — du betaler deg rikere over tid, men binder likviditet.",
  },
  {
    id: "whenOk-secondary-unit",
    kategori: "whenOk",
    priority: 78,
    when: (c) =>
      !c.ownerOccupiedOverHalf &&
      c.result.effectiveMonthlyRent > 0 &&
      c.input.monthlyRent < c.input.purchasePrice * 0.004,
    text: () =>
      "Sekundærbolig med lav yield kan fortsatt passe som feriebolig, fremtidig egenbolig eller langsiktig arv — ikke bare som ren leie.",
  },
];
