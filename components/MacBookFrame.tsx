"use client";

import { useEffect, useRef } from "react";

interface MacBookFrameProps {
  /** Chemin de la vidéo dans /public */
  src: string;
  /** Légende mono sous la frame */
  caption?: string;
  /** Désactive l'autoplay (pour les vidéos longues) — par défaut true */
  autoPlay?: boolean;
  /** Affiche les controls (par défaut false pour effet GIF) */
  controls?: boolean;
  /** Taille de la frame : "default" (max-w-3xl), "large" (max-w-5xl) ou "xlarge" (max-w-6xl) */
  size?: "default" | "large" | "xlarge";
}

/**
 * Frame MacBook éditoriale autour d'une vidéo.
 *
 * Pattern : la vidéo joue en boucle silencieuse (effet GIF) à l'intérieur
 * d'un écran d'ordinateur stylisé. Évoque un site live, ajoute du contexte
 * "produit digital" sans dépenser de la bande passante avec un vrai
 * mockup PNG/SVG.
 *
 * Construction CSS pure :
 *   - Coque (gris obsidian) avec coins arrondis top-only
 *   - Liseré (gris foncé) qui imite la cam frontale
 *   - Écran vidéo plein cadre
 *   - Pied "MacBook" stylisé en bas (trapèze + base)
 */
export function MacBookFrame({
  src,
  caption,
  autoPlay = true,
  controls = false,
  size = "large",
}: MacBookFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // IntersectionObserver : ne joue que quand visible (économie batterie + perf)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // autoplay peut échouer (politique browser), on ignore
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay]);

  const maxWidthClass =
    size === "xlarge"
      ? "max-w-6xl"
      : size === "large"
        ? "max-w-5xl"
        : "max-w-3xl";

  return (
    <figure className={`mx-auto my-12 ${maxWidthClass} md:my-16`}>
      {/* Coque MacBook : top bar + écran */}
      <div className="relative overflow-hidden rounded-t-xl bg-prune-deep p-2 shadow-2xl md:rounded-t-2xl md:p-3">
        {/* Liseré caméra frontale (point clair) */}
        <div className="mb-2 flex items-center justify-center md:mb-3">
          <span className="block h-1 w-1 rounded-full bg-rose-ancien/60" />
        </div>

        {/* Écran : vidéo plein cadre, ratio 16/10 type MacBook */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-ink">
          <video
            ref={videoRef}
            src={src}
            autoPlay={autoPlay}
            muted
            loop
            playsInline
            controls={controls}
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Pied MacBook : trapèze stylisé */}
      <div className={`mx-auto h-3 ${maxWidthClass} rounded-b-2xl bg-prune-deep/95 md:h-4`}>
        <div className="mx-auto h-full w-3/4 rounded-b-full bg-gradient-to-b from-transparent to-prune-deep/60" />
      </div>
      <div className="mx-auto h-1 w-1/4 rounded-b-full bg-prune-deep/40" />

      {caption && (
        <figcaption className="label-mono mt-5 text-center text-platinum">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
