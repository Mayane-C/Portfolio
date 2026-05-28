/**
 * Footer monospace en bas de chaque page.
 * 3 colonnes : identité | section centrale italique | date à droite.
 */
interface MonoFooterProps {
  centerLabel: string; // ex: "trente pages, une méthode" — en italique serif
}

export function MonoFooter({ centerLabel }: MonoFooterProps) {
  return (
    <footer className="px-6 py-8 md:px-12 md:py-10">
      {/* Hairline gold au-dessus du footer */}
      <div className="mb-6 h-px bg-gradient-to-r from-transparent via-rose-ancien/30 to-transparent" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <p className="label-mono">Mayane Cohen</p>

        <p className="hidden font-serif italic text-taupe text-sm md:block">
          {centerLabel}
        </p>

        <p className="label-mono">Édition Mai 2026</p>
      </div>
    </footer>
  );
}
