import Image from "next/image";

interface CaptureSlotProps {
  /** Chemin de l'image dans /public — ex: "/projects/chamylinex/01-hero.png".
   *  Si absent ou si le fichier n'existe pas, affiche un placeholder. */
  src?: string;
  /** Alt text obligatoire pour l'accessibilité */
  alt: string;
  /** Légende affichée en mono sous l'image */
  caption?: string;
  /** Ratio attendu — par défaut 16/10 (web desktop) */
  ratio?: "16/10" | "16/9" | "4/3" | "1/1" | "9/16";
  /** Width × height intrinsèques de l'image source */
  width?: number;
  height?: number;
}

/**
 * Slot pour intégrer une capture HD dans une page projet.
 * Affiche un placeholder lumineux tant que la vraie image n'est pas posée.
 *
 * Convention de nommage des fichiers dans /public/projects/[slug]/ :
 *   01-hero.png, 02-section-XXX.png, 03-detail-XXX.png, etc.
 */
export function CaptureSlot({
  src,
  alt,
  caption,
  ratio = "16/10",
  width = 1920,
  height = 1200,
}: CaptureSlotProps) {
  const aspectClass = {
    "16/10": "aspect-[16/10]",
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "9/16": "aspect-[9/16]",
  }[ratio];

  return (
    <figure className="my-10 md:my-14 mx-auto max-w-3xl">
      <div
        className={`relative ${aspectClass} w-full overflow-hidden rounded-sm border border-rose-ancien/20 bg-cream-deep`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 80vw, 100vw"
            className="object-cover"
          />
        ) : (
          // Placeholder lumineux tant que l'image n'est pas posée
          <div
            className="gradient-aurore flex h-full w-full items-center justify-center"
            aria-hidden
          >
            <div className="text-center px-8">
              <p className="label-mono text-rose-ancien">
                Capture à intégrer
              </p>
              <p className="mt-3 font-serif italic text-taupe text-base md:text-lg">
                {alt}
              </p>
              <p className="label-mono mt-4 text-platinum text-[10px]">
                {ratio} · {width}×{height}
              </p>
            </div>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="label-mono mt-3 text-platinum">
          — {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Marker pour width/height non utilisé en mode placeholder */
export const _unused_width_height_marker = { width: 0, height: 0 };
