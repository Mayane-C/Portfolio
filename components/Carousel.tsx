"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CarouselItem {
  src: string;
  alt: string;
  caption?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  /** Ratio appliqué à toutes les images du carousel (uniforme = cohérent) */
  ratio?: "16/10" | "16/9" | "4/3" | "1/1" | "9/16";
}

const aspectClasses: Record<NonNullable<CarouselProps["ratio"]>, string> = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "9/16": "aspect-[9/16]",
};

/**
 * Carousel éditorial — scroll-snap CSS natif + dots cliquables.
 * Aucune dépendance, accessible clavier, swipe mobile naturel,
 * scroll molette sur desktop. Cohérent avec la DA livre blanc.
 */
export function Carousel({ items, ratio = "16/10" }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
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

  const goTo = (idx: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({
      left: scroller.clientWidth * idx,
      behavior: "smooth",
    });
  };

  // Gestion clavier sur les dots (gauche/droite pour naviguer)
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
      aria-label={`Carousel · ${items.length} images`}
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
            key={item.src}
            className="w-full flex-shrink-0 snap-start"
            aria-roledescription="slide"
            aria-label={`Image ${idx + 1} sur ${items.length}`}
          >
            <div
              className={`relative ${aspectClass} w-full overflow-hidden rounded-sm border border-rose-ancien/20 bg-cream-deep`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Caption de l'image active (transition douce) */}
      {currentCaption && (
        <figcaption
          key={activeIndex}
          className="label-mono mt-4 text-center text-platinum animate-[fadeIn_200ms_ease]"
        >
          — {currentCaption}
        </figcaption>
      )}

      {/* Contrôles : dots + compteur */}
      {items.length > 1 && (
        <div className="mt-4 flex flex-col items-center gap-3">
          {/* Dots */}
          <div className="flex items-center gap-2" role="tablist">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Aller à l'image ${idx + 1}`}
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

          {/* Compteur mono */}
          <p className="label-mono text-platinum">
            {String(activeIndex + 1).padStart(2, "0")} ·{" "}
            {String(items.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </figure>
  );
}
