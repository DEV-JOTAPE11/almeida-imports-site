"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode, type RefObject } from "react";

/**
 * Refs partilhadas entre a vitrine Fini e a seção da marca.
 *
 * Duas animações cruzam a fronteira das seções e precisam enxergar os dois
 * lados ao mesmo tempo:
 *  - a troca de sabor, que espelha o produto ativo no slot da marca;
 *  - o handoff, em que o produto "voa" do hero até o slot da marca no scroll.
 *
 * Como GSAP trabalha direto no DOM, o estado dessas animações vive em refs
 * imperativas em vez de estado React — assim nada re-renderiza no meio do
 * timeline.
 */
export interface FiniStageRefs {
  /** `<section>` da vitrine Fini. */
  finiSectionRef: RefObject<HTMLElement | null>;
  /** Imagem do produto central. */
  finiProductImgRef: RefObject<HTMLImageElement | null>;
  /** Caixa 3D que gira no flip de sabor. */
  finiFlipInnerRef: RefObject<HTMLDivElement | null>;
  /** Palavra gigante de fundo. */
  finiBgWordRef: RefObject<HTMLParagraphElement | null>;
  /** Cortina que varre a nova cor de fundo. */
  finiColorWipeRef: RefObject<HTMLDivElement | null>;
  /** Wrapper que recebe o parallax de mouse. */
  finiParallaxRef: RefObject<HTMLDivElement | null>;

  /** Slot do produto na seção da marca — destino do handoff. */
  brandProductImgRef: RefObject<HTMLImageElement | null>;
  /** Wrapper do slot, usado como gatilho final do ScrollTrigger. */
  brandProductParallaxRef: RefObject<HTMLDivElement | null>;
  /** `<section>` da marca. */
  brandSectionRef: RefObject<HTMLElement | null>;
}

const FiniStageContext = createContext<FiniStageRefs | null>(null);

export function FiniStageProvider({ children }: { children: ReactNode }) {
  const finiSectionRef = useRef<HTMLElement | null>(null);
  const finiProductImgRef = useRef<HTMLImageElement | null>(null);
  const finiFlipInnerRef = useRef<HTMLDivElement | null>(null);
  const finiBgWordRef = useRef<HTMLParagraphElement | null>(null);
  const finiColorWipeRef = useRef<HTMLDivElement | null>(null);
  const finiParallaxRef = useRef<HTMLDivElement | null>(null);
  const brandProductImgRef = useRef<HTMLImageElement | null>(null);
  const brandProductParallaxRef = useRef<HTMLDivElement | null>(null);
  const brandSectionRef = useRef<HTMLElement | null>(null);

  const value = useMemo<FiniStageRefs>(
    () => ({
      finiSectionRef,
      finiProductImgRef,
      finiFlipInnerRef,
      finiBgWordRef,
      finiColorWipeRef,
      finiParallaxRef,
      brandProductImgRef,
      brandProductParallaxRef,
      brandSectionRef,
    }),
    [],
  );

  return (
    <FiniStageContext.Provider value={value}>{children}</FiniStageContext.Provider>
  );
}

export function useFiniStage(): FiniStageRefs {
  const ctx = useContext(FiniStageContext);
  if (!ctx) {
    throw new Error("useFiniStage precisa estar dentro de <FiniStageProvider>.");
  }
  return ctx;
}
