"use client";

import { useEffect, useRef } from "react";

import { AlmeidaLogo } from "@/components/brand/AlmeidaLogo";
import { NAV_LINKS } from "@/data/nav";

const SCROLL_THRESHOLD = 56;

/**
 * Menu fixo do topo. Nasce transparente sobre a vitrine e, passados alguns
 * pixels de scroll, ganha fundo de vidro fosco escuro e a linha de apoio.
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
          href="#section-showcase"
          aria-label="Ir para o topo"
        >
          <AlmeidaLogo size={50} priority />
          <span className="sr-only">Almeida Imports</span>
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
