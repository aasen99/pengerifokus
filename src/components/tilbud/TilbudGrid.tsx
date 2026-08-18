import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { GruppertTilbud } from "@/lib/tilbud";
import { getTilbudSourceLinkLabel, isTilbudOptInProgram } from "@/lib/tilbud-ui";

interface TilbudGridProps {
  groups: GruppertTilbud[];
  activeProgram: string | null;
  includeStudent: boolean;
  categoryGroup: string | null;
}

function programHref(slug: string, includeStudent: boolean): string {
  const params = new URLSearchParams();
  if (isTilbudOptInProgram(slug)) {
    params.set("student", "1");
  } else {
    params.set("program", slug);
    if (includeStudent) params.set("student", "1");
  }
  const qs = params.toString();
  return qs ? `/tilbud?${qs}` : "/tilbud";
}

export function TilbudGrid({
  groups,
  activeProgram,
  includeStudent,
  categoryGroup,
}: TilbudGridProps) {
  if (groups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center">
        <p className="font-medium text-stone-900">Ingen tilbud funnet</p>
        <p className="mt-1 text-sm text-stone-600">
          Prøv et annet søkeord eller fjern filteret.
        </p>
        <Link
          href="/tilbud"
          className="mt-3 inline-block text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          Nullstill filter
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => {
        const uniqueTerms = [
          ...new Set(
            group.offers
              .map((offer) => offer.terms?.trim())
              .filter((terms): terms is string => Boolean(terms)),
          ),
        ];
        const sourceLinks = [
          ...new Map(
            group.offers
              .filter((offer) => offer.sourceUrl)
              .map((offer) => [`${offer.fordelSlug}|${offer.sourceUrl}`, offer]),
          ).values(),
        ];
        const warnings = group.offers.filter((offer) => offer.warning);

        return (
          <article
            key={group.key}
            className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-3.5 transition-colors hover:border-orange-300"
          >
            <h2 className="text-base font-semibold text-stone-900">
              {group.partner}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {group.offers.map((offer) => (
                <Link
                  key={offer.tilbudId}
                  href={programHref(offer.fordelSlug, includeStudent)}
                  className="text-left"
                >
                  <Tag
                    variant={
                      activeProgram === offer.fordelSlug ||
                      (includeStudent && isTilbudOptInProgram(offer.fordelSlug))
                        ? "accent"
                        : "default"
                    }
                  >
                    {offer.fordelName} · {offer.offerLabel}
                  </Tag>
                </Link>
              ))}
            </div>

            {!categoryGroup && group.categories.length > 0 && (
              <p className="mt-1.5 text-xs text-stone-500">
                {group.categories.join(" · ")}
              </p>
            )}

            {warnings.map((offer) => (
              <p
                key={`${offer.tilbudId}-warning`}
                className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs leading-snug text-amber-900"
              >
                {offer.warning}
              </p>
            ))}

            {(sourceLinks.length > 0 || uniqueTerms.length > 0) && (
              <div className="mt-auto mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-stone-100 pt-2.5">
                {sourceLinks.map((offer) => (
                  <a
                    key={`${offer.tilbudId}-source`}
                    href={offer.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-orange-600 hover:text-orange-700"
                  >
                    {getTilbudSourceLinkLabel(offer.fordelSlug, offer.sourceUrl, offer.fordelName)}
                  </a>
                ))}
                {uniqueTerms.length > 0 && (
                  <details className="group/terms">
                    <summary className="cursor-pointer list-none text-xs font-medium text-stone-500 hover:text-stone-700 [&::-webkit-details-marker]:hidden">
                      Vilkår
                      <span
                        className="ml-1 inline-block transition-transform group-open/terms:rotate-180"
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </summary>
                    <div className="mt-1.5 space-y-2 text-xs leading-relaxed text-stone-500">
                      {uniqueTerms.map((terms) => (
                        <p key={terms}>{terms}</p>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
