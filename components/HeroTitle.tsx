"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Titre du hero de la home, "Designer / du sensible.".
 *
 * Animation fade-up Framer Motion robuste : si JS est désactivé, ou si
 * l'animation est interrompue, le texte reste visible (style initial
 * géré côté `animate` final, pas via fromTo qui pouvait laisser
 * "du sensible." en opacity 0 dans l'ancien SplitText GSAP).
 */
export function HeroTitle() {
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion ? false : { opacity: 0, y: 28 };
  const animate = { opacity: 1, y: 0 };

  return (
    <h1 className="font-serif text-5xl leading-[0.92] text-ink sm:text-6xl md:text-[6.5rem] lg:text-[8rem]">
      <motion.span
        className="block"
        initial={initial}
        animate={animate}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        Designer
      </motion.span>
      <motion.span
        className="block font-serif italic gradient-gold-text"
        initial={initial}
        animate={animate}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        du sensible.
      </motion.span>
    </h1>
  );
}
