"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

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

/* ── Conteúdo ── */
const TITLE_TEXT = "iPhone 17";
/** Preço em destaque — placeholder, troque à vontade. */
const PRICE_TEXT = "R$ 8.999";
const CTA_PRIMARY_LABEL = "Comprar agora";
const CTA_SECONDARY_LABEL = "Ver todas as ofertas";

const WHATSAPP_URL =
  "https://wa.me/5538998040470?text=Oi!%20Quero%20comprar%20o%20iPhone%2017%20Deep%20Blue.";
const OFFERS_ANCHOR = "#section-catalog";

/* ── Sequência final: começa quando o card já preencheu a tela ──
   `SEQUENCE_START` é progresso da rolagem (0–1); daí para baixo tudo é tempo
   em segundos, tocado no ritmo próprio da timeline. Cada GAP_* é a pausa
   entre uma etapa e o fim da anterior — negativo faz as duas se sobreporem.
   Mexa neles para reordenar a coreografia sem tocar no resto. */
const SEQUENCE_START = 0.6;

/** Quando o título começa a ser digitado, em segundos da timeline. */
const TITLE_START = 0.6;
/** Velocidade da digitação, em segundos por caractere. */
const TITLE_TYPE_SPEED = 0.075;
const PRICE_TYPE_SPEED = 0.09;
const GAP_TITLE_TO_SUB = 0.15;
const SUB_DURATION = 0.6;
/** O bloco de preço + botões sobe do rodapé. */
const GAP_SUB_TO_OFFER = 0.05;
const OFFER_RISE_DURATION = 0.9;
const OFFER_RISE_DISTANCE = 90; // px
/** O preço começa a digitar com o bloco ainda subindo. */
const GAP_OFFER_TO_PRICE = -0.55;
/** Névoa por último, fechando a cena. */
const GAP_PRICE_TO_SMOKE = -0.3;
const SMOKE_DURATION = 1.6;

/** Névoa do rodapé: altura da faixa e opacidade no fim. */
const SMOKE_HEIGHT = "46vh";
const SMOKE_OPACITY = 0.95;

/**
 * Seção "iPhone 17" — o card cresce até virar a tela inteira e, com a tela
 * cheia, a cena de produto se monta por cima.
 *
 * São duas animações com papéis distintos:
 *
 *  1. a escala do card, amarrada à rolagem (`scrub`): a seção é alta
 *     (`SCROLL_HEIGHT`), o palco fica `sticky` no topo e o card cresce de
 *     `CARD_START_SCALE` até preencher o viewport, perdendo o arredondamento;
 *  2. a sequência final, disparada em `SEQUENCE_START` por um segundo
 *     ScrollTrigger e tocada no tempo dela — não no da rolagem, senão a
 *     digitação ficaria refém da velocidade do dedo: título
 *     digitado → subtítulo → bloco de preço e botões subindo do rodapé, com o
 *     preço digitando → névoa. Rolando de volta, ela se desfaz ao contrário.
 *
 * O estado inicial (card pequeno, textos escondidos) mora no CSS, para não
 * piscar antes do JS montar — e é o mesmo CSS que, sob `prefers-reduced-motion`,
 * entrega o card preenchido, os textos no lugar e a névoa parada, sem nenhum
 * ScrollTrigger.
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

        /* Sem movimento: o CSS já mostra a cena montada. */
        if (reduceMotion) return;

        const startScale = isMobile ? CARD_START_SCALE_MOBILE : CARD_START_SCALE;
        /* O raio também é escalado pelo transform: compensa para que o card
           apareça com `CARD_START_RADIUS` px de verdade na tela. */
        const startRadius = CARD_START_RADIUS / startScale;

        /* ── 1. A escala do card, presa à rolagem ── */
        const growth = gsap.timeline({
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
        growth.to({}, { duration: 1 }, 0);

        growth.fromTo(
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

        /* ── 2. A cena de produto, no tempo dela ── */
        const title = section.querySelector<HTMLElement>(".iphone-reveal__title");
        const price = section.querySelector<HTMLElement>(".iphone-reveal__price");

        /* O cursor piscante é uma classe: entra quando a digitação começa e sai
           quando ela termina, nos dois sentidos da timeline. */
        const typing = (el: HTMLElement | null) => ({
          onStart: () => el?.classList.add("is-typing"),
          onComplete: () => el?.classList.remove("is-typing"),
          onReverseComplete: () => el?.classList.remove("is-typing"),
        });

        const scene = gsap.timeline({ paused: true });

        scene
          /* Esvazia o título só na hora de digitar: no HTML ele nasce escrito,
             que é o que vale sem JS e sob reduced-motion. */
          .set(title, { autoAlpha: 1, text: "" }, TITLE_START)
          .to(title, {
            text: TITLE_TEXT,
            duration: TITLE_TEXT.length * TITLE_TYPE_SPEED,
            ease: "none",
            ...typing(title),
          })
          .to(
            ".iphone-reveal__sub",
            { autoAlpha: 1, y: 0, duration: SUB_DURATION, ease: "power2.out" },
            `>${GAP_TITLE_TO_SUB}`,
          )
          .fromTo(
            ".iphone-reveal__offer",
            { autoAlpha: 0, y: OFFER_RISE_DISTANCE },
            {
              autoAlpha: 1,
              y: 0,
              duration: OFFER_RISE_DURATION,
              ease: "power3.out",
            },
            `>${GAP_SUB_TO_OFFER}`,
          )
          .set(price, { text: "" }, `>${GAP_OFFER_TO_PRICE}`)
          .to(price, {
            text: PRICE_TEXT,
            duration: PRICE_TEXT.length * PRICE_TYPE_SPEED,
            ease: "none",
            ...typing(price),
          })
          .fromTo(
            ".iphone-reveal__smoke",
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: SMOKE_OPACITY,
              y: 0,
              duration: SMOKE_DURATION,
              ease: "power2.out",
            },
            `>${GAP_PRICE_TO_SMOKE}`,
          );

        /* O gatilho: o ponto da rolagem em que o card acabou de encher a tela.
           A distância rolável muda com o viewport, então o `start` é uma função
           reavaliada a cada refresh do ScrollTrigger. */
        ScrollTrigger.create({
          trigger: section,
          start: () =>
            `top top-=${SEQUENCE_START * (section.offsetHeight - window.innerHeight)}`,
          invalidateOnRefresh: true,
          onEnter: () => scene.play(),
          onLeaveBack: () => scene.reverse(),
        });
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
      aria-label={`${TITLE_TEXT} Deep Blue`}
      style={
        {
          "--reveal-bg-top": BG_TOP,
          "--reveal-bg-bottom": BG_BOTTOM,
          "--reveal-scroll": SCROLL_HEIGHT,
          "--reveal-card-scale": CARD_START_SCALE,
          "--reveal-card-scale-mobile": CARD_START_SCALE_MOBILE,
          "--reveal-card-radius": `${CARD_START_RADIUS}px`,
          "--reveal-offer-rise": `${OFFER_RISE_DISTANCE}px`,
          "--reveal-smoke-height": SMOKE_HEIGHT,
          "--reveal-smoke-opacity": SMOKE_OPACITY,
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

        {/* Névoa do rodapé: gradiente Deep Blue + ruído borrado à deriva. */}
        <div className="iphone-reveal__smoke" aria-hidden="true">
          <svg
            className="iphone-reveal__smoke-noise"
            viewBox="0 0 600 300"
            preserveAspectRatio="none"
          >
            <filter id="iphone-reveal-smoke-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.011 0.024"
                numOctaves="3"
                seed="7"
              />
              <feGaussianBlur stdDeviation="7" />
              {/* O ruído sai colorido; dessatura para virar fumaça. */}
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect
              width="600"
              height="300"
              filter="url(#iphone-reveal-smoke-filter)"
            />
          </svg>
        </div>

        <div className="iphone-reveal__content">
          <h2 className="iphone-reveal__title">{TITLE_TEXT}</h2>

          <p className="iphone-reveal__sub">
            Deep Blue. Titânio. A potência que você esperava.
          </p>

          <div className="iphone-reveal__offer">
            <p className="iphone-reveal__price-line">
              <span className="iphone-reveal__price-label">à vista</span>
              <span className="iphone-reveal__price">{PRICE_TEXT}</span>
            </p>

            <div className="iphone-reveal__actions">
              <a
                className="btn-primary"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{CTA_PRIMARY_LABEL}</span>
              </a>
              <a className="iphone-reveal__btn-outline" href={OFFERS_ANCHOR}>
                <span>{CTA_SECONDARY_LABEL}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
