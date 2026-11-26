import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { GruppertTilbud } from "@/lib/tilbud";
import { getTilbudSourceLinkLabel, isTilbudOptInProgram } from "@/lib/tilbud-ui";
import { ShoppingOffer, ShoppingTag } from "./ShoppingOffer";
import { calculateShoppingBonus, type BonusSettings } from "@/lib/netthandel";

interface TilbudGridProps {
  groups: GruppertTilbud[];
  activeProgram: string | null;
  includeStudent: boolean;
  categoryGroup: string | null;
  settings: BonusSettings;
  checkedNow: string;
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
  settings,
  checkedNow,
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
    <div className="grid items-start gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => {
        const shopping = group.offers.filter(o => o.shopping);
        const ordinary = group.offers.filter(o => !o.shopping);
        const values = shopping.map(o => ({ id: o.tilbudId, value: calculateShoppingBonus(o.shopping!, settings, checkedNow) })).filter(x => x.value !== null);
        const best = values.length >= 2 ? values.find(x => values.every(y => y.id === x.id || x.value!.minPct > y.value!.maxPct))?.id : undefined;
        const amex = shopping.find(o => o.shopping?.amex)?.shopping?.amex;
        const amexLabels = { yes: "Amex", reported: "Amex rapportert", conditional: "Amex med forbehold", no: "Tar ikke Amex", unknown: "Uavklart" };
        return (
          <article
            key={group.key}
            className="min-w-0 rounded-xl border border-stone-200 bg-white p-3 transition-colors hover:border-orange-300"
          >
            <h2 className="text-base font-semibold text-stone-900">
              {group.partner}
              {amex && amex.status !== "unknown" && <span className="ml-2 inline-block text-xs font-normal text-stone-500">{amexLabels[amex.status]}</span>}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {ordinary.map((offer) => (
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
              {shopping.map(offer => <ShoppingTag key={offer.tilbudId} offer={offer} settings={settings} now={checkedNow} best={best === offer.tilbudId} />)}
            </div>

            {!categoryGroup && group.categories.length > 0 && (
              <p className="mt-1.5 text-xs text-stone-500">
                {group.categories.join(" · ")}
              </p>
            )}

            <details className="mt-2 text-xs text-stone-600">
              <summary className="w-fit cursor-pointer py-1 font-medium hover:text-orange-700">Vilkår og detaljer</summary>
              <div className="mt-1 space-y-3 border-t border-stone-100 pt-2 leading-relaxed">
                {ordinary.map(o => <section key={o.tilbudId}>
                  <strong>{o.fordelName}</strong>
                  <p>{o.terms ?? o.description}</p>
                  {o.warning && <p>{o.warning}</p>}
                  {o.sourceUrl && <a href={o.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-orange-800 underline">{getTilbudSourceLinkLabel(o.fordelSlug, o.sourceUrl, o.fordelName)}</a>}
                </section>)}
                {shopping.map(offer => <ShoppingOffer key={offer.tilbudId} offer={offer} settings={settings} now={checkedNow} best={best === offer.tilbudId} />)}
                {amex && amex.status !== "unknown" && <section>
                  <strong>Amex på nett</strong>
                  <p>{amex.note}</p>
                  {amex.sources.map((source, i) => <p key={i}>{source.url ? <a className="underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a> : source.label} · {source.checkedOn}</p>)}
                  <p>Kortopptjening avhenger av betalingsmåte og vilkår. Beregningen viser portalbonusen alene.</p>
                  <Link href="/verktoy/amex-brukersteder" className="underline">Se Amex-registeret</Link>
                </section>}
              </div>
            </details>
          </article>
        );
      })}
    </div>
  );
}
