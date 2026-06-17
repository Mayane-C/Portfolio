import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { PullQuote } from "@/components/PullQuote";
import { SwappableShowcase, type ShowcaseItem } from "@/components/SwappableShowcase";
import { ExternalProjectCTA } from "@/components/ExternalProjectCTA";
import { ProjectNav } from "@/components/ProjectNav";
import { getProjectBySlug } from "@/data/projects";

const project = getProjectBySlug("chamylinex")!;

export const metadata: Metadata = {
  title: `${project.title} · Mission e-commerce B2B`,
  description: project.subtitle,
};

const videos: ShowcaseItem[] = [
  {
    type: "video",
    src: "/projects/chamylinex/01-home.mp4",
    caption: "Page d'accueil",
  },
  {
    type: "video",
    src: "/projects/chamylinex/02-catalogue.mp4",
    caption: "Catalogue grossiste",
  },
  {
    type: "video",
    src: "/projects/chamylinex/03-panier.mp4",
    caption: "Panier",
  },
  {
    type: "video",
    src: "/projects/chamylinex/04-mon-compte.mp4",
    caption: "Espace acheteur pro",
  },
  {
    type: "video",
    src: "/projects/chamylinex/05-contact.mp4",
    caption: "Demande de devis",
  },
];

export default function ChamylinexPage() {
  return (
    <>
      <MonoBanner
        centerLabel={`PROJET Nº ${project.nr} / 06 · CHAMYLINEX`}
        cartouche={`Nº ${project.nr} · MAI 2026`}
      />

      <ProjectHero
        project={project}
        contextLabel="Mission client indépendante"
      />

      {/* ─── 5 écrans, vidéo en vedette interchangeable ─────── */}
      <div className="px-4 md:px-12">
        <SwappableShowcase items={videos} size="xlarge" />
      </div>

      {/* ─── CTA externe APRÈS les écrans ────────────────────── */}
      {project.externalLink && (
        <ExternalProjectCTA
          label="Voir le projet en interaction"
          externalLink={project.externalLink}
        />
      )}

      {/* ─── Contexte + Approche en 2 colonnes compactes ───── */}
      <section className="px-6 md:px-12 py-10 md:py-14">
        <div className="border-t border-rose-ancien/30 pt-8 md:pt-10">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 md:gap-x-12">
            {/* COL 1, contexte */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="block h-px w-6 bg-rose-ancien" />
                <span className="label-mono text-rose-ancien">
                  Le contexte
                </span>
              </div>
              <p className="font-sans text-sm md:text-base text-ink leading-snug">
                <strong className="font-semibold">Chamylinex</strong>{" "}
                distribue des produits FMCG{" "}
                <em className="italic text-gold-ink">
                  (Fast-Moving Consumer Goods)
                </em>{" "}
                en B2B vers la France. L&apos;existant ne reflétait ni la
                promesse internationale, ni le sérieux d&apos;une plateforme
                grossiste. UI dépassée, parcours fragmenté, aucune cohérence.
                Mission ponctuelle, confiée par recommandation.
              </p>
            </div>

            {/* COL 2, approche */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="block h-px w-6 bg-rose-ancien" />
                <span className="label-mono text-rose-ancien">
                  L&apos;approche
                </span>
              </div>
              <p className="font-sans text-sm md:text-base text-ink leading-snug">
                Sans design system préexistant, le logo devient la seule
                contrainte. À partir de là, tout se déduit&nbsp;: palette{" "}
                <em className="italic text-gold-ink">
                  (navy profond, lavande)
                </em>
                , hiérarchie typographique, ton professionnel mais
                accessible. Reconstruction du parcours acheteur&nbsp;:
                accueil → catalogue → recherche → devis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull-quote signature */}
      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      <ProjectNav currentSlug={project.slug} />

      <MonoFooter centerLabel="Chamylinex · Projet Nº 01" />
    </>
  );
}
