import Link from "next/link";
import { MonoBanner } from "@/components/MonoBanner";
import { MonoFooter } from "@/components/MonoFooter";

export default function NotFound() {
  return (
    <>
      <MonoBanner
        centerLabel="ERREUR · PAGE INTROUVABLE"
        cartouche="404"
      />

      <section className="px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Numéro 404 en gradient gold */}
          <p className="font-serif text-[8rem] italic leading-none gradient-gold-text md:text-[14rem]">
            404
          </p>

          <h1 className="mt-8 font-serif text-3xl text-ink md:text-5xl">
            Cette page ne s&apos;est pas{" "}
            <em className="italic gradient-gold-text">trouvée</em>.
          </h1>

          <p className="mt-6 max-w-xl mx-auto font-serif italic text-lg text-taupe leading-snug md:text-xl">
            Elle a peut-être été déplacée, ou le lien que vous avez suivi
            est obsolète. Le portfolio, lui, est bien là.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 border border-rose-ancien/70 bg-cream/60 px-6 py-3 transition-all hover:border-rose-ancien hover:bg-prune hover:text-cream"
            >
              <span className="label-mono text-rose-ancien transition-colors group-hover:text-gold-soft">
                Retour à l&apos;accueil
              </span>
              <span aria-hidden className="text-rose-ancien">
                →
              </span>
            </Link>
            <Link
              href="/a-propos"
              className="label-mono text-rose-ancien hover:text-gold-ink transition-colors"
            >
              Voir le portfolio
            </Link>
          </div>
        </div>
      </section>

      <MonoFooter centerLabel="Page introuvable" />
    </>
  );
}
