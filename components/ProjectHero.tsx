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
    <section className="px-6 pt-8 pb-12 md:px-12 md:pt-16 md:pb-24">
      {/* Label contexte + Nº */}
      <div className="mb-6 flex items-start gap-3 md:mb-8 md:items-center">
        <span className="mt-2 block h-px w-8 bg-rose-ancien md:mt-0 md:w-12" />
        <span className="label-mono text-rose-ancien">
          Projet Nº {project.nr} · {contextLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 md:gap-x-8">
        {/* Titre principal */}
        <div className="md:col-span-9">
          <h1 className="font-serif text-5xl leading-[0.95] text-ink sm:text-6xl md:text-[7rem]">
            {renderTitle()}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl italic text-taupe leading-snug md:mt-8 md:text-3xl">
            {project.subtitle}
          </p>
        </div>

        {/* Méta éditoriale à droite : contexte + compétences */}
        <aside className="md:col-span-3 md:pt-4">
          <div className="space-y-6 border-l border-rose-ancien/50 pl-4">
            <div>
              <p className="label-mono text-platinum">Contexte</p>
              <p className="font-sans text-sm text-ink mt-2 leading-relaxed">
                {project.meta}
              </p>
            </div>
            {project.skills && project.skills.length > 0 && (
              <div>
                <p className="label-mono text-platinum">Compétences</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-rose-ancien/40 bg-cream-deep/40 px-2.5 py-1 font-sans text-xs text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
