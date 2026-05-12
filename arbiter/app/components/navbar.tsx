export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
            A
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">
              Arbiter
            </p>
          </div>
        </div>
        <p className="hidden text-sm text-muted-foreground md:block">
          AI-assisted trust analysis for online content
        </p>
      </div>
    </nav>
  );
}
