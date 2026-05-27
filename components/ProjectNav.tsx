import Link from "next/link";
import { projects } from "@/data/projects";

interface ProjectNavProps {
  currentSlug: string;
}

/**
 * Navigation projet suivant / précédent + retour à la grille.
 * Pattern repris des "Précédent / Suivant" des fiches projets Chartier Dalix.
 */
export function ProjectNav({ currentSlug }: ProjectNavProps) {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  return (
    <section className="px-8 md:px-12 pt-12 pb-8 md:pt-16">
      <div className="border-t border-rose-ancien/30 pt-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Précédent */}
          <div>
            {prev ? (
              <Link
                href={`/projets/${prev.slug}`}
                className="group block"
              >
                <p className="label-mono text-platinum">← Précédent</p>
                <p className="mt-2 font-serif italic text-xl text-ink group-hover:text-gold-ink transition-colors">
                  Nº {prev.nr} · {prev.title}
                </p>
              </Link>
            ) : null}
          </div>

          {/* Retour grille — centre */}
          <div className="text-center">
            <Link
              href="/"
              className="label-mono text-rose-ancien hover:text-gold-ink transition-colors"
            >
              Retour à la grille des projets
            </Link>
          </div>

          {/* Suivant */}
          <div className="md:text-right">
            {next ? (
              <Link
                href={`/projets/${next.slug}`}
                className="group block"
              >
                <p className="label-mono text-platinum">Suivant →</p>
                <p className="mt-2 font-serif italic text-xl text-ink group-hover:text-gold-ink transition-colors">
                  Nº {next.nr} · {next.title}
                </p>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
