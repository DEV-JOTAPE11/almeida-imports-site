"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

import { prefersReducedMotion } from "@/lib/motion";

/**
 * Rolagem suave da página (Lenis).
 *
 * Porte do comportamento usado na LP da JTP: um único ajuste —
 * `new Lenis({ duration: 1.2 })` — e a instância alimentada a cada quadro.
 * Com `duration` numérico o Lenis troca a interpolação por `lerp` pela curva
 * exponencial padrão (`1.001 - 2^(-10t)`), que é da mesma família das
 * entradas de texto: é daí que vem a sensação de que a rolagem e as
 * animações "conversam".
 *
 * Quem bate o relógio é o ticker do GSAP, não um `requestAnimationFrame`
 * solto. O <BlurRevealText> revela caractere a caractere com `scrub`, ou
 * seja, lendo a posição de rolagem a cada quadro; se o Lenis atualizasse
 * essa posição num rAF próprio, ora antes ora depois do ScrollTrigger, o
 * texto tremeria. Com um ticker só, a ordem é sempre a mesma. O
 * `lagSmoothing(0)` desliga a compensação de quadros perdidos do GSAP, que
 * de outra forma daria saltos na posição interpolada do Lenis.
 *
 * Sob `prefers-reduced-motion` nada disso monta: fica a rolagem nativa.
 */

let instance: Lenis | null = null;

/** Instância ativa do Lenis — `null` antes de montar e sob reduced-motion. */
export function getLenis() {
  return instance;
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      // Fora do bundle inicial; o GSAP já vem do chunk das outras animações.
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap"),
      ]);
      if (cancelled) return;

      /* `anchors` devolve ao menu do topo a rolagem suave que o
         `scroll-behavior: smooth` dava antes — agora quem interpola é o
         Lenis. O deslocamento repete o `scroll-margin-top: 118px` do
         reset, que o Lenis não lê: sem ele a seção pararia embaixo do
         menu fixo. */
      const lenis = new Lenis({
        duration: 1.2,
        anchors: { offset: -118 },
      });
      instance = lenis;

      // O ScrollTrigger recalcula no mesmo instante em que a posição muda,
      // sem esperar o evento `scroll` nativo do próximo quadro.
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000); // GSAP em s, Lenis em ms
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33); // valores padrão do GSAP
        lenis.destroy();
        instance = null;
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
