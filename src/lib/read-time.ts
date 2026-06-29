const DEFAULT_WORDS_PER_MINUTE = 200;

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
