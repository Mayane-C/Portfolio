import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

/**
 * Card projet — utilisée dans la grille 2×3 de la homepage.
 * Inspirée des cards "Quatre leçons" et "Sept conseils" du livre blanc :
 * - numéro outline en arrière-plan
 * - hairline supérieure
 * - titre Cormorant XXL avec mot-accent italique gold
 * - sous-titre serif italique
 * - métadonnée mono
 * - hover : la card se "lève" légèrement, le chiffre se densifie
 */
export function ProjectCard({ project }: ProjectCardProps) {
  // Compose le titre avec ou sans italique sur un mot
  const renderTitle = () => {
    const { title, italicWord } = project;
    if (!italicWord) {
      return <>{title}.</>;
    }
    // Split sur le mot à italiquer (premier match)
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
      className="group relative block border-t border-rose-ancien/30 pt-8 pb-10 transition-colors hover:border-rose-ancien/70"
    >
      {/* Numéro XXL outline en arrière-plan (signature livre blanc) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-2 font-serif italic text-[5.5rem] leading-none text-rose-ancien/8 transition-colors group-hover:text-rose-ancien/15 sm:text-[7rem] md:text-[10rem]"
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

      {/* Métadonnée mono — bas de card */}
      <p className="label-mono mt-6 text-platinum md:mt-8">
        {project.meta}
      </p>

      {/* CTA discret en hover (desktop) ou toujours visible (mobile, pour mieux signaler la zone tappable) */}
      <p className="label-mono mt-3 text-rose-ancien opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        Voir le projet →
      </p>
    </Link>
  );
}
