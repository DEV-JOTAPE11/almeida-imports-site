import type { FiniFlavor, FiniFlavorSizes } from "@/types";

/**
 * Dimensões padrão da vitrine — usadas como fallback quando um sabor
 * não sobrescreve alguma medida.
 */
export const FINI_BASE_SIZES: FiniFlavorSizes = {
  centerWidth: "min(88%, 560px)",
  centerImgScale: 1,
  orbitImgWidth: "100%",
  orbitWidths: [
    "clamp(120px, 21vw, 220px)",
    "clamp(72px, 12vw, 132px)",
    "clamp(100px, 23vw, 248px)",
    "clamp(56px, 11vw, 118px)",
  ],
};

/**
 * Sabores da vitrine Carmed × Fini, na ordem em que se revezam a cada clique.
 * Cada entrada controla cor de fundo, palavra gigante, produto central,
 * doce em órbita e as medidas CSS aplicadas na seção.
 */
export const FINI_FLAVORS: FiniFlavor[] = [
  {
    key: "beijos",
    bg: "#e677ba",
    word: "Beijinhos",
    center: "/assets/carmed-fini-real.png",
    orbit: "/assets/beijos-unidade.png",
    alt: "Carmed Fini — hidratante labial",
    sizes: {
      centerWidth: "min(88%, 560px)",
      centerImgScale: 1,
      orbitImgWidth: "100%",
      orbitWidths: [
        "clamp(720px, 21vw, 220px)",
        "clamp(602px, 12vw, 132px)",
        "clamp(400px, 23vw, 248px)",
        "clamp(356px, 11vw, 118px)",
      ],
    },
  },
  {
    key: "dentaduras",
    bg: "#79d4ff",
    word: "Dentaduras",
    center: "/assets/dentadura.png",
    orbit: "/assets/dentadura-unit.png",
    alt: "Carmed Fini Dentaduras — gel dental",
    sizes: {
      centerWidth: "min(88%, 560px)",
      centerImgScale: 1,
      orbitImgWidth: "56%",
      orbitWidths: [
        "clamp(720px, 21vw, 220px)",
        "clamp(602px, 12vw, 132px)",
        "clamp(400px, 23vw, 248px)",
        "clamp(356px, 11vw, 118px)",
      ],
    },
  },
  {
    key: "coca",
    bg: "#c4102f",
    word: "Coca-Cola",
    center: "/assets/coca.png",
    orbit: "/assets/coca-unit.png",
    alt: "Carmed Fini sabor Coca-Cola",
    sizes: {
      centerWidth: "min(88%, 560px)",
      centerImgScale: 0.66,
      orbitImgWidth: "100%",
      orbitWidths: [
        "clamp(504px, 9.8vw, 112px)",
        "clamp(408px, 9vw, 102px)",
        "clamp(306px, 12.8vw, 150px)",
        "clamp(304px, 8.2vw, 94px)",
      ],
    },
  },
];

/** Sabor exibido no primeiro paint. */
export const FINI_DEFAULT_FLAVOR_KEY = "beijos";

export function getFiniFlavorByKey(key: string): FiniFlavor {
  return FINI_FLAVORS.find((flavor) => flavor.key === key) ?? FINI_FLAVORS[0];
}
