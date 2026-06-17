import Link from "next/link";
import { projects } from "@/data/projects";

interface ProjectNavProps {
  currentSlug: string;
}

/**
 * Navigation projet précédent / suivant.
 * Boutons compacts au contenu centré, plus de moitié vide.
 */
export function ProjectNav({ currentSlug }: ProjectNavProps) {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  return (
    <section className="px-6 md:px-12 pt-12 pb-10 md:pt-16">
      <div className="border-t border-rose-ancien/30 pt-10">
        {/* Boutons précédent / suivant centrés et compacts */}
        <div className="mx-auto flex max-w-3xl flex-wrap items-stretch justify-center gap-4 md:gap-6">
          {prev && (
            <Link
              href={`/projets/${prev.slug}`}
              className="group flex flex-1 min-w-[14rem] items-center justify-center gap-3 border-2 border-rose-ancien bg-cream-deep/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-prune hover:shadow-lg"
              aria-label={`Projet précédent : ${prev.title}`}
            >
              <span
                aria-hidden
                className="font-serif text-2xl text-rose-ancien transition-all duration-300 group-hover:-translate-x-1 group-hover:text-gold-soft md:text-3xl"
              >
                ←
              </span>
              <div className="flex flex-col items-start gap-0.5 text-left">
                <span className="label-mono text-rose-ancien transition-colors group-hover:text-gold-soft">
                  Précédent
                </span>
                <span className="font-serif italic text-base text-ink transition-colors group-hover:text-cream md:text-lg">
                  Nº {prev.nr} · {prev.title}
                </span>
              </div>
            </Link>
          )}

          {next && (
            <Link
              href={`/projets/${next.slug}`}
              className="group flex flex-1 min-w-[14rem] items-center justify-center gap-3 border-2 border-rose-ancien bg-cream-deep/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-prune hover:shadow-lg"
              aria-label={`Projet suivant : ${next.title}`}
            >
              <div className="flex flex-col items-end gap-0.5 text-right">
                <span className="label-mono text-rose-ancien transition-colors group-hover:text-gold-soft">
                  Suivant
                </span>
                <span className="font-serif italic text-base text-ink transition-colors group-hover:text-cream md:text-lg">
                  Nº {next.nr} · {next.title}
                </span>
              </div>
              <span
                aria-hidden
                className="font-serif text-2xl text-rose-ancien transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-soft md:text-3xl"
              >
                →
              </span>
            </Link>
          )}
        </div>

        {/* Retour grille */}
        <div className="mt-8 text-center">
          <Link
            href="/#projets"
            className="label-mono text-rose-ancien hover:text-gold-ink transition-colors"
          >
            Retour à la grille des projets
          </Link>
        </div>
      </div>
    </section>
  );
}
