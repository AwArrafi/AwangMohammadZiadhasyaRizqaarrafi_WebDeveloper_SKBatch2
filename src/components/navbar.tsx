"use client";

import { ArrowRight, Menu, Sparkle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonPrimary, container } from "@/lib/styles";

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#lowongan", label: "Cari Lowongan" },
  { href: "#rekomendasi-cv", label: "Rekomendasi CV" },
  { href: "#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <span className="flex items-center gap-2 text-lg font-bold tracking-tight text-navy">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-white">
        <Sparkle className="size-4 fill-white" aria-hidden />
      </span>
      ASTER
    </span>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        <a href="#beranda" aria-label="ASTER, kembali ke beranda" className="rounded-lg">
          <Logo />
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-muted transition-colors hover:text-navy">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#lowongan" className={`${buttonPrimary} max-md:hidden`}>
          Jelajahi Posisi
          <ArrowRight className="size-4" aria-hidden />
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          className="grid size-11 place-items-center rounded-lg text-navy hover:bg-surface md:hidden"
        >
          {isMenuOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      <div id="mobile-menu" hidden={!isMenuOpen} className="border-t border-line bg-white md:hidden">
        <nav aria-label="Navigasi seluler" className={`${container} py-3`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center rounded-lg px-2 text-base font-medium text-navy hover:bg-surface"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#lowongan" onClick={closeMenu} className={`${buttonPrimary} mt-3 mb-2 w-full`}>
            Jelajahi Posisi
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
