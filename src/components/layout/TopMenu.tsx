"use client";

import { useEffect, useRef } from "react";

import { NAV_LINKS } from "@/data/nav";

const SCROLL_THRESHOLD = 56;

/**
 * Menu fixo do topo. Nasce transparente sobre o hero colorido (logo em
 * branco) e, passados alguns pixels de scroll, ganha fundo de vidro fosco
 * e devolve a cor original do logo.
 */
export function TopMenu() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    function update() {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      el!.classList.toggle("is-scrolled", y > SCROLL_THRESHOLD);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className="top-menu"
      id="top-menu"
      ref={headerRef}
      aria-label="Navegação principal"
    >
      <div className="top-menu__inner">
        <a
          className="top-menu__brand"
          href="#section-carmed-fini"
          aria-label="Ir para o topo"
        >
          <img
            src="/assets/carmed.png"
            alt="Carmed"
            width={168}
            height={46}
            loading="eager"
            decoding="async"
          />
        </a>
        <nav className="top-menu__links" aria-label="Seções da página">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
