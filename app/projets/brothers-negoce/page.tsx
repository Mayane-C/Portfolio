import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { Section } from "@/components/Section";
import { PullQuote } from "@/components/PullQuote";
import { Carousel, type CarouselItem } from "@/components/Carousel";
import { NumberedStep } from "@/components/NumberedStep";
import { ProjectNav } from "@/components/ProjectNav";
import { getProjectBySlug } from "@/data/projects";

const project = getProjectBySlug("brothers-negoce")!;

export const metadata: Metadata = {
  title: `${project.title} · Système visuel génératif`,
  description: project.subtitle,
};

const captures: CarouselItem[] = [
  {
    type: "image",
    src: "/projects/brothers-negoce/01-cover.png",
    alt: "Cover du design system Brothers Négoce — Système visuel génératif B2B",
    caption: "Cover · système visuel génératif B2B",
  },
  {
    type: "image",
    src: "/projects/brothers-negoce/02-variables.png",
    alt: "Variables & composants — palette de couleurs, typographies et composants typés du design system",
    caption: "Variables & composants · tokens du système",
  },
  {
    type: "image",
    src: "/projects/brothers-negoce/03-templates.png",
    alt: "Exemples de posts générés depuis les 3 familles de templates",
    caption: "Exemples · 9 posts générés depuis les 3 familles",
  },
];

export default function BrothersNegocePage() {
  return (
    <>
      <MonoBanner
        centerLabel={`PROJET Nº ${project.nr} / 06 · BROTHERS NÉGOCE`}
        cartouche={`Nº ${project.nr} — MAI 2026`}
      />

      <ProjectHero project={project} contextLabel="Alternance · M2 ESD" />

      <Section label="Le contexte">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            <strong className="font-semibold">Brothers Négoce</strong>{" "}
            distribue du matériel énergétique{" "}
            <em className="italic text-gold-ink">
              (pompes à chaleur, VMC, éclairage LED)
            </em>{" "}
            à des revendeurs et installateurs B2B en France. À mon arrivée
            en alternance, la communication reposait sur un logo seul + du
            bricolage au cas par cas.
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Incohérence entre les supports, aucun langage partagé entre les
            pôles. Chaque post Meta repartait de zéro, chaque flyer
            réinventait sa palette. Coût caché : du temps, et de la
            cohérence perdue.
          </p>
        </div>
      </Section>

      <Section label="L'approche" compact>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Conception d&apos;un{" "}
            <em className="italic text-gold-ink">système génératif</em> —
            pas une charte figée, un kit modulaire qui produit des visuels
            4:5 cohérents en quelques minutes. Format imposé : Meta /
            Instagram.
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Trois briques structurent le système : des{" "}
            <em className="italic text-gold-ink">tokens couleur</em>{" "}
            (3 principales + 4 secondaires + neutres), des composants typés
            (badges, cartes, headers), et trois familles de templates
            réutilisables.
          </p>
        </div>
      </Section>

      <Section label="Trois familles de templates" compact>
        <p className="font-sans text-base md:text-lg text-ink leading-relaxed max-w-3xl">
          Chaque famille répond à un usage de communication B2B distinct.
          L&apos;équipe choisit la famille, remplit le template,{" "}
          <em className="italic text-gold-ink">publie</em> — la cohérence
          est garantie sans dépendre du designer.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <NumberedStep
            nr="01"
            label="Template"
            title="Produit · gamme"
            description="Pompes à chaleur, VMC, LED — mise en avant produit avec hiérarchie technique claire."
          />
          <NumberedStep
            nr="02"
            label="Template"
            title="Usage · métier"
            description="Approvisionnez vos chantiers, centralisez vos achats — angle opérationnel revendeur."
          />
          <NumberedStep
            nr="03"
            label="Template"
            title="Preuve · valeur"
            description="Stock disponible, expertise technique, réactivité — angle confiance et engagement."
          />
        </ul>
      </Section>

      {/* ─── Carousel des 3 planches ────────────────────────── */}
      <div className="px-6 md:px-12">
        <Carousel items={captures} ratio="4/3" />
      </div>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      {/* Statut — section spécifique Brothers (phase pilote) */}
      <Section label="Statut" compact>
        <p className="font-sans text-base md:text-lg text-ink leading-relaxed max-w-3xl">
          <em className="italic text-gold-ink">
            Phase pilote · en cours de déploiement.
          </em>{" "}
          Premiers templates produits, en validation interne avant
          déploiement à l&apos;échelle de toute la communication B2B
          Brothers Négoce.
        </p>
      </Section>

      <ProjectNav currentSlug={project.slug} />

      <MonoFooter centerLabel="Brothers Négoce · Projet Nº 03" />
    </>
  );
}
