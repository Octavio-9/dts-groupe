"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Décalage avant de jouer l'animation (ms) — pour le stagger d'une grille. */
  delay?: number;
  className?: string;
  /** Balise de rendu (défaut: div). */
  as?: ElementType;
};

/**
 * Révèle son contenu en fondu-montée à l'entrée dans le viewport (une seule
 * fois). Zéro dépendance — IntersectionObserver + transition CSS.
 * Respecte `prefers-reduced-motion` : rendu visible immédiatement, sans observer.
 */
export function Reveal({ children, delay = 0, className = "", as }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`dts-reveal-item ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
