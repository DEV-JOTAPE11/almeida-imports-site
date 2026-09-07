"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

/* ────────────────────────────────────────────────────────
   AJUSTES DA SEÇÃO — mexa só aqui.
   ──────────────────────────────────────────────────────── */

/** Fundo da seção: o mesmo Deep Blue da foto. Troque pelos hex exatos. */
const BG_TOP = "#0b1220";
const BG_BOTTOM = "#12203a";

/** Altura de rolagem da seção = duração da animação. Maior = mais lento. */
const SCROLL_HEIGHT = "300vh";

/** Tamanho do card no início, como fração da tela. */
const CARD_START_SCALE = 0.4;
/** No mobile ele começa maior para não virar um selo. */
const CARD_START_SCALE_MOBILE = 0.6;
/** Largura máxima tratada como mobile (espelhada em iphone-reveal.css). */
const MOBILE_MAX = 767;
const MOBILE_QUERY = `(max-width: ${MOBILE_MAX}px)`;
const DESKTOP_QUERY = `(min-width: ${MOBILE_MAX + 1}px)`;

/** Arredondamento aparente do card no início, em px (já compensa a escala). */
const CARD_START_RADIUS = 30;

/** Progresso (0–1) em que o card termina de preencher a tela. */
const GROW_END = 0.55;
/** Progresso (0–1) em que os textos começam a aparecer. */
const TEXT_START = 0.62;
/** Duração de cada texto e intervalo entre eles, em unidades de progresso. */
const TEXT_DURATION = 0.1;
const TEXT_STAGGER = 0.07;

const WHATSAPP_URL =
  "https://wa.me/5538998040470?text=Oi!%20Quero%20saber%20a%20disponibilidade%20do%20iPhone%2017%20Deep%20Blue.";

/**
 * Seção "iPhone 17" — o card cresce até virar a tela inteira.
 *
 * A seção é alta (`SCROLL_HEIGHT`) e o palco fica `sticky` no topo enquanto
 * ela passa. Um único timeline com `scrub` amarra tudo à rolagem: primeiro o
 * card escala de `CARD_START_SCALE` até 1 perdendo o arredondamento, depois
 * os textos entram em cascata por cima.
 *
 * O estado inicial (card pequeno, textos escondidos) mora no CSS, para não
 * piscar antes do JS montar — e é o mesmo CSS que, sob `prefers-reduced-motion`,
 * entrega o card já preenchido e os textos visíveis, sem nenhum ScrollTrigger.
 */
export function IphoneReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const mm = gsap.matchMedia();

    /* As duas primeiras consultas cobrem toda largura de tela: o callback do
       matchMedia só roda quando alguma condição casa, então uma delas precisa
       ser sempre verdadeira. */
    mm.add(
      {
        isMobile: MOBILE_QUERY,
        isDesktop: DESKTOP_QUERY,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isMobile, reduceMotion } = context.conditions as {
          isMobile: boolean;
          reduceMotion: boolean;
        };

        /* Sem movimento: o CSS já mostra o card cheio e os textos no lugar. */
        if (reduceMotion) return;

        const startScale = isMobile ? CARD_START_SCALE_MOBILE : CARD_START_SCALE;
        /* O raio também é escalado pelo transform: compensa para que o card
           apareça com `CARD_START_RADIUS` px de verdade na tela. */
        const startRadius = CARD_START_RADIUS / startScale;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        /* Tween vazio de duração 1: fixa a régua do timeline em 0–1, para que
           as constantes acima sejam lidas direto como progresso da rolagem. */
        tl.to({}, { duration: 1 }, 0);

        tl.fromTo(
          card,
          {
            scale: startScale,
            borderRadius: startRadius,
            boxShadow: "0 40px 120px rgba(0, 0, 0, 0.55)",
          },
          {
            scale: 1,
            borderRadius: 0,
            boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
            duration: GROW_END,
            ease: "power2.inOut",
          },
          0,
        );

        /* Só depois do card cheio: eyebrow → título → subtítulo → botão. */
        tl.to(
          ".iphone-reveal__item",
          {
            autoAlpha: 1,
            y: 0,
            duration: TEXT_DURATION,
            stagger: TEXT_STAGGER,
            ease: "power2.out",
          },
          TEXT_START,
        );
      },
      section,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      className="section-iphone-reveal"
      id="section-iphone-reveal"
      ref={sectionRef}
      aria-label="iPhone 17 Deep Blue"
      style={
        {
          "--reveal-bg-top": BG_TOP,
          "--reveal-bg-bottom": BG_BOTTOM,
          "--reveal-scroll": SCROLL_HEIGHT,
          "--reveal-card-scale": CARD_START_SCALE,
          "--reveal-card-scale-mobile": CARD_START_SCALE_MOBILE,
          "--reveal-card-radius": `${CARD_START_RADIUS}px`,
        } as React.CSSProperties
      }
    >
      <div className="iphone-reveal__stage">
        <div className="iphone-reveal__card" ref={cardRef}>
          <Image
            className="iphone-reveal__photo"
            src="/assets/hero-ip17.png"
            alt="iPhone 17 Deep Blue"
            fill
            sizes="100vw"
            priority={false}
          />
          <div className="iphone-reveal__scrim" aria-hidden="true" />
        </div>

        <div className="iphone-reveal__content">
          <p className="iphone-reveal__eyebrow iphone-reveal__item">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span className="eyebrow-text">Almeida Imports</span>
          </p>

          <h2 className="iphone-reveal__title iphone-reveal__item">iPhone 17</h2>

          <p className="iphone-reveal__sub iphone-reveal__item">
            Deep Blue. Titânio. A potência que você esperava.
          </p>

          <div className="iphone-reveal__cta iphone-reveal__item">
            <a
              className="btn-primary"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Ver disponibilidade</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
