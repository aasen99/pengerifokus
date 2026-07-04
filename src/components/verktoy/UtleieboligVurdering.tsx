import { formatCurrency } from "@/lib/calculators/loan";
import type { UtleieboligVurdering as Vurdering } from "@/types/utleiebolig-vurdering";

const verdictStyles: Record<
  Vurdering["verdict"],
  { border: string; bg: string; badge: string }
> = {
  strong: {
    border: "border-green-200",
    bg: "bg-green-50",
    badge: "bg-green-100 text-green-800",
  },
  acceptable: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
  },
  weak: {
    border: "border-orange-200",
    bg: "bg-orange-50",
    badge: "bg-orange-100 text-orange-800",
  },
  risky: {
    border: "border-red-200",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-800",
  },
  "acceptable-hybrid": {
    border: "border-blue-200",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
  },
};

function BulletList({
  items,
  icon,
  iconClass,
  compact = false,
}: {
  items: string[];
  icon: string;
  iconClass: string;
  compact?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={compact ? "mt-2 space-y-1" : "mt-2 space-y-1.5"}>
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-1.5 text-xs leading-relaxed text-stone-700"
        >
          <span
            className={`mt-0.5 shrink-0 font-semibold ${iconClass}`}
            aria-hidden="true"
          >
            {icon}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface Props {
  vurdering: Vurdering;
}

export function UtleieboligVurderingPanel({ vurdering }: Props) {
  const style = verdictStyles[vurdering.verdict];

  return (
    <details
      className={`group rounded-xl border ${style.border} ${style.bg}`}
    >
      <summary className="cursor-pointer list-none p-4 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-stone-900">
                Vurdering
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${style.badge}`}
              >
                {vurdering.verdictLabel}
              </span>
              {vurdering.scenario === "owner-hybrid" && (
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-stone-600">
                  Egen bolig + utleie
                </span>
              )}
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">
              {vurdering.verdictSummary}
            </p>
          </div>
          <span
            className="mt-0.5 shrink-0 text-sm text-stone-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          >
            ▾
          </span>
        </div>
      </summary>

      <div className="space-y-4 border-t border-white/60 px-4 pb-4 pt-3">
        <p className="text-xs leading-relaxed text-stone-700">
          {vurdering.verdictSummary}
        </p>

        {vurdering.netHousingCostMonthly !== null && (
          <dl className="grid gap-2 rounded-lg border border-white/60 bg-white/50 p-3 text-xs sm:grid-cols-2">
            <div>
              <dt className="text-stone-500">Netto boligkostnad</dt>
              <dd className="mt-0.5 font-semibold text-stone-900">
                {formatCurrency(vurdering.netHousingCostMonthly)}/mnd
              </dd>
            </div>
            {vurdering.housingSavingsMonthly !== null && (
              <div>
                <dt className="text-stone-500">Vs. alternativ leie</dt>
                <dd
                  className={`mt-0.5 font-semibold ${
                    vurdering.housingSavingsMonthly >= 0
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {vurdering.housingSavingsMonthly >= 0 ? "Sparer " : "Koster "}
                  {formatCurrency(Math.abs(vurdering.housingSavingsMonthly))}
                  /mnd
                </dd>
              </div>
            )}
          </dl>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold text-green-800">Fordeler</h3>
            <BulletList
              items={vurdering.pros}
              icon="+"
              iconClass="text-green-600"
              compact
            />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-red-800">Ulemper</h3>
            <BulletList
              items={vurdering.cons}
              icon="−"
              iconClass="text-red-500"
              compact
            />
          </div>
        </div>

        {vurdering.insights.length > 0 && (
          <div className="rounded-lg border border-stone-200/80 bg-white/60 p-3">
            <h3 className="text-xs font-semibold text-stone-800">
              Observasjoner
            </h3>
            <BulletList
              items={vurdering.insights}
              icon="•"
              iconClass="text-stone-500"
              compact
            />
          </div>
        )}

        {vurdering.whenBadIsOk.length > 0 && (
          <div className="rounded-lg border border-blue-200/80 bg-white/60 p-3">
            <h3 className="text-xs font-semibold text-blue-900">
              Når svakt case likevel kan være greit
            </h3>
            <BulletList
              items={vurdering.whenBadIsOk}
              icon="→"
              iconClass="text-blue-600"
              compact
            />
          </div>
        )}

        <div>
          <h3 className="text-xs font-semibold text-stone-800">Risiko</h3>
          <BulletList
            items={vurdering.risks}
            icon="!"
            iconClass="text-amber-600"
            compact
          />
        </div>
      </div>
    </details>
  );
}
