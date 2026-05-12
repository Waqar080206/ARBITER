import type { FormEvent } from "react";

type AnalysisInputProps = {
  inputValue: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AnalysisInput({
  inputValue,
  disabled,
  onChange,
  onSubmit,
}: AnalysisInputProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-8">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="rounded-[1.75rem] border border-border bg-background px-5 py-4 shadow-sm transition focus-within:border-foreground/20 focus-within:ring-1 focus-within:ring-foreground/10">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">🔗</span>
            <input
              id="analysis-input"
              value={inputValue}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Paste a news article URL..."
              className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[1.75rem] bg-background px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">URL, review text, or social media content</p>
          <button
            type="submit"
            disabled={disabled || !inputValue.trim()}
            className="inline-flex h-14 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Analyze <span className="ml-2">→</span>
          </button>
        </div>
      </form>
    </section>
  );
}
