"use client";

import { useEffect, useRef } from "react";

interface VideoShowcaseItem {
  src: string;
  caption?: string;
}

interface VideoShowcaseProps {
  items: VideoShowcaseItem[];
  /** Layout : "uniform" (grille uniforme) ou "feature" (1ère vidéo plus grande) */
  layout?: "uniform" | "feature";
  /** Pour le layout uniform : nombre de colonnes sur desktop */
  cols?: 2 | 3;
}

function inferMime(src: string): string {
  if (src.endsWith(".mp4")) return "video/mp4";
  if (src.endsWith(".mov")) return "video/quicktime";
  if (src.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

/**
 * Composant VideoTile interne, mini MacBookFrame avec autoplay loop muted.
 */
function VideoTile({
  src,
  caption,
  videoRef,
  className = "",
}: {
  src: string;
  caption?: string;
  videoRef?: (el: HTMLVideoElement | null) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Mini MacBookFrame */}
      <div className="overflow-hidden rounded-t-lg bg-prune-deep p-1.5 md:p-2">
        <div className="mb-1 flex items-center justify-center">
          <span className="block h-0.5 w-0.5 rounded-full bg-rose-ancien/60" />
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-ink">
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
        </div>
      </div>
      <div className="mx-auto h-1.5 w-full rounded-b-lg bg-prune-deep/95 md:h-2" />
      <div className="mx-auto h-0.5 w-1/3 rounded-b-full bg-prune-deep/50" />

      {caption && (
        <p className="label-mono mt-3 text-center text-taupe">{caption}</p>
      )}
    </div>
  );
}

/**
 * Grille de vidéos qui jouent simultanément en autoplay loop muted.
 *
 * Layout "feature" (par défaut) : la 1ère vidéo est plus large
 *   - Mobile : 1 colonne
 *   - Desktop : grille asymétrique, 1ère sur 2 cols, suivantes en 2x2
 *
 * Layout "uniform" : grille classique en N colonnes
 */
export function VideoShowcase({
  items,
  layout = "feature",
  cols = 3,
}: VideoShowcaseProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    videoRefs.current.forEach((video) => {
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
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  if (layout === "uniform") {
    const colsClass = cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
    return (
      <div className="my-8 md:my-12">
        <ul className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${colsClass} md:gap-8`}>
          {items.map((item, idx) => (
            <li key={item.src}>
              <VideoTile
                src={item.src}
                caption={item.caption}
                videoRef={(el) => {
                  videoRefs.current[idx] = el;
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Layout "feature" : asymétrique
  // - Row 1 : vidéo 1 sur toute la largeur (large), vidéo 2 si on a au moins 2 items
  // - Suivantes : grille 2 colonnes sur tablet, 4 colonnes sur desktop
  const [first, ...rest] = items;

  return (
    <div className="my-8 md:my-12 space-y-6 md:space-y-8">
      {/* Première vidéo, GRAND format pleine largeur */}
      {first && (
        <VideoTile
          src={first.src}
          caption={first.caption}
          videoRef={(el) => {
            videoRefs.current[0] = el;
          }}
        />
      )}

      {/* Vidéos suivantes en grille */}
      {rest.length > 0 && (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {rest.map((item, idx) => (
            <li key={item.src}>
              <VideoTile
                src={item.src}
                caption={item.caption}
                videoRef={(el) => {
                  videoRefs.current[idx + 1] = el;
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
