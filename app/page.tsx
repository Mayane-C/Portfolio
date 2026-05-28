import Image from "next/image";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <MonoBanner
        centerLabel="PORTFOLIO · SIX PROJETS"
        cartouche="Nº 01 — MAI 2026"
      />

      <article className="px-6 md:px-12">
        {/* ─── HERO ──────────────────────────────────────────── */}
        <section className="grid grid-cols-1 gap-8 py-12 md:grid-cols-12 md:gap-12 md:gap-x-8 md:py-24">
          {/* Label section */}
          <div className="md:col-span-12">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-rose-ancien md:w-12" />
              <span className="label-mono text-rose-ancien">
                Mayane Cohen · Portfolio · 2026
              </span>
            </div>
          </div>

          {/* Titre principal */}
          <div className="md:col-span-9">
            <h1 className="font-serif text-5xl leading-[0.95] text-ink sm:text-6xl md:text-[7rem]">
              Designer{" "}
              <em className="font-serif italic gradient-gold-text">
                Digital
              </em>
              .
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-xl italic text-taupe leading-snug md:mt-8 md:text-3xl">
              Six projets, du design system B2B à l&apos;expérience IA
              générative. Un fil rouge : la méthode au service du sensible.
            </p>
          </div>

          {/* Portrait + Méta éditoriale à droite — comme un colophon */}
          <aside className="md:col-span-3 md:pt-4">
            {/* Portrait timbre-poste — chaleur humaine en haut de la home */}
            <div className="mb-6 flex items-center gap-4 md:block md:mb-8">
              <div className="relative aspect-[3/4] w-24 overflow-hidden border border-rose-ancien/30 sm:w-28 md:w-full md:max-w-[180px]">
                <Image
                  src="/portrait.jpg"
                  alt="Portrait de Mayane Cohen"
                  fill
                  sizes="(min-width: 768px) 180px, 112px"
                  className="object-cover grayscale-[0.15] sepia-[0.08]"
                  priority
                />
              </div>
              <div className="md:mt-3">
                <p className="label-mono text-platinum">Par</p>
                <p className="font-serif italic text-lg text-ink leading-tight md:text-xl md:mt-1">
                  Mayane Cohen
                </p>
                <p className="label-mono mt-1 text-platinum">Paris · 2026</p>
              </div>
            </div>

            <div className="space-y-4 border-l border-rose-ancien/30 pl-4">
              <div>
                <p className="label-mono text-platinum">Formation</p>
                <p className="font-serif italic text-ink mt-1">
                  M2 Design Digital · ESD
                </p>
              </div>
              <div>
                <p className="label-mono text-platinum">Alternance</p>
                <p className="font-serif italic text-ink mt-1">
                  Brothers Négoce
                </p>
              </div>
              <div>
                <p className="label-mono text-platinum">À venir</p>
                <p className="font-serif italic text-ink mt-1">
                  Freelance événementiel
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* ─── BANDEAU PROJETS ───────────────────────────────── */}
        <section
          id="projets"
          className="scroll-mt-24 border-t border-rose-ancien/30 py-12 md:py-16 md:scroll-mt-32"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label-mono mb-3 text-rose-ancien">
                — Les projets · 06 / 06
              </p>
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
                Six projets,{" "}
                <em className="italic gradient-gold-text">
                  six terrains
                </em>{" "}
                — une méthode.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="font-sans text-base text-ink leading-relaxed md:text-lg">
                Du grossiste B2B à l&apos;IA générative, du design system
                d&apos;alternance à l&apos;interface métier embarquée.
                Chaque projet a son terrain, son contrainte, sa preuve.
              </p>
              <p className="mt-4 font-serif italic text-taupe text-lg">
                Lisez-les comme un catalogue — du plus stratégique au plus
                ancien. La méthode est la même.
              </p>
            </div>
          </div>
        </section>

        {/* ─── GRILLE 6 PROJETS ──────────────────────────────── */}
        <section className="pb-24 md:pb-32">
          <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* ─── À PROPOS — TEASER ─────────────────────────────── */}
        <section className="border-t border-rose-ancien/30 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="label-mono mb-3 text-rose-ancien">
                — Qui je suis
              </p>
              <h2 className="font-serif text-4xl italic text-ink leading-tight md:text-5xl">
                Maths · Info · MIAGE · Design digital.
              </h2>
              <p className="mt-6 font-serif italic text-taupe text-xl leading-snug">
                Un parcours non-linéaire qui mène à une seule conviction :
                l&apos;esthétique est une méthode, pas un don.
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3">
              <p className="font-sans text-base leading-relaxed text-ink">
                Étudiante en M2 Design Digital à l&apos;ESD, en alternance
                chez Brothers Négoce — distributeur B2B de matériel
                énergétique — où je conçois l&apos;identité visuelle, les
                supports digitaux et la communication d&apos;une marque dans
                un univers qu&apos;on ne pense jamais esthétique.
              </p>
              <a
                href="/a-propos"
                className="label-mono mt-6 inline-block text-rose-ancien hover:text-gold-ink transition-colors"
              >
                Lire le parcours complet →
              </a>
            </div>
          </div>
        </section>
      </article>

      <MonoFooter centerLabel="Six projets, une méthode" />
    </>
  );
}
