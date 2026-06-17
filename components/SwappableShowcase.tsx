"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
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
 */
const COLS_BY_COUNT: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

/**
 * Showcase à écran-vedette interchangeable AVEC animation de swap.
 *
 * Chaque item porte un `layoutId` Framer Motion. Quand on clique sur une
 * thumbnail, l'élément cliqué change de slot (thumbnail → featured) et
 * l'ancien featured rejoint le slot libre. Framer interpole la position
 * et la taille des deux éléments simultanément → vrai effet "échange".
 *
 * Respecte prefers-reduced-motion (fallback en swap instantané).
 */
export function SwappableShowcase({
  items,
  size = "large",
  ratio = "16/10",
  initialIndex = 0,
}: SwappableShowcaseProps) {
  const [featuredIndex, setFeaturedIndex] = useState(initialIndex);
  const reduceMotion = useReducedMotion();
  // useId garantit un layoutGroupId stable et unique par instance, même
  // si plusieurs SwappableShowcase cohabitent sur la même page.
  const layoutGroupId = useId();

  const maxWidthClass = size === "xlarge" ? "max-w-6xl" : "max-w-5xl";

  const thumbCount = items.length - 1;
  const colsClass = COLS_BY_COUNT[thumbCount] ?? "md:grid-cols-4";

  // Transition spring "chic" : douce mais avec un poil de rebond
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 220, damping: 28, mass: 0.9 };

  return (
    <LayoutGroup id={layoutGroupId}>
      <div className="my-10 md:my-14">
        {/* ─── FEATURED SLOT ────────────────────────────────── */}
        <div className={`mx-auto ${maxWidthClass}`}>
          <motion.div
            key={`featured-${items[featuredIndex].src}`}
            layoutId={`item-${items[featuredIndex].src}`}
            transition={transition}
            className="will-change-transform"
          >
            <MacBookCard
              item={items[featuredIndex]}
              ratio={ratio}
              variant="featured"
            />
          </motion.div>
        </div>

        {/* ─── THUMBNAILS GRID ──────────────────────────────── */}
        <ul
          className={`mx-auto mt-8 grid ${maxWidthClass} grid-cols-2 gap-4 sm:gap-5 ${colsClass} md:mt-10 md:gap-6`}
        >
          {items.map((item, i) => {
            if (i === featuredIndex) return null;
            return (
              <li key={item.src}>
                <motion.button
                  type="button"
                  layoutId={`item-${item.src}`}
                  transition={transition}
                  onClick={() => setFeaturedIndex(i)}
                  className="group block w-full cursor-pointer text-left will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-ancien focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  aria-label={`Afficher en grand : ${item.caption}`}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                >
                  <MacBookCard item={item} ratio={ratio} variant="thumbnail" />
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>
    </LayoutGroup>
  );
}

/**
 * Carte MacBook unifiée — accepte une variante "featured" ou "thumbnail".
 * Structure DOM identique dans les deux cas (juste classes diff), pour que
 * Framer Motion puisse interpoler en douceur entre les deux états.
 */
function MacBookCard({
  item,
  ratio,
  variant,
}: {
  item: ShowcaseItem;
  ratio: "16/10" | "4/3";
  variant: "featured" | "thumbnail";
}) {
  const aspectClass = ratio === "4/3" ? "aspect-[4/3]" : "aspect-[16/10]";
  const isFeatured = variant === "featured";

  return (
    <figure className="w-full">
      {/* Coque MacBook */}
      <div
        className={`relative overflow-hidden bg-prune-deep shadow-2xl ${
          isFeatured
            ? "rounded-t-xl p-2 md:rounded-t-2xl md:p-3"
            : "rounded-t-lg p-1.5 md:p-2"
        }`}
      >
        {/* Liseré caméra */}
        <div
          className={`flex items-center justify-center ${
            isFeatured ? "mb-2 md:mb-3" : "mb-1"
          }`}
        >
          <span
            className={`block rounded-full bg-rose-ancien/60 ${
              isFeatured ? "h-1 w-1" : "h-0.5 w-0.5"
            }`}
          />
        </div>

        {/* Écran */}
        <div
          className={`relative ${aspectClass} w-full overflow-hidden rounded-sm bg-ink`}
        >
          {item.type === "video" ? (
            <PlayingVideo src={item.src} />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={
                isFeatured
                  ? "(min-width: 1280px) 1152px, 100vw"
                  : "(min-width: 768px) 25vw, 50vw"
              }
              priority={isFeatured}
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Pied stylisé */}
      <div
        className={`mx-auto w-full bg-prune-deep/95 ${
          isFeatured ? "h-3 rounded-b-2xl md:h-4" : "h-1.5 rounded-b-lg md:h-2"
        }`}
      >
        <div className="mx-auto h-full w-3/4 rounded-b-full bg-gradient-to-b from-transparent to-prune-deep/60" />
      </div>
      <div
        className={`mx-auto rounded-b-full bg-prune-deep/40 ${
          isFeatured ? "h-1 w-1/4" : "h-0.5 w-1/3"
        }`}
      />

      {/* Caption */}
      <figcaption
        className={`label-mono text-center ${
          isFeatured
            ? "mt-5 text-platinum"
            : "mt-3 text-taupe transition-colors group-hover:text-rose-ancien"
        }`}
      >
        {item.caption}
      </figcaption>
    </figure>
  );
}

/**
 * Vidéo qui joue en autoplay loop muted, avec pause hors-écran via
 * IntersectionObserver. Le composant est remonté quand `src` change
 * (via key dans le parent), ce qui garantit que la lecture repart bien
 * du début quand la vidéo devient featured.
 */
function PlayingVideo({ src }: { src: string }) {
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
      { threshold: 0.2 }
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
