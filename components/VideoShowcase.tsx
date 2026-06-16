"use client";

import { useEffect, useRef } from "react";

interface VideoShowcaseItem {
  src: string;
  caption?: string;
}

interface VideoShowcaseProps {
  items: VideoShowcaseItem[];
  /** Nombre de colonnes sur desktop (par défaut 3) */
  cols?: 2 | 3;
}

function inferMime(src: string): string {
  if (src.endsWith(".mp4")) return "video/mp4";
  if (src.endsWith(".mov")) return "video/quicktime";
  if (src.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

/**
 * Grille de mini MacBookFrames qui jouent en autoplay loop muted.
 * Toutes visibles côte à côte (pas de carousel).
 *
 * Layout responsive :
 *   mobile  → 1 colonne
 *   tablet  → 2 colonnes
 *   desktop → cols (2 ou 3, par défaut 3)
 *
 * IntersectionObserver : pause les vidéos hors viewport pour la perf.
 */
export function VideoShowcase({ items, cols = 3 }: VideoShowcaseProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
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
        { threshold: 0.2 }
      );
      observer.observe(video);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const colsClass =
    cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div className="my-8 md:my-12">
      <ul
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${colsClass} md:gap-8`}
      >
        {items.map((item, idx) => (
          <li key={item.src} className="flex flex-col">
            {/* Mini MacBookFrame */}
            <div className="overflow-hidden rounded-t-lg bg-prune-deep p-1.5 md:p-2">
              <div className="mb-1 flex items-center justify-center">
                <span className="block h-0.5 w-0.5 rounded-full bg-rose-ancien/60" />
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-ink">
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
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
              </div>
            </div>
            {/* Pied stylisé */}
            <div className="mx-auto h-1.5 w-full rounded-b-lg bg-prune-deep/95 md:h-2" />
            <div className="mx-auto h-0.5 w-1/3 rounded-b-full bg-prune-deep/50" />

            {/* Caption */}
            {item.caption && (
              <p className="label-mono mt-3 text-center text-platinum">
                {item.caption}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
