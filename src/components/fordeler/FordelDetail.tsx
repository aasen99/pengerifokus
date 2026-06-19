import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import {
  FORDELSPROGRAMMER_TITLE,
  TILBUD_TITLE,
} from "@/data/content-labels";
import type { Fordel } from "@/types/content";
import type { Tilbud } from "@/types/content";

interface FordelDetailProps {
  fordel: Fordel;
  tilbud: Tilbud[];
}

export function FordelDetail({ fordel, tilbud }: FordelDetailProps) {
  return (
    <article>
      <Link
        href="/fordeler"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til {FORDELSPROGRAMMER_TITLE.toLowerCase()}
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2">
          <Tag>{fordel.type}</Tag>
          <Tag variant="muted">{fordel.useCase}</Tag>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {fordel.name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-600">
          {fordel.description}
        </p>
      </header>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">
          Hva er dette programmet?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Her finner du en kort forklaring av hvordan {fordel.name} fungerer som
          medlems- eller bonusordning, og når det kan være relevant for deg.
          Dette er bakgrunnsinformasjon, ikke en liste over konkrete rabatter.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-stone-50 px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Type
            </dt>
            <dd className="mt-1 text-sm font-medium text-stone-900">
              {fordel.type}
            </dd>
          </div>
          <div className="rounded-xl bg-stone-50 px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Passer best til
            </dt>
            <dd className="mt-1 text-sm font-medium text-stone-900">
              {fordel.useCase}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">
          {tilbud.length > 0 ? "Tilbud vi har samlet" : "Ingen tilbud samlet ennå"}
        </h2>
        {tilbud.length > 0 ? (
          <>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Vi har {tilbud.length}{" "}
              {tilbud.length === 1 ? "tilbud" : "tilbud"} knyttet til{" "}
              {fordel.name}. På tilbudssiden finner du partner, rabatt og vilkår
              du kan bruke i praksis.
            </p>
            <Link
              href={`/tilbud?program=${fordel.slug}`}
              className="mt-5 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Se tilbud for {fordel.name} →
            </Link>
          </>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Vi har ikke samlet konkrete medlemsrabatter for dette programmet
            ennå. Sjekk gjerne tilbake senere, eller les om andre programmer på
            tilbudssiden.
          </p>
        )}
      </section>

      <p className="mt-8 text-sm text-stone-500">
        Leter du etter rabatter du kan bruke nå?{" "}
        <Link href="/tilbud" className="font-medium text-orange-600 hover:text-orange-700">
          Gå til {TILBUD_TITLE.toLowerCase()}
        </Link>
      </p>
    </article>
  );
}
