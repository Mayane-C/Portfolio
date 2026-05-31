/**
 * Item numéroté dans une liste d'étapes / templates / leçons.
 * Reproduit le pattern signature du livre blanc :
 *   - fond crème-deep (encadré "outil" page 8/13/14)
 *   - numéro XXL outline or vieilli en arrière-plan (page 24 "Quatre leçons")
 *   - label mono terracotta en haut
 *   - titre serif italique noir
 *   - description sans-serif taupe
 *   - hairline border-left terracotta
 *
 * Remplace les <li> "rolled by hand" précédents dans
 * MyTrack/GABI/Brothers/Chartier Dalix.
 */
interface NumberedStepProps {
  /** Numéro affiché en arrière-plan + dans le label (ex: "01") */
  nr: string;
  /** Label mono — ex: "Étape" → s'affichera "ÉTAPE 01" */
  label: string;
  /** Titre serif italique court */
  title: React.ReactNode;
  /** Description courte sans-serif */
  description: React.ReactNode;
}

export function NumberedStep({
  nr,
  label,
  title,
  description,
}: NumberedStepProps) {
  return (
    <li className="relative overflow-hidden border-l-2 border-rose-ancien bg-cream-deep/60 px-5 py-5 md:px-6 md:py-6">
      {/* Numéro XXL outline en arrière-plan (signature livre blanc p.24) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 -top-2 font-serif italic text-[4.5rem] leading-none text-gold-soft/20 md:text-[5.5rem]"
      >
        {nr}
      </span>

      {/* Label mono — au-dessus de tout */}
      <p className="label-mono relative mb-2 text-rose-ancien">
        {label} {nr}
      </p>

      {/* Titre serif italique */}
      <p className="relative font-serif italic text-lg text-ink">
        {title}
      </p>

      {/* Description */}
      <p className="relative mt-2 font-sans text-sm text-taupe leading-snug">
        {description}
      </p>
    </li>
  );
}
