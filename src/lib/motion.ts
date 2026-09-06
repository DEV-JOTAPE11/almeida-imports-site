/** Utilitários de movimento compartilhados pelas animações do site. */

/** `true` quando o sistema pede menos animação. Seguro no servidor. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Interpolação linear simples. */
export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Curva S clássica (derivada zero nas duas pontas). */
export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Normaliza `p` dentro da janela [a, b], com clamp nas bordas. */
export function progressWindow(p: number, a: number, b: number): number {
  if (p <= a) return 0;
  if (p >= b) return 1;
  return (p - a) / (b - a);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
