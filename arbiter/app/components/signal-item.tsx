type SignalItemProps = {
  text: string;
  variant: "positive" | "warning" | "negative";
};

const icons = {
  positive: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
      <path d="M10.29 3.86l-7.9 13.66A1 1 0 0 0 3.28 19h17.44a1 1 0 0 0 .87-1.48l-7.9-13.66a1 1 0 0 0-1.74 0z" />
    </svg>
  ),
  negative: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  ),
};

const variants = {
  positive: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  negative: "bg-red-50 text-red-700",
};

export function SignalItem({ text, variant }: SignalItemProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-card p-4">
      <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${variants[variant]}`}>
        {icons[variant]}
      </div>
      <p className="text-sm leading-6 text-foreground">{text}</p>
    </div>
  );
}
