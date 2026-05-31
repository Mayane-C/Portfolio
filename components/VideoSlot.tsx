/**
 * Lecteur vidéo natif HTML5 pour intégration dans une fiche projet.
 * Pas d'iframe externe — fichier .mp4 ou .mov servi depuis /public.
 *
 * Aspect ratio par défaut : 16/10 (cohérent avec CaptureSlot).
 */
interface VideoSlotProps {
  /** Chemin du fichier vidéo dans /public — ex: "/projects/gabi/demo.mp4" */
  src: string;
  /** Type MIME — auto-détecté si .mp4 ou .mov, sinon à préciser */
  type?: string;
  /** Légende mono sous la vidéo */
  caption?: string;
  /** Affichage poster (image de couverture) avant lecture — optionnel */
  poster?: string;
  /** Ratio attendu — par défaut 16/10 */
  ratio?: "16/10" | "16/9" | "4/3" | "1/1";
}

function inferMime(src: string): string {
  if (src.endsWith(".mp4")) return "video/mp4";
  if (src.endsWith(".mov")) return "video/quicktime";
  if (src.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

export function VideoSlot({
  src,
  type,
  caption,
  poster,
  ratio = "16/10",
}: VideoSlotProps) {
  const mime = type ?? inferMime(src);

  const aspectClass = {
    "16/10": "aspect-[16/10]",
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
  }[ratio];

  return (
    <figure className="my-10 md:my-14 mx-auto max-w-3xl">
      <div
        className={`relative ${aspectClass} w-full overflow-hidden rounded-sm border border-rose-ancien/20 bg-ink`}
      >
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-contain"
        >
          <source src={src} type={mime} />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
      {caption && (
        <figcaption className="label-mono mt-3 text-platinum">
          — {caption}
        </figcaption>
      )}
    </figure>
  );
}
