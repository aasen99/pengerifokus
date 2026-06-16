interface ScoreRingProps {
  score: number;
  maxScore: number;
}

export function ScoreRing({ score, maxScore }: ScoreRingProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = maxScore > 0 ? score / maxScore : 0;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative mx-auto h-40 w-40">
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-stone-200"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="text-orange-500 transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold text-stone-900">{score}</span>
        <span className="text-sm text-stone-500">av {maxScore}</span>
      </div>
    </div>
  );
}
