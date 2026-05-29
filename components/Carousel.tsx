"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Item du carousel — soit une image, soit une vidéo. */
export type CarouselItem =
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "video";
      src: string;
      /** Image de couverture optionnelle (poster) avant lecture */
      poster?: string;
      caption?: string;
    };

interface CarouselProps {
  items: CarouselItem[];
  /** Ratio appliqué à toutes les slides (uniforme = cohérent) */
  ratio?: "16/10" | "16/9" | "4/3" | "1/1" | "9/16";
}

const aspectClasses: Record<NonNullable<CarouselProps["ratio"]>, string> = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "9/16": "aspect-[9/16]",
};

function inferMime(src: string): string {
  if (src.endsWith(".mp4")) return "video/mp4";
  if (src.endsWith(".mov")) return "video/quicktime";
  if (src.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

/**
 * Carousel éditorial — scroll-snap CSS natif + dots cliquables.
 * Supporte images (Next/Image) ET vidéos (lecteur HTML5 natif).
 * Aucune dépendance, accessible clavier, swipe mobile naturel.
 */
export function Carousel({ items, ratio = "16/10" }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Observer la position de scroll pour mettre à jour l'index actif
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = scroller.clientWidth;
        if (w === 0) return;
        const idx = Math.round(scroller.scrollLeft / w);
        setActiveIndex(idx);
      });
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Pause toutes les vidéos quand on quitte une slide
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== activeIndex) {
        video.pause();
      }
    });
  }, [activeIndex]);

  const goTo = (idx: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({
      left: scroller.clientWidth * idx,
      behavior: "smooth",
    });
  };

  // Navigation clavier (gauche/droite)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" && activeIndex > 0) {
      e.preventDefault();
      goTo(activeIndex - 1);
    } else if (e.key === "ArrowRight" && activeIndex < items.length - 1) {
      e.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  const aspectClass = aspectClasses[ratio];
  const currentCaption = items[activeIndex]?.caption;

  return (
    <figure
      className="my-10 mx-auto max-w-3xl md:my-14"
      role="group"
      aria-roledescription="carousel"
      aria-label={`Carousel · ${items.length} éléments`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Track */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, idx) => (
          <div
            key={`${item.type}-${item.src}`}
            className="w-full flex-shrink-0 snap-start"
            aria-roledescription="slide"
            aria-label={`Élément ${idx + 1} sur ${items.length}`}
          >
            <div
              className={`relative ${aspectClass} w-full overflow-hidden rounded-sm border border-rose-ancien/20 bg-cream-deep`}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-contain"
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  <source src={item.src} type={inferMime(item.src)} />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Caption de l'élément actif */}
      {currentCaption && (
        <figcaption
          key={activeIndex}
          className="label-mono mt-4 text-center text-platinum animate-[fadeIn_200ms_ease]"
        >
          — {currentCaption}
        </figcaption>
      )}

      {/* Contrôles : flèches + dots + compteur */}
      {items.length > 1 && (
        <div className="mt-4 flex flex-col items-center gap-3">
          {/* Flèches + Dots sur une même ligne */}
          <div className="flex items-center gap-4">
            {/* Flèche précédent */}
            <button
              type="button"
              onClick={() => goTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Élément précédent"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-ancien/40 text-rose-ancien transition-all duration-200 enabled:hover:border-rose-ancien enabled:hover:bg-rose-ancien enabled:hover:text-cream disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span aria-hidden className="text-lg leading-none">
                ←
              </span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Aller à l'élément ${idx + 1}`}
                  aria-current={idx === activeIndex ? "true" : undefined}
                  role="tab"
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-rose-ancien"
                      : "w-1.5 bg-rose-ancien/30 hover:bg-rose-ancien/60"
                  }`}
                />
              ))}
            </div>

            {/* Flèche suivant */}
            <button
              type="button"
              onClick={() =>
                goTo(Math.min(items.length - 1, activeIndex + 1))
              }
              disabled={activeIndex === items.length - 1}
              aria-label="Élément suivant"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-ancien/40 text-rose-ancien transition-all duration-200 enabled:hover:border-rose-ancien enabled:hover:bg-rose-ancien enabled:hover:text-cream disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </button>
          </div>

          {/* Compteur mono + hint swipe sur mobile */}
          <p className="label-mono text-platinum">
            {String(activeIndex + 1).padStart(2, "0")} ·{" "}
            {String(items.length).padStart(2, "0")}
            <span className="ml-3 hidden text-platinum/60 sm:inline">
              ← glisser →
            </span>
            <span className="ml-3 inline text-platinum/60 sm:hidden">
              ← swipe →
            </span>
          </p>
        </div>
      )}
    </figure>
  );
}
