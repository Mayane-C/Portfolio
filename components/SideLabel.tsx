/**
 * Label monospace vertical en marge gauche — pattern signature
 * du livre blanc (visible page 7, 8, 9, 12, etc.).
 *
 * Positionné en fixed pour suivre le scroll. Caché sur mobile
 * (pas assez de marge horizontale pour l'afficher proprement).
 *
 * Texte écrit de bas en haut (sens lecture en tournant la tête à gauche)
 * — cohérent avec le pattern print du livre blanc.
 */
interface SideLabelProps {
  /** Texte affiché — sera mis en uppercase letter-spaced via .label-mono */
  children: React.ReactNode;
}

export function SideLabel({ children }: SideLabelProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block xl:left-5"
    >
      <span
        className="label-mono block origin-center -rotate-90 whitespace-nowrap text-platinum"
        style={{ writingMode: "horizontal-tb" }}
      >
        {children}
      </span>
    </div>
  );
}
