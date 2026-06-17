import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { Section } from "@/components/Section";
import { PullQuote } from "@/components/PullQuote";
import { MacBookFrame } from "@/components/MacBookFrame";
import { NumberedStep } from "@/components/NumberedStep";
import { ExternalProjectCTA } from "@/components/ExternalProjectCTA";
import { ProjectNav } from "@/components/ProjectNav";
import { getProjectBySlug } from "@/data/projects";

const project = getProjectBySlug("oracle-des-dechets")!;

export const metadata: Metadata = {
  title: `${project.title} · Prophétie dystopique de l'an 2500`,
  description: project.subtitle,
};

export default function OraclePage() {
  return (
    <>
      <MonoBanner
        centerLabel={`PROJET Nº ${project.nr} / 06 · ORACLE DES DÉCHETS`}
        cartouche={`Nº ${project.nr} · MAI 2026`}
      />

      <ProjectHero
        project={project}
        contextLabel="Cas d'étude · IA + Automation · ChangeNOW"
      />

      {/* ─── Vidéo, gros format, EN PREMIER ─────────────────── */}
      <div className="px-4 md:px-12">
        <MacBookFrame
          src="/projects/oracle-des-dechets/demo.mp4"
          caption="Démo · saisie d'un objet et génération de la prophétie"
        />
      </div>

      {/* ─── CTA externe APRÈS l'écran + disclaimer ─────────── */}
      {project.externalLink && (
        <ExternalProjectCTA
          label="Tester l'IA en direct"
          externalLink={project.externalLink}
          disclaimer="Projet en phase de démonstration · la génération IA peut être ponctuellement indisponible selon l'état du workflow back-end."
        />
      )}

      {/* ─── Concept + Architecture en 2 colonnes côte à côte ── */}
      <section className="px-6 md:px-12 py-10 md:py-14">
        <div className="border-t border-rose-ancien/50 pt-8 md:pt-10">
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
            {/* COL 1, Le concept */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="block h-px w-6 bg-rose-ancien" />
                <span className="label-mono text-rose-ancien">
                  Le concept
                </span>
              </div>
              <p className="font-sans text-base text-ink leading-relaxed">
                Un Oracle dystopique de l&apos;an 2500 répond aux objets que
                l&apos;on jette. L&apos;utilisateur saisit «{" "}
                <em className="italic text-gold-ink">puff</em> », «{" "}
                <em className="italic text-gold-ink">gobelet</em> », «{" "}
                <em className="italic text-gold-ink">bouteille</em> »…
              </p>
              <p className="font-sans text-base text-ink leading-relaxed mt-4">
                L&apos;IA renvoie une prophétie en trois temps,{" "}
                <em className="italic text-gold-ink">
                  tension, prophétie, vision
                </em>
                , avec image générée et voix synthétique. Tout en
                collaboration avec mon binôme.
              </p>
              <div className="mt-6">
                <p className="font-serif italic text-xl text-prune leading-snug border-l-2 border-rose-ancien pl-5">
                  « Pas une solution. Pas une prédiction. Un miroir. »
                </p>
              </div>
            </div>

            {/* COL 2, L'architecture */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="block h-px w-6 bg-rose-ancien" />
                <span className="label-mono text-rose-ancien">
                  L&apos;architecture
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="label-mono mb-1.5 text-taupe">Stack</p>
                  <p className="font-serif italic text-lg text-ink leading-snug">
                    n8n · Groq · Pollinations · Vercel · React
                  </p>
                </div>

                <div>
                  <p className="label-mono mb-1.5 text-taupe">
                    Performance end-to-end
                  </p>
                  <p className="font-serif italic text-lg text-ink leading-snug">
                    3 à 6 secondes
                  </p>
                  <p className="font-sans text-sm text-taupe mt-1.5 leading-relaxed">
                    De la saisie utilisateur à la prophétie renvoyée avec
                    image générée et voix synthétisée.
                  </p>
                </div>

                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <NumberedStep
                    nr="V1"
                    label="Version"
                    title="Demo day · 14 avril 2026"
                    description="Workflow n8n privé · saisie manuelle dans le prompt · génération image via nœud HTTP."
                  />
                  <NumberedStep
                    nr="V2"
                    label="Version"
                    title="Production · 19 avril 2026"
                    description="Webhook public · formulaire utilisateur · Pollinations côté client · retour multi-canal."
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      <Section label="Direction artistique" compact>
        <div className="max-w-3xl">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Noir, terminal, glitch.{" "}
            <em className="italic text-gold-ink">Monospace</em>{" "}
            pour la transmission, display condensé pour les ruptures.
            L&apos;interface ressemble à une machine qui émet un signal
            d&apos;alarme, jamais une typo rassurante.
          </p>
        </div>
      </Section>


      <ProjectNav currentSlug={project.slug} />

      <MonoFooter centerLabel="Oracle des déchets · Projet Nº 02" />
    </>
  );
}
