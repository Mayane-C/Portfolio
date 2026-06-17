import type { Metadata } from "next";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";
import { PullQuote } from "@/components/PullQuote";
import { NumberedStep } from "@/components/NumberedStep";

export const metadata: Metadata = {
  title: "Ma méthode",
  description:
    "Six étapes pour concevoir un projet sensible : brief émotionnel, recherche d'univers, parcours utilisateur, déclinaison cohérente, attention au détail, feedback loop.",
};

const etapes = [
  {
    nr: "01",
    label: "Étape",
    title: "Le brief émotionnel",
    description:
      "Avant la couleur, l'intention. Une page, trois émotions, un destinataire, une durée. La boussole qui rend chaque choix défendable.",
  },
  {
    nr: "02",
    label: "Étape",
    title: "La recherche d'univers",
    description:
      "Pas un Pinterest. Quatre modules structurants : palette, typographies, matière signature, motif récurrent. La cohérence naît à la fabrication.",
  },
  {
    nr: "03",
    label: "Étape",
    title: "Le parcours utilisateur",
    description:
      "Huit points de contact dans l'ordre. Pour chacun, deux questions : quelle émotion ? quelle action attendue ? Tout support qui ne sert pas un point de contact est à supprimer.",
  },
  {
    nr: "04",
    label: "Étape",
    title: "La déclinaison cohérente",
    description:
      "Chaque support hérite des mêmes tokens : même typo, même palette, même matière. Aucun prestataire n'improvise. La répétition fait la cohérence ressentie.",
  },
  {
    nr: "05",
    label: "Étape",
    title: "L'attention au détail",
    description:
      "Cinq micro-moments à designer : le mot manuscrit, la musique au bon moment, l'éclairage, le porte-nom soigné, le cadeau à emporter. Aucun ne coûte cher. Tous demandent du temps de conception.",
  },
  {
    nr: "06",
    label: "Étape",
    title: "Le feedback loop",
    description:
      "Trois questions, cinquante minutes, à chaud. Qu'est-ce qui a généré le plus d'émotion ? Qu'est-ce qui n'a pas marché ? Que faire différemment ? Ce document devient le capital du projet suivant.",
  },
];

export default function MethodePage() {
  return (
    <>
      <MonoBanner centerLabel="MA MÉTHODE · SIX ÉTAPES" />

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="px-6 pt-8 pb-12 md:px-12 md:pt-16 md:pb-20">
        <div className="mb-6 flex items-start gap-3 md:mb-8 md:items-center">
          <span className="mt-2 block h-px w-8 bg-rose-ancien md:mt-0 md:w-12" />
          <span className="label-mono text-rose-ancien">
            Liminaire · La méthode
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-9">
            <h1 className="font-serif text-5xl leading-[0.95] text-ink sm:text-6xl md:text-[6.5rem]">
              Ma{" "}
              <em className="font-serif italic gradient-gold-text">
                méthode
              </em>
              .
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-xl italic text-taupe leading-snug md:mt-8 md:text-3xl">
              Six étapes pour designer un projet, du digital au sensible.
              La même grammaire, qu&apos;il s&apos;agisse d&apos;un design
              system B2B ou d&apos;une expérience sur-mesure.
            </p>

            {/* ─── CTA téléchargement livre blanc ─────────────── */}
            <div className="mt-10 md:mt-12">
              <a
                href="/livre-blanc-mayane-cohen.pdf"
                download="livre-blanc-mayane-cohen.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 border-2 border-rose-ancien bg-cream-deep/40 px-6 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-prune hover:shadow-lg"
                aria-label="Télécharger le livre blanc de Mayane Cohen au format PDF"
              >
                <span
                  aria-hidden
                  className="font-serif text-2xl text-rose-ancien transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-gold-soft md:text-3xl"
                >
                  ↓
                </span>
                <span className="flex flex-col items-start gap-0.5 text-left">
                  <span className="label-mono text-rose-ancien transition-colors group-hover:text-gold-soft">
                    Livre blanc · PDF
                  </span>
                  <span className="font-serif italic text-base text-ink transition-colors group-hover:text-cream md:text-lg">
                    Designer son événement
                  </span>
                </span>
              </a>
              <p className="label-mono mt-3 text-platinum">
                Mémoire M2 · La méthode in extenso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LES 6 ÉTAPES ──────────────────────────────────── */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="border-t border-rose-ancien/50 pt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-rose-ancien" />
            <span className="label-mono text-rose-ancien">
              Les six étapes
            </span>
          </div>
          <h2 className="font-serif text-3xl text-ink leading-tight mb-12 md:text-4xl">
            De l&apos;émotion à la{" "}
            <em className="italic gradient-gold-text">méthode</em>, sans
            jamais perdre le sensible.
          </h2>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {etapes.map((e) => (
              <NumberedStep key={e.nr} {...e} />
            ))}
          </ul>
        </div>
      </section>

      {/* ─── PULL-QUOTE FIN ────────────────────────────────── */}
      <div className="px-6 md:px-12">
        <PullQuote label="La promesse">
          Designer un projet, ce n&apos;est pas tout faire. C&apos;est{" "}
          <em className="not-italic font-serif text-gold-soft">
            tout choisir
          </em>
          .
        </PullQuote>
      </div>

      <MonoFooter centerLabel="Six étapes, une posture" />
    </>
  );
}
