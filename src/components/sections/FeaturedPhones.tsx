"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { BlurRevealText } from "@/components/effects/BlurRevealText";
import {
  ChevronIcon,
  SearchIcon,
  SlidersIcon,
} from "@/components/icons/PhoneSpecIcon";
import { FeaturedPhoneCard } from "@/components/sections/FeaturedPhoneCard";
import {
  FEATURED_BRANDS,
  FEATURED_CONDITIONS,
  FEATURED_PHONES,
  FEATURED_PRICE_RANGES,
  FEATURED_STORAGES,
  modelsForBrand,
} from "@/data/featured-phones";
import { gsap } from "@/lib/gsap";
import type { FeaturedPhone } from "@/types";

const WHATSAPP_BURITIS = "https://wa.me/5538998040470";

/** Estado dos cinco campos da busca. Vazio = "todos". */
interface PhoneQuery {
  brand: string;
  model: string;
  storage: string;
  condition: string;
  priceRange: string;
}

const EMPTY_QUERY: PhoneQuery = {
  brand: "",
  model: "",
  storage: "",
  condition: "",
  priceRange: "",
};

function matchesQuery(phone: FeaturedPhone, query: PhoneQuery): boolean {
  if (query.brand && phone.brand !== query.brand) return false;
  if (query.model && phone.model !== query.model) return false;
  if (query.storage && phone.storage !== query.storage) return false;
  if (query.condition && phone.condition !== query.condition) return false;

  if (query.priceRange) {
    const range = FEATURED_PRICE_RANGES.find((r) => r.id === query.priceRange);
    if (range) {
      if (phone.price < range.min) return false;
      if (range.max !== null && phone.price >= range.max) return false;
    }
  }

  return true;
}

function isEmptyQuery(query: PhoneQuery): boolean {
  return Object.values(query).every((value) => !value);
}

/**
 * Seção "Destaques da semana" — a vitrine semanal de celulares.
 *
 * O desenho segue a mesma lógica do bloco de destaques de uma loja de
 * veículos: título, uma busca com Marca / Modelo / Armazenamento (mais os
 * filtros avançados) e uma linha de cards com foto, ficha curta, preço e
 * o caminho de contato.
 *
 * A busca tem dois estados: `draft` é o que está escolhido nos selects e
 * `query` é o que já foi aplicado — quem aplica é o botão "Buscar", como
 * numa busca de estoque de verdade.
 */
export function FeaturedPhones() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<PhoneQuery>(EMPTY_QUERY);
  const [query, setQuery] = useState<PhoneQuery>(EMPTY_QUERY);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const models = useMemo(() => modelsForBrand(draft.brand), [draft.brand]);
  const results = useMemo(
    () => FEATURED_PHONES.filter((phone) => matchesQuery(phone, query)),
    [query],
  );

  /* Entrada em cascata dos cards, uma vez só, ao chegar na seção. */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: grid, start: "top 82%", once: true },
          /* A partir daqui quem manda na visibilidade é o atributo: os
             cards que a busca criar depois já nascem visíveis. */
          onComplete: () => grid.setAttribute("data-revealed", "true"),
        },
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  function applyDraft(next: PhoneQuery) {
    setQuery(next);
    /* Buscar antes da cascata terminar não pode esconder o resultado. */
    gridRef.current?.setAttribute("data-revealed", "true");
  }

  function updateDraft(patch: Partial<PhoneQuery>) {
    setDraft((current) => {
      const next = { ...current, ...patch };
      /* Trocou a marca? O modelo escolhido pode não existir mais nela. */
      if (patch.brand !== undefined && next.model) {
        if (!modelsForBrand(next.brand).includes(next.model)) next.model = "";
      }
      return next;
    });
  }

  function clearFilters() {
    setDraft(EMPTY_QUERY);
    applyDraft(EMPTY_QUERY);
  }

  const hasFilters = !isEmptyQuery(query) || !isEmptyQuery(draft);

  return (
    <section
      className="section-featured"
      id="section-featured"
      aria-label="Destaques da semana"
    >
      <div className="featured-mesh" aria-hidden="true" />
      <div className="featured-halo" aria-hidden="true" />

      <div className="featured-head">
        <div className="section-eyebrow featured-eyebrow">
          <span className="eyebrow-dot" />
          <span className="eyebrow-text">Estoque da semana</span>
        </div>

        <BlurRevealText id="sf-featured" text="Destaques da semana." />

        <p className="featured-sub">
          Selecionamos os melhores aparelhos com preços especiais para você —
          lacrados, com garantia e parcelamento no boleto em até 24x.
        </p>
      </div>

      <form
        className="featured-search"
        onSubmit={(event) => {
          event.preventDefault();
          applyDraft(draft);
        }}
      >
        <div className="featured-search__row">
          <label className="featured-field">
            <span className="sr-only">Marca</span>
            <select
              value={draft.brand}
              onChange={(e) => updateDraft({ brand: e.target.value })}
            >
              <option value="">Marca</option>
              {FEATURED_BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </label>

          <label className="featured-field">
            <span className="sr-only">Modelo</span>
            <select
              value={draft.model}
              onChange={(e) => updateDraft({ model: e.target.value })}
            >
              <option value="">Modelo</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>

          <label className="featured-field">
            <span className="sr-only">Armazenamento</span>
            <select
              value={draft.storage}
              onChange={(e) => updateDraft({ storage: e.target.value })}
            >
              <option value="">Armazenamento</option>
              {FEATURED_STORAGES.map((storage) => (
                <option key={storage} value={storage}>
                  {storage}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="featured-search__submit">
            <SearchIcon />
            <span>Buscar</span>
          </button>
        </div>

        <div className="featured-search__tools">
          <button
            type="button"
            className="featured-search__advanced"
            aria-expanded={advancedOpen}
            aria-controls="featured-advanced"
            onClick={() => setAdvancedOpen((open) => !open)}
          >
            <SlidersIcon />
            <span>Filtros avançados</span>
            <i
              className="featured-search__chevron"
              data-open={advancedOpen || undefined}
            >
              <ChevronIcon />
            </i>
          </button>

          {hasFilters ? (
            <button
              type="button"
              className="featured-search__clear"
              onClick={clearFilters}
            >
              Limpar filtros
            </button>
          ) : null}
        </div>

        <div
          className="featured-search__row featured-search__row--advanced"
          id="featured-advanced"
          hidden={!advancedOpen}
        >
          <label className="featured-field">
            <span className="sr-only">Condição</span>
            <select
              value={draft.condition}
              onChange={(e) => updateDraft({ condition: e.target.value })}
            >
              <option value="">Condição</option>
              {FEATURED_CONDITIONS.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </label>

          <label className="featured-field">
            <span className="sr-only">Faixa de preço</span>
            <select
              value={draft.priceRange}
              onChange={(e) => updateDraft({ priceRange: e.target.value })}
            >
              <option value="">Faixa de preço</option>
              {FEATURED_PRICE_RANGES.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>

      <div className="featured-grid" ref={gridRef} aria-live="polite">
        {results.map((phone) => (
          <FeaturedPhoneCard key={phone.id} phone={phone} />
        ))}
      </div>

      {results.length === 0 ? (
        <p className="featured-empty">
          Nenhum aparelho nesses filtros esta semana.{" "}
          <a href={WHATSAPP_BURITIS} target="_blank" rel="noopener noreferrer">
            Chama no WhatsApp
          </a>{" "}
          que a gente procura o modelo para você.
        </p>
      ) : null}

      <div className="featured-footer">
        <a className="btn-primary" href="#section-catalog">
          <span>Ver o catálogo completo</span>
        </a>
      </div>
    </section>
  );
}
