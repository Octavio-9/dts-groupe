"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Valeur affichée, ex. "200+", "8", "5+". Le nombre est animé, le reste conservé. */
  value: string;
  className?: string;
  /** Durée de l'animation (ms). */
  duration?: number;
};

// Sépare préfixe / nombre entier / suffixe (ex. "200+" -> "", 200, "+").
function parse(value: string): { prefix: string; target: number; suffix: string } {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return { prefix: value, target: 0, suffix: "" };
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] };
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Compteur qui monte de 0 jusqu'à la valeur à l'entrée dans le viewport.
 * SSR : rend la valeur finale (crawlers / no-JS voient le vrai chiffre).
 * Respecte `prefers-reduced-motion` : garde la valeur finale, pas d'animation.
 */
export function CountUp({ value, className, duration = 1400 }: CountUpProps) {
  const { prefix, target, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // garde la valeur finale

    setDisplay(0);
    let raf = 0;
    let start = 0;

    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setDisplay(Math.round(easeOutCubic(t) * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
