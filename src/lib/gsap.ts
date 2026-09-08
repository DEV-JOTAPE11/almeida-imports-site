"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

/**
 * Ponto único de registro do GSAP.
 * Importe daqui em vez de importar "gsap" direto, para garantir que o
 * ScrollTrigger e o TextPlugin (efeito máquina de escrever) estejam
 * registrados antes do primeiro uso.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export { gsap, ScrollTrigger, TextPlugin };
