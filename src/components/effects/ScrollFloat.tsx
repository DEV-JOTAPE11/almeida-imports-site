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
 *
 * Os caracteres são agrupados em palavras: como cada caractere é um
 * `inline-block`, sem esse agrupamento o texto quebraria no meio da palavra
 * ("Tecno / logia") e as letras da linha de cima invadiriam a de baixo
 * durante a entrada. A palavra segura a quebra e mascara a própria animação.
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
            /* Comeca quando o titulo entra de fato na tela. Com o antigo
               `center bottom+=50%` a faixa abria uma tela e meia antes: a
               revelacao era gasta com o texto ainda fora da vista e chegava
               pela metade na posicao de leitura. */
            start: "top bottom-=15%",
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
      {text.split(" ").map((word, wordIndex, words) => (
        <span key={`${id}-w${wordIndex}`} className="scroll-float-word">
          {Array.from(word).map((ch, charIndex) => (
            <span
              key={`${id}-w${wordIndex}-${charIndex}`}
              className="scroll-float-char"
            >
              {ch}
            </span>
          ))}
          {/* O espaco vive dentro da palavra anterior para nao virar recuo
              quando a linha quebra logo depois dele. */}
          {wordIndex < words.length - 1 ? (
            <span className="scroll-float-char space"> </span>
          ) : null}
        </span>
      ))}
    </Tag>
  );
}
