export interface OrdbokInlineTerm {
  slug: string;
  pattern: RegExp;
}

/** Lengre fraser først, slik at «rentes rente» slår «rente». */
export const FORMUESBYGGER_ORDBOK_TERMS: OrdbokInlineTerm[] = [
  { slug: "rentes-rente", pattern: /rentes[\s-]rente/gi },
  { slug: "alternativkostnad", pattern: /alternativkostnad(?:en)?/gi },
  { slug: "egenkapital", pattern: /egenkapital(?:en)?/gi },
  { slug: "nettoformue", pattern: /nettoformue(?:n)?/gi },
  { slug: "refinansiering", pattern: /refinansiering(?:en)?/gi },
  { slug: "forbruksgjeld", pattern: /forbruksgjeld(?:en)?/gi },
  { slug: "realrente", pattern: /realrente(?:n)?/gi },
  { slug: "utbytte", pattern: /\butbytte\b/gi },
  { slug: "inflasjon", pattern: /inflasjon(?:en)?/gi },
];

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function linkFirstTerm(
  text: string,
  terms: OrdbokInlineTerm[],
  usedSlugs: Set<string>,
  remaining: { n: number },
): string {
  if (remaining.n <= 0 || text.length === 0) return text;

  let result = text;

  for (const term of terms) {
    if (remaining.n <= 0) break;
    if (usedSlugs.has(term.slug)) continue;

    term.pattern.lastIndex = 0;
    const match = term.pattern.exec(result);
    if (!match) continue;

    const matched = match[0];
    const replacement = `[${matched}](/ordbok/${term.slug})`;
    result =
      result.slice(0, match.index) +
      replacement +
      result.slice(match.index + matched.length);
    usedSlugs.add(term.slug);
    remaining.n -= 1;
  }

  return result;
}

/**
 * Lenker inntil `maxLinks` ordboktermer i løpende tekst.
 * Hopper over eksisterende markdown-lenker og unngår samme slug mer enn én gang.
 */
export function createOrdbokLinker(
  maxLinks = 3,
  terms: OrdbokInlineTerm[] = FORMUESBYGGER_ORDBOK_TERMS,
) {
  const usedSlugs = new Set<string>();
  const remaining = { n: maxLinks };

  return function linkOrdbokTerms(text: string): string {
    if (remaining.n <= 0) return text;

    const chunks: string[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    MARKDOWN_LINK.lastIndex = 0;

    while ((match = MARKDOWN_LINK.exec(text)) !== null) {
      if (match.index > lastIndex) {
        chunks.push(
          linkFirstTerm(
            text.slice(lastIndex, match.index),
            terms,
            usedSlugs,
            remaining,
          ),
        );
      }
      chunks.push(match[0]);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      chunks.push(
        linkFirstTerm(text.slice(lastIndex), terms, usedSlugs, remaining),
      );
    }

    return chunks.join("");
  };
}
