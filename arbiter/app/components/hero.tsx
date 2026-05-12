export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
      <div className="rounded-[2rem] bg-card/95 p-10 shadow-soft sm:p-14">
        <div className="mx-auto mb-6 inline-flex rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-[0.36em] text-muted-foreground">
          Calm intelligence
        </div>
        <h1 className="mx-auto max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Analyze credibility before you trust.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
          Paste any URL, review, or social media post. Arbiter evaluates online content using AI-assisted trust analysis.
        </p>
      </div>
    </section>
  );
}
