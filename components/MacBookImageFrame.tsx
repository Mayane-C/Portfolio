import Image from "next/image";

interface MacBookImageFrameProps {
  /** Chemin de l'image dans /public */
  src: string;
  /** Texte alternatif obligatoire pour l'accessibilité */
  alt: string;
  /** Légende mono sous la frame */
  caption?: string;
  /** Taille de la frame : "default" (max-w-3xl, 768px) ou "large" (max-w-5xl, 1024px) */
  size?: "default" | "large";
  /** Ratio de l'écran (par défaut 16/10, type MacBook) */
  ratio?: "16/10" | "4/3";
  /** Sizes responsive pour next/image */
  sizes?: string;
  /** Priorité de chargement (LCP) */
  priority?: boolean;
}

/**
 * Frame MacBook éditoriale autour d'une IMAGE statique.
 *
 * Pendant statique de MacBookFrame, conserve exactement le même chrome
 * (coque, liseré caméra, pied stylisé) mais affiche une image
 * (PNG/JPG/WebP) plutôt qu'une vidéo. Utile pour les screens design system,
 * cas où on veut montrer une planche figée avec la même mise en valeur
 * "produit digital" que les démos vidéo.
 */
export function MacBookImageFrame({
  src,
  alt,
  caption,
  size = "large",
  ratio = "16/10",
  sizes = "(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw",
  priority = false,
}: MacBookImageFrameProps) {
  const maxWidthClass = size === "large" ? "max-w-5xl" : "max-w-3xl";
  const aspectClass = ratio === "4/3" ? "aspect-[4/3]" : "aspect-[16/10]";

  return (
    <figure className={`mx-auto my-12 ${maxWidthClass} md:my-16`}>
      {/* Coque MacBook : top bar + écran */}
      <div className="relative overflow-hidden rounded-t-xl bg-prune-deep p-2 shadow-2xl md:rounded-t-2xl md:p-3">
        {/* Liseré caméra frontale (point clair) */}
        <div className="mb-2 flex items-center justify-center md:mb-3">
          <span className="block h-1 w-1 rounded-full bg-rose-ancien/60" />
        </div>

        {/* Écran : image plein cadre */}
        <div className={`relative ${aspectClass} w-full overflow-hidden rounded-sm bg-ink`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
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
