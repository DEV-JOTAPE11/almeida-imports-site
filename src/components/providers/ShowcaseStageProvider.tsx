"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode, type RefObject } from "react";

/**
 * Refs partilhadas entre a vitrine Showcase e a seção da marca.
 *
 * Duas animações cruzam a fronteira das seções e precisam enxergar os dois
 * lados ao mesmo tempo:
 *  - a troca de aparelho, que espelha o produto ativo no slot da loja;
 *  - o handoff, em que o produto "voa" do hero até o slot da marca no scroll.
 *
 * Como GSAP trabalha direto no DOM, o estado dessas animações vive em refs
 * imperativas em vez de estado React — assim nada re-renderiza no meio do
 * timeline.
 */
export interface ShowcaseStageRefs {
  /** `<section>` da vitrine Showcase. */
  showcaseSectionRef: RefObject<HTMLElement | null>;
  /** Imagem do produto central. */
  showcaseProductImgRef: RefObject<HTMLImageElement | null>;
  /** Caixa 3D que gira no flip de troca de aparelho. */
  showcaseFlipInnerRef: RefObject<HTMLDivElement | null>;
  /** Palavra gigante de fundo. */
  showcaseBgWordRef: RefObject<HTMLParagraphElement | null>;
  /** Cortina que varre a nova cor de fundo. */
  showcaseColorWipeRef: RefObject<HTMLDivElement | null>;
  /** Wrapper que recebe o parallax de mouse. */
  showcaseParallaxRef: RefObject<HTMLDivElement | null>;

  /** Slot do produto na seção da marca — destino do handoff. */
  brandProductImgRef: RefObject<HTMLImageElement | null>;
  /** Wrapper do slot, usado como gatilho final do ScrollTrigger. */
  brandProductParallaxRef: RefObject<HTMLDivElement | null>;
  /** `<section>` da marca. */
  brandSectionRef: RefObject<HTMLElement | null>;
}

const ShowcaseStageContext = createContext<ShowcaseStageRefs | null>(null);

export function ShowcaseStageProvider({ children }: { children: ReactNode }) {
  const showcaseSectionRef = useRef<HTMLElement | null>(null);
  const showcaseProductImgRef = useRef<HTMLImageElement | null>(null);
  const showcaseFlipInnerRef = useRef<HTMLDivElement | null>(null);
  const showcaseBgWordRef = useRef<HTMLParagraphElement | null>(null);
  const showcaseColorWipeRef = useRef<HTMLDivElement | null>(null);
  const showcaseParallaxRef = useRef<HTMLDivElement | null>(null);
  const brandProductImgRef = useRef<HTMLImageElement | null>(null);
  const brandProductParallaxRef = useRef<HTMLDivElement | null>(null);
  const brandSectionRef = useRef<HTMLElement | null>(null);

  const value = useMemo<ShowcaseStageRefs>(
    () => ({
      showcaseSectionRef,
      showcaseProductImgRef,
      showcaseFlipInnerRef,
      showcaseBgWordRef,
      showcaseColorWipeRef,
      showcaseParallaxRef,
      brandProductImgRef,
      brandProductParallaxRef,
      brandSectionRef,
    }),
    [],
  );

  return (
    <ShowcaseStageContext.Provider value={value}>{children}</ShowcaseStageContext.Provider>
  );
}

export function useShowcaseStage(): ShowcaseStageRefs {
  const ctx = useContext(ShowcaseStageContext);
  if (!ctx) {
    throw new Error("useShowcaseStage precisa estar dentro de <ShowcaseStageProvider>.");
  }
  return ctx;
}
