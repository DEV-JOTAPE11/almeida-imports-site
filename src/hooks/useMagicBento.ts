"use client";

import { useEffect, type RefObject } from "react";

import { gsap } from "@/lib/gsap";

const GLOW = "30, 123, 255";
const SPOTLIGHT_RADIUS = 400;

/** Raios de proximidade derivados do raio do holofote. */
function spotlightBands(radius: number) {
  return { proximity: radius * 0.5, fadeDistance: radius * 0.75 };
}

/** Desabilitado no mobile e quando o sistema pede menos movimento. */
function isDisabled(): boolean {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.innerWidth <= 768
  );
}

function updateCardGlow(
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number,
) {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
}

/**
 * Efeitos do grid "Magic Bento":
 *  - um holofote fixo que segue o mouse pela seção;
 *  - a borda de cada card acendendo conforme a proximidade do cursor;
 *  - inclinação 3D do card sob o mouse;
 *  - onda circular ao clicar.
 */
export function useMagicBento(
  gridRef: RefObject<HTMLDivElement | null>,
  sectionRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const grid = gridRef.current;
    const section = sectionRef.current;
    if (!grid || !section) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight-catalog";
    spotlight.style.background = `radial-gradient(circle,
    rgba(${GLOW}, 0.15) 0%,
    rgba(${GLOW}, 0.08) 15%,
    rgba(${GLOW}, 0.04) 25%,
    rgba(${GLOW}, 0.02) 40%,
    rgba(${GLOW}, 0.01) 65%,
    transparent 70%
  )`;
    document.body.appendChild(spotlight);

    const cards = () =>
      grid.querySelectorAll<HTMLElement>(".magic-bento-card");

    function clearGlow() {
      cards().forEach((c) => c.style.setProperty("--glow-intensity", "0"));
    }

    function onMouseMoveGlobal(e: MouseEvent) {
      if (isDisabled()) {
        gsap.set(spotlight, { opacity: 0 });
        clearGlow();
        return;
      }

      const rect = section!.getBoundingClientRect();
      const mouseInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const list = cards();

      if (!mouseInside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" });
        list.forEach((card) => card.style.setProperty("--glow-intensity", "0"));
        return;
      }

      const { proximity, fadeDistance } = spotlightBands(SPOTLIGHT_RADIUS);
      let minDistance = Infinity;

      list.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const edgeDist =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, edgeDist);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlow(card, e.clientX, e.clientY, glowIntensity, SPOTLIGHT_RADIUS);
      });

      gsap.set(spotlight, { left: e.clientX, top: e.clientY });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    }

    function onMouseLeaveDoc() {
      clearGlow();
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" });
    }

    /* Tilt e ripple, card a card. */
    const cardCleanups: Array<() => void> = [];

    cards().forEach((card) => {
      function onMove(e: MouseEvent) {
        if (isDisabled()) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        gsap.to(card, {
          rotateX: ((y - cy) / cy) * -10,
          rotateY: ((x - cx) / cx) * 10,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
          overwrite: "auto",
        });
      }

      function onLeave() {
        if (isDisabled()) return;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      function onClick(e: MouseEvent) {
        if (isDisabled()) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const maxDistance = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(x - rect.width, y - rect.height),
        );

        const ripple = document.createElement("div");
        ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${GLOW}, 0.4) 0%, rgba(${GLOW}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;
        card.appendChild(ripple);

        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 1 },
          {
            scale: 1,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
          },
        );
      }

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("click", onClick);

      cardCleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        card.removeEventListener("click", onClick);
      });
    });

    document.addEventListener("mousemove", onMouseMoveGlobal);
    document.addEventListener("mouseleave", onMouseLeaveDoc);

    return () => {
      document.removeEventListener("mousemove", onMouseMoveGlobal);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      cardCleanups.forEach((fn) => fn());
      spotlight.remove();
    };
  }, [gridRef, sectionRef]);
}
