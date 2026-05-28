import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { PullQuote } from "@/components/PullQuote";

export const metadata: Metadata = {
  title: "À propos · Mayane Cohen",
  description:
    "Parcours non-linéaire de Mayane Cohen : Maths, Info, MIAGE, Design Digital. Une seule conviction : l'esthétique est une méthode, pas un don.",
};

interface TimelineEntry {
  period: string;
  title: React.ReactNode;
  description: string;
  highlight?: boolean;
}

const timeline: TimelineEntry[] = [
  {
    period: "2021—22",
    title: (
      <>
        L1 <em className="italic text-gold-ink">Maths—Info</em>
      </>
    ),
    description: "Université Paris Cité · Première étape académique.",
  },
  {
    period: "2022—23",
    title: (
      <>
        L2 <em className="italic text-gold-ink">Informatique</em>
      </>
    ),
    description: "Université Paris Cité · Spécialisation technique.",
  },
  {
    period: "mars 2023",
    title: (
      <>
        Mariage · Premier <em className="italic text-gold-ink">déclic</em>
      </>
    ),
    description:
      "Je code moi-même le faire-part digital et le site invités, sans formation design. Bascule.",
    highlight: true,
  },
  {
    period: "2023—24",
    title: (
      <>
        L3 <em className="italic text-gold-ink">MIAGE</em>
      </>
    ),
    description:
      "Sorbonne (Paris 1) · Méthodes Informatiques Appliquées à la Gestion. En parallèle, je conçois et code CRAFT — une plateforme d'exercices Java pour mes camarades — sans avoir jamais ouvert un logiciel de design.",
  },
  {
    period: "2024—25",
    title: (
      <>
        M1 <em className="italic text-gold-ink">Design Digital</em> — ESD
      </>
    ),
    description: "Reconversion · mise en mots de l'intuition.",
  },
  {
    period: "2025—26",
    title: (
      <>
        M2 ESD · Alternance{" "}
        <em className="italic text-gold-ink">Brothers Négoce</em>
      </>
    ),
    description:
      "Identité visuelle, supports digitaux, communication d'une marque B2B. Mémoire de fin d'études.",
  },
  {
    period: "à venir",
    title: (
      <>
        Objectif · <em className="italic text-gold-ink">Lancement freelance</em>
      </>
    ),
    description:
      "Design d'événements · mariages, baby showers, anniversaires marquants, événements corporate.",
    highlight: true,
  },
];

export default function AProposPage() {
  return (
    <>
      <MonoBanner
        centerLabel="À PROPOS · QUI JE SUIS"
        cartouche="Nº 00 — MAI 2026"
      />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="px-6 pt-8 pb-12 md:px-12 md:pt-16 md:pb-24">
        <div className="mb-6 flex items-start gap-3 md:mb-8 md:items-center">
          <span className="mt-2 block h-px w-8 bg-rose-ancien md:mt-0 md:w-12" />
          <span className="label-mono text-rose-ancien">
            Liminaire · Qui je suis
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 md:gap-x-8">
          {/* Titre + pitch */}
          <div className="md:col-span-8">
            <h1 className="font-serif text-5xl leading-[0.95] text-ink sm:text-6xl md:text-[6.5rem]">
              Mayane
              <br />
              <em className="font-serif italic gradient-gold-text">Cohen</em>.
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-xl italic text-taupe leading-snug md:mt-8 md:text-3xl">
              Maths · Info · MIAGE · Design digital. Un parcours non-linéaire
              qui mène à une seule conviction :{" "}
              <em className="text-gold-ink not-italic font-serif">
                l&apos;esthétique est une méthode
              </em>
              , pas un don.
            </p>
          </div>

          {/* Portrait timbre-poste */}
          <aside className="md:col-span-3 md:col-start-10 md:pt-4">
            <div className="relative aspect-[3/4] w-40 overflow-hidden border border-rose-ancien/30 sm:w-48 md:w-full md:max-w-[200px]">
              <Image
                src="/portrait.jpg"
                alt="Portrait de Mayane Cohen"
                fill
                sizes="(min-width: 768px) 200px, (min-width: 640px) 192px, 160px"
                className="object-cover grayscale-[0.15] sepia-[0.08]"
                priority
              />
            </div>
            <p className="label-mono mt-3 text-platinum">
              Paris · 2026
            </p>
          </aside>
        </div>
      </section>

      {/* ─── PARCOURS ──────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="border-t border-rose-ancien/30 pt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-rose-ancien" />
            <span className="label-mono text-rose-ancien">
              Parcours · cinq années, deux bascules
            </span>
          </div>
          <h2 className="font-serif text-4xl text-ink leading-tight mb-12 md:text-5xl">
            <em className="italic">Non-linéaire</em>, par choix.
          </h2>

          {/* Timeline */}
          <ol className="space-y-8 md:space-y-10">
            {timeline.map((entry, idx) => (
              <li
                key={idx}
                className={`grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-x-8 ${
                  entry.highlight
                    ? "border-l-2 border-rose-ancien pl-6 md:pl-8"
                    : "border-l border-platinum/30 pl-6 md:pl-8"
                }`}
              >
                <div className="md:col-span-2">
                  <p
                    className={`label-mono ${
                      entry.highlight
                        ? "text-rose-ancien"
                        : "text-platinum"
                    }`}
                  >
                    {entry.period}
                  </p>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-serif text-2xl text-ink leading-snug md:text-3xl">
                    {entry.title}
                  </h3>
                  <p className="font-sans text-base text-taupe mt-2 leading-relaxed max-w-3xl">
                    {entry.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── L'INTUITION AVANT LA MÉTHODE ──────────────────── */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="border-t border-rose-ancien/30 pt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-rose-ancien" />
            <span className="label-mono text-rose-ancien">
              L&apos;intuition avant la méthode
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
              En mars 2023, j&apos;ai organisé mon mariage. J&apos;ai codé
              moi-même le faire-part digital et le site invités, ligne par
              ligne, sans avoir jamais ouvert un logiciel de design. Je
              copiais des références Pinterest et j&apos;espérais que ça
              tienne ensemble.{" "}
              <em className="italic text-gold-ink">
                Ça a tenu — par chance, pas par méthode.
              </em>
            </p>
            <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
              Un an plus tard, en L3 MIAGE, j&apos;ai conçu et codé{" "}
              <em className="italic text-gold-ink">CRAFT</em> — une
              plateforme d&apos;exercices Java pour mes camarades de promo —
              toujours sans avoir ouvert un Figma. Ces deux projets ont
              révélé quelque chose : je designais déjà, sans le mot pour le
              dire.
            </p>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12">
        <PullQuote label="La conviction">
          L&apos;esthétique est une méthode, pas un don.
        </PullQuote>
      </div>

      {/* ─── LA MÉTHODE AUJOURD'HUI ────────────────────────── */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="border-t border-rose-ancien/30 pt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-rose-ancien" />
            <span className="label-mono text-rose-ancien">
              La méthode aujourd&apos;hui
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
              Aujourd&apos;hui, en M2 Design Digital à l&apos;ESD, en
              alternance chez{" "}
              <em className="italic text-gold-ink">Brothers Négoce</em> —
              distributeur B2B de matériel énergétique — je conçois
              l&apos;identité visuelle, les supports digitaux et la
              communication d&apos;une marque dans un univers qu&apos;on
              ne pense jamais esthétique. Mon rôle : le rendre désirable.
            </p>
            <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
              À l&apos;horizon, une fois ce mémoire soutenu :{" "}
              <em className="italic text-gold-ink">
                lancer mon activité freelance
              </em>{" "}
              en design d&apos;événements — mariages, baby showers,
              anniversaires marquants, événements corporate. Appliquer
              au sensible la méthode que le digital m&apos;a donnée.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ───────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="border-t border-rose-ancien/30 pt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-rose-ancien" />
            <span className="label-mono text-rose-ancien">
              Pour me joindre
            </span>
          </div>
          <h2 className="font-serif text-4xl text-ink leading-tight mb-10 md:text-5xl">
            Une <em className="italic gradient-gold-text">conversation</em>{" "}
            ?
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border-l-2 border-rose-ancien pl-5">
              <p className="label-mono text-rose-ancien mb-2">Email</p>
              <a
                href="mailto:mayanecohen2626@gmail.com"
                className="font-serif italic text-xl text-ink hover:text-gold-ink transition-colors break-all"
              >
                mayanecohen2626@gmail.com
              </a>
            </div>
            <div className="border-l-2 border-rose-ancien pl-5">
              <p className="label-mono text-rose-ancien mb-2">LinkedIn</p>
              <a
                href="https://linkedin.com/in/mayane-cohen-64a529276"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif italic text-xl text-ink hover:text-gold-ink transition-colors break-all"
              >
                /in/mayane-cohen-64a529276
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="label-mono text-rose-ancien hover:text-gold-ink transition-colors"
            >
              ← Retour à la grille des projets
            </Link>
          </div>
        </div>
      </section>

      <MonoFooter centerLabel="Une seule conviction — l'esthétique est une méthode" />
    </>
  );
}
