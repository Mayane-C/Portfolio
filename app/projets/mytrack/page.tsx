import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { Section } from "@/components/Section";
import { PullQuote } from "@/components/PullQuote";
import { MacBookFrame } from "@/components/MacBookFrame";
import { NumberedStep } from "@/components/NumberedStep";
import { ProjectNav } from "@/components/ProjectNav";
import { getProjectBySlug } from "@/data/projects";

const project = getProjectBySlug("mytrack")!;

export const metadata: Metadata = {
  title: `${project.title} · Personnaliser le parcours étudiant`,
  description: project.subtitle,
};

export default function MyTrackPage() {
  return (
    <>
      <MonoBanner
        centerLabel={`PROJET Nº ${project.nr} / 06 · MYTRACK`}
        cartouche={`Nº ${project.nr} · MAI 2026`}
      />

      <ProjectHero project={project} contextLabel="Cas d'étude UX · Aide à la décision" />

      {/* ─── Vidéo en haut, gros format ──────────────────────── */}
      <div className="px-4 md:px-12">
        <MacBookFrame
          src="/projects/mytrack/00-demo.mp4"
          caption="Démo · parcours utilisateur complet"
        />
      </div>

      <Section label="La problématique UX">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Les étudiants en M2 Design Digital font face à une{" "}
            <em className="italic text-gold-ink">surcharge cognitive</em>{" "}
            au moment de choisir leur option de spécialisation : diversité
            des débouchés digitaux, formation perçue comme trop généraliste,
            anxiété sur l&apos;employabilité future.
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Le choix d&apos;option est vécu comme complexe et incertain,
            non parce qu&apos;il manque d&apos;information, mais parce que
            le modèle de décision lui-même est inversé : on demande à
            l&apos;étudiant de choisir un concept (UX, Data, Marketing)
            pour ensuite y projeter un métier.
          </p>
        </div>
        <div className="mt-10 max-w-3xl">
          <p className="font-serif italic text-xl text-prune leading-snug border-l-2 border-rose-ancien pl-5">
            « Comment concevoir une interface qui transforme la perception
            d&apos;une formation généraliste en un parcours d&apos;expertise
            personnalisé, en s&apos;appuyant sur la découverte concrète des
            métiers pour valider le choix d&apos;une option ? »
          </p>
        </div>
      </Section>

      <Section label="La proposition design" compact>
        <p className="font-sans text-base md:text-lg text-ink leading-relaxed max-w-3xl">
          <em className="italic text-gold-ink">
            Offrir une double porte d&apos;entrée.
          </em>{" "}
          L&apos;étudiant choisit directement son option s&apos;il sait
          déjà où il va. Sinon, il explore les fiches métiers concrets{" "}
          <em className="italic text-taupe">
            (Product Designer, UX Researcher, Data Analyst…)
          </em>{" "}
         , chacune indique l&apos;option qui y mène.
        </p>
        <p className="font-sans text-lg italic text-taupe mt-5 max-w-3xl">
          Les fiches métiers ne forcent pas le choix, elles le rendent
          plus serein pour qui hésite.
        </p>
      </Section>

      <Section label="La démarche" compact>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <NumberedStep
            nr="01"
            label="Étape"
            title="Wireframes papier"
            description="Premières intentions, croquis main."
          />
          <NumberedStep
            nr="02"
            label="Étape"
            title="Maquettage Figma"
            description="Premier rendu des écrans clés."
          />
          <NumberedStep
            nr="03"
            label="Étape"
            title="Retouches manuelles"
            description="Palette, hiérarchie, logo retravaillés."
          />
          <NumberedStep
            nr="04"
            label="Étape"
            title="Plan de test"
            description="Tests modérés en présentiel · 5 utilisateurs (Nielsen)."
          />
        </ul>
      </Section>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      {project.externalLink && (
        <section className="px-6 md:px-12 py-12">
          <div className="border-t border-rose-ancien/30 pt-10 text-center">
            <p className="label-mono text-platinum mb-3">
             Voir le travail en interaction
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

      <MonoFooter centerLabel="MyTrack · Projet Nº 04" />
    </>
  );
}
