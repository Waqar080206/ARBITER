type TrustScoreRingProps = {
  score: number;
  tone: "positive" | "warning" | "negative";
};

const ringRadius = 58;
const circumference = 2 * Math.PI * ringRadius;

export function TrustScoreRing({ score, tone }: TrustScoreRingProps) {
  const progress = score / 100;
  const offset = circumference * (1 - progress);
  const toneColor =
    tone === "positive"
      ? "text-emerald-600"
      : tone === "warning"
      ? "text-amber-500"
      : "text-red-500";

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg className="h-full w-full" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={ringRadius}
          stroke="currentColor"
          strokeWidth="10"
          className="text-border"
          fill="none"
          opacity="0.35"
        />
        <circle
          cx="70"
          cy="70"
          r={ringRadius}
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          className={`${toneColor} transition-all duration-1000 ease-out`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-bold text-foreground">{score}</p>
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">/ 100</p>
      </div>
    </div>
  );
}
