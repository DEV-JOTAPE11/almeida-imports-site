"use client";

import { useEffect, useRef } from "react";

import { Magnet } from "@/components/effects/Magnet";
import { ScrollFloat } from "@/components/effects/ScrollFloat";
import { useFiniStage } from "@/components/providers/FiniStageProvider";
import { BRAND_PILLARS } from "@/data/brand-pillars";
import { FINI_DEFAULT_FLAVOR_KEY, getFiniFlavorByKey } from "@/data/fini-flavors";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { easeOutCubic, prefersReducedMotion, progressWindow } from "@/lib/motion";

const PILLARS_STACK_ID = "carmed-brand-pillars-stack";
const PILLAR_GAP = 16;

/**
 * Seção "A marca".
 *
 * Três camadas de movimento:
 *  - entrada única (texto, visual e CTA) ao chegar na seção;
 *  - os três pilares empilhados que se abrem como um baralho conforme rola;
 *  - parallax leve nos orbes de fundo e no produto.
 */
export function CarmedBrand() {
  const { brandSectionRef, brandProductImgRef, brandProductParallaxRef } =
    useFiniStage();
  const pillarsRef = useRef<HTMLDivElement>(null);

  const initialFlavor = getFiniFlavorByKey(FINI_DEFAULT_FLAVOR_KEY);

  /* Entrada da seção. */
  useEffect(() => {
    const root = brandSectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: "top 72%", once: true } })
        .to(
          ".carmed-brand-lead.carmed-brand-reveal-item",
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
          0,
        )
        .to(
          ".carmed-brand-visual.carmed-brand-reveal-item",
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0.08,
        )
        .to(
          ".carmed-brand-cta",
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          0.35,
        );
    }, root);

    return () => ctx.revert();
  }, [brandSectionRef]);

  /* Baralho de pilares: medidas recalculadas a cada refresh do ScrollTrigger. */
  useEffect(() => {
    const wrap = pillarsRef.current;
    if (!wrap || prefersReducedMotion()) return;

    const cards = gsap.utils.toArray<HTMLElement>(".carmed-brand-pillar", wrap);
    if (!cards.length) return;

    /** Deslocamento final de cada card, em px, a partir do topo da pilha. */
    let yEnds: number[] = [];

    function applyProgress(p: number) {
      if (!cards.length || !yEnds.length) return;
      gsap.set(cards[0], { y: yEnds[0] });
      if (cards[1]) {
        const u = easeOutCubic(progressWindow(p, 0.08, 0.42));
        gsap.set(cards[1], { y: yEnds[1] * u });
      }
      if (cards[2]) {
        const u = easeOutCubic(progressWindow(p, 0.36, 0.78));
        gsap.set(cards[2], { y: yEnds[2] * u });
      }
    }

    function layout() {
      /* Mede no fluxo normal, depois volta para o modo empilhado. */
      wrap!.classList.remove("carmed-brand-pillars--stack");
      cards.forEach((c) => {
        gsap.set(c, { clearProps: "transform" });
        c.style.position = "";
        c.style.left = "";
        c.style.right = "";
        c.style.width = "";
        c.style.zIndex = "";
      });
      wrap!.style.minHeight = "";
      void wrap!.offsetHeight;

      const heights = cards.map((c) => c.offsetHeight);
      yEnds = [];
      let acc = 0;
      for (let i = 0; i < heights.length; i++) {
        yEnds.push(acc);
        acc += heights[i] + (i < heights.length - 1 ? PILLAR_GAP : 0);
      }

      wrap!.style.minHeight = `${acc}px`;
      wrap!.classList.add("carmed-brand-pillars--stack");
      cards.forEach((c, i) => {
        c.style.position = "absolute";
        c.style.left = "0";
        c.style.right = "0";
        c.style.width = "100%";
        c.style.zIndex = String(30 - i * 10);
      });
      gsap.set(cards, { y: 0 });

      const trigger = ScrollTrigger.getById(PILLARS_STACK_ID);
      if (trigger) applyProgress(trigger.progress);
    }

    layout();
    ScrollTrigger.addEventListener("refreshInit", layout);

    const trigger = ScrollTrigger.create({
      id: PILLARS_STACK_ID,
      trigger: wrap,
      start: "top 88%",
      end: "+=140%",
      scrub: 0.9,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyProgress(self.progress),
      onRefresh: (self) => applyProgress(self.progress),
    });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", layout);
      trigger.kill();
      wrap.classList.remove("carmed-brand-pillars--stack");
      wrap.style.minHeight = "";
      cards.forEach((c) => {
        gsap.set(c, { clearProps: "transform" });
        c.style.position = "";
        c.style.left = "";
        c.style.right = "";
        c.style.width = "";
        c.style.zIndex = "";
      });
    };
  }, []);

  /* Parallax dos orbes e do produto. */
  useEffect(() => {
    const root = brandSectionRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll(".carmed-brand-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: (i + 1) * 36,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      });

      const product = brandProductParallaxRef.current;
      if (product) {
        gsap.to(product, {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [brandSectionRef, brandProductParallaxRef]);

  return (
    <section
      className="section-carmed-brand"
      id="section-carmed-brand"
      ref={brandSectionRef as React.Ref<HTMLElement>}
      aria-label="Sobre a marca Carmed"
    >
      <div className="section-carmed-brand__glow" aria-hidden="true" />
      <div className="carmed-brand-orb carmed-brand-orb--1" aria-hidden="true" />
      <div className="carmed-brand-orb carmed-brand-orb--2" aria-hidden="true" />
      <div className="carmed-brand-orb carmed-brand-orb--3" aria-hidden="true" />

      <div className="section-carmed-brand__inner">
        <div className="carmed-brand-copy">
          <p className="section-eyebrow">
            <span className="eyebrow-dot" /> A marca
          </p>

          <ScrollFloat id="sf-carmed-brand" text="Carmed. Cuidado em destaque." />

          <p className="carmed-brand-lead carmed-brand-reveal-item">
            A Carmed une ciência, cuidado e proximidade: produtos pensados para o
            corpo inteiro, com o padrão de qualidade do{" "}
            <strong>Grupo Cimed</strong> — da rotina de hidratação às linhas que
            viraram referência no Brasil.
          </p>

          <div className="carmed-brand-pillars" ref={pillarsRef}>
            {BRAND_PILLARS.map((pillar) => (
              <article className="carmed-brand-pillar" key={pillar.id}>
                <div className="carmed-brand-pillar__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{pillar.icon}</svg>
                </div>
                <div>
                  <h3 className="carmed-brand-pillar__title">{pillar.title}</h3>
                </div>
                <p className="carmed-brand-pillar__text">{pillar.text}</p>
              </article>
            ))}
          </div>

          <Magnet
            as="div"
            innerAs="div"
            className="carmed-brand-cta"
            padding={72}
            strength={3}
          >
            <button type="button" className="btn-primary">
              <span>Explorar produtos Carmed</span>
            </button>
          </Magnet>
        </div>

        <div className="carmed-brand-visual carmed-brand-reveal-item">
          <div className="carmed-brand-visual__rings" aria-hidden="true">
            <div className="carmed-brand-ring carmed-brand-ring--1" />
            <div className="carmed-brand-ring carmed-brand-ring--2" />
            <div className="carmed-brand-ring carmed-brand-ring--3" />
          </div>
          <div className="carmed-brand-shine" aria-hidden="true" />
          <div className="carmed-brand-logo-float">
            <img
              src="/assets/carmed.png"
              alt=""
              width={180}
              height={48}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div
            className="carmed-brand-product-wrap"
            id="carmed-brand-product-parallax"
            ref={brandProductParallaxRef}
          >
            <img
              id="carmed-brand-product-img"
              ref={brandProductImgRef}
              src={initialFlavor.center}
              alt="Linha Carmed — hidratante labial"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
