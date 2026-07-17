import { RONTGEN_CATEGORY_LABELS, rontgenQuestions, rontgenResultBands } from "@/data/okonomisk-rontgen";
import type {
  RontgenActionLink,
  RontgenCategory,
  RontgenRecommendation,
  RontgenResult,
  RontgenResultBand,
} from "@/types/okonomisk-rontgen";

export type RontgenAnswers = Record<string, number>;

const RECOMMENDATIONS: Record<
  RontgenCategory,
  { low: string; mid: string; high: string }
> = {
  buffer: {
    low: "Start med å bygge en liten krisebuffer. Selv noen få tusen kroner kan redusere behovet for kreditt ved uventede utgifter.",
    mid: "Jobb videre mot en buffer som dekker minst tre måneder med nødvendige utgifter.",
    high: "Bufferen din ser solid ut. Vurder å plassere penger utover nødvendig buffer mer langsiktig.",
  },
  gjeld: {
    low: "Prioriter gjeld med høy rente. Ekstra innbetalinger på dyr gjeld kan gi en sikker økonomisk gevinst.",
    mid: "Lag en tydelig nedbetalingsplan og unngå at ny forbruksgjeld bygger seg opp.",
    high: "Gjeldssituasjonen virker håndterbar. Fortsett å betale regninger og kredittkort innen fristen.",
  },
  kostnader: {
    low: "Gå gjennom bolig, transport, forsikringer og abonnementer. Små faste kutt gir effekt hver måned.",
    mid: "Sammenlign noen av de største avtalene dine minst én gang i året.",
    high: "Du har god kontroll på de faste utgiftene. Pass likevel på gradvise prisøkninger.",
  },
  sparing: {
    low: "Start med et lite automatisk sparebeløp rett etter lønning.",
    mid: "Sett et konkret sparemål og automatiser sparingen.",
    high: "Du har gode sparevaner. Sørg for at pengene fordeles mellom kortsiktige og langsiktige mål.",
  },
  trygghet: {
    low: "Undersøk hvordan økonomien din ville blitt påvirket av sykdom, arbeidsledighet eller inntektsfall.",
    mid: "Bygg mer økonomisk fleksibilitet gjennom buffer, forsikringer eller lavere faste kostnader.",
    high: "Du har god økonomisk motstandskraft. Oppdater planen dersom jobb- eller livssituasjonen endrer seg.",
  },
};

const CATEGORY_LINKS: Record<RontgenCategory, RontgenActionLink[]> = {
  buffer: [
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    { label: "Luksusfelle-tavle", href: "/verktoy/luksusfelle-tavle" },
  ],
  gjeld: [
    { label: "Nedbetalingskalkulator", href: "/verktoy/nedbetalingskalkulator" },
    { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
  ],
  kostnader: [
    { label: "Luksusfelle-tavle", href: "/verktoy/luksusfelle-tavle" },
    { label: "Se aktuelle tilbud", href: "/tilbud" },
  ],
  sparing: [
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
    { label: "Regel 72", href: "/verktoy/regel-72" },
  ],
  trygghet: [
    { label: "Luksusfelle-tavle", href: "/verktoy/luksusfelle-tavle" },
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
  ],
};

const CATEGORY_ORDER: RontgenCategory[] = [
  "buffer",
  "gjeld",
  "kostnader",
  "sparing",
  "trygghet",
];

function recommendationForCategory(
  category: RontgenCategory,
  percent: number,
): string {
  const texts = RECOMMENDATIONS[category];
  if (percent < 40) return texts.low;
  if (percent < 70) return texts.mid;
  return texts.high;
}

function findResultBand(score: number): RontgenResultBand {
  return (
    rontgenResultBands.find(
      (band) => score >= band.minScore && score <= band.maxScore,
    ) ?? rontgenResultBands[rontgenResultBands.length - 1]
  );
}

export function calculateRontgenResult(answers: RontgenAnswers): RontgenResult | null {
  const answeredCount = rontgenQuestions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;

  if (answeredCount !== rontgenQuestions.length) {
    return null;
  }

  const totalScore = rontgenQuestions.reduce(
    (sum, question) => sum + (answers[question.id] ?? 0),
    0,
  );

  const categoryTotals = new Map<
    RontgenCategory,
    { earned: number; possible: number }
  >();

  for (const question of rontgenQuestions) {
    const maxOptionPoints = Math.max(...question.options.map((o) => o.points));
    const current = categoryTotals.get(question.category) ?? {
      earned: 0,
      possible: 0,
    };
    categoryTotals.set(question.category, {
      earned: current.earned + (answers[question.id] ?? 0),
      possible: current.possible + maxOptionPoints,
    });
  }

  const categories = CATEGORY_ORDER.map((category) => {
    const totals = categoryTotals.get(category) ?? { earned: 0, possible: 0 };
    const percent =
      totals.possible > 0
        ? Math.round((totals.earned / totals.possible) * 100)
        : 0;

    return {
      category,
      label: RONTGEN_CATEGORY_LABELS[category],
      earnedPoints: totals.earned,
      possiblePoints: totals.possible,
      percent,
    };
  });

  const weakest = [...categories]
    .sort((a, b) => a.percent - b.percent)
    .slice(0, 3);

  const recommendations: RontgenRecommendation[] = weakest.map((entry) => ({
    category: entry.category,
    label: entry.label,
    text: recommendationForCategory(entry.category, entry.percent),
    links: CATEGORY_LINKS[entry.category],
  }));

  return {
    totalScore,
    maxScore: 100,
    band: findResultBand(totalScore),
    categories,
    recommendations,
  };
}

export function formatRontgenCopyText(score: number, siteName: string): string {
  return `Jeg fikk ${score} av 100 på Økonomisk røntgen hos ${siteName}.`;
}
