import Link from "next/link";
import type { FormuesbyggerQuote } from "@/types/formuesbygger";

interface QuoteDisplayProps {
  quote: FormuesbyggerQuote;
  /** Vis profilnavn over sitatet (brukes på sitatsiden) */
  attribution?: string;
  profileHref?: string;
  compact?: boolean;
}

function QuoteSourceLink({ quote }: { quote: FormuesbyggerQuote }) {
  return (
    <a
      href={quote.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-600 transition-colors hover:border-orange-300 hover:text-orange-700"
    >
      <span aria-hidden="true">↗</span>
      {quote.sourceLabel}
    </a>
  );
}

export function QuoteDisplay({
  quote,
  attribution,
  profileHref,
  compact = false,
}: QuoteDisplayProps) {
  const padding = compact ? "px-4 py-3" : "px-5 py-4";

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

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <QuoteSourceLink quote={quote} />
        {quote.note && (
          <span className="text-xs text-stone-500">{quote.note}</span>
        )}
      </div>
    </blockquote>
  );
}
