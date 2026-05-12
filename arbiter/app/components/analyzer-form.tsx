import type { FormEvent } from "react";

type AnalyzerFormProps = {
  inputValue: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AnalyzerForm({
  inputValue,
  disabled,
  onChange,
  onSubmit,
}: AnalyzerFormProps) {
  return (
    <section className="space-y-8 rounded-[28px] border border-border bg-surface p-8 shadow-soft">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.36em] text-muted-foreground">
          Trust analysis
        </p>
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl">
            Paste a headline, review, profile, or URL.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Arbiter gives you a quick, transparent snapshot of credibility so you can decide whether a source feels trustworthy.
          </p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground" htmlFor="analysis-input">
            Content or URL
          </label>
          <textarea
            id="analysis-input"
            value={inputValue}
            onChange={(event) => onChange(event.target.value)}
            rows={6}
            placeholder="Paste a news article URL, product review, social post, or profile link"
            className="w-full rounded-[24px] border border-border bg-surface-strong px-5 py-4 text-sm leading-6 text-foreground placeholder:text-muted-foreground outline-none transition focus:border-border focus:ring-2 focus:ring-surface-strong"
          />
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="rounded-full border border-border bg-surface-muted px-3 py-1">
            Paste a news article URL
          </span>
          <span className="rounded-full border border-border bg-surface-muted px-3 py-1">
            Paste a product review
          </span>
          <span className="rounded-full border border-border bg-surface-muted px-3 py-1">
            Paste a social profile link
          </span>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="inline-flex h-14 items-center justify-center rounded-full bg-foreground px-7 text-sm font-semibold text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Analyze Trust
        </button>
      </form>
    </section>
  );
}
