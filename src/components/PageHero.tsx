import type { CSSProperties } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="w-full bg-navy px-5 lg:px-20 py-14 lg:py-16">
      <div className="max-w-3xl">
        {eyebrow && (
          <div
            className="dts-enter text-xs font-medium text-accent font-body uppercase tracking-widest mb-3"
            style={{ "--enter-delay": "0ms" } as CSSProperties}
          >
            {eyebrow}
          </div>
        )}
        <h1
          className="dts-enter font-headings font-bold text-navy-foreground text-3xl lg:text-4xl leading-tight"
          style={{ "--enter-delay": "100ms" } as CSSProperties}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="dts-enter font-body text-base lg:text-lg text-navy-foreground/70 mt-4"
            style={{ "--enter-delay": "200ms" } as CSSProperties}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
