import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { Section } from "@/components/Section";
import { PullQuote } from "@/components/PullQuote";
import { Carousel } from "@/components/Carousel";
import { SideLabel } from "@/components/SideLabel";
import { ProjectNav } from "@/components/ProjectNav";
import { getProjectBySlug } from "@/data/projects";

const project = getProjectBySlug("chamylinex")!;

export const metadata: Metadata = {
  title: `${project.title} · Mission e-commerce B2B`,
  description: project.subtitle,
};

import type { CarouselItem } from "@/components/Carousel";

const captures: CarouselItem[] = [
  {
    type: "video",
    src: "/projects/chamylinex/01-home.mp4",
    caption: "Page d'accueil · navigation et hero",
  },
  {
    type: "video",
    src: "/projects/chamylinex/02-catalogue.mp4",
    caption: "Catalogue grossiste · recherche, filtres, fiches produits",
  },
  {
    type: "video",
    src: "/projects/chamylinex/03-panier.mp4",
    caption: "Panier · sélection et récapitulatif commande",
  },
  {
    type: "video",
    src: "/projects/chamylinex/04-mon-compte.mp4",
    caption: "Mon compte · espace acheteur professionnel",
  },
  {
    type: "video",
    src: "/projects/chamylinex/05-contact.mp4",
    caption: "Contact · demande de devis",
  },
];

export default function ChamylinexPage() {
  return (
    <>
      <SideLabel>Chamylinex · E-commerce B2B · Projet Nº 01</SideLabel>
      <MonoBanner
        centerLabel={`PROJET Nº ${project.nr} / 06 · CHAMYLINEX`}
        cartouche={`Nº ${project.nr} — MAI 2026`}
      />

      <ProjectHero
        project={project}
        contextLabel="Mission client indépendante"
      />

      {/* ─── Le contexte ─────────────────────────────────────── */}
      <Section label="Le contexte">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            <strong className="font-semibold">Chamylinex</strong> distribue
            des produits FMCG <em className="italic text-gold-ink">
              (Fast-Moving Consumer Goods)
            </em>{" "}
            en B2B vers la France. À mon arrivée, l&apos;existant ne
            reflétait ni la promesse internationale, ni le sérieux d&apos;une
            plateforme grossiste.
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            UI dépassée, parcours fragmenté, aucune cohérence entre les
            pages. Mission ponctuelle, hors-école et hors-alternance,
            confiée par recommandation depuis Brothers Négoce.
          </p>
        </div>
      </Section>

      {/* ─── L'approche ──────────────────────────────────────── */}
      <Section label="L'approche" compact>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Sans design system préexistant, le logo devient la seule
            contrainte. À partir de là, tout se déduit : palette{" "}
            <em className="italic text-gold-ink">
              (navy profond + lavande)
            </em>
            , hiérarchie typographique, ton{" "}
            <em className="italic text-gold-ink">
              &quot;professionnel mais accessible&quot;
            </em>
            .
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Reconstruction complète du parcours acheteur professionnel :
            accueil → catalogue → recherche → demande de devis. Maquettage
            de quatre écrans clés, validés par le client.
          </p>
        </div>
      </Section>

      {/* ─── Carousel des 4 captures ────────────────────────── */}
      <div className="px-6 md:px-12">
        <Carousel items={captures} ratio="16/10" />
      </div>

      {/* Pull-quote signature */}
      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      {/* ─── CTA fin ─────────────────────────────────────────── */}
      {project.externalLink && (
        <section className="px-6 md:px-12 py-12">
          <div className="border-t border-rose-ancien/30 pt-10 text-center">
            <p className="label-mono text-platinum mb-3">
              — Voir le travail en interaction
            </p>
            <a
              href={project.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif italic text-3xl md:text-4xl text-ink hover:text-gold-ink transition-colors inline-block"
            >
              {project.externalLink.label}{" "}
              <span className="gradient-gold-text">→</span>
            </a>
            <p className="label-mono mt-3 text-platinum text-[10px]">
              {project.externalLink.url}
            </p>
          </div>
        </section>
      )}

      <ProjectNav currentSlug={project.slug} />

      <MonoFooter centerLabel="Chamylinex · Projet Nº 01" />
    </>
  );
}
