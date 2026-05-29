import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

/**
 * Card projet — utilisée dans la grille 2×3 de la homepage.
 * Pattern card-bouton : toute la card est cliquable, avec un CTA
 * visible en bas qui affirme la nature "bouton" de la zone.
 *
 * Inspirée des cards "Quatre leçons" et "Sept conseils" du livre blanc :
 * - numéro outline en arrière-plan
 * - hairline supérieure
 * - titre Cormorant XXL avec mot-accent italique gold
 * - sous-titre serif italique
 * - métadonnée mono
 * - CTA bouton encadré, toujours visible
 * - hover : fond crème-deep, chiffre se densifie, bouton se remplit
 */
export function ProjectCard({ project }: ProjectCardProps) {
  // Compose le titre avec ou sans italique sur un mot
  const renderTitle = () => {
    const { title, italicWord } = project;
    if (!italicWord) {
      return <>{title}.</>;
    }
    const idx = title.indexOf(italicWord);
    if (idx === -1) return <>{title}.</>;

    const before = title.slice(0, idx);
    const after = title.slice(idx + italicWord.length);

    return (
      <>
        {before}
        <em className="font-serif italic gradient-gold-text">{italicWord}</em>
        {after}.
      </>
    );
  };

  return (
    <Link
      href={`/projets/${project.slug}`}
      aria-label={`Voir le projet ${project.title}`}
      className="group relative block cursor-pointer border-t border-rose-ancien/30 px-5 pt-8 pb-8 transition-all duration-300 hover:-translate-y-1 hover:border-rose-ancien/70 hover:bg-cream-deep/40 md:px-6 md:pb-10"
    >
      {/* Numéro XXL outline en arrière-plan (signature livre blanc) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-2 top-2 font-serif italic text-[5.5rem] leading-none text-rose-ancien/8 transition-colors group-hover:text-rose-ancien/20 sm:text-[7rem] md:right-4 md:text-[10rem]"
      >
        {project.nr}
      </div>

      {/* Label nº */}
      <p className="label-mono mb-5 md:mb-6">
        — Projet Nº {project.nr} / 06
      </p>

      {/* Titre Cormorant XXL */}
      <h2 className="font-serif text-3xl leading-[1.05] text-ink sm:text-4xl md:text-5xl">
        {renderTitle()}
      </h2>

      {/* Sous-titre serif italique */}
      <p className="mt-4 max-w-[28rem] font-serif italic text-base text-taupe leading-snug sm:text-lg md:mt-5 md:text-xl">
        {project.subtitle}
      </p>

      {/* Métadonnée mono */}
      <p className="label-mono mt-6 text-platinum md:mt-8">
        {project.meta}
      </p>

      {/* ─── CTA BOUTON — toujours visible, signale la zone cliquable ─── */}
      <div className="mt-8 inline-flex items-center gap-3 border border-rose-ancien/70 bg-cream/60 px-5 py-2.5 transition-all duration-300 group-hover:border-rose-ancien group-hover:bg-prune group-hover:text-cream md:mt-10">
        <span className="label-mono text-rose-ancien transition-colors group-hover:text-gold-soft">
          Voir le projet
        </span>
        <span
          aria-hidden
          className="text-rose-ancien transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-soft"
        >
          →
        </span>
      </div>
    </Link>
  );
}
