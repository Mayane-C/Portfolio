import Image from "next/image";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SplitText } from "@/components/gsap/SplitText";
import { ParallaxImage } from "@/components/gsap/ParallaxImage";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <MonoBanner
        centerLabel="PORTFOLIO · SIX PROJETS"
        cartouche="Nº 01 · MAI 2026"
      />

      <article className="px-6 md:px-12">
        {/* ─── HERO ASYMÉTRIQUE ──────────────────────────────── */}
        <section className="relative grid grid-cols-1 gap-8 py-8 md:grid-cols-12 md:gap-x-8 md:py-12">
          {/* Photo XXL avec parallaxe au scroll */}
          <div className="order-1 md:order-2 md:col-span-5 md:col-start-8">
            <ParallaxImage intensity={60}>
              <div className="relative mx-auto w-full max-w-md md:max-w-none">
                {/* Halo gradient pulsant derrière la photo */}
                <div
                  aria-hidden
                  className="absolute -inset-6 -z-10 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-blush/40 blur-3xl"
                />
                <Image
                  src="/portrait-cutout.png"
                  alt="Portrait de Mayane Cohen"
                  width={800}
                  height={1000}
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="h-auto w-full mix-blend-multiply"
                  priority
                />
              </div>
            </ParallaxImage>
            {/* Légende sous la photo */}
            <div className="mt-4 flex items-baseline justify-center gap-3 md:mt-6 md:justify-end">
              <span className="label-mono text-rose-ancien">Par</span>
              <span className="font-serif italic text-xl text-ink md:text-2xl">
                Mayane Cohen
              </span>
              <span className="label-mono text-taupe">Paris</span>
            </div>
          </div>

          {/* Titre + label, à gauche, plus aéré */}
          <div className="order-2 md:order-1 md:col-span-7 md:pt-10">
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <span className="block h-px w-12 bg-rose-ancien md:w-16" />
              <span className="label-mono text-rose-ancien">
                Mayane Cohen · Portfolio · 2026
              </span>
            </div>

            {/* TITRE animé caractère par caractère au load */}
            <h1 className="font-serif text-5xl leading-[0.92] text-ink sm:text-6xl md:text-[6.5rem] lg:text-[8rem]">
              <SplitText delay={0.3} stagger={0.04} as="span" className="block">
                Designer
              </SplitText>
              <SplitText
                delay={0.7}
                stagger={0.05}
                as="span"
                className="block font-serif italic gradient-gold-text"
              >
                du sensible.
              </SplitText>
            </h1>

            <p className="label-mono mt-5 text-rose-ancien md:mt-8">
              Digital · Événementiel · Sur-mesure
            </p>

            <p className="mt-6 max-w-xl font-serif italic text-xl text-taupe leading-snug md:mt-10 md:text-2xl">
              Six projets. Le digital comme outil, le sensible comme
              boussole.
            </p>

            {/* Skills tags */}
            <div className="mt-8 flex flex-wrap gap-2 md:mt-10">
              {["UI Design", "UX Research", "Design System", "Direction Artistique"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="border border-rose-ancien/40 bg-cream-deep/40 px-3 py-1 font-sans text-xs text-ink md:text-sm"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* ─── BANDEAU PROJETS ───────────────────────────────── */}
        <section
          id="projets"
          className="scroll-mt-24 border-t border-rose-ancien/50 py-12 md:py-16 md:scroll-mt-32"
        >
          <p className="label-mono mb-3 text-rose-ancien">
           Les projets · 06 / 06
          </p>
          <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
            Six projets,{" "}
            <em className="italic gradient-gold-text">six terrains</em>,
            une méthode.
          </h2>
        </section>

        {/* ─── GRILLE 6 PROJETS ──────────────────────────────── */}
        <section className="pb-24 md:pb-32">
          <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {projects.map((project, idx) => (
              <ScrollReveal key={project.slug} delay={idx * 0.05}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ─── À PROPOS, TEASER ─────────────────────────────── */}
        <section className="border-t border-rose-ancien/50 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="label-mono mb-3 text-rose-ancien">
               Qui je suis
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
                En alternance chez{" "}
                <em className="italic text-gold-ink">Brothers Négoce</em>,
                distributeur B2B de matériel énergétique, où je conçois
                l&apos;identité visuelle, les supports digitaux et la
                communication d&apos;une marque dans un univers qu&apos;on
                ne pense jamais esthétique. Mon rôle&nbsp;: le rendre
                désirable.
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
