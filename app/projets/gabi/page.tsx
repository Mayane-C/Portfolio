import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { Section } from "@/components/Section";
import { PullQuote } from "@/components/PullQuote";
import { CaptureSlot } from "@/components/CaptureSlot";
import { VideoSlot } from "@/components/VideoSlot";
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

      <div className="px-6 md:px-12">
        <CaptureSlot
          src="/projects/gabi/01-initial.png"
          alt="Vue carte initiale GABI — Quel bus, Quelle direction, 3 cards lignes de bus 23/34/60"
          caption="Vue initiale · choix du bus et de la direction"
          ratio="16/10"
        />
      </div>

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
            Quatre écrans pour que ces deux minutes ne dépendent jamais de
            la mémoire du conducteur — ni de la ligne du jour, ni de
            l&apos;ordre des arrêts.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Étape 01</p>
            <p className="font-serif italic text-lg text-ink">
              Vue carte initiale
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Les bus possibles à l&apos;intersection courante.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Étape 02</p>
            <p className="font-serif italic text-lg text-ink">
              Sélection rapide
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Dropdown bus + dropdown direction.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Étape 03</p>
            <p className="font-serif italic text-lg text-ink">
              Itinéraire chargé
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Trajet visualisé + liste des arrêts + Démarrer.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Étape 04</p>
            <p className="font-serif italic text-lg text-ink">
              En route
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Arrêt courant surligné en temps réel.
            </p>
          </li>
        </ul>
      </Section>

      <div className="px-6 md:px-12">
        <CaptureSlot
          src="/projects/gabi/02-selection.png"
          alt="Sélection rapide GABI — dropdown bus 250/43 + destination Gare de Lyon"
          caption="Sélection · dropdown rapide bus + direction"
          ratio="16/10"
        />
        <CaptureSlot
          src="/projects/gabi/03-itineraire.png"
          alt="Itinéraire chargé GABI — trajet bleu sur carte + liste arrêts + bouton Démarrer"
          caption="Itinéraire · trajet visualisé avant le départ"
          ratio="16/10"
        />
        <CaptureSlot
          src="/projects/gabi/04-conduite.webp"
          alt="En conduite GABI — arrêt République surligné en bleu, autres arrêts en gris"
          caption="En conduite · arrêt courant surligné"
          ratio="16/10"
        />
      </div>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      <ProjectNav currentSlug={project.slug} />

      <MonoFooter centerLabel="GABI · Projet Nº 05" />
    </>
  );
}
