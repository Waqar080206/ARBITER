type LoadingStateProps = {
  phrase: string;
};

export function LoadingState({ phrase }: LoadingStateProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-8 shadow-soft">
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-background shadow-soft">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-foreground/15 border-t-foreground" />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            Analyzing content
          </p>
          <p className="max-w-xs text-base leading-7 text-foreground">{phrase}</p>
        </div>
      </div>
    </section>
  );
}
