"use client";

import { useEffect, useRef } from "react";

import { ScrollFloat } from "@/components/effects/ScrollFloat";
import { StatCounter } from "@/components/sections/StatCounter";
import { STATS } from "@/data/stats";
import { gsap } from "@/lib/gsap";

/**
 * Seção "Em números" — o tamanho da operação sobre o fundo com brilho azul.
 * Os quatro blocos entram em cascata e cada contador anima ao aparecer.
 */
export function Numbers() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.to(".stat-item", {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-numbers" id="section-numbers">
      <div className="numbers-title-wrap">
        <ScrollFloat id="sf-numbers" text="A loja em números." />
      </div>

      <div className="numbers-grid" ref={gridRef}>
        {STATS.map((stat) => (
          <StatCounter key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
