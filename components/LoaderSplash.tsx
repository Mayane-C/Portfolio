"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Splash screen visible 600ms au premier chargement.
 * Affiche un monogramme M.C. en italique gold + barre de progression
 * subtile en bas. Disparaît avec un fade rapide.
 *
 * Stocké en sessionStorage : ne s'affiche qu'une fois par session.
 */
export function LoaderSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Skip si déjà vu cette session
    if (sessionStorage.getItem("portfolio-splash-seen") === "1") {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("portfolio-splash-seen", "1");
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          aria-hidden
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif italic gradient-gold-text text-7xl leading-none md:text-8xl"
            >
              M.C.
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-6 h-px bg-rose-ancien"
            />
            <p className="label-mono mt-3 text-platinum">Portfolio</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
