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
        cartouche={`Nº ${project.nr} — MAI 2026`}
      />

      <ProjectHero project={project} contextLabel="M1 ESD · UI Design" />

      <div className="px-6 md:px-12">
        <CaptureSlot
          src="/projects/chartier-dalix/01-hero.webp"
          alt="Hero homepage Chartier Dalix — photo nocturne d'un bâtiment moderne en bord de port avec logo en bas"
          caption="Hero homepage · photographie pleine page"
          ratio="16/10"
        />
      </div>

      <Section label="Le constat">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            <strong className="font-semibold">Chartier Dalix</strong> est
            un cabinet d&apos;architecture parisien. L&apos;exercice imposé
            par le cours UI Design : choisir un site d&apos;agence{" "}
            <em className="italic text-gold-ink">mal conçu</em> et le
            refaire entièrement.
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            L&apos;existant traitait le contenu comme une plaquette
            commerciale : photos comprimées, hiérarchie plate, et surtout
            un système éditorial fort{" "}
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
            Refaire le site sans rien réinventer —{" "}
            <em className="italic text-gold-ink">
              préserver et amplifier
            </em>{" "}
            ce qui marchait déjà : la numérotation des projets, la
            signature typographique. Et bâtir le reste autour d&apos;elle,
            comme un vrai catalogue d&apos;archives.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Pivot 01</p>
            <p className="font-serif italic text-lg text-ink">
              Système numéroté remis au centre
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Décompte rétrograde 101 → 01, comme une publication.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Pivot 02</p>
            <p className="font-serif italic text-lg text-ink">
              Photographie pleine page
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              L&apos;architecture occupe l&apos;écran avant le texte.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Pivot 03</p>
            <p className="font-serif italic text-lg text-ink">
              Logo bicolor préservé
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Brutaliste-élégant, lisible — gagne en présence.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">Pivot 04</p>
            <p className="font-serif italic text-lg text-ink">
              Footer-bandeau dark récurrent
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Signature visuelle de chaque page.
            </p>
          </li>
        </ul>
      </Section>

      <div className="px-6 md:px-12">
        <CaptureSlot
          src="/projects/chartier-dalix/02-projets.webp"
          alt="Page Projets Chartier Dalix — hero mosaïque et grille de projets numérotés 101, 100, 99..."
          caption="Page Projets · grille numérotée en décompte"
          ratio="9/16"
        />
        <CaptureSlot
          src="/projects/chartier-dalix/03-fiche.png"
          alt="Fiche projet 101 — Métamorphose Dijon-Maret, image hero, métadonnées et texte éditorial"
          caption="Fiche projet 101 · pivot éditorial du système"
          ratio="9/16"
        />
      </div>

      <div className="px-6 md:px-12">
        <VideoSlot
          src="/projects/chartier-dalix/demo.mp4"
          caption="Démo Protopie · navigation interactive du prototype"
          ratio="16/10"
        />
      </div>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      <ProjectNav currentSlug={project.slug} />

      <MonoFooter centerLabel="Chartier Dalix · Projet Nº 06" />
    </>
  );
}
