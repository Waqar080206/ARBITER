type VerdictBadgeProps = {
  verdict: string;
};

export function VerdictBadge({ verdict }: VerdictBadgeProps) {
  const classes =
    verdict === "Likely Real"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : verdict === "Suspicious"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-red-200 bg-red-50 text-red-700";

  return (
    <div className={`inline-flex rounded-full border px-3.5 py-1.5 text-sm font-semibold ${classes}`}>
      {verdict}
    </div>
  );
}
