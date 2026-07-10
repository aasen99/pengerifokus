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
  sections: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    tip?: string;
  }[];
  faq?: { question: string; answer: string }[];
}

function collectReadableArticleTexts(article: ReadableArticleSections): string[] {
  const texts: string[] = [article.intro];

  for (const section of article.sections) {
    texts.push(section.heading);
    texts.push(...(section.paragraphs ?? []));
    texts.push(...(section.bullets ?? []));
    if (section.tip) texts.push(section.tip);
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
