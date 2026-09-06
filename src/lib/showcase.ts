import { SHOWCASE_BASE_SIZES } from "@/data/showcase-products";
import type { ShowcaseProduct } from "@/types";

/**
 * Escreve as medidas e as cores de um produto nas custom properties da
 * seção. A seção lê `--showcase-center-width`,
 * `--showcase-center-img-scale`, `--showcase-orbit-img-inner-width`,
 * `--showcase-orbit-{1..4}-width`, `--showcase-accent` e
 * `--showcase-word`.
 */
export function applyShowcaseProductSizes(
  section: HTMLElement | null,
  product: ShowcaseProduct | null | undefined,
): void {
  if (!section || !product) return;

  section.style.setProperty("--showcase-accent", product.accent);
  section.style.setProperty("--showcase-word", product.wordColor);

  const sizes = product.sizes ?? SHOWCASE_BASE_SIZES;

  section.style.setProperty(
    "--showcase-center-width",
    sizes.centerWidth ?? SHOWCASE_BASE_SIZES.centerWidth,
  );
  section.style.setProperty(
    "--showcase-center-img-scale",
    String(sizes.centerImgScale ?? SHOWCASE_BASE_SIZES.centerImgScale),
  );
  section.style.setProperty(
    "--showcase-orbit-img-inner-width",
    sizes.orbitImgWidth ?? SHOWCASE_BASE_SIZES.orbitImgWidth,
  );

  const widths = Array.isArray(sizes.orbitWidths)
    ? sizes.orbitWidths
    : SHOWCASE_BASE_SIZES.orbitWidths;

  for (let i = 0; i < 4; i++) {
    section.style.setProperty(
      `--showcase-orbit-${i + 1}-width`,
      widths[i] ?? SHOWCASE_BASE_SIZES.orbitWidths[i],
    );
  }
}

/**
 * Quebra a palavra de fundo em `<span>` por caractere, para animar um a um.
 * Devolve os spans de letra (espaços viram um span próprio, sem animação).
 */
export function splitShowcaseBgWordChars(
  el: HTMLElement,
  text: string | null | undefined,
): NodeListOf<HTMLSpanElement> {
  const str = text == null ? "" : String(text);
  el.replaceChildren();

  for (const ch of str) {
    const span = document.createElement("span");
    if (ch === " ") {
      span.className = "showcase-bg-space";
      /* nbsp: um espaço comum colapsaria e a palavra perderia o respiro. */
      span.textContent = " ";
    } else {
      span.className = "showcase-bg-char";
      span.textContent = ch;
    }
    el.appendChild(span);
  }

  return el.querySelectorAll<HTMLSpanElement>(".showcase-bg-char");
}

/** Distância que os satélites percorrem ao entrar. */
export function showcaseHeroOrbitSlidePx(): number {
  if (typeof window === "undefined") return 260;
  return Math.min(window.innerWidth * 0.32, 280);
}

/** Altura de onde o produto central "cai" na entrada. */
export function showcaseHeroProductEnterY(): number {
  if (typeof window === "undefined") return 320;
  return Math.min(560, Math.round(window.innerHeight * 0.58));
}

/** Dispara `run` assim que a imagem estiver decodificada (ou já pronta). */
export function afterImageReady(
  img: HTMLImageElement | null,
  run: () => void,
): void {
  if (!img) return;
  if (typeof img.decode === "function") {
    img.decode().then(run).catch(run);
  } else if (img.complete) {
    run();
  } else {
    img.addEventListener("load", run, { once: true });
  }
}
