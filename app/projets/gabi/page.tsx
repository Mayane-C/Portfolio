import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { Section } from "@/components/Section";
import { PullQuote } from "@/components/PullQuote";
import { VideoSlot } from "@/components/VideoSlot";
import { NumberedStep } from "@/components/NumberedStep";
import { ProjectNav } from "@/components/ProjectNav";
import { getProjectBySlug } from "@/data/projects";

const project = getProjectBySlug("gabi")!;

export const metadata: Metadata = {
  title: `${project.title} · La prise de poste du conducteur`,
  description: project.subtitle,
};

export default function GabiPage() {
  return (
    <>
      <MonoBanner
        centerLabel={`PROJET Nº ${project.nr} / 06 · GABI`}
        cartouche={`Nº ${project.nr} — MAI 2026`}
      />

      <ProjectHero project={project} contextLabel="M1 ESD · UI Design" />

      <Section label="Le projet collectif">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            <strong className="font-semibold">GABI</strong> —{" "}
            <em className="italic text-gold-ink">
              Gestion des Arrêts de Bus en Île-de-France
            </em>{" "}
            — est une refonte de l&apos;interface tablette embarquée des
            chauffeurs de bus, menée en groupe de quatre. Les interfaces
            existantes sont dispersées, ignorantes du métier réel : le
            conducteur passe son temps à se battre avec un outil qui
            devrait l&apos;assister.
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Phase commune : moodboard, direction artistique{" "}
            <em className="italic text-gold-ink">
              (dark mode pour la conduite, accents colorés par ligne)
            </em>
            , architecture des écrans. Puis répartition : chacun prend en
            charge un parcours du quotidien conducteur.
          </p>
        </div>
      </Section>

      <div className="px-6 md:px-12">
        <VideoSlot
          src="/projects/gabi/demo.mp4"
          caption="Démo générale du projet · les quatre parcours conducteur"
          ratio="16/10"
        />
      </div>

      <Section label="Mon périmètre · la prise de poste">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Le moment où le conducteur monte dans son bus, allume sa
            tablette, et doit pouvoir partir{" "}
            <em className="italic text-gold-ink">
              en moins d&apos;une minute
            </em>
            . Pas un onboarding première-fois — un parcours quotidien,
            répété à chaque service.
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Un parcours en quatre étapes pour que ces deux minutes ne
            dépendent jamais de la mémoire du conducteur — ni de la ligne
            du jour, ni de l&apos;ordre des arrêts.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          <NumberedStep
            nr="01"
            label="Étape"
            title="Vue carte initiale"
            description="Les bus possibles à l'intersection courante."
          />
          <NumberedStep
            nr="02"
            label="Étape"
            title="Sélection rapide"
            description="Dropdown bus + dropdown direction."
          />
          <NumberedStep
            nr="03"
            label="Étape"
            title="Itinéraire chargé"
            description="Trajet visualisé + liste des arrêts + Démarrer."
          />
          <NumberedStep
            nr="04"
            label="Étape"
            title="En route"
            description="Arrêt courant surligné en temps réel."
          />
        </ul>
      </Section>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      <ProjectNav currentSlug={project.slug} />

      <MonoFooter centerLabel="GABI · Projet Nº 05" />
    </>
  );
}
