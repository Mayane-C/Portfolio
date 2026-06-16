"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxImageProps {
  children: React.ReactNode;
  /** Intensité du déplacement vertical en pixels au scroll. Plus c'est
   *  élevé, plus l'effet est marqué. */
  intensity?: number;
  className?: string;
}

/**
 * Wrapper qui crée un effet parallaxe vertical sur son enfant pendant
 * le scroll. Le contenu se déplace doucement vers le haut quand on scrolle
 * vers le bas, créant une impression de profondeur.
 *
 * Respecte prefers-reduced-motion.
 */
export function ParallaxImage({
  children,
  intensity = 80,
  className = "",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Register plugin une seule fois
    gsap.registerPlugin(ScrollTrigger);

    const inner = el.querySelector<HTMLElement>("[data-parallax-inner]");
    if (!inner) return;

    const tween = gsap.to(inner, {
      y: -intensity,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [intensity]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div data-parallax-inner className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
