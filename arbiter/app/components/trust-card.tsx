import type { AnalysisResult } from "@/lib/trust";
import { getVerdictClasses } from "@/lib/trust";

type TrustCardProps = {
  analysis: AnalysisResult | null;
  isAnalyzing: boolean;
  loadingMessage: string;
  onReset: () => void;
};

export function TrustCard({ analysis, isAnalyzing, loadingMessage, onReset }: TrustCardProps) {
  return (
    <section className="rounded-[28px] border border-border bg-surface p-8 shadow-soft">
      {isAnalyzing ? (
        <div className="space-y-6">
          <div className="flex h-24 items-center justify-center rounded-[24px] bg-surface-muted text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 animate-pulse rounded-full bg-foreground" />
              {loadingMessage}
            </div>
          </div>
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Working through trust signals and source indicators…</p>
            <p>Keep this window open while Arbiter evaluates the content.</p>
          </div>
        </div>
      ) : analysis ? (
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-6 rounded-[24px] border border-border bg-surface-strong p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.36em] text-muted-foreground">
                  Trust score
                </p>
                <p className="mt-2 text-5xl font-semibold text-foreground">{analysis.score}/100</p>
              </div>
              <div className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${getVerdictClasses(analysis.verdict)}`}>
                {analysis.verdict}
              </div>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">{analysis.explanation}</p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-muted-foreground">
              Key signals
            </p>
            <div className="grid gap-3">
              {analysis.signals.map((signal) => (
                <div key={signal} className="rounded-[24px] border border-border bg-surface p-4 text-sm text-foreground shadow-sm">
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-surface-strong"
          >
            Analyze something else
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-muted-foreground">
          <div className="rounded-[24px] border border-border bg-surface-strong px-6 py-10 text-center">
            <p className="text-xs uppercase tracking-[0.36em] text-muted-foreground">Trust card</p>
            <p className="mt-4 text-xl font-semibold text-foreground">
              Paste content and tap Analyze Trust to get a clear signal.
            </p>
          </div>
          <div className="space-y-3 text-sm leading-6">
            <p>Arbiter uses a simple explainable output to help you evaluate credibility.</p>
            <p>Look for the score, verdict, and three concise trust signals.</p>
          </div>
        </div>
      )}
    </section>
  );
}
