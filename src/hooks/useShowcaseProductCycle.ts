"use client";

import { useEffect, useRef } from "react";

import type { ShowcaseStageRefs } from "@/components/providers/ShowcaseStageProvider";
import { SHOWCASE_DEFAULT_PRODUCT_KEY, SHOWCASE_PRODUCTS } from "@/data/showcase-products";
import { afterImageReady, applyShowcaseProductSizes, splitShowcaseBgWordChars } from "@/lib/showcase";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Troca de aparelho a cada clique na página.
 *
 * A coreografia: as letras do fundo saem por cima, os acessórios encolhem
 * e giram, o aparelho vira 90° e some, uma cortina varre a cor nova da
 * esquerda para a direita, e do outro lado do flip tudo volta já com o
 * aparelho seguinte.
 *
 * O DOM é manipulado direto (src, textContent, custom properties) em vez de
 * passar por estado React: o timeline precisa fazer a troca no frame exato
 * do meio do flip, e um re-render assíncrono cortaria a animação.
 */
export function useShowcaseProductCycle(refs: ShowcaseStageRefs) {
  const productIndexRef = useRef(
    Math.max(
      0,
      SHOWCASE_PRODUCTS.findIndex((f) => f.key === SHOWCASE_DEFAULT_PRODUCT_KEY),
    ),
  );
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const {
      showcaseSectionRef,
      showcaseProductImgRef,
      showcaseFlipInnerRef,
      showcaseBgWordRef,
      showcaseColorWipeRef,
      brandProductImgRef,
    } = refs;

    const section = showcaseSectionRef.current;
    const productImg = showcaseProductImgRef.current;
    const flipInner = showcaseFlipInnerRef.current;
    const bgWord = showcaseBgWordRef.current;
    const colorWipe = showcaseColorWipeRef.current;

    /* `refreshInit` dispara syncBrandProduct, que ao fim pede outro refresh.
       Sem esta trava os dois se realimentam e a página fica remedindo sozinha. */
    let refreshingFromSync = false;

    /** Espelha o aparelho ativo no slot da seção da loja. */
    function syncBrandProduct() {
      const brandImg = brandProductImgRef.current;
      const showcaseImg = showcaseProductImgRef.current;
      if (!brandImg || !showcaseImg || refreshingFromSync) return;

      brandImg.src = showcaseImg.src;
      brandImg.alt = showcaseImg.alt;
      afterImageReady(brandImg, () => {
        refreshingFromSync = true;
        ScrollTrigger.refresh();
        refreshingFromSync = false;
      });
    }

    /* Pré-carrega todas as artes para que a troca não pisque. */
    SHOWCASE_PRODUCTS.forEach((product) => {
      (["center", "orbit"] as const).forEach((key) => {
        const img = new Image();
        img.src = product[key];
        if (typeof img.decode === "function") img.decode().catch(() => {});
      });
    });

    syncBrandProduct();
    ScrollTrigger.addEventListener("refreshInit", syncBrandProduct);

    if (
      prefersReducedMotion() ||
      !section ||
      !productImg ||
      !flipInner ||
      !bgWord ||
      SHOWCASE_PRODUCTS.length <= 1
    ) {
      return () => ScrollTrigger.removeEventListener("refreshInit", syncBrandProduct);
    }

    function advanceProduct() {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const next = (productIndexRef.current + 1) % SHOWCASE_PRODUCTS.length;
      const product = SHOWCASE_PRODUCTS[next];
      const orbitImgs = section!.querySelectorAll<HTMLImageElement>(".showcase-orbit img");
      const prevChars = bgWord!.querySelectorAll<HTMLSpanElement>(".showcase-bg-char");

      const flipOutDur = 0.44;
      const flipInDur = 0.48;
      const tFlipStart = 0.06;
      const tSwap = tFlipStart + flipOutDur;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          productIndexRef.current = next;
          isTransitioningRef.current = false;
          syncBrandProduct();
        },
      });

      tl.to(
        prevChars,
        {
          opacity: 0,
          y: -36,
          duration: 0.22,
          stagger: { each: 0.018, from: "end" },
          ease: "power2.in",
        },
        0,
      )
        .to(
          orbitImgs,
          {
            opacity: 0,
            scale: 0.82,
            rotation: () => gsap.utils.random(-14, 14),
            duration: 0.38,
            stagger: { each: 0.045, from: "center" },
            ease: "power2.in",
          },
          0,
        )
        .to(
          flipInner,
          { rotationY: 90, duration: flipOutDur, ease: "power2.in" },
          tFlipStart,
        );

      if (colorWipe) {
        tl.fromTo(
          colorWipe,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.68,
            ease: "power2.inOut",
            onStart: () => {
              colorWipe.style.backgroundColor = product.bg;
            },
            onComplete: () => {
              section!.style.setProperty("--showcase-bg", product.bg);
              gsap.set(colorWipe, { scaleX: 0 });
              colorWipe.style.backgroundColor = "";
            },
          },
          0.08,
        );
      } else {
        tl.to(
          section,
          { "--showcase-bg": product.bg, duration: 0.68, ease: "power2.inOut" },
          0.08,
        );
      }

      /* No meio do flip, com o produto de perfil, tudo é trocado de uma vez. */
      tl.add(() => {
        productImg!.src = product.center;
        productImg!.alt = product.alt;
        afterImageReady(productImg, () => ScrollTrigger.refresh());

        orbitImgs.forEach((img) => {
          img.src = product.orbit;
        });

        splitShowcaseBgWordChars(bgWord!, product.word);

        /* Legenda sob o palco: nome comercial e linha de apoio. */
        const captionLabel = document.getElementById('showcase-caption-label');
        const captionNote = document.getElementById('showcase-caption-note');
        if (captionLabel) captionLabel.textContent = product.label;
        if (captionNote) captionNote.textContent = product.note;
        section!.dataset.showcaseProduct = product.key;
        applyShowcaseProductSizes(section, product);

        const nextChars = bgWord!.querySelectorAll<HTMLSpanElement>(".showcase-bg-char");
        gsap.set(nextChars, { opacity: 0, y: 46 });
        gsap.to(nextChars, {
          opacity: 1,
          y: 0,
          duration: 0.58,
          ease: "power3.out",
          stagger: 0.036,
          delay: 0.06,
        });
      }, tSwap)
        .set(flipInner, { rotationY: -90 }, tSwap)
        .to(flipInner, { rotationY: 0, duration: flipInDur, ease: "power2.out" }, tSwap)
        .to(
          orbitImgs,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.48,
            stagger: { each: 0.055, from: "random" },
            ease: "back.out(1.35)",
          },
          tSwap + 0.08,
        );
    }

    document.addEventListener("click", advanceProduct, { passive: true });

    return () => {
      document.removeEventListener("click", advanceProduct);
      ScrollTrigger.removeEventListener("refreshInit", syncBrandProduct);
    };
  }, [refs]);
}
