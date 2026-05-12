export function HomeHero() {
  return (
    <section className="space-y-5 rounded-[28px] border border-border bg-surface p-8 shadow-soft">
      <div className="space-y-4 max-w-2xl">
        <div className="h-1.5 w-16 rounded-full bg-trust-green/15" />
        <p className="text-xs font-semibold uppercase tracking-[0.36em] text-muted-foreground">
          Arbiter
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
          Analyze credibility before you trust.
        </h1>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          A calm intelligence layer for the internet. Receive a clear trust assessment with score,
          verdict, and explainable signals.
        </p>
      </div>
    </section>
  );
}
