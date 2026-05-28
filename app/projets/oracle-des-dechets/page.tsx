import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { ProjectHero } from "@/components/ProjectHero";
import { Section } from "@/components/Section";
import { PullQuote } from "@/components/PullQuote";
import { CaptureSlot } from "@/components/CaptureSlot";
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
        cartouche={`Nº ${project.nr} — MAI 2026`}
      />

      <ProjectHero
        project={project}
        contextLabel="M2 ESD · Cours CREATECH · ChangeNOW"
      />

      <div className="px-6 md:px-12">
        <CaptureSlot
          src="/projects/oracle-des-dechets/01-interface.png"
          alt="Interface live de l'Oracle des déchets — terminal noir glitch, transmission depuis l'an 2500"
          caption="Interface live · transmission depuis l'an 2500"
          ratio="16/10"
        />
      </div>

      <Section label="Le concept">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Un Oracle dystopique de l&apos;an 2500 répond aux objets que
            l&apos;on jette. L&apos;utilisateur saisit «{" "}
            <em className="italic text-gold-ink">puff</em> », «{" "}
            <em className="italic text-gold-ink">gobelet</em> », «{" "}
            <em className="italic text-gold-ink">bouteille</em> »…
          </p>
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            L&apos;IA renvoie une prophétie en trois temps —{" "}
            <em className="italic text-gold-ink">
              tension, prophétie, vision
            </em>{" "}
            — avec image générée et voix synthétique. Tout en collaboration
            avec mon binôme.
          </p>
        </div>
        <div className="mt-10 max-w-3xl">
          <p className="font-serif italic text-2xl text-prune leading-snug border-l-2 border-rose-ancien pl-5">
            « Pas une solution. Pas une prédiction. Un miroir. »
          </p>
        </div>
      </Section>

      <Section label="L'architecture" compact>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          <div>
            <p className="label-mono mb-3 text-rose-ancien">Stack</p>
            <p className="font-serif italic text-xl text-ink leading-snug">
              n8n · Groq · Pollinations · Vercel · React
            </p>
            <p className="font-sans text-sm text-taupe mt-3 leading-relaxed">
              Brief CREATECH : concevoir une expérience mobilisant une ou
              plusieurs API en réponse à un enjeu d&apos;impact — dans le
              cadre du sommet ChangeNOW (solutions climatiques).
            </p>
          </div>
          <div>
            <p className="label-mono mb-3 text-rose-ancien">
              Performance end-to-end
            </p>
            <p className="font-serif italic text-xl text-ink leading-snug">
              3 à 6 secondes
            </p>
            <p className="font-sans text-sm text-taupe mt-3 leading-relaxed">
              De la saisie utilisateur à la prophétie renvoyée avec image
              générée et voix synthétisée.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">V1</p>
            <p className="font-serif italic text-lg text-ink">
              Demo day · 14 avril 2026
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Workflow n8n privé · saisie manuelle dans le prompt ·
              génération image via nœud HTTP.
            </p>
          </li>
          <li className="border-l-2 border-rose-ancien pl-4">
            <p className="label-mono mb-2 text-rose-ancien">V2</p>
            <p className="font-serif italic text-lg text-ink">
              Production · 19 avril 2026
            </p>
            <p className="font-sans text-sm text-taupe mt-2 leading-snug">
              Webhook public · formulaire utilisateur · Pollinations côté
              client · retour multi-canal.
            </p>
          </li>
        </ul>
      </Section>

      <div className="px-6 md:px-12">
        <CaptureSlot
          src="/projects/oracle-des-dechets/02-workflow.png"
          alt="Workflow n8n V2 — webhook, Groq LLM, JSON response"
          caption="Workflow n8n V2 · webhook → Groq → réponse JSON"
          ratio="16/10"
        />
        <CaptureSlot
          src="/projects/oracle-des-dechets/03-prophetie.png"
          alt="Exemple de prophétie générée — texte dystopique + image post-apocalyptique"
          caption="Une prophétie générée · texte + image dystopique"
          ratio="16/10"
        />
      </div>

      <div className="px-6 md:px-12">
        <PullQuote>{project.pullQuote}</PullQuote>
      </div>

      <Section label="Direction artistique" compact>
        <div className="max-w-3xl">
          <p className="font-sans text-base md:text-lg text-ink leading-relaxed">
            Noir, terminal, glitch.{" "}
            <em className="italic text-gold-ink">Monospace</em> pour la
            transmission, display condensé pour les ruptures.
            L&apos;interface ressemble à une machine qui émet un signal
            d&apos;alarme — jamais une typo rassurante.
          </p>
        </div>
      </Section>

      {project.externalLink && (
        <section className="px-6 md:px-12 py-12">
          <div className="border-t border-rose-ancien/30 pt-10 text-center">
            <p className="label-mono text-platinum mb-3">
              — Le projet est en ligne
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

      <MonoFooter centerLabel="Oracle des déchets · Projet Nº 02" />
    </>
  );
}
