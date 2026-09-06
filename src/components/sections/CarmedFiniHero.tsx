"use client";

import { useEffect, useRef } from "react";

import { Magnet } from "@/components/effects/Magnet";
import { useFiniStage } from "@/components/providers/FiniStageProvider";
import { FINI_DEFAULT_FLAVOR_KEY, getFiniFlavorByKey } from "@/data/fini-flavors";
import {
  applyFiniFlavorSizes,
  finiHeroOrbitSlidePx,
  finiHeroProductEnterY,
} from "@/lib/fini";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const ORBITS = [1, 2, 3, 4] as const;

/**
 * Vitrine Carmed × Fini — a primeira tela.
 *
 * Traz a palavra gigante do sabor ao fundo, o produto no centro e quatro
 * doces em órbita. A entrada é coreografada: as letras sobem, o produto
 * desce do alto e os satélites deslizam das laterais.
 *
 * A troca de sabor a cada clique e o voo do produto até a seção da marca
 * ficam no <FiniStageController>, já que atravessam a fronteira das seções.
 */
export function CarmedFiniHero() {
  const {
    finiSectionRef,
    finiProductImgRef,
    finiFlipInnerRef,
    finiBgWordRef,
    finiColorWipeRef,
    finiParallaxRef,
  } = useFiniStage();

  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const initialFlavor = getFiniFlavorByKey(FINI_DEFAULT_FLAVOR_KEY);

  /* Medidas do sabor inicial vão para as custom properties da seção. */
  useEffect(() => {
    const section = finiSectionRef.current;
    if (!section) return;
    applyFiniFlavorSizes(
      section,
      getFiniFlavorByKey(section.dataset.finiFlavor || FINI_DEFAULT_FLAVOR_KEY),
    );
  }, [finiSectionRef]);

  /* Entrada: letras, produto e satélites. */
  useEffect(() => {
    const section = finiSectionRef.current;
    const bgWord = finiBgWordRef.current;
    const parallax = finiParallaxRef.current;
    if (!section) return;

    const motionOk = !prefersReducedMotion();
    const orbitsLeft = section.querySelectorAll(".fini-orbit--1, .fini-orbit--2");
    const orbitsRight = section.querySelectorAll(".fini-orbit--3, .fini-orbit--4");
    const chars = bgWord
      ? bgWord.querySelectorAll<HTMLSpanElement>(".fini-bg-char")
      : [];

    if (!motionOk) {
      gsap.set(chars, { opacity: 1, y: 0 });
      if (parallax) gsap.set(parallax, { autoAlpha: 1, y: 0, x: 0 });
      gsap.set([...orbitsLeft, ...orbitsRight], { opacity: 1, x: 0 });
      return;
    }

    /* Estado inicial fora da tela, aplicado antes do primeiro frame pintado. */
    const slide = finiHeroOrbitSlidePx();
    gsap.set(chars, { opacity: 0, y: 52 });
    gsap.set(orbitsLeft, { x: -slide, opacity: 0 });
    gsap.set(orbitsRight, { x: slide, opacity: 0 });
    if (parallax) {
      gsap.set(parallax, { autoAlpha: 0, y: -finiHeroProductEnterY() });
    }

    let tl: gsap.core.Timeline | null = null;

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(chars, { opacity: 1, y: 0, duration: 1.45, stagger: 0.055 }, 0);

        if (parallax) {
          tl.to(
            parallax,
            { autoAlpha: 1, y: 0, duration: 1.75, ease: "power2.out" },
            0.08,
          );
        }

        tl.to(orbitsLeft, { x: 0, opacity: 1, duration: 1.55, stagger: 0.15 }, 0.22);
        tl.to(orbitsRight, { x: 0, opacity: 1, duration: 1.55, stagger: 0.15 }, 0.32);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      tl?.kill();
    };
  }, [finiSectionRef, finiBgWordRef, finiParallaxRef]);

  /* CTA some logo nos primeiros pixels de scroll. */
  useEffect(() => {
    const section = finiSectionRef.current;
    const ctaWrap = ctaWrapRef.current;
    if (!section || !ctaWrap) return;

    const reduce = prefersReducedMotion();

    function fadeBounds() {
      const docTop = section!.getBoundingClientRect().top + window.scrollY;
      const vh = window.innerHeight || 800;
      /* Começa a sumir cedo; janela curta para chegar a zero rápido. */
      const fadeStart = Math.round(docTop + vh * 0.01);
      const fadeEnd = fadeStart + Math.round(vh * 0.2);
      return { fadeStart, fadeEnd };
    }

    const ctx = gsap.context(() => {
      gsap.set(ctaWrap, { autoAlpha: 1, y: 0 });
      /* Bounds numéricos (posição absoluta de scroll) em vez de strings:
         com strings o progresso saía errado no load e o botão já nascia meio sumido. */
      gsap.fromTo(
        ctaWrap,
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 0,
          y: reduce ? 0 : 14,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: () => fadeBounds().fadeStart,
            end: () => fadeBounds().fadeEnd,
            scrub: reduce ? true : 0.25,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [finiSectionRef]);

  /* Parallax do produto seguindo o mouse. */
  useEffect(() => {
    const parallax = finiParallaxRef.current;
    if (!parallax) return;

    function onMouseMove(e: MouseEvent) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      gsap.to(parallax, {
        x: nx * 20,
        y: ny * -14,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [finiParallaxRef]);

  return (
    <section
      className="section-carmed-fini"
      id="section-carmed-fini"
      ref={finiSectionRef as React.Ref<HTMLElement>}
      data-fini-flavor={initialFlavor.key}
      aria-label="Carmed Fini — sabores em destaque"
    >
      <div
        className="fini-bg-color-wipe"
        id="fini-bg-color-wipe"
        ref={finiColorWipeRef}
        aria-hidden="true"
      />

      <p
        className="fini-bg-word"
        id="fini-bg-word"
        ref={finiBgWordRef}
        aria-hidden="true"
      >
        {Array.from(initialFlavor.word).map((ch, i) =>
          ch === " " ? (
            <span key={i} className="fini-bg-space">
              {" "}
            </span>
          ) : (
            <span key={i} className="fini-bg-char">
              {ch}
            </span>
          ),
        )}
      </p>

      <div className="fini-stage" aria-hidden="true">
        {ORBITS.map((n) => (
          <div key={n} className={`fini-orbit fini-orbit--${n}`}>
            <img src={initialFlavor.orbit} alt="" loading="lazy" />
          </div>
        ))}

        <div className="fini-product-main">
          <div
            className="fini-product-parallax"
            id="fini-product-parallax"
            ref={finiParallaxRef}
          >
            <div className="fini-product-flip">
              <div
                className="fini-product-flip-inner"
                id="fini-product-flip-inner"
                ref={finiFlipInnerRef}
              >
                <img
                  id="fini-product-img"
                  ref={finiProductImgRef}
                  className="fini-product-main-img"
                  src={initialFlavor.center}
                  alt={initialFlavor.alt}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fini-hero-cta-wrap" ref={ctaWrapRef}>
        <Magnet
          as="a"
          className="fini-hero-cta"
          padding={72}
          strength={3}
          href="https://www.grupocimed.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar Carmed
        </Magnet>
      </div>
    </section>
  );
}
