"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitTextProps {
  children: string;
  /** Délai avant l'animation en secondes */
  delay?: number;
  /** Délai entre chaque caractère (stagger) */
  stagger?: number;
  className?: string;
  /** Tag HTML à utiliser (par défaut span) */
  as?: "span" | "div";
}

/**
 * Composant qui décompose son texte en caractères et les anime un à un
 * au mount (entrée du DOM). Chaque char monte de 24px avec un fade-in
 * et une rotation légère, créant un effet "tape-écrit" élégant.
 *
 * Respecte prefers-reduced-motion : tout apparaît instantanément.
 */
export function SplitText({
  children,
  delay = 0,
  stagger = 0.04,
  className = "",
  as: Tag = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respecte prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      gsap.set(el.children, { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    const chars = Array.from(el.children);
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 28,
        rotateX: -45,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger,
        delay,
        ease: "power3.out",
      }
    );
  }, [delay, stagger, children]);

  // Décomposition en spans : on garde les espaces avec entité &nbsp;
  const tokens = children.split(/(\s+)/).flatMap((word, wi) => {
    if (/^\s+$/.test(word)) {
      return [
        <span
          key={`s-${wi}`}
          className="inline-block"
          aria-hidden
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {word}
        </span>,
      ];
    }
    return word.split("").map((char, ci) => (
      <span
        key={`c-${wi}-${ci}`}
        aria-hidden
        className="inline-block"
        style={{ display: "inline-block", willChange: "transform, opacity" }}
      >
        {char}
      </span>
    ));
  });

  return (
    <Tag ref={ref as React.RefObject<HTMLSpanElement & HTMLDivElement>} className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden style={{ perspective: "600px", display: "inline-block" }}>
        {tokens}
      </span>
    </Tag>
  );
}
