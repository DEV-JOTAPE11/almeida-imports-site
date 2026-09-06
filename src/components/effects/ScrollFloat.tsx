"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

interface ScrollFloatProps {
  /** Id do wrapper — alguns ajustes de tamanho por seção dependem dele. */
  id: string;
  /** Texto do título, quebrado caractere a caractere. */
  text: string;
  className?: string;
  /** Tag semântica do título. O default `div` mantém o markup original. */
  as?: "div" | "h2" | "h3";
}

/**
 * Título que "flutua" para cima letra a letra conforme a página rola.
 * Cada caractere entra esticado e vai assentando, com o progresso amarrado
 * ao scroll (scrub), não a uma duração fixa.
 */
export function ScrollFloat({ id, text, className, as = "div" }: ScrollFloatProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const chars = wrap.querySelectorAll<HTMLSpanElement>(".scroll-float-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        },
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          ease: "back.inOut(2)",
          stagger: 0.03,
          scrollTrigger: {
            trigger: wrap,
            start: "center bottom+=50%",
            end: "bottom bottom-=40%",
            scrub: true,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [text]);

  const Tag = as as "div";

  return (
    <Tag
      id={id}
      ref={wrapRef as React.Ref<HTMLDivElement>}
      className={
        className ? `${className} scroll-float-wrap` : "scroll-float-wrap"
      }
    >
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={`${id}-${i}`} className="scroll-float-char space">
            {" "}
          </span>
        ) : (
          <span key={`${id}-${i}`} className="scroll-float-char">
            {ch}
          </span>
        ),
      )}
    </Tag>
  );
}
