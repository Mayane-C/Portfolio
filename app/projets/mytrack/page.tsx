import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { Section } from "@/components/Section";
import { PullQuote } from "@/components/PullQuote";
import { Carousel, type CarouselItem } from "@/components/Carousel";
import { ProjectNav } from "@/components/ProjectNav";
import { getProjectBySlug } from "@/data/projects";

const project = getProjectBySlug("mytrack")!;

export const metadata: Metadata = {
  title: `${project.title} · Personnaliser le parcours étudiant`,
  description: project.subtitle,
};

const captures: CarouselItem[] = [
  {
    type: "image",
    src: "/projects/mytrack/01-dashboard.webp",
    alt: "Tableau de bord MyTrack — Bienvenue dans votre parcours hybride avec socle commun et CTA spécialisation",
    caption: "Tableau de bord · entrée du parcours",
  },
  {
    type: "image",
    src: "/projects/mytrack/02-choix.webp",
    alt: "Choix d'expertise MyTrack — 3 cards Option UX Design, Data Strategy, Digital Marketing",
    caption: "Choix d'expertise · 3 voies présentées en cards",
  },
  {
    type: "image",
    src: "/projects/mytrack/03-confirmation.webp",
    alt: "Écran de confirmation MyTrack — Félicitations, inscription UX Design validée",
    caption: "Confirmation · feedback positif après inscription",
  },
  {
    type: "image",
    src: "/projects/mytrack/04-profil.webp",
    alt: "Profil mis à jour MyTrack — progression Tronc Commun 100%, Programme UX 35%, planning et ressources",
    caption: "Profil mis à jour · progression + planning + ressources",
  },
];

export default function MyTrackPage() {
  return (
    <>
      <MonoBanner
        centerLabel={`PROJET Nº ${project.nr} / 06 · MYTRACK`}
        cartouche={`Nº ${project.nr} — MAI 2026`}
      />

      <ProjectHero project={project} contextLabel="M2 ESD · Cours UX" />

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
            Le choix d&apos;option est vécu comme complexe et incertain —
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
            Inverser le modèle de décision.
          </em>{" "}
          L&apos;étudiant ne choisit plus une option d&apos;études en
          espérant qu&apos;elle mène à un métier — il choisit un métier
          concret <em className="italic text-taupe">
            (Product Designer, UX Researcher, Data Analyst…)
          </em>{" "}
          et l&apos;interface en déduit l&apos;option qui y conduit.
        </p>
        <p className="font-sans text-lg italic text-taupe mt-5 max-w-3xl">
          Le métier devient le critère. L&apos;option, sa conséquence.
        </p>
      </Section>

      <Section label="La démarche" compact>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Étape 01</p>
            <p className="font-serif italic text-lg text-ink">
              Wireframes papier
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Premières intentions, croquis main.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Étape 02</p>
            <p className="font-serif italic text-lg text-ink">
              Premier rendu génératif
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Maquettage IA depuis un prompt structuré.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Étape 03</p>
            <p className="font-serif italic text-lg text-ink">
              Retouches manuelles
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Palette, hiérarchie, logo retravaillés.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Étape 04</p>
            <p className="font-serif italic text-lg text-ink">
              Plan de test
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Tests modérés en présentiel · 5 utilisateurs (Nielsen).
            </p>
          </li>
        </ul>
      </Section>

      {/* ─── Carousel des 4 écrans ──────────────────────────── */}
      <div className="px-6 md:px-12">
        <Carousel items={captures} ratio="16/10" />
      </div>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

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

      <MonoFooter centerLabel="MyTrack · Projet Nº 04" />
    </>
  );
}
