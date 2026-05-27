/**
 * Banner monospace du haut de chaque page.
 * 3 colonnes : identité | section centrale | cartouche datée à droite.
 *
 * Pattern repris du livre blanc — fait office de "fil rouge éditorial"
 * entre les deux objets (livre blanc + portfolio).
 */
interface MonoBannerProps {
  /** Label central — ex: "PORTFOLIO" / "PROJET Nº 02 / 06" / "À PROPOS" */
  centerLabel: string;
  /** Cartouche à droite — ex: "Nº 02 — MAI 2026" */
  cartouche?: string;
}

export function MonoBanner({ centerLabel, cartouche }: MonoBannerProps) {
  return (
    <header className="px-8 pt-6 pb-4 md:px-12 md:pt-8 md:pb-6">
      <div className="flex items-baseline justify-between gap-6">
        <p className="label-mono">
          Mayane Cohen <span className="mx-2 text-rose-ancien">·</span>{" "}
          Designer Digital
        </p>

        <p className="label-mono hidden md:block">{centerLabel}</p>

        {cartouche && (
          <p className="label-mono border border-rose-ancien/40 px-3 py-1">
            {cartouche}
          </p>
        )}
      </div>

      {/* Hairline gold sous le banner */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-rose-ancien/30 to-transparent" />
    </header>
  );
}
