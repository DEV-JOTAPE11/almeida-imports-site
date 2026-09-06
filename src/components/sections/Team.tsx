"use client";

import { useEffect, useRef } from "react";

import { ScrollFloat } from "@/components/effects/ScrollFloat";
import { TeamCard } from "@/components/sections/TeamCard";
import { TEAM } from "@/data/team";
import { useMagicBento } from "@/hooks/useMagicBento";
import { gsap } from "@/lib/gsap";

/**
 * Seção "O time" — grid Magic Bento com as lideranças do Grupo Cimed.
 * Os cards sobem em cascata quando a seção entra na tela; os efeitos de
 * holofote, inclinação e clique ficam no hook `useMagicBento`.
 */
export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useMagicBento(gridRef, sectionRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.to(".person-card", {
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
    <section className="section-team" id="section-team">
      <div className="section-header section-header--center">
        <p className="section-eyebrow">
          <span className="eyebrow-dot" /> Quem faz acontecer
        </p>

        <ScrollFloat id="sf-team" text="O time por trás da Carmed." />

        <p className="section-sub">
          Uma empresa de família que se tornou gigante — liderada por pessoas que
          acreditam que saúde é para todo mundo.
        </p>
      </div>

      <div
        className="team-bento-wrap bento-section"
        id="team-bento-section"
        ref={sectionRef}
      >
        <div className="card-grid" id="team-bento-grid" ref={gridRef}>
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
