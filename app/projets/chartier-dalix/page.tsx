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

const project = getProjectBySlug("chartier-dalix")!;

export const metadata: Metadata = {
  title: `${project.title} · Refonte d'un site d'architecture`,
  description: project.subtitle,
};

export default function ChartierDalixPage() {
  return (
    <>
      <MonoBanner
        centerLabel={`PROJET Nº ${project.nr} / 06 · CHARTIER DALIX`}
        cartouche={`Nº ${project.nr} · MAI 2026`}
      />

      <ProjectHero project={project} contextLabel="Cas d'étude UI · Site éditorial" />

      {/* ─── Vidéo en haut, gros format ──────────────────────── */}
      <div className="px-4 md:px-12">
        <MacBookFrame
          src="/projects/chartier-dalix/demo.mp4"
          caption="Démo Protopie · navigation interactive du prototype"
        />
      </div>

      <Section label="Le constat">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            <strong className="font-semibold">Chartier Dalix</strong>{" "}
            est un cabinet d&apos;architecture parisien. L&apos;exercice imposé
            par le cours UI Design : choisir un site d&apos;agence{" "}
            <em className="italic text-gold-ink">mal conçu</em> et le
            refaire entièrement.
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            L&apos;
            <a
              href="https://www.chartier-dalix.com/fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-rose-ancien decoration-1 underline-offset-4 transition-colors hover:text-gold-ink"
            >
              existant
            </a>{" "}
            traitait le contenu comme une plaquette commerciale : photos
            comprimées, hiérarchie plate, et surtout un système éditorial
            fort{" "}
            <em className="italic text-taupe">
              (la numérotation des projets)
            </em>{" "}
            noyé dans l&apos;interface au lieu d&apos;en être le pivot.
          </p>
        </div>
      </Section>

      <Section label="La proposition" compact>
        <div className="max-w-3xl">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Refaire le site sans rien réinventer,{" "}
            <em className="italic text-gold-ink">
              préserver et amplifier
            </em>{" "}
            ce qui marchait déjà : la numérotation des projets, la
            signature typographique. Et bâtir le reste autour d&apos;elle,
            comme un vrai catalogue d&apos;archives.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <NumberedStep
            nr="01"
            label="Pivot"
            title="Système numéroté remis au centre"
            description="Décompte rétrograde 101 → 01, comme une publication."
          />
          <NumberedStep
            nr="02"
            label="Pivot"
            title="Photographie pleine page"
            description="L'architecture occupe l'écran avant le texte."
          />
          <NumberedStep
            nr="03"
            label="Pivot"
            title="Logo bicolor préservé"
            description="Brutaliste-élégant, lisible, gagne en présence."
          />
          <NumberedStep
            nr="04"
            label="Pivot"
            title="Footer-bandeau dark récurrent"
            description="Signature visuelle de chaque page."
          />
        </ul>
      </Section>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      <ProjectNav currentSlug={project.slug} />

      <MonoFooter centerLabel="Chartier Dalix · Projet Nº 06" />
    </>
  );
}
