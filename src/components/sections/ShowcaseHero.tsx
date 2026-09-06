"use client";

import { useEffect, useRef } from "react";

import { Magnet } from "@/components/effects/Magnet";
import { useShowcaseStage } from "@/components/providers/ShowcaseStageProvider";
import { SHOWCASE_DEFAULT_PRODUCT_KEY, getShowcaseProductByKey } from "@/data/showcase-products";
import {
  applyShowcaseProductSizes,
  showcaseHeroOrbitSlidePx,
  showcaseHeroProductEnterY,
} from "@/lib/showcase";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const ORBITS = [1, 2, 3, 4] as const;

/**
 * Vitrine da home — a primeira tela.
 *
 * Traz a palavra gigante do aparelho ao fundo, o celular no centro e
 * quatro acessórios em órbita. A entrada é coreografada: as letras sobem,
 * o aparelho desce do alto e os satélites deslizam das laterais.
 *
 * A troca de aparelho a cada clique e o voo do produto até a seção da loja
 * ficam no <ShowcaseStageController>, já que atravessam a fronteira das seções.
 */
export function ShowcaseHero() {
  const {
    showcaseSectionRef,
    showcaseProductImgRef,
    showcaseFlipInnerRef,
    showcaseBgWordRef,
    showcaseColorWipeRef,
    showcaseParallaxRef,
  } = useShowcaseStage();

  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const initialProduct = getShowcaseProductByKey(SHOWCASE_DEFAULT_PRODUCT_KEY);

  /* Medidas e cores do aparelho inicial vão para as custom properties da seção. */
  useEffect(() => {
    const section = showcaseSectionRef.current;
    if (!section) return;
    applyShowcaseProductSizes(
      section,
      getShowcaseProductByKey(section.dataset.showcaseProduct || SHOWCASE_DEFAULT_PRODUCT_KEY),
    );
  }, [showcaseSectionRef]);

  /* Entrada: letras, produto e satélites. */
  useEffect(() => {
    const section = showcaseSectionRef.current;
    const bgWord = showcaseBgWordRef.current;
    const parallax = showcaseParallaxRef.current;
    if (!section) return;

    const motionOk = !prefersReducedMotion();
    const orbitsLeft = section.querySelectorAll(".showcase-orbit--1, .showcase-orbit--2");
    const orbitsRight = section.querySelectorAll(".showcase-orbit--3, .showcase-orbit--4");
    const chars = bgWord
      ? bgWord.querySelectorAll<HTMLSpanElement>(".showcase-bg-char")
      : [];

    if (!motionOk) {
      gsap.set(chars, { opacity: 1, y: 0 });
      if (parallax) gsap.set(parallax, { autoAlpha: 1, y: 0, x: 0 });
      gsap.set([...orbitsLeft, ...orbitsRight], { opacity: 1, x: 0 });
      return;
    }

    /* Estado inicial fora da tela, aplicado antes do primeiro frame pintado. */
    const slide = showcaseHeroOrbitSlidePx();
    gsap.set(chars, { opacity: 0, y: 52 });
    gsap.set(orbitsLeft, { x: -slide, opacity: 0 });
    gsap.set(orbitsRight, { x: slide, opacity: 0 });
    if (parallax) {
      gsap.set(parallax, { autoAlpha: 0, y: -showcaseHeroProductEnterY() });
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
  }, [showcaseSectionRef, showcaseBgWordRef, showcaseParallaxRef]);

  /* CTA some logo nos primeiros pixels de scroll. */
  useEffect(() => {
    const section = showcaseSectionRef.current;
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
  }, [showcaseSectionRef]);

  /* Parallax do produto seguindo o mouse. */
  useEffect(() => {
    const parallax = showcaseParallaxRef.current;
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
  }, [showcaseParallaxRef]);

  return (
    <section
      className="section-showcase"
      id="section-showcase"
      ref={showcaseSectionRef as React.Ref<HTMLElement>}
      data-showcase-product={initialProduct.key}
      aria-label="Almeida Imports — aparelhos em destaque"
    >
      <div
        className="showcase-bg-color-wipe"
        id="showcase-bg-color-wipe"
        ref={showcaseColorWipeRef}
        aria-hidden="true"
      />

      <p
        className="showcase-bg-word"
        id="showcase-bg-word"
        ref={showcaseBgWordRef}
        aria-hidden="true"
      >
        {Array.from(initialProduct.word).map((ch, i) =>
          ch === " " ? (
            <span key={i} className="showcase-bg-space">
              {" "}
            </span>
          ) : (
            <span key={i} className="showcase-bg-char">
              {ch}
            </span>
          ),
        )}
      </p>

      <div className="showcase-stage" aria-hidden="true">
        {ORBITS.map((n) => (
          <div key={n} className={`showcase-orbit showcase-orbit--${n}`}>
            <img src={initialProduct.orbit} alt="" loading="lazy" />
          </div>
        ))}

        <div className="showcase-product-main">
          <div
            className="showcase-product-parallax"
            id="showcase-product-parallax"
            ref={showcaseParallaxRef}
          >
            <div className="showcase-product-flip">
              <div
                className="showcase-product-flip-inner"
                id="showcase-product-flip-inner"
                ref={showcaseFlipInnerRef}
              >
                <img
                  id="showcase-product-img"
                  ref={showcaseProductImgRef}
                  className="showcase-product-main-img"
                  src={initialProduct.center}
                  alt={initialProduct.alt}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="showcase-hero-cta-wrap" ref={ctaWrapRef}>
        <p className="showcase-caption">
          <span className="showcase-caption__label" id="showcase-caption-label">
            {initialProduct.label}
          </span>
          <span className="showcase-caption__note" id="showcase-caption-note">
            {initialProduct.note}
          </span>
        </p>

        <Magnet
          as="a"
          className="showcase-hero-cta"
          padding={72}
          strength={3}
          href="https://wa.me/5538998040470"
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar no WhatsApp
        </Magnet>

        <p className="showcase-hint" aria-hidden="true">
          Clique em qualquer lugar para ver o próximo aparelho
        </p>
      </div>
    </section>
  );
}
