"use client";

import { useEffect, useRef } from "react";

const HOVER_TARGETS =
  "a, button, .magnet, .magic-bento-card, .card-social a, .footer-col a, .footer-bottom-right a";

/**
 * Cursor customizado: um ponto que gruda no mouse e um anel que o persegue
 * com atraso. O ponto cresce sobre qualquer elemento interativo.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let frame = 0;

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      dot!.style.left = `${mx}px`;
      dot!.style.top = `${my}px`;
    }

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring!.style.left = `${rx}px`;
      ring!.style.top = `${ry}px`;
      frame = requestAnimationFrame(animateRing);
    }

    /**
     * Delegação no documento em vez de listeners por elemento: cobre também
     * os cards e links que só existem depois da hidratação.
     */
    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest(HOVER_TARGETS)) {
        dot!.style.width = "18px";
        dot!.style.height = "18px";
      }
    }

    function onOut(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(HOVER_TARGETS)) return;
      const next = e.relatedTarget as HTMLElement | null;
      if (next?.closest(HOVER_TARGETS)) return;
      dot!.style.width = "10px";
      dot!.style.height = "10px";
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    frame = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={dotRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
