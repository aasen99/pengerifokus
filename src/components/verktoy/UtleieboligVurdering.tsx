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
}: {
  items: string[];
  icon: string;
  iconClass: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-stone-700">
          <span className={`mt-0.5 shrink-0 font-semibold ${iconClass}`} aria-hidden="true">
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
    <section className={`rounded-2xl border p-6 ${style.border} ${style.bg}`}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-stone-900">Vurdering</h2>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}
        >
          {vurdering.verdictLabel}
        </span>
        {vurdering.scenario === "owner-hybrid" && (
          <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-stone-600">
            Egen bolig + utleie
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-stone-700">
        {vurdering.verdictSummary}
      </p>

      {vurdering.netHousingCostMonthly !== null && (
        <dl className="mt-4 grid gap-3 rounded-xl border border-white/60 bg-white/50 p-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-stone-500">Din netto boligkostnad</dt>
            <dd className="mt-1 font-semibold text-stone-900">
              {formatCurrency(vurdering.netHousingCostMonthly)}/mnd
            </dd>
            <p className="mt-0.5 text-xs text-stone-500">
              Lån + kostnader − leieinntekt
            </p>
          </div>
          {vurdering.housingSavingsMonthly !== null && (
            <div>
              <dt className="text-xs text-stone-500">Vs. alternativ leie</dt>
              <dd
                className={`mt-1 font-semibold ${
                  vurdering.housingSavingsMonthly >= 0
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {vurdering.housingSavingsMonthly >= 0 ? "Sparer " : "Koster "}
                {formatCurrency(Math.abs(vurdering.housingSavingsMonthly))}/mnd
              </dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-green-800">Fordeler</h3>
          <BulletList items={vurdering.pros} icon="+" iconClass="text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-red-800">Ulemper</h3>
          <BulletList items={vurdering.cons} icon="−" iconClass="text-red-500" />
        </div>
      </div>

      {vurdering.insights.length > 0 && (
        <div className="mt-6 rounded-xl border border-stone-200 bg-white/70 p-4">
          <h3 className="text-sm font-semibold text-stone-800">Observasjoner</h3>
          <p className="mt-1 text-xs text-stone-500">
            Tilbakemeldinger basert på tallene du la inn — endres når du justerer
            input.
          </p>
          <BulletList
            items={vurdering.insights}
            icon="•"
            iconClass="text-stone-500"
          />
        </div>
      )}

      {vurdering.whenBadIsOk.length > 0 && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-white/70 p-4">
          <h3 className="text-sm font-semibold text-blue-900">
            Når et svakere case likevel kan være greit
          </h3>
          <p className="mt-1 text-xs text-stone-600">
            Ikke alle røde tall betyr «nei». Her er situasjoner der svak
            leieavkastning eller underskudd kan være forsvarlig:
          </p>
          <BulletList
            items={vurdering.whenBadIsOk}
            icon="→"
            iconClass="text-blue-600"
          />
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-stone-800">Risiko å ha i bakhodet</h3>
        <BulletList items={vurdering.risks} icon="!" iconClass="text-amber-600" />
      </div>
    </section>
  );
}
