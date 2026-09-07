"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

interface BlurRevealTextProps {
  /** Id do wrapper — alguns ajustes de tamanho por seção dependem dele. */
  id?: string;
  /** Texto do título, quebrado caractere a caractere. */
  text: string;
  className?: string;
  /** Tag semântica do título. O default `div` mantém o markup original. */
  as?: "div" | "h1" | "h2" | "h3" | "p";
}

/**
 * Título revelado caractere a caractere, atrelado ao scroll.
 *
 * Porte da entrada de texto da LP da JTP (`.asc-type-blur`): cada caractere
 * parte de `opacity: 0 / blur(10px)` e chega a `opacity: 1 / blur(0)` com
 * `duration: 0.5`, `ease: power3.out`, `stagger: 0.035` e `scrub: 1` entre
 * `top 85%` e `top 40%` — o progresso vem da rolagem, não de um relógio.
 *
 * Os caracteres são spans INLINE, não `inline-block`: sem caixa própria eles
 * não mudam nada na quebra de linha nem no kerning do título, então o texto
 * ocupa exatamente o mesmo espaço com a animação ligada ou desligada. Só
 * `opacity` e `filter` mudam, e nenhum dos dois move o layout.
 */
export function BlurRevealText({
  id,
  text,
  className,
  as = "div",
}: BlurRevealTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (prefersReducedMotion()) return;

    const chars = wrap.querySelectorAll<HTMLSpanElement>(".blur-reveal-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, filter: "blur(10px)", willChange: "opacity, filter" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
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
        className ? `${className} blur-reveal-wrap` : "blur-reveal-wrap"
      }
    >
      {Array.from(text).map((ch, i) =>
        /* Espaços ficam como texto puro: assim a quebra de linha continua
           sendo decidida pelo navegador, palavra a palavra. */
        ch === " " ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="blur-reveal-char">
            {ch}
          </span>
        ),
      )}
    </Tag>
  );
}
