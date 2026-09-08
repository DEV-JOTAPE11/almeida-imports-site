"use client";

import { useEffect, useRef } from "react";

import { BlurRevealText } from "@/components/effects/BlurRevealText";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Marquee } from "@/components/ui/Marquee";
import { TESTIMONIALS } from "@/data/testimonials";
import { gsap } from "@/lib/gsap";

const INSTAGRAM_URL = "https://www.instagram.com/almeidaimportss_/";

/**
 * Seção "Quem já levou" — a prova social logo depois dos números.
 *
 * Os números dizem o tamanho da operação; aqui aparece quem está do outro lado
 * do balcão. As fotos são as do próprio perfil da loja no Instagram, correndo
 * numa esteira infinita em preto e branco que ganha cor quando o mouse passa —
 * o mesmo gesto do grid do catálogo, de "olhar de perto" para revelar.
 *
 * O depoimento em destaque, abaixo da esteira, é a legenda que a própria loja
 * escreveu no carrossel de clientes: sai assinado pelo perfil, e não por um
 * cliente com nome inventado.
 */
export function Testimonials() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const quote = quoteRef.current;
    if (!marquee || !quote) return;

    const ctx = gsap.context(() => {
      gsap.to(marquee, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: marquee, start: "top 85%", once: true },
      });

      gsap.to(quote, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: quote, start: "top 88%", once: true },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-testimonials" id="section-depoimentos">
      {/* Traço largo no canto — a mesma curva das artes da loja. */}
      <svg
        className="testimonials-swoosh"
        viewBox="0 0 460 154"
        width="460"
        height="154"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
          stroke="currentColor"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="testimonials-header">
        <span className="testimonials-badge" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
            <path d="M8 15H7a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
          </svg>
        </span>

        <div className="testimonials-title-wrap">
          {/* Rabisco atrás do título, no azul da fachada. */}
          <svg
            className="testimonials-scribble"
            viewBox="0 0 108 86"
            width="108"
            height="86"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
              stroke="currentColor"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <BlurRevealText
            as="h2"
            id="sf-testimonials"
            text="Cliente da casa, cara conhecida."
          />
        </div>

        <p className="section-sub">
          Quem sai da Almeida Imports com aparelho novo sai também no nosso
          feed. Estas são as pessoas que compraram em Buritis e em Arinos — no
          balcão, conferindo o aparelho junto com a gente.
        </p>
      </div>

      <div className="testimonials-marquee" ref={marqueeRef}>
        <Marquee duration="52s" gap="22px">
          {TESTIMONIALS.map((client) => (
            <figure className="testimonial-card" key={client.id}>
              <img
                className="testimonial-card__photo"
                src={client.photo}
                alt={client.alt}
                width={540}
                height={720}
                /* Sem `lazy`: o navegador não reavalia a viewport quando o
                   card entra em cena por `transform`, e ele ficaria vazio. */
                decoding="async"
              />
              <figcaption className="testimonial-card__caption">
                <h3 className="testimonial-card__purchase">{client.purchase}</h3>
                <p className="testimonial-card__place">{client.place}</p>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>

      <div className="testimonials-quote" ref={quoteRef}>
        <blockquote className="testimonials-quote__text">
          “Um cliente como você é o que faz a diferença na nossa empresa.
          Obrigada pela parceria e pela confiança!”
        </blockquote>

        <a
          className="testimonials-quote__author"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="testimonials-quote__avatar"
            src="/assets/logo-almeida.png"
            alt=""
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
          />
          <span className="testimonials-quote__meta">
            <span className="testimonials-quote__name">Almeida Imports</span>
            <span className="testimonials-quote__handle">
              <InstagramIcon />
              @almeidaimportss_
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
