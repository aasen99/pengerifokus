"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateSifoBudget,
  compareToSifo,
  SIFO_HOUSEHOLD_PRESETS,
  SIFO_LAST_VERIFIED,
  SIFO_MEMBER_OPTIONS,
  SIFO_REPORT_YEAR,
  SIFO_SOURCE_URL,
  type SifoAksInntekt,
  type SifoAksPlass,
  type SifoBarnehageInntekt,
  type SifoCalculatorInput,
  type SifoCarType,
  type SifoMemberType,
} from "@/lib/calculators/sifo";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
  calculatorPanelClassName,
} from "@/components/verktoy/calculator-ui";

const DEFAULT_PRESET = SIFO_HOUSEHOLD_PRESETS.find(
  (p) => p.id === "eksempelfamilie",
)!;

export function SifoKalkulator() {
  const [members, setMembers] = useState<SifoMemberType[]>([
    ...DEFAULT_PRESET.members,
  ]);
  const [includeKollektiv, setIncludeKollektiv] = useState(false);
  const [studentKollektiv, setStudentKollektiv] = useState(false);
  const [car, setCar] = useState<SifoCarType>("bensin");
  const [barnehageBarn, setBarnehageBarn] = useState(1);
  const [barnehageInntekt, setBarnehageInntekt] =
    useState<SifoBarnehageInntekt>("hoy");
  const [aksBarn, setAksBarn] = useState(1);
  const [aksPlass, setAksPlass] = useState<SifoAksPlass>("heltid");
  const [aksInntekt, setAksInntekt] = useState<SifoAksInntekt>("hoy");
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [userMonthlyTotal, setUserMonthlyTotal] = useState("");
  const [userCategoryAmounts, setUserCategoryAmounts] = useState<
    Record<string, string>
  >({});

  const input: SifoCalculatorInput = useMemo(
    () => ({
      members,
      includeKollektiv,
      studentKollektiv,
      car,
      barnehageBarn,
      barnehageInntekt,
      aksBarn,
      aksPlass,
      aksInntekt,
    }),
    [
      members,
      includeKollektiv,
      studentKollektiv,
      car,
      barnehageBarn,
      barnehageInntekt,
      aksBarn,
      aksPlass,
      aksInntekt,
    ],
  );

  const result = useMemo(() => calculateSifoBudget(input), [input]);

  const personCount = useMemo(
    () => members.filter((m) => m !== "spedbarn_grunn_6mnd").length,
    [members],
  );

  const totalComparison = useMemo(() => {
    if (!result || !compareEnabled) return null;
    const user = parseIntegerInput(userMonthlyTotal);
    if (!Number.isFinite(user) || user < 0) return null;
    return compareToSifo(user, result.monthlyTotal);
  }, [result, compareEnabled, userMonthlyTotal]);

  function applyPreset(presetId: string) {
    const preset = SIFO_HOUSEHOLD_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setMembers([...preset.members]);
    if (preset.id === "eksempelfamilie") {
      setCar("bensin");
      setIncludeKollektiv(false);
      setBarnehageBarn(1);
      setAksBarn(1);
    } else {
      setCar("none");
      setIncludeKollektiv(true);
      setBarnehageBarn(0);
      setAksBarn(0);
    }
  }

  function addMember(type: SifoMemberType) {
    setMembers((prev) => [...prev, type]);
  }

  function removeMember(index: number) {
    setMembers((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== index),
    );
  }

  function updateMember(index: number, type: SifoMemberType) {
    setMembers((prev) => prev.map((m, i) => (i === index ? type : m)));
  }

  function updateUserCategory(id: string, value: string) {
    setUserCategoryAmounts((prev) => ({ ...prev, [id]: value }));
  }

  const groupedOptions = {
    voksne: SIFO_MEMBER_OPTIONS.filter((o) => o.group === "voksne"),
    barn: SIFO_MEMBER_OPTIONS.filter((o) => o.group === "barn"),
    spesial: SIFO_MEMBER_OPTIONS.filter((o) => o.group === "spesial"),
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className={calculatorPanelClassName}>
        <h2 className="text-lg font-semibold text-stone-900">Husholdning</h2>
        <p className="mt-1 text-sm text-stone-600">
          Velg medlemstype etter alder og kjønn, som i SIFOs offisielle
          kalkulator. Antall personer ({personCount}) styrer
          husholdningspostene automatisk. Barnehage og AKS bruker Oslo-satser
          som eksempel.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {SIFO_HOUSEHOLD_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id)}
              className="rounded-lg bg-stone-100 px-3 py-2 text-left text-sm font-medium text-stone-700 transition-colors hover:bg-stone-200"
            >
              {preset.label}
              <span className="mt-0.5 block text-xs font-normal text-stone-500">
                {preset.description}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {members.map((member, index) => (
            <div
              key={`${member}-${index}`}
              className="rounded-lg border border-stone-200 bg-stone-50 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-stone-900">
                  Person {index + 1}
                </p>
                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="text-xs font-medium text-stone-500 hover:text-stone-800"
                  >
                    Fjern
                  </button>
                )}
              </div>
              <div className="mt-3">
                <select
                  value={member}
                  onChange={(e) =>
                    updateMember(index, e.target.value as SifoMemberType)
                  }
                  className={calculatorInputClassName}
                >
                  <optgroup label="Voksne">
                    {groupedOptions.voksne.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Barn">
                    {groupedOptions.barn.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Spesial">
                    {groupedOptions.spesial.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          ))}

          <CalculatorField label="Legg til person">
            <select
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  addMember(e.target.value as SifoMemberType);
                  e.target.value = "";
                }
              }}
              className={calculatorInputClassName}
            >
              <option value="" disabled>
                Velg type …
              </option>
              <optgroup label="Voksne">
                {groupedOptions.voksne.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Barn">
                {groupedOptions.barn.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Spesial">
                {groupedOptions.spesial.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </CalculatorField>
        </div>

        <div className="mt-6 space-y-5 border-t border-stone-200 pt-6">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
            <input
              type="checkbox"
              checked={includeKollektiv}
              onChange={(e) => setIncludeKollektiv(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-600"
            />
            <span>
              <span className="block text-sm font-medium text-stone-900">
                Kollektiv for alle med rett (6+ år)
              </span>
              <span className="mt-0.5 block text-xs text-stone-500">
                Ruter 30-dagersbillett, Oslo (feb. 2026). Uten avkryssing
                telles kun reise for voksne, som i eksempelfamilien i rapporten.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
            <input
              type="checkbox"
              checked={studentKollektiv}
              onChange={(e) => setStudentKollektiv(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-600"
            />
            <span className="text-sm text-stone-900">
              Studentrabatt (20–29 år)
            </span>
          </label>

          <CalculatorField label="Bil (husholdning)">
            <select
              value={car}
              onChange={(e) => setCar(e.target.value as SifoCarType)}
              className={calculatorInputClassName}
            >
              <option value="none">Ingen bil</option>
              <option value="bensin">Bensinbil</option>
              <option value="el">Elbil</option>
            </select>
          </CalculatorField>

          <CalculatorField
            label="Antall barn i barnehage"
            hint="Oslo-satser, uten mattillegg"
          >
            <input
              type="number"
              min={0}
              max={5}
              value={barnehageBarn}
              onChange={(e) =>
                setBarnehageBarn(Math.max(0, Number(e.target.value) || 0))
              }
              className={calculatorInputClassName}
            />
          </CalculatorField>

          {barnehageBarn > 0 && (
            <CalculatorField label="Barnehage – inntektsnivå">
              <select
                value={barnehageInntekt}
                onChange={(e) =>
                  setBarnehageInntekt(e.target.value as SifoBarnehageInntekt)
                }
                className={calculatorInputClassName}
              >
                <option value="hoy">Over moderasjonsgrense (≥ 669 050)</option>
                <option value="lav">Lav inntekt (moderasjon)</option>
              </select>
            </CalculatorField>
          )}

          <CalculatorField label="Antall barn i AKS/SFO">
            <input
              type="number"
              min={0}
              max={5}
              value={aksBarn}
              onChange={(e) =>
                setAksBarn(Math.max(0, Number(e.target.value) || 0))
              }
              className={calculatorInputClassName}
            />
          </CalculatorField>

          {aksBarn > 0 && (
            <>
              <CalculatorField label="AKS – plass">
                <select
                  value={aksPlass}
                  onChange={(e) =>
                    setAksPlass(e.target.value as SifoAksPlass)
                  }
                  className={calculatorInputClassName}
                >
                  <option value="heltid">Heltidsplass</option>
                  <option value="deltid">Deltidsplass</option>
                  <option value="delvisGratis">
                    Heltid med gratis deltidsplass
                  </option>
                </select>
              </CalculatorField>
              <CalculatorField label="AKS – inntektsnivå">
                <select
                  value={aksInntekt}
                  onChange={(e) =>
                    setAksInntekt(e.target.value as SifoAksInntekt)
                  }
                  className={calculatorInputClassName}
                >
                  <option value="hoy">Høy inntekt (≥ 520 640)</option>
                  <option value="middels">Middels inntekt</option>
                  <option value="lav">Lav inntekt (≤ 292 860)</option>
                </select>
              </CalculatorField>
            </>
          )}

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
            <input
              type="checkbox"
              checked={compareEnabled}
              onChange={(e) => setCompareEnabled(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-600"
            />
            <span>
              <span className="block text-sm font-medium text-stone-900">
                Sammenlign med egne utgifter
              </span>
              <span className="mt-0.5 block text-xs text-stone-500">
                Totalt og per kategori, uten bolig og strøm
              </span>
            </span>
          </label>

          {compareEnabled && (
            <CalculatorField label="Dine forbruksutgifter per måned (totalt)">
              <FormattedNumberInput
                value={userMonthlyTotal}
                onChange={setUserMonthlyTotal}
                className={calculatorInputClassName}
                placeholder={formatIntegerInput(35_000)}
              />
            </CalculatorField>
          )}
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
              <h2 className="text-lg font-semibold text-stone-900">
                SIFO referansebudsjett {SIFO_REPORT_YEAR}
              </h2>
              <p className="mt-3 text-3xl font-bold text-stone-900">
                {formatCurrency(result.monthlyTotal)}
                <span className="text-base font-normal text-stone-600">
                  {" "}
                  / mnd
                </span>
              </p>
              <p className="mt-2 text-sm text-stone-700">
                {formatCurrency(result.yearlyTotal)} per år ·{" "}
                {result.personCount} personer i husholdningen
              </p>
              {result.matStordriftRabatt > 0 && (
                <p className="mt-2 text-xs text-stone-600">
                  12 % stordriftseffekt på mat:{" "}
                  {formatCurrency(result.matStordriftRabatt)} trukket fra.
                </p>
              )}
            </div>

            {totalComparison && (
              <div className={calculatorPanelClassName}>
                <h2 className="text-lg font-semibold text-stone-900">
                  Sammenligning (totalt)
                </h2>
                <p className="mt-3 text-sm text-stone-600">
                  Ditt estimat:{" "}
                  <span className="font-semibold text-stone-900">
                    {formatCurrency(parseIntegerInput(userMonthlyTotal))}
                  </span>
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    totalComparison.diff > 0
                      ? "text-red-700"
                      : "text-emerald-700"
                  }`}
                >
                  {totalComparison.diff > 0 ? "+" : ""}
                  {formatCurrency(totalComparison.diff)} vs. SIFO
                  {totalComparison.diffPercent !== null &&
                    ` (${totalComparison.diffPercent > 0 ? "+" : ""}${totalComparison.diffPercent.toLocaleString("nb-NO", { maximumFractionDigits: 1 })} %)`}
                </p>
              </div>
            )}

            <div className={calculatorPanelClassName}>
              <h2 className="text-lg font-semibold text-stone-900">
                Per kategori
              </h2>
              <dl className="mt-5 space-y-4">
                {result.categories.map((category) => {
                  const userRaw = userCategoryAmounts[category.id] ?? "";
                  const userAmount = compareEnabled
                    ? parseIntegerInput(userRaw)
                    : NaN;
                  const categoryComparison =
                    compareEnabled &&
                    Number.isFinite(userAmount) &&
                    userAmount >= 0
                      ? compareToSifo(userAmount, category.amount)
                      : null;

                  return (
                    <div
                      key={category.id}
                      className="border-b border-stone-100 pb-4 last:border-0"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-sm text-stone-600">
                          {category.label}
                        </dt>
                        <dd className="text-right">
                          <span className="font-semibold text-stone-900">
                            {formatCurrency(category.amount)}
                          </span>
                          <span className="block text-xs text-stone-500">
                            {formatCurrency(category.amount * 12)} / år
                          </span>
                        </dd>
                      </div>
                      {compareEnabled && (
                        <div className="mt-2">
                          <label className="sr-only">
                            Ditt beløp for {category.label}
                          </label>
                          <FormattedNumberInput
                            value={userRaw}
                            onChange={(value) =>
                              updateUserCategory(category.id, value)
                            }
                            className={
                              calculatorInputClassName + " text-sm py-2"
                            }
                            placeholder="Ditt beløp (valgfritt)"
                          />
                          {categoryComparison && userRaw.trim() !== "" && (
                            <p
                              className={`mt-1 text-xs font-medium ${
                                categoryComparison.diff > 0
                                  ? "text-red-700"
                                  : "text-emerald-700"
                              }`}
                            >
                              {categoryComparison.diff > 0 ? "+" : ""}
                              {formatCurrency(categoryComparison.diff)} vs.
                              SIFO
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </dl>

              <div className="mt-4 border-t border-stone-200 pt-4 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Individspesifikke utgifter</span>
                  <span className="font-medium text-stone-900">
                    {formatCurrency(result.individTotal)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span>Husholdningsspesifikke utgifter</span>
                  <span className="font-medium text-stone-900">
                    {formatCurrency(result.husholdTotal)}
                  </span>
                </div>
                {(result.barnehageTotal > 0 || result.aksTotal > 0) && (
                  <div className="mt-2 flex justify-between">
                    <span>Barnehage og AKS</span>
                    <span className="font-medium text-stone-900">
                      {formatCurrency(result.barnehageTotal + result.aksTotal)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-600 shadow-sm">
              <p>
                Referansebudsjettet dekker nødvendig forbruk på et akseptabelt
                nivå. Bolig, strøm, forsikring, lån, ferie og alkohol er ikke
                med.
              </p>
              <p className="mt-3">
                Kollektiv, barnehage og AKS er basert på Oslo-priser. Tilpass
                til din kommune og faktiske avtaler.
              </p>
            </div>
          </>
        ) : (
          <div className={calculatorPanelClassName + " text-sm text-stone-600"}>
            Legg til minst én person for å beregne referansebudsjettet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Tall fra SIFO-rapport 9-{SIFO_REPORT_YEAR} (februar {SIFO_REPORT_YEAR}
          -priser). Sist verifisert {SIFO_LAST_VERIFIED}. Offisiell kalkulator
          og Excel finnes hos{" "}
          <a
            href={SIFO_SOURCE_URL}
            className="text-orange-600 hover:text-orange-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            OsloMet SIFO
          </a>
          .
        </p>
      </section>
    </div>
  );
}
