"use client";

import { useEffect, useMemo } from "react";
import {
  getEligibleAksCount,
  getEligibleBarnehageCount,
  SIFO_HOUSEHOLD_PRESETS,
  SIFO_MEMBER_OPTIONS,
  type SifoAksInntekt,
  type SifoAksPlass,
  type SifoBarnehageInntekt,
  type SifoCalculatorInput,
  type SifoCar,
  type SifoCarFuelType,
  type SifoMemberType,
} from "@/lib/calculators/sifo";
import {
  CalculatorField,
  calculatorInputClassName,
  calculatorPanelClassName,
} from "@/components/verktoy/calculator-ui";

export interface SifoHouseholdState {
  label: string;
  members: SifoMemberType[];
  cars: SifoCar[];
  barnehageBarn: number;
  barnehageInntekt: SifoBarnehageInntekt;
  aksBarn: number;
  aksPlass: SifoAksPlass;
  aksInntekt: SifoAksInntekt;
}

/** Bakoverkompatibilitet: eldre tilstand med enkelt `car`-felt. */
export function normalizeSifoHouseholdState(
  state: SifoHouseholdState & { car?: "none" | SifoCarFuelType },
): SifoHouseholdState {
  if (state.cars !== undefined) {
    const { car: _legacy, ...rest } = state as SifoHouseholdState & {
      car?: string;
    };
    return rest;
  }
  const legacyCar = state.car;
  if (!legacyCar || legacyCar === "none") {
    const { car: _legacy, ...rest } = state;
    return { ...rest, cars: [] };
  }
  const { car: _legacy, ...rest } = state;
  return { ...rest, cars: [{ type: legacyCar }] };
}

export function sifoStateToInput(state: SifoHouseholdState): SifoCalculatorInput {
  const normalized = normalizeSifoHouseholdState(state);
  return {
    members: normalized.members,
    cars: normalized.cars,
    barnehageBarn: normalized.barnehageBarn,
    barnehageInntekt: normalized.barnehageInntekt,
    aksBarn: normalized.aksBarn,
    aksPlass: normalized.aksPlass,
    aksInntekt: normalized.aksInntekt,
  };
}

export function createSifoHouseholdFromPreset(
  presetId: string,
  label: string,
): SifoHouseholdState {
  const preset = SIFO_HOUSEHOLD_PRESETS.find((p) => p.id === presetId);
  const members = preset ? [...preset.members] : (["kvinne_25_50"] as SifoMemberType[]);
  const isFamily = presetId === "eksempelfamilie";
  return {
    label,
    members,
    cars: isFamily ? [{ type: "bensin" }] : [],
    barnehageBarn: isFamily ? 1 : 0,
    barnehageInntekt: "hoy",
    aksBarn: isFamily ? 1 : 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  };
}

interface SifoHouseholdPanelProps {
  state: SifoHouseholdState;
  onChange: (next: SifoHouseholdState) => void;
  showLabel?: boolean;
}

export function SifoHouseholdPanel({
  state,
  onChange,
  showLabel = false,
}: SifoHouseholdPanelProps) {
  const personCount = useMemo(
    () => state.members.filter((m) => m !== "spedbarn_grunn_6mnd").length,
    [state.members],
  );

  const eligibleBarnehage = useMemo(
    () => getEligibleBarnehageCount(state.members),
    [state.members],
  );
  const eligibleAks = useMemo(
    () => getEligibleAksCount(state.members),
    [state.members],
  );

  useEffect(() => {
    let nextBarn = state.barnehageBarn;
    if (eligibleBarnehage === 0) nextBarn = 0;
    else nextBarn = Math.min(state.barnehageBarn, eligibleBarnehage);
    if (nextBarn !== state.barnehageBarn) {
      onChange({ ...state, barnehageBarn: nextBarn });
    }
  }, [eligibleBarnehage, state.barnehageBarn, state.members, state, onChange]);

  useEffect(() => {
    let nextAks = state.aksBarn;
    if (eligibleAks === 0) nextAks = 0;
    else nextAks = Math.min(state.aksBarn, eligibleAks);
    if (nextAks !== state.aksBarn) {
      onChange({ ...state, aksBarn: nextAks });
    }
  }, [eligibleAks, state.aksBarn, state.members, state, onChange]);

  function patch(partial: Partial<SifoHouseholdState>) {
    onChange({ ...state, ...partial });
  }

  function addCar(type: SifoCarFuelType = "bensin") {
    patch({ cars: [...state.cars, { type }] });
  }

  function removeCar(index: number) {
    patch({ cars: state.cars.filter((_, i) => i !== index) });
  }

  function updateCarType(index: number, type: SifoCarFuelType) {
    patch({
      cars: state.cars.map((car, i) => (i === index ? { type } : car)),
    });
  }

  function applyPreset(presetId: string) {
    const preset = SIFO_HOUSEHOLD_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const isFamily = preset.id === "eksempelfamilie";
    onChange({
      ...state,
      members: [...preset.members],
      cars: isFamily ? [{ type: "bensin" }] : [],
      barnehageBarn: isFamily ? 1 : 0,
      aksBarn: isFamily ? 1 : 0,
    });
  }

  function addMember(type: SifoMemberType) {
    patch({ members: [...state.members, type] });
  }

  function removeMember(index: number) {
    if (state.members.length <= 1) return;
    patch({ members: state.members.filter((_, i) => i !== index) });
  }

  function updateMember(index: number, type: SifoMemberType) {
    patch({
      members: state.members.map((m, i) => (i === index ? type : m)),
    });
  }

  const groupedOptions = {
    voksne: SIFO_MEMBER_OPTIONS.filter((o) => o.group === "voksne"),
    barn: SIFO_MEMBER_OPTIONS.filter((o) => o.group === "barn"),
    spesial: SIFO_MEMBER_OPTIONS.filter((o) => o.group === "spesial"),
  };

  return (
    <section className={calculatorPanelClassName}>
      {showLabel && (
        <CalculatorField label="Navn på scenario">
          <input
            type="text"
            value={state.label}
            onChange={(e) => patch({ label: e.target.value })}
            className={calculatorInputClassName}
            placeholder="F.eks. Alene, Samboer, Familie med barn"
          />
        </CalculatorField>
      )}

      <p className="text-sm text-stone-600">
        {personCount} person{personCount !== 1 ? "er" : ""} i husholdningen.
        Barnehage og AKS bruker Oslo-satser.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
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

      <div className="mt-5 space-y-4">
        {state.members.map((member, index) => (
          <div
            key={`${member}-${index}`}
            className="rounded-lg border border-stone-200 bg-stone-50 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-stone-900">
                Person {index + 1}
              </p>
              {state.members.length > 1 && (
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
        <div>
          <p className="text-sm font-medium text-stone-900">Biler</p>
          {state.cars.length === 0 ? (
            <p className="mt-1 text-sm text-stone-500">Ingen bil registrert.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {state.cars.map((car, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-stone-200 bg-stone-50 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-stone-900">
                      Bil {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeCar(index)}
                      className="text-xs font-medium text-stone-500 hover:text-stone-800"
                    >
                      Fjern
                    </button>
                  </div>
                  <div className="mt-3">
                    <select
                      value={car.type}
                      onChange={(e) =>
                        updateCarType(index, e.target.value as SifoCarFuelType)
                      }
                      className={calculatorInputClassName}
                    >
                      <option value="bensin">Bensinbil</option>
                      <option value="el">Elbil</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => addCar()}
            className="mt-3 rounded-lg bg-stone-100 px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-200"
          >
            Legg til bil
          </button>
        </div>

        {eligibleBarnehage > 0 && (
          <>
            <CalculatorField
              label="Antall barn i barnehage"
              hint={`${eligibleBarnehage} barn i barnehagealder · Oslo-satser, uten mattillegg`}
            >
              <input
                type="number"
                min={0}
                max={eligibleBarnehage}
                value={state.barnehageBarn}
                onChange={(e) =>
                  patch({
                    barnehageBarn: Math.min(
                      eligibleBarnehage,
                      Math.max(0, Number(e.target.value) || 0),
                    ),
                  })
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            {state.barnehageBarn > 0 && (
              <CalculatorField label="Barnehage – inntektsnivå">
                <select
                  value={state.barnehageInntekt}
                  onChange={(e) =>
                    patch({
                      barnehageInntekt: e.target.value as SifoBarnehageInntekt,
                    })
                  }
                  className={calculatorInputClassName}
                >
                  <option value="hoy">Over moderasjonsgrense (≥ 669 050)</option>
                  <option value="lav">Lav inntekt (moderasjon)</option>
                </select>
              </CalculatorField>
            )}
          </>
        )}

        {eligibleAks > 0 && (
          <>
            <CalculatorField
              label="Antall barn i AKS/SFO"
              hint={`${eligibleAks} barn i AKS-alder (7–14 år)`}
            >
              <input
                type="number"
                min={0}
                max={eligibleAks}
                value={state.aksBarn}
                onChange={(e) =>
                  patch({
                    aksBarn: Math.min(
                      eligibleAks,
                      Math.max(0, Number(e.target.value) || 0),
                    ),
                  })
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            {state.aksBarn > 0 && (
              <>
                <CalculatorField label="AKS – plass">
                  <select
                    value={state.aksPlass}
                    onChange={(e) =>
                      patch({ aksPlass: e.target.value as SifoAksPlass })
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
                    value={state.aksInntekt}
                    onChange={(e) =>
                      patch({ aksInntekt: e.target.value as SifoAksInntekt })
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
          </>
        )}
      </div>
    </section>
  );
}
