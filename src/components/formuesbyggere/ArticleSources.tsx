import {
  groupSourcesByTier,
  SOURCE_TIER_DESCRIPTIONS,
  SOURCE_TIER_DISPLAY_ORDER,
  SOURCE_TIER_LABELS,
} from "@/data/formuesbygger-articles/source-tiers";
import type { FormuesbyggerSource } from "@/types/formuesbygger";

const DEFAULT_INTRO =
  "Vi prioriterer årsrapporter, SEC og Brønnøysund, deretter børsmeldinger, før Kapital og andre medier. Wikipedia og formueblogger brukes kun internt for å finne spor.";

interface ArticleSourcesProps {
  sources: FormuesbyggerSource[];
  lastVerified: string;
  intro?: string;
  groupByTier?: boolean;
}

export function formatVerifiedDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function SourceLink({ source }: { source: FormuesbyggerSource }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium text-orange-600 hover:text-orange-700"
    >
      {source.label}
    </a>
  );
}

export function ArticleSources({
  sources,
  lastVerified,
  intro = DEFAULT_INTRO,
  groupByTier = true,
}: ArticleSourcesProps) {
  const sourcesByTier = groupByTier ? groupSourcesByTier(sources) : null;

  return (
    <details className="group mt-10 rounded-xl border border-stone-200 bg-stone-50">
      <summary className="cursor-pointer list-none px-4 py-2.5 [&::-webkit-details-marker]:hidden">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-stone-700">
            <span className="font-semibold text-stone-900">
              Kilder og sist kontrollert
            </span>
            <span className="text-stone-500">
              {" "}
              ·{" "}
              <time dateTime={lastVerified}>
                {formatVerifiedDate(lastVerified)}
              </time>
              {" · "}
              {sources.length} {sources.length === 1 ? "kilde" : "kilder"}
            </span>
          </span>
          <span
            className="shrink-0 text-sm text-stone-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          >
            ▾
          </span>
        </div>
      </summary>

      <div className="border-t border-stone-200 px-4 py-3">
        <p className="text-xs leading-relaxed text-stone-600">{intro}</p>
        {sourcesByTier ? (
          <div className="mt-4 space-y-5">
            {SOURCE_TIER_DISPLAY_ORDER.map((tier) => {
              const tierSources = sourcesByTier[tier];
              if (!tierSources?.length) return null;

              return (
                <div key={tier}>
                  <h3 className="text-sm font-semibold text-stone-800">
                    {SOURCE_TIER_LABELS[tier]}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {SOURCE_TIER_DESCRIPTIONS[tier]}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {tierSources.map((source) => (
                      <li key={source.url}>
                        <SourceLink source={source} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {sources.map((source) => (
              <li key={source.url}>
                <SourceLink source={source} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
