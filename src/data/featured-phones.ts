import type { FeaturedPhone } from "@/types";

/* ════════════════════════════════════════════════════════
   DESTAQUES DA SEMANA — os celulares que a loja anuncia.

   Os modelos vieram do que a Almeida Imports posta no Instagram
   (@almeidaimportss_ e @almeidaimports.arinos): a linha iPhone como
   carro-chefe, Xiaomi/Redmi no custo-benefício e o Galaxy A07 da
   promoção de aniversário. As fotos são os renders oficiais de cada
   fabricante, em PNG com fundo transparente — o mesmo tratamento das
   imagens da vitrine.

   ⚠️  PREÇOS SÃO PLACEHOLDER. Troque `price` pelos valores reais da
   loja antes de publicar — o card mostra o valor à vista e calcula o
   boleto em 24x a partir dele.
   ════════════════════════════════════════════════════════ */

export const WHATSAPP_BY_STORE = {
  buritis: "https://wa.me/5538998040470",
  arinos: "https://wa.me/5538999597481",
} as const;

/** Parcelamento anunciado pela loja — "no boleto em até 24x". */
export const MAX_INSTALLMENTS = 24;

export const FEATURED_PHONES: FeaturedPhone[] = [
  {
    id: "iphone-17-pro-max",
    brand: "Apple",
    model: "iPhone 17 Pro Max",
    color: "Laranja Cósmico",
    storage: "256 GB",
    condition: "Lacrado",
    badge: "Novidade",
    photo: "/assets/p-iphone-cosmic-orange.png",
    alt: "iPhone 17 Pro Max Laranja Cósmico, frente e verso",
    specs: [
      { icon: "storage", label: "256 GB" },
      { icon: "screen", label: '6,9"' },
      { icon: "seal", label: "Lacrado" },
    ],
    price: 9999,
    store: "buritis",
  },
  {
    id: "iphone-17",
    brand: "Apple",
    model: "iPhone 17",
    color: "Lavanda",
    storage: "256 GB",
    condition: "Lacrado",
    badge: "Mais vendido",
    photo: "/assets/p-iphone-17-lavanda.png",
    alt: "iPhone 17 Lavanda, frente e verso",
    specs: [
      { icon: "storage", label: "256 GB" },
      { icon: "screen", label: '6,3"' },
      { icon: "seal", label: "Lacrado" },
    ],
    price: 6799,
    store: "buritis",
  },
  {
    id: "redmi-note-14-pro",
    brand: "Xiaomi",
    model: "Redmi Note 14 Pro",
    color: "Lavender · 5G",
    storage: "256 GB",
    condition: "Lacrado",
    photo: "/assets/p-redmi-note-14.png",
    alt: "Xiaomi Redmi Note 14 Pro, frente e verso",
    specs: [
      { icon: "storage", label: "256 GB" },
      { icon: "camera", label: "200 MP" },
      { icon: "seal", label: "Versão global" },
    ],
    price: 2199,
    store: "buritis",
  },
  {
    id: "galaxy-a07",
    brand: "Samsung",
    model: "Galaxy A07",
    color: "Preto",
    storage: "128 GB",
    condition: "Lacrado",
    badge: "Oferta",
    photo: "/assets/p-galaxy-a07.png",
    alt: "Samsung Galaxy A07 Preto, frente e verso",
    /* O render da Samsung vem com muita margem no arquivo. */
    photoScale: 1.28,
    specs: [
      { icon: "storage", label: "128 GB" },
      { icon: "battery", label: "5.000 mAh" },
      { icon: "seal", label: "Lacrado" },
    ],
    price: 799,
    store: "arinos",
  },
];

/* ── Opções da busca, derivadas da própria lista ── */

/** Marcas disponíveis, na ordem em que aparecem no estoque. */
export const FEATURED_BRANDS: string[] = [
  ...new Set(FEATURED_PHONES.map((phone) => phone.brand)),
];

/** Armazenamentos disponíveis, do menor para o maior. */
export const FEATURED_STORAGES: string[] = [
  ...new Set(FEATURED_PHONES.map((phone) => phone.storage)),
].sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));

/** Condições disponíveis (filtro avançado). */
export const FEATURED_CONDITIONS: string[] = [
  ...new Set(FEATURED_PHONES.map((phone) => phone.condition)),
];

/** Faixas de preço do filtro avançado. `max: null` = sem teto. */
export const FEATURED_PRICE_RANGES = [
  { id: "ate-1500", label: "Até R$ 1.500", min: 0, max: 1500 },
  { id: "1500-5000", label: "R$ 1.500 a R$ 5.000", min: 1500, max: 5000 },
  { id: "acima-5000", label: "Acima de R$ 5.000", min: 5000, max: null },
] as const;

/**
 * Modelos de uma marca — ou todos, quando nenhuma marca está escolhida.
 * É o que alimenta o segundo select da busca.
 */
export function modelsForBrand(brand: string): string[] {
  return FEATURED_PHONES.filter((phone) => !brand || phone.brand === brand).map(
    (phone) => phone.model,
  );
}
