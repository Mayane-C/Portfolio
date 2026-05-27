import type { Project } from "@/data/projects";

interface ProjectHeroProps {
  project: Project;
  /** Contexte affiché en label haut — ex: "M2 ESD · COURS CREATECH" */
  contextLabel: string;
}

/**
 * Hero de chaque page projet — pattern repris des chapitres du livre blanc :
 * label terracotta + titre Cormorant XXL + sous-titre serif italique + méta mono.
 */
export function ProjectHero({ project, contextLabel }: ProjectHeroProps) {
  const renderTitle = () => {
    const { title, italicWord } = project;
    if (!italicWord) {
      return <>{title}.</>;
    }
    const idx = title.indexOf(italicWord);
    if (idx === -1) return <>{title}.</>;
    return (
      <>
        {title.slice(0, idx)}
        <em className="font-serif italic gradient-gold-text">{italicWord}</em>
        {title.slice(idx + italicWord.length)}.
      </>
    );
  };

  return (
    <section className="px-8 pt-10 pb-16 md:px-12 md:pt-16 md:pb-24">
      {/* Label contexte + Nº */}
      <div className="mb-8 flex items-center gap-3">
        <span className="block h-px w-12 bg-rose-ancien" />
        <span className="label-mono text-rose-ancien">
          Projet Nº {project.nr} · {contextLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-8">
        {/* Titre principal */}
        <div className="md:col-span-9">
          <h1 className="font-serif text-[3.5rem] leading-[0.95] text-ink md:text-[7rem]">
            {renderTitle()}
          </h1>
          <p className="mt-8 max-w-2xl font-serif text-2xl italic text-taupe leading-snug md:text-3xl">
            {project.subtitle}
          </p>
        </div>

        {/* Méta éditoriale à droite */}
        <aside className="md:col-span-3 md:pt-4">
          <div className="border-l border-rose-ancien/30 pl-4">
            <p className="label-mono text-platinum">Métadonnées</p>
            <p className="font-sans text-sm text-ink mt-2 leading-relaxed">
              {project.meta}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
