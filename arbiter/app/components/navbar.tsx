export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3 4 7v5c0 5 4 9 8 9s8-4 8-9V7l-8-4Z" />
              <path d="M9.5 11.5 11.5 14l3.5-3" />
            </svg>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">Arbiter</p>
        </div>
        <p className="hidden text-sm text-muted-foreground md:block">AI-Assisted Trust Analysis</p>
      </div>
    </nav>
  );
}
