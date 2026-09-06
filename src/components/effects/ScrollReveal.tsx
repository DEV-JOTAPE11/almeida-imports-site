"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

interface ScrollRevealProps {
  /** Texto do título, quebrado palavra a palavra. */
  text: string;
  className?: string;
  as?: "h2" | "h3" | "p";
}

/**
 * Variante do título animado que revela por palavra: o bloco desgira alguns
 * graus enquanto cada palavra sai do desfoque. Usa `.scroll-reveal-wrap`
 * e `.sr-word` do design system.
 *
 * Alternativa ao {@link ScrollFloat} quando o título é longo e a quebra por
 * caractere ficaria ruidosa.
 */
export function ScrollReveal({ text, className, as = "h2" }: ScrollRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const words = wrap.querySelectorAll<HTMLSpanElement>(".sr-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { transformOrigin: "0% 50%", rotate: 4 },
        {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        words,
        { opacity: 0, filter: "blur(3px)", willChange: "opacity, filter" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom-=20%",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [text]);

  const Title = as as "h2";
  const parts = text.trim().split(/(\s+)/);

  return (
    <div ref={wrapRef} className="scroll-reveal-wrap">
      <Title className={className ? `${className} section-title` : "section-title"}>
        {parts.map((part, i) =>
          /^\s+$/.test(part) ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i} className="sr-word">
              {part}
            </span>
          ),
        )}
      </Title>
    </div>
  );
}
