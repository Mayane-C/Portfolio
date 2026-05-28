/**
 * Encadré "À RETENIR" — fait directement écho au pattern signature
 * du livre blanc (bandeau brun-prune avec citation italique crème).
 *
 * Adapté à la palette wedding : fond brun-prune (--color-ink),
 * texte ivoire (--color-cream), italique gold pour les accents.
 */
interface PullQuoteProps {
  /** Texte de la citation — peut contenir des balises <em> si nécessaire */
  children: React.ReactNode;
  /** Label discret au-dessus ("À RETENIR" par défaut) */
  label?: string;
}

export function PullQuote({ children, label = "À retenir" }: PullQuoteProps) {
  return (
    <div className="my-12 bg-prune px-6 py-10 md:my-16 md:px-12 md:py-14">
      <p className="label-mono mb-5 text-gold-soft">
        — {label}
      </p>
      <blockquote className="font-serif italic text-cream text-2xl leading-snug md:text-3xl">
        <span aria-hidden className="select-none text-gold-soft">
          «{" "}
        </span>
        {children}
        <span aria-hidden className="select-none text-gold-soft">
          {" "}»
        </span>
      </blockquote>
    </div>
  );
}
