interface Logo {
  src: string;
  alt: string;
}

/** Restrained trust strip — muted logos, one quiet overline. */
export function LogoStrip({ eyebrow, logos }: { eyebrow: string; logos: Logo[] }) {
  return (
    <div className="border-y border-[var(--border-subtle)] bg-surface-card">
      <div className="logo-strip container-max flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-7">
        <span className="text-xs font-semibold uppercase tracking-caps text-text-subtle">{eyebrow}</span>
        {logos.map((l) => (
           
          <img
            key={l.alt}
            src={l.src}
            alt={l.alt}
            className="h-7 w-auto max-w-[120px] object-contain opacity-60 grayscale transition-opacity duration-base hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
}

export default LogoStrip;
