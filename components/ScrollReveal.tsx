"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Délai en secondes avant l'animation */
  delay?: number;
  /** Variante : translateY ascendant (par défaut) ou opacité seule */
  variant?: "rise" | "fade";
  /** Distance de translation en px (par défaut 24) */
  distance?: number;
}

const buildVariants = (distance: number, reduce: boolean | null): Variants => ({
  hidden: {
    opacity: 0,
    y: reduce ? 0 : distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/**
 * Wrapper qui révèle son contenu au scroll avec un fade + translateY.
 * Respecte prefers-reduced-motion automatiquement.
 *
 * Usage : <ScrollReveal>{children}</ScrollReveal>
 */
export function ScrollReveal({
  children,
  delay = 0,
  variant = "rise",
  distance = 24,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const variants = buildVariants(variant === "fade" ? 0 : distance, reduce);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
