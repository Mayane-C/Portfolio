"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Banner monospace du haut de chaque page.
 * Trois zones :
 *   gauche  → wordmark "MAYANE COHEN" (lien vers /)
 *   centre  → navigation persistante (Projets · À propos) — desktop only
 *   droite  → cartouche datée optionnelle (desktop) OU burger button (mobile)
 *
 * Sur mobile : burger qui ouvre un overlay centré avec les ancres,
 * desktop : nav inline classique.
 */
interface MonoBannerProps {
  /** Cartouche à droite — ex: "Nº 02 — MAI 2026". Optionnel. */
  cartouche?: string;
  /**
   * Label de contexte au centre (utilisé pour l'accessibilité).
   * @deprecated remplacé par la nav persistante ; conservé pour compat.
   */
  centerLabel?: string;
}

const navItems = [
  { href: "/#projets", label: "Projets", matchPath: "/" },
  { href: "/methode", label: "Méthode", matchPath: "/methode" },
  { href: "/a-propos", label: "À propos", matchPath: "/a-propos" },
];

function isActive(currentPath: string, target: string): boolean {
  if (target === "/") {
    return currentPath === "/" || currentPath.startsWith("/projets/");
  }
  return currentPath === target || currentPath.startsWith(`${target}/`);
}

export function MonoBanner({ cartouche, centerLabel }: MonoBannerProps) {
  const pathname = usePathname() ?? "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Fermer le menu avec Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Fermer le menu lors d'un changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="relative z-30 px-6 pt-5 pb-4 md:px-12 md:pt-8 md:pb-6">
        <div className="flex items-baseline justify-between gap-x-6 gap-y-3">
          {/* Wordmark — lien vers / */}
          <Link
            href="/"
            className="label-mono transition-colors hover:text-rose-ancien"
          >
            <span className="inline md:hidden">Mayane Cohen</span>
            <span className="hidden md:inline">
              Mayane Cohen{" "}
              <span className="mx-2 text-rose-ancien">·</span>{" "}
              Designer du sensible
            </span>
          </Link>

          {/* Navigation DESKTOP — inline */}
          <nav
            aria-label="Navigation principale"
            className="hidden md:block"
          >
            <ul className="flex items-center gap-8">
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

          {/* Cartouche DESKTOP — optionnel */}
          {cartouche && (
            <p className="hidden label-mono border border-rose-ancien/40 px-3 py-1 md:block">
              {cartouche}
            </p>
          )}

          {/* Burger MOBILE — caché sur desktop */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-px w-6 bg-ink transition-all duration-300 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-ink transition-all duration-300 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Label contextuel masqué visuellement mais accessible */}
        {centerLabel && <span className="sr-only">{centerLabel}</span>}

        {/* Hairline gold sous le banner */}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-rose-ancien/30 to-transparent" />
      </header>

      {/* ─── OVERLAY MENU MOBILE ─────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={`fixed inset-0 z-40 bg-cream transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pt-24 pb-12">
          {/* Label section */}
          <div className="mb-12 flex items-center gap-3">
            <span className="block h-px w-8 bg-rose-ancien" />
            <span className="label-mono text-rose-ancien">
              Navigation
            </span>
          </div>

          {/* Liens principaux en gros Cormorant italique */}
          <nav aria-label="Menu mobile">
            <ul className="space-y-8">
              {navItems.map((item, idx) => {
                const active = isActive(pathname, item.matchPath);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline gap-4"
                    >
                      <span className="label-mono text-platinum">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-serif italic text-4xl leading-none transition-colors sm:text-5xl ${
                          active ? "text-gold-ink" : "text-ink group-hover:text-rose-ancien"
                        }`}
                      >
                        {item.label}.
                      </span>
                    </Link>
                  </li>
                );
              })}

              {/* Lien direct contact (ancre vers la section contact de À propos) */}
              <li>
                <Link
                  href="/a-propos#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-baseline gap-4"
                >
                  <span className="label-mono text-platinum">
                    {String(navItems.length + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif italic text-4xl leading-none text-ink transition-colors group-hover:text-rose-ancien sm:text-5xl">
                    Contact.
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Pied du menu : signature + cartouche */}
          <div className="mt-auto pt-12">
            <div className="h-px bg-gradient-to-r from-transparent via-rose-ancien/30 to-transparent" />
            <div className="mt-6 flex items-baseline justify-between">
              <p className="label-mono">Mayane Cohen</p>
              {cartouche && (
                <p className="label-mono text-rose-ancien">
                  {cartouche}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
