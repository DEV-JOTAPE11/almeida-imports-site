"use client";

import { useEffect, useRef } from "react";

import { ScrollFloat } from "@/components/effects/ScrollFloat";
import { CatalogCard } from "@/components/sections/CatalogCard";
import { CATALOG } from "@/data/catalog";
import { useMagicBento } from "@/hooks/useMagicBento";
import { gsap } from "@/lib/gsap";

/**
 * Seção "Catálogo" — grid Magic Bento com as linhas que a loja vende.
 * Os cards sobem em cascata quando a seção entra na tela; os efeitos de
 * holofote, inclinação e clique ficam no hook `useMagicBento`.
 */
export function Catalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useMagicBento(gridRef, sectionRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.to(".product-card", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: grid, start: "top 78%", once: true },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-catalog" id="section-catalog">
      <div className="section-header section-header--center">
        <p className="section-eyebrow">
          <span className="eyebrow-dot" /> O que tem na loja
        </p>

        <ScrollFloat id="sf-catalog" text="Catálogo da Almeida Imports." />

        <p className="section-sub">
          As linhas que giram toda semana nas duas lojas. Chegou modelo novo, a
          gente posta no Instagram — e ele já está no balcão.
        </p>
      </div>

      <div
        className="catalog-bento-wrap bento-section"
        id="catalog-bento-section"
        ref={sectionRef}
      >
        <div className="card-grid" id="catalog-bento-grid" ref={gridRef}>
          {CATALOG.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
