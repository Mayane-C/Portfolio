"use client";

import { MagneticHover } from "@/components/gsap/MagneticHover";

interface ExternalProjectCTAProps {
  /** Texte du label affiché en haut, ex: "Voir le projet en interaction" */
  label?: string;
  /** Lien externe + son libellé éditorial */
  externalLink: {
    label: string;
    url: string;
  };
  /** Note italique optionnelle affichée à côté du CTA (ex: disclaimer
   *  de disponibilité de la démo) */
  disclaimer?: string;
}

/**
 * CTA externe vers la maquette interactive / le projet en ligne.
 * Placé juste après le ProjectHero pour rendre l'accès immédiat
 * (avant la vidéo et le contenu rédactionnel).
 *
 * Style : bandeau crème encadré, terracotta dominant, hover plein bordeaux.
 */
export function ExternalProjectCTA({
  label = "Tester en direct",
  externalLink,
  disclaimer,
}: ExternalProjectCTAProps) {
  return (
    <section className="px-6 md:px-12 pt-2 pb-6 md:pt-4 md:pb-10">
      <MagneticHover strength={0.15} className="mx-auto max-w-3xl">
        <a
          href={externalLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 border-2 border-rose-ancien bg-cream-deep/40 px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-prune hover:shadow-lg md:px-8 md:py-6"
        >
          <div className="flex flex-col gap-1">
            <span className="label-mono text-rose-ancien transition-colors group-hover:text-gold-soft">
              {label}
            </span>
            <span className="font-serif italic text-2xl text-ink leading-tight transition-colors group-hover:text-cream md:text-3xl">
              {externalLink.label}
            </span>
          </div>
          <span
            aria-hidden
            className="font-serif text-4xl text-rose-ancien transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-soft md:text-5xl"
          >
            →
          </span>
        </a>
      </MagneticHover>
      {disclaimer && (
        <p className="mx-auto mt-4 max-w-2xl text-center font-serif italic text-sm text-taupe leading-snug md:text-base">
          {disclaimer}
        </p>
      )}
    </section>
  );
}
