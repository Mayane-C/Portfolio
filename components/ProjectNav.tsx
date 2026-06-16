import Link from "next/link";
import { projects } from "@/data/projects";

interface ProjectNavProps {
  currentSlug: string;
}

/**
 * Navigation projet suivant / précédent + retour à la grille.
 *
 * Style bouton fort : border encadré terracotta, fond crème, hover plein
 * bordeaux. Les liens "Précédent" et "Suivant" deviennent de vraies CTAs
 * visibles, plus des labels discrets.
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
        {/* Boutons précédent / suivant côte à côte */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Précédent */}
          {prev ? (
            <Link
              href={`/projets/${prev.slug}`}
              className="group flex items-center gap-4 border-2 border-rose-ancien bg-cream-deep/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-prune hover:shadow-lg md:px-6 md:py-5"
              aria-label={`Projet précédent : ${prev.title}`}
            >
              <span
                aria-hidden
                className="font-serif text-3xl text-rose-ancien transition-all duration-300 group-hover:-translate-x-1 group-hover:text-gold-soft md:text-4xl"
              >
                ←
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="label-mono text-rose-ancien transition-colors group-hover:text-gold-soft">
                  Précédent
                </span>
                <span className="font-serif italic text-lg text-ink truncate transition-colors group-hover:text-cream md:text-xl">
                  Nº {prev.nr} · {prev.title}
                </span>
              </div>
            </Link>
          ) : (
            <div /> /* placeholder pour garder la grille à 2 cols */
          )}

          {/* Suivant */}
          {next ? (
            <Link
              href={`/projets/${next.slug}`}
              className="group flex items-center justify-end gap-4 border-2 border-rose-ancien bg-cream-deep/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-prune hover:shadow-lg md:px-6 md:py-5"
              aria-label={`Projet suivant : ${next.title}`}
            >
              <div className="flex flex-col gap-0.5 min-w-0 text-right">
                <span className="label-mono text-rose-ancien transition-colors group-hover:text-gold-soft">
                  Suivant
                </span>
                <span className="font-serif italic text-lg text-ink truncate transition-colors group-hover:text-cream md:text-xl">
                  Nº {next.nr} · {next.title}
                </span>
              </div>
              <span
                aria-hidden
                className="font-serif text-3xl text-rose-ancien transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-soft md:text-4xl"
              >
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Retour grille, centré sous les boutons */}
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
