import { calculateSifoBudget } from "@/lib/calculators/sifo/calculate";
import type { SifoCalculatorInput } from "@/lib/calculators/sifo/types";
import type { SifoMemberType } from "@/lib/calculators/sifo/data";

function presetInput(
  members: SifoMemberType[],
  options?: Partial<
    Pick<
      SifoCalculatorInput,
      "cars" | "barnehageBarn" | "aksBarn"
    >
  >,
): SifoCalculatorInput {
  return {
    members,
    cars: options?.cars ?? [],
    barnehageBarn: options?.barnehageBarn ?? 0,
    barnehageInntekt: "hoy",
    aksBarn: options?.aksBarn ?? 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  };
}

/** Tall brukt i guiden «SIFO: sammenligne husholdninger», hentet fra samme kalkulator. */
export function getSifoGuideExampleTotals() {
  const enslig = calculateSifoBudget(
    presetInput(["kvinne_25_50"]),
  )!.monthlyTotal;
  const par = calculateSifoBudget(
    presetInput(["kvinne_25_50", "mann_25_50"]),
  )!.monthlyTotal;
  const familie = calculateSifoBudget(
    presetInput(
      ["kvinne_25_50", "mann_25_50", "gutt_4_6", "jente_11_14"],
      {
        cars: [{ type: "bensin" }],
        barnehageBarn: 1,
        aksBarn: 1,
      },
    ),
  )!.monthlyTotal;

  return { enslig, par, familie };
}

export function formatSifoGuideKr(amount: number): string {
  return Math.round(amount).toLocaleString("nb-NO");
}
