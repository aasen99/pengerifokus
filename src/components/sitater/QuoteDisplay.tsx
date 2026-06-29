import Link from "next/link";
import type { FormuesbyggerQuote } from "@/types/formuesbygger";
import { getQuoteCategoryLabel } from "@/lib/sitater";

interface QuoteDisplayProps {
  quote: FormuesbyggerQuote;
  /** Vis profilnavn over sitatet (brukes på sitatsiden) */
  attribution?: string;
  profileHref?: string;
  compact?: boolean;
}

function SourceLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-600 transition-colors hover:border-orange-300 hover:text-orange-700"
    >
      <span aria-hidden="true">↗</span>
      {label}
    </a>
  );
}

function QuoteSourceLinks({ quote }: { quote: FormuesbyggerQuote }) {
  const emphasizeSource = quote.sourceQuality && quote.sourceQuality !== "original";

  return (
    <div className="flex flex-col gap-1.5">
      {emphasizeSource && (
        <p className="text-xs text-stone-500">
          Kilde
          {quote.sourceQuality === "secondary"
            ? " (sekundærgjengivelse)"
            : quote.sourceQuality === "media"
              ? " (media)"
              : ""}
          :
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <SourceLink href={quote.sourceUrl} label={quote.sourceLabel} />
        {quote.additionalSourceUrl && (
          <SourceLink href={quote.additionalSourceUrl} label="Alternativ kilde" />
        )}
      </div>
    </div>
  );
}

export function QuoteDisplay({
  quote,
  attribution,
  profileHref,
  compact = false,
}: QuoteDisplayProps) {
  const padding = compact ? "px-4 py-3" : "px-5 py-4";
  const categoryLabel = getQuoteCategoryLabel(quote);

  return (
    <blockquote
      className={`rounded-2xl border border-stone-200 bg-white shadow-sm ${padding}`}
    >
      {attribution && (
        <footer className="mb-2 text-sm font-semibold text-stone-900">
          {profileHref ? (
            <Link href={profileHref} className="hover:text-orange-700">
              {attribution}
            </Link>
          ) : (
            attribution
          )}
        </footer>
      )}

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">
        {categoryLabel}
      </p>

      <p
        className={`leading-relaxed text-stone-700 ${compact ? "text-sm" : "text-base"}`}
        lang={quote.translation ? "en" : "nb"}
      >
        «{quote.text}»
      </p>

      {quote.translation && (
        <p className="mt-2 text-sm leading-relaxed text-stone-500" lang="nb">
          {quote.translation}
        </p>
      )}

      <div className="mt-3 flex flex-col gap-2">
        <QuoteSourceLinks quote={quote} />
        {quote.note && (
          <span className="text-xs text-stone-500">{quote.note}</span>
        )}
      </div>
    </blockquote>
  );
}
