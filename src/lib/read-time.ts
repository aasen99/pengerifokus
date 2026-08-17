const DEFAULT_WORDS_PER_MINUTE = 220;

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function calculateReadTimeMinutes(
  wordCount: number,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE,
): number {
  if (wordCount <= 0) return 1;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function calculateReadTimeFromTexts(
  texts: (string | undefined | null)[],
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE,
): number {
  const wordCount = texts.reduce(
    (sum, text) => sum + (text ? countWords(text) : 0),
    0,
  );
  return calculateReadTimeMinutes(wordCount, wordsPerMinute);
}

interface ReadableArticleSections {
  intro: string;
  shortAnswer?: string;
  conclusion?: string;
  sections: {
    heading: string;
    subheading?: string;
    paragraphs?: string[];
    bullets?: string[];
    tip?: string;
    table?: { caption?: string; rows: { label: string; value: string }[] };
    cta?: { heading: string; description: string; buttonText: string };
    factBox?: string[];
    subsections?: {
      subheading: string;
      paragraphs?: string[];
      bullets?: string[];
    }[];
  }[];
  faq?: { question: string; answer: string }[];
}

function collectReadableArticleTexts(article: ReadableArticleSections): string[] {
  const texts: string[] = [article.intro];
  if (article.shortAnswer) texts.push(article.shortAnswer);
  if (article.conclusion) texts.push(article.conclusion);

  for (const section of article.sections) {
    texts.push(section.heading);
    if (section.subheading) texts.push(section.subheading);
    texts.push(...(section.paragraphs ?? []));
    texts.push(...(section.bullets ?? []));
    if (section.tip) texts.push(section.tip);
    if (section.table?.caption) texts.push(section.table.caption);
    for (const row of section.table?.rows ?? []) {
      texts.push(row.label, row.value);
    }
    if (section.cta) {
      texts.push(
        section.cta.heading,
        section.cta.description,
        section.cta.buttonText,
      );
    }
    texts.push(...(section.factBox ?? []));
    for (const subsection of section.subsections ?? []) {
      texts.push(subsection.subheading);
      texts.push(...(subsection.paragraphs ?? []));
      texts.push(...(subsection.bullets ?? []));
    }
  }

  for (const item of article.faq ?? []) {
    texts.push(item.question, item.answer);
  }

  return texts;
}

export function calculateFordelArticleReadTime(
  article: ReadableArticleSections,
): number {
  return calculateReadTimeFromTexts(collectReadableArticleTexts(article));
}

export function calculateGuideArticleReadTime(
  article: ReadableArticleSections,
): number {
  return calculateReadTimeFromTexts(collectReadableArticleTexts(article));
}
