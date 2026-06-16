"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MagneticHoverProps {
  children: React.ReactNode;
  /** Intensité de l'attraction au curseur (par défaut 0.3, max 1) */
  strength?: number;
  className?: string;
}

/**
 * Wrapper qui rend son enfant "magnétique" au curseur sur desktop.
 * Quand la souris s'approche, l'élément se déplace doucement vers elle,
 * créant un effet ludique sur les CTA.
 *
 * Désactivé sur mobile (pas de hover) et si prefers-reduced-motion.
 */
export function MagneticHover({
  children,
  strength = 0.3,
  className = "",
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Désactive sur mobile / touch + reduce-motion
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
