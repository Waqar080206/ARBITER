import { SignalItem } from "./signal-item";
import { TrustScoreRing } from "./trust-score-ring";
import { VerdictBadge } from "./verdict-badge";
import type { AnalysisResult } from "@/lib/trust";

type TrustCardProps = {
  analysis: AnalysisResult | null;
  onReset: () => void;
};

export function TrustCard({ analysis, onReset }: TrustCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      {!analysis ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-background px-6 py-10 text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Trust card</p>
            <p className="mt-4 text-xl font-semibold text-foreground">
              Paste content and tap Analyze to get a clear signal.
            </p>
          </div>
          <div className="space-y-3 text-sm leading-7 text-muted-foreground">
            <p>Arbiter uses explainable signals to help you evaluate credibility.</p>
            <p>Results are presented clearly so you can decide with confidence.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-6 rounded-2xl border border-border bg-background p-6">
            <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
              <TrustScoreRing score={analysis.score} tone={analysis.tone} />
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Result</p>
                  <VerdictBadge verdict={analysis.verdict} />
                </div>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                  {analysis.explanation}
                </p>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Preview</p>
                  <p className="max-w-xl truncate text-sm text-foreground/80">{analysis.preview}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Key signals</p>
            <div className="space-y-3">
              {analysis.signals.map((signal) => (
                <SignalItem key={signal.text} text={signal.text} variant={signal.variant} />
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-card"
            >
              Analyze something else
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
