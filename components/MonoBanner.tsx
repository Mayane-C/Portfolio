"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Banner monospace du haut de chaque page.
 * Trois zones :
 *   gauche  → wordmark "MAYANE COHEN" (lien vers /)
 *   centre  → navigation persistante (Projets · À propos)
 *   droite  → cartouche datée optionnelle
 *
 * La nav est responsive : sur mobile elle passe sous le wordmark
 * (flex-wrap), pas de menu burger — 2 liens seulement.
 */
interface MonoBannerProps {
  /** Cartouche à droite — ex: "Nº 02 — MAI 2026". Optionnel. */
  cartouche?: string;
  /**
   * Label de contexte au centre (ex: "PROJET Nº 02 / 06 · CHAMYLINEX").
   * Affiché en plus de la nav sur desktop, masqué sur mobile.
   * @deprecated remplacé par la nav persistante ; conservé pour compat des pages projets.
   */
  centerLabel?: string;
}

const navItems = [
  { href: "/#projets", label: "Projets", matchPath: "/" },
  { href: "/a-propos", label: "À propos", matchPath: "/a-propos" },
];

function isActive(currentPath: string, target: string): boolean {
  if (target === "/") {
    // Ancre Projets : actif sur la home et sur toutes les pages /projets/*
    return currentPath === "/" || currentPath.startsWith("/projets/");
  }
  return currentPath === target || currentPath.startsWith(`${target}/`);
}

export function MonoBanner({ cartouche, centerLabel }: MonoBannerProps) {
  const pathname = usePathname() ?? "/";

  return (
    <header className="px-6 pt-5 pb-4 md:px-12 md:pt-8 md:pb-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        {/* Wordmark — lien vers / */}
        <Link
          href="/"
          className="label-mono transition-colors hover:text-rose-ancien"
        >
          Mayane Cohen{" "}
          <span className="mx-2 text-rose-ancien">·</span>{" "}
          Designer Digital
        </Link>

        {/* Navigation — toujours visible, wrap sur mobile */}
        <nav aria-label="Navigation principale" className="order-3 w-full md:order-2 md:w-auto">
          <ul className="flex items-center gap-5 md:gap-8">
            {navItems.map((item) => {
              const active = isActive(pathname, item.matchPath);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`label-mono transition-colors ${
                      active
                        ? "text-rose-ancien"
                        : "hover:text-rose-ancien"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden
                        className="ml-2 inline-block h-px w-6 align-middle bg-rose-ancien"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Cartouche datée à droite (optionnel) */}
        {cartouche && (
          <p className="order-2 label-mono border border-rose-ancien/40 px-3 py-1 md:order-3">
            {cartouche}
          </p>
        )}
      </div>

      {/* Label contextuel masqué visuellement mais accessible — pour SEO/lecteurs d'écran */}
      {centerLabel && <span className="sr-only">{centerLabel}</span>}

      {/* Hairline gold sous le banner */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-rose-ancien/30 to-transparent" />
    </header>
  );
}
