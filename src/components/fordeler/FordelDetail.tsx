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

      <header className="mt-3 mb-6">
        <div className="flex flex-wrap gap-1.5">
          <Tag>{fordel.type}</Tag>
          <Tag variant="muted">{fordel.useCase}</Tag>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {fordel.name}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
          {fordel.description}
        </p>
      </header>

      {tilbud.length > 0 ? (
        <p className="text-sm text-stone-600">
          {tilbud.length}{" "}
          {tilbud.length === 1 ? "tilbud" : "tilbud"} samlet.{" "}
          <Link
            href={`/tilbud?program=${fordel.slug}`}
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Se tilbud for {fordel.name} →
          </Link>
        </p>
      ) : (
        <p className="text-sm text-stone-500">
          Ingen konkrete rabatter samlet ennå.{" "}
          <Link
            href="/tilbud"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            Se alle {TILBUD_TITLE.toLowerCase()}
          </Link>
        </p>
      )}
    </article>
  );
}
