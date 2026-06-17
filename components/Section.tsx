/**
 * Section éditoriale interne d'une page projet.
 * Pattern repris des chapitres du livre blanc :
 * label terracotta + titre serif + contenu 2 colonnes (texte + aside).
 */
interface SectionProps {
  /** Label rouge brique en haut — ex: "Le contexte" / "L'approche" */
  label: string;
  /** Titre serif optionnel — ex: "Le silo visuel." */
  title?: React.ReactNode;
  /** Contenu principal — JSX libre */
  children: React.ReactNode;
  /** Espacement vertical réduit si true (pour sections rapprochées) */
  compact?: boolean;
}

export function Section({
  label,
  title,
  children,
  compact = false,
}: SectionProps) {
  return (
    <section
      className={`px-6 md:px-12 ${
        compact ? "py-8 md:py-10" : "py-12 md:py-16"
      }`}
    >
      <div className="border-t border-rose-ancien/50 pt-8 md:pt-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-rose-ancien" />
          <span className="label-mono text-rose-ancien">{label}</span>
        </div>

        {title && (
          <h2 className="font-serif text-4xl text-ink leading-tight mb-8 md:text-5xl">
            {title}
          </h2>
        )}

        <div className="prose-portfolio">{children}</div>
      </div>
    </section>
  );
}
