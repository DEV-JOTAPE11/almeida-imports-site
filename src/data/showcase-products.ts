import type { ShowcaseProduct, ShowcaseProductSizes } from "@/types";

/**
 * Dimensões padrão da vitrine — usadas como fallback quando um produto
 * não sobrescreve alguma medida.
 */
export const SHOWCASE_BASE_SIZES: ShowcaseProductSizes = {
  centerWidth: "min(86%, 540px)",
  centerImgScale: 1,
  orbitImgWidth: "100%",
  orbitWidths: [
    "clamp(96px, 15vw, 168px)",
    "clamp(64px, 9vw, 104px)",
    "clamp(88px, 14vw, 156px)",
    "clamp(56px, 8vw, 92px)",
  ],
};

/**
 * Aparelhos em destaque na vitrine, na ordem em que se revezam a cada
 * clique. Cada entrada controla o fundo da seção, a cor de apoio, a
 * palavra gigante, o aparelho central, o acessório em órbita e as medidas
 * CSS aplicadas na seção — a mesma lógica de rodízio das artes da loja,
 * que trocam a cor do fundo junto com a cor do aparelho.
 */
export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    key: "iphone-17-pro",
    bg: "#04101f",
    accent: "#4b9cff",
    wordColor: "#16457d",
    word: "iPhone",
    label: "iPhone 17 Pro",
    note: "Deep Blue · titânio · câmera Pro",
    center: "/assets/p-iphone-deep-blue.png",
    orbit: "/assets/p-airpods-pro.png",
    alt: "iPhone 17 Pro Deep Blue, frente e verso",
    sizes: SHOWCASE_BASE_SIZES,
  },
  {
    key: "iphone-17-pro-max",
    bg: "#170801",
    accent: "#ff9048",
    wordColor: "#6b2b0a",
    word: "Pro Max",
    label: "iPhone 17 Pro Max",
    note: "Cosmic Orange · a maior bateria da linha",
    center: "/assets/p-iphone-cosmic-orange.png",
    orbit: "/assets/p-apple-watch.png",
    alt: "iPhone 17 Pro Max Cosmic Orange, frente e verso",
    sizes: {
      ...SHOWCASE_BASE_SIZES,
      centerWidth: "min(86%, 520px)",
      orbitWidths: [
        "clamp(84px, 12vw, 138px)",
        "clamp(60px, 8vw, 94px)",
        "clamp(78px, 11vw, 128px)",
        "clamp(52px, 7vw, 84px)",
      ],
    },
  },
  {
    key: "redmi-note-14-pro",
    bg: "#100823",
    accent: "#b592ff",
    wordColor: "#452887",
    word: "Xiaomi",
    label: "Redmi Note 14 Pro",
    note: "Lavender · 5G · câmera de 200 MP",
    center: "/assets/p-redmi-note-14.png",
    orbit: "/assets/p-jbl-boombox.png",
    alt: "Xiaomi Redmi Note 14 Pro, frente e verso",
    sizes: {
      ...SHOWCASE_BASE_SIZES,
      centerWidth: "min(84%, 500px)",
      orbitWidths: [
        "clamp(92px, 14vw, 152px)",
        "clamp(62px, 9vw, 100px)",
        "clamp(84px, 13vw, 142px)",
        "clamp(54px, 8vw, 88px)",
      ],
    },
  },
];

/** Produto exibido no primeiro paint. */
export const SHOWCASE_DEFAULT_PRODUCT_KEY = "iphone-17-pro";

export function getShowcaseProductByKey(key: string): ShowcaseProduct {
  return (
    SHOWCASE_PRODUCTS.find((product) => product.key === key) ??
    SHOWCASE_PRODUCTS[0]
  );
}
