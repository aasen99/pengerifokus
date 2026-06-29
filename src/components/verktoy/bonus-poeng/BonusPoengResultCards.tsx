"use client";

import { formatCurrency } from "@/lib/calculators/loan";
import {
  formatPointValue,
  RECOMMENDATION_LABELS,
  RECOMMENDATION_SUMMARY,
  REDEMPTION_TYPE_LABELS,
} from "@/lib/calculators/bonus-poeng";
import type { BonusCalculatorResult } from "@/types/bonus-poeng";

function ResultCard({
  label,
  value,
  sub,
  variant = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  variant?: "default" | "positive" | "negative" | "accent";
}) {
  const valueClass =
    variant === "positive"
      ? "text-emerald-700"
      : variant === "negative"
        ? "text-red-700"
        : variant === "accent"
          ? "text-orange-700"
          : "text-stone-900";

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold tracking-tight ${valueClass}`}>
        {value}
      </p>
      {sub && <p className="mt-2 text-sm leading-relaxed text-stone-600">{sub}</p>}
    </div>
  );
}

function gainVariant(amount: number): "positive" | "negative" | "default" {
  if (amount > 0.005) return "positive";
  if (amount < -0.005) return "negative";
  return "default";
}

export function BonusPoengResultCards({
  result,
}: {
  result: BonusCalculatorResult;
}) {
  const { earning, redemption } = result;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ResultCard
          label="Kost per poeng"
          value={formatPointValue(earning.costPerPoint)}
          sub={`${formatPointValue(earning.costPer1000Points)} per 1 000 poeng`}
        />
        <ResultCard
          label="Break-even verdi"
          value={formatPointValue(earning.breakEvenValuePerPoint)}
          sub="Minimum verdi poengene må ha for å gå i null"
        />
        <ResultCard
          label="Total kostnad for poeng"
          value={formatCurrency(earning.totalCost)}
          sub={`Basert på ${earning.totalPoints.toLocaleString("nb-NO")} poeng`}
        />
      </div>

      {redemption && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ResultCard
              label="Verdi per poeng ved innløsning"
              value={formatPointValue(redemption.redemptionValuePerPoint)}
              sub={`${formatPointValue(redemption.redemptionValuePer1000Points)} per 1 000 poeng`}
              variant="accent"
            />
            <ResultCard
              label="Kontant spart"
              value={formatCurrency(redemption.cashSaved)}
              sub="Kontantpris minus avgifter og egenandel"
            />
            <ResultCard
              label="Netto vs. kostpris"
              value={formatCurrency(redemption.gainVsCost)}
              sub="Gevinst eller tap mot det poengene kostet å tjene"
              variant={gainVariant(redemption.gainVsCost)}
            />
          </div>

          <div
            className={`rounded-2xl border p-6 ${
              redemption.recommendation === "use_points"
                ? "border-emerald-200 bg-emerald-50"
                : redemption.recommendation === "consider_saving"
                  ? "border-amber-200 bg-amber-50"
                  : "border-stone-200 bg-stone-50"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Anbefaling
            </p>
            <p className="mt-2 text-xl font-bold text-stone-900">
              {RECOMMENDATION_LABELS[redemption.recommendation]}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-700">
              {RECOMMENDATION_SUMMARY[redemption.recommendation]}
            </p>
            <p className="mt-3 text-sm text-stone-600">
              Mot målverdi: netto{" "}
              <span
                className={
                  redemption.gainVsTarget >= 0
                    ? "font-semibold text-emerald-700"
                    : "font-semibold text-red-700"
                }
              >
                {formatCurrency(redemption.gainVsTarget)}
              </span>
            </p>
          </div>
        </>
      )}

      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-stone-900">Detaljer fra del 1</h3>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-stone-600">Løpende kortkostnader</dt>
            <dd className="font-medium text-stone-900">
              {formatCurrency(earning.recurringCosts)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone-600">Gebyr ved betaling</dt>
            <dd className="font-medium text-stone-900">
              {formatCurrency(earning.paymentFeeAmount)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone-600">Gebyrkostnad totalt</dt>
            <dd className="font-medium text-stone-900">
              {formatCurrency(earning.feeRelatedCosts)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone-600">Marginal kost per poeng (gebyr)</dt>
            <dd className="font-medium text-stone-900">
              {formatPointValue(earning.marginalCostPerPointFromFees)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function BonusPoengConcepts() {
  return (
    <div className="mt-10 space-y-6">
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <h2 className="text-lg font-semibold text-stone-900">
          Forskjellen på kostpris, innløsningsverdi og målverdi
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-stone-700">
          <li>
            <strong className="text-stone-900">Kostpris per poeng:</strong> Hva
            poengene faktisk har kostet å opptjene, inkludert kortgebyrer,
            årsavgift og alternativkostnad når du velger poeng fremfor kontant
            cashback eller Trumf.
          </li>
          <li>
            <strong className="text-stone-900">Innløsningsverdi per poeng:</strong>{" "}
            Hva poengene er verdt i den konkrete reisen eller kjøpet du vurderer
            nå.
          </li>
          <li>
            <strong className="text-stone-900">Målverdi per poeng:</strong> Den
            verdien du helst vil ha før du bruker poeng. Bra innløsninger bør
            ligge over både kostpris og målverdi.
          </li>
          <li>
            <strong className="text-stone-900">Alternativkostnad:</strong> Når
            Trumf eller cashback kunne vært tatt ut som kroner, er det en reell
            kostnad å velge poeng i stedet.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Viktig å huske</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone-700">
          <li>Poeng er ikke kontanter. De kan ikke alltid brukes når du vil.</li>
          <li>
            Sammenlign med prisen du faktisk ville betalt kontant, ikke en
            urealistisk listepris.
          </li>
          <li>
            Avgifter, resort fees, skatter og egenandeler ved poengbruk kan
            spise mye av verdien.
          </li>
          <li>Poeng kan devalueres, utløpe eller ha begrenset tilgjengelighet.</li>
          <li>
            Poeng er sjelden «gratis» bare fordi de kom fra bonus eller Trumf.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Eksempler</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-700">
          <div>
            <p className="font-medium text-stone-900">Hotell</p>
            <p>
              1 200 kr kontant eller 18 000 poeng. Innløsningsverdi: 1 200 ÷ 18
              000 = <strong>0,067 kr per poeng</strong> (67 øre). Er
              kostprisen din høyere enn det, taper du på å bruke poeng.
            </p>
          </div>
          <div>
            <p className="font-medium text-stone-900">Fly</p>
            <p>
              4 000 kr kontant eller 30 000 poeng + 800 kr i avgifter.
              Nettoverdi: (4 000 − 800) ÷ 30 000 ={" "}
              <strong>0,107 kr per poeng</strong>. Husk å regne med alle
              gebyrer ved poengbruk.
            </p>
          </div>
          <div>
            <p className="font-medium text-stone-900">Trumf / cashback</p>
            <p>
              500 kr i Trumf-krontoverføring eller 5 000 bonuspoeng? Kontant
              alternativkostnad = 500 kr, altså{" "}
              <strong>0,10 kr per poeng</strong> du må slå ved innløsning for
              at poeng skal være bedre enn å ta pengene.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export { REDEMPTION_TYPE_LABELS };
