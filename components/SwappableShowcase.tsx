"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type ShowcaseItem =
  | { type: "video"; src: string; caption: string; alt?: never }
  | { type: "image"; src: string; caption: string; alt: string };

interface SwappableShowcaseProps {
  items: ShowcaseItem[];
  /** Taille de l'écran featured */
  size?: "large" | "xlarge";
  /** Ratio de l'écran (par défaut 16/10) */
  ratio?: "16/10" | "4/3";
  /** Index de départ du featured (par défaut 0) */
  initialIndex?: number;
}

function inferMime(src: string): string {
  if (src.endsWith(".mp4")) return "video/mp4";
  if (src.endsWith(".mov")) return "video/quicktime";
  if (src.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

/**
 * Mapping nombre de thumbs → classes Tailwind statiques (JIT-safe).
 * Tailwind purge les classes calculées dynamiquement, donc on ne peut pas
 * faire `grid-cols-${n}` directement.
 */
const COLS_BY_COUNT: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

/**
 * Showcase à écran-vedette interchangeable.
 *
 * Affiche un grand mockup MacBook avec l'item "featured" (vidéo ou image),
 * et en dessous une grille de thumbnails cliquables. Quand on clique sur
 * une thumbnail, elle prend la place du featured et inversement.
 *
 * Supporte vidéos (autoplay loop muted, IntersectionObserver pour pause
 * hors-écran) et images (next/image). Permet aussi le mélange.
 */
export function SwappableShowcase({
  items,
  size = "large",
  ratio = "16/10",
  initialIndex = 0,
}: SwappableShowcaseProps) {
  const [featuredIndex, setFeaturedIndex] = useState(initialIndex);
  const featured = items[featuredIndex];

  const maxWidthClass = size === "xlarge" ? "max-w-6xl" : "max-w-5xl";
  const aspectClass = ratio === "4/3" ? "aspect-[4/3]" : "aspect-[16/10]";

  const thumbCount = items.length - 1;
  const colsClass = COLS_BY_COUNT[thumbCount] ?? "md:grid-cols-4";

  return (
    <div className="my-10 md:my-14">
      {/* ─── FEATURED MacBook ─────────────────────────────── */}
      <figure className={`mx-auto ${maxWidthClass}`}>
        {/* Coque + écran */}
        <div className="relative overflow-hidden rounded-t-xl bg-prune-deep p-2 shadow-2xl md:rounded-t-2xl md:p-3">
          <div className="mb-2 flex items-center justify-center md:mb-3">
            <span className="block h-1 w-1 rounded-full bg-rose-ancien/60" />
          </div>
          <div
            className={`relative ${aspectClass} w-full overflow-hidden rounded-sm bg-ink`}
          >
            {featured.type === "video" ? (
              <FeaturedVideo key={featured.src} src={featured.src} />
            ) : (
              <Image
                key={featured.src}
                src={featured.src}
                alt={featured.alt}
                fill
                sizes={
                  size === "xlarge"
                    ? "(min-width: 1280px) 1152px, 100vw"
                    : "(min-width: 1024px) 1024px, 100vw"
                }
                priority
                className="object-cover"
              />
            )}
          </div>
        </div>
        {/* Pied stylisé */}
        <div
          className={`mx-auto h-3 ${maxWidthClass} rounded-b-2xl bg-prune-deep/95 md:h-4`}
        >
          <div className="mx-auto h-full w-3/4 rounded-b-full bg-gradient-to-b from-transparent to-prune-deep/60" />
        </div>
        <div className="mx-auto h-1 w-1/4 rounded-b-full bg-prune-deep/40" />

        <figcaption className="label-mono mt-5 text-center text-platinum">
          {featured.caption}
        </figcaption>
      </figure>

      {/* ─── THUMBNAILS CLIQUABLES ────────────────────────── */}
      <ul
        className={`mx-auto mt-8 grid ${maxWidthClass} grid-cols-2 gap-4 sm:gap-5 ${colsClass} md:mt-10 md:gap-6`}
      >
        {items.map((item, i) => {
          if (i === featuredIndex) return null;
          return (
            <li key={`${item.src}-${i}`}>
              <button
                type="button"
                onClick={() => setFeaturedIndex(i)}
                className="group block w-full text-left transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-ancien focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                aria-label={`Afficher en grand : ${item.caption}`}
              >
                <ThumbnailFrame item={item} ratio={ratio} />
                <p className="label-mono mt-3 text-center text-taupe transition-colors group-hover:text-rose-ancien">
                  {item.caption}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Vidéo featured : IntersectionObserver pour pause hors-écran.
 * Le key sur la balise <video> remonte l'élément au swap, ce qui relance
 * la lecture du début (effet "ouvrir une nouvelle démo").
 */
function FeaturedVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
    >
      <source src={src} type={inferMime(src)} />
    </video>
  );
}

/**
 * Mini MacBook pour les thumbnails (mêmes codes visuels que le featured,
 * en plus petit). Les vidéos jouent en autoplay loop muted, pour donner
 * un aperçu vivant de ce qu'on va voir en grand.
 */
function ThumbnailFrame({
  item,
  ratio,
}: {
  item: ShowcaseItem;
  ratio: "16/10" | "4/3";
}) {
  const aspectClass = ratio === "4/3" ? "aspect-[4/3]" : "aspect-[16/10]";
  return (
    <>
      <div className="overflow-hidden rounded-t-lg bg-prune-deep p-1.5 transition-shadow group-hover:shadow-lg md:p-2">
        <div className="mb-1 flex items-center justify-center">
          <span className="block h-0.5 w-0.5 rounded-full bg-rose-ancien/60" />
        </div>
        <div
          className={`relative ${aspectClass} w-full overflow-hidden rounded-sm bg-ink`}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            >
              <source src={item.src} type={inferMime(item.src)} />
            </video>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
      <div className="mx-auto h-1.5 w-full rounded-b-lg bg-prune-deep/95 md:h-2" />
      <div className="mx-auto h-0.5 w-1/3 rounded-b-full bg-prune-deep/50" />
    </>
  );
}
