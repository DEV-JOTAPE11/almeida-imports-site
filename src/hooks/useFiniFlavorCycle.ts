"use client";

import { useEffect, useRef } from "react";

import type { FiniStageRefs } from "@/components/providers/FiniStageProvider";
import { FINI_DEFAULT_FLAVOR_KEY, FINI_FLAVORS } from "@/data/fini-flavors";
import { afterImageReady, applyFiniFlavorSizes, splitFiniBgWordChars } from "@/lib/fini";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Troca de sabor a cada clique na página.
 *
 * A coreografia: as letras do fundo saem por cima, os doces encolhem e
 * giram, o produto vira 90° e some, uma cortina varre a cor nova da
 * esquerda para a direita, e do outro lado do flip tudo volta já com o
 * sabor seguinte.
 *
 * O DOM é manipulado direto (src, textContent, custom properties) em vez de
 * passar por estado React: o timeline precisa fazer a troca no frame exato
 * do meio do flip, e um re-render assíncrono cortaria a animação.
 */
export function useFiniFlavorCycle(refs: FiniStageRefs) {
  const flavorIndexRef = useRef(
    Math.max(
      0,
      FINI_FLAVORS.findIndex((f) => f.key === FINI_DEFAULT_FLAVOR_KEY),
    ),
  );
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const {
      finiSectionRef,
      finiProductImgRef,
      finiFlipInnerRef,
      finiBgWordRef,
      finiColorWipeRef,
      brandProductImgRef,
    } = refs;

    const section = finiSectionRef.current;
    const productImg = finiProductImgRef.current;
    const flipInner = finiFlipInnerRef.current;
    const bgWord = finiBgWordRef.current;
    const colorWipe = finiColorWipeRef.current;

    /** Espelha o produto ativo no slot da seção da marca. */
    function syncBrandProduct() {
      const brandImg = brandProductImgRef.current;
      const finiImg = finiProductImgRef.current;
      if (!brandImg || !finiImg) return;
      brandImg.src = finiImg.src;
      brandImg.alt = finiImg.alt;
      afterImageReady(brandImg, () => ScrollTrigger.refresh());
    }

    /* Pré-carrega todas as artes para que a troca não pisque. */
    FINI_FLAVORS.forEach((flavor) => {
      (["center", "orbit"] as const).forEach((key) => {
        const img = new Image();
        img.src = flavor[key];
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
      FINI_FLAVORS.length <= 1
    ) {
      return () => ScrollTrigger.removeEventListener("refreshInit", syncBrandProduct);
    }

    function advanceFlavor() {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const next = (flavorIndexRef.current + 1) % FINI_FLAVORS.length;
      const flavor = FINI_FLAVORS[next];
      const orbitImgs = section!.querySelectorAll<HTMLImageElement>(".fini-orbit img");
      const prevChars = bgWord!.querySelectorAll<HTMLSpanElement>(".fini-bg-char");

      const flipOutDur = 0.44;
      const flipInDur = 0.48;
      const tFlipStart = 0.06;
      const tSwap = tFlipStart + flipOutDur;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          flavorIndexRef.current = next;
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
              colorWipe.style.backgroundColor = flavor.bg;
            },
            onComplete: () => {
              section!.style.setProperty("--fini-pink", flavor.bg);
              gsap.set(colorWipe, { scaleX: 0 });
              colorWipe.style.backgroundColor = "";
            },
          },
          0.08,
        );
      } else {
        tl.to(
          section,
          { "--fini-pink": flavor.bg, duration: 0.68, ease: "power2.inOut" },
          0.08,
        );
      }

      /* No meio do flip, com o produto de perfil, tudo é trocado de uma vez. */
      tl.add(() => {
        productImg!.src = flavor.center;
        productImg!.alt = flavor.alt;
        afterImageReady(productImg, () => ScrollTrigger.refresh());

        orbitImgs.forEach((img) => {
          img.src = flavor.orbit;
        });

        splitFiniBgWordChars(bgWord!, flavor.word);
        section!.dataset.finiFlavor = flavor.key;
        applyFiniFlavorSizes(section, flavor);

        const nextChars = bgWord!.querySelectorAll<HTMLSpanElement>(".fini-bg-char");
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

    document.addEventListener("click", advanceFlavor, { passive: true });

    return () => {
      document.removeEventListener("click", advanceFlavor);
      ScrollTrigger.removeEventListener("refreshInit", syncBrandProduct);
    };
  }, [refs]);
}
