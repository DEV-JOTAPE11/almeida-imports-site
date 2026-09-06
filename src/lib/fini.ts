import { FINI_BASE_SIZES } from "@/data/fini-flavors";
import type { FiniFlavor } from "@/types";

/**
 * Escreve as medidas de um sabor nas custom properties da seção.
 * A seção lê `--fini-center-width`, `--fini-center-img-scale`,
 * `--fini-orbit-img-inner-width` e `--fini-orbit-{1..4}-width`.
 */
export function applyFiniFlavorSizes(
  section: HTMLElement | null,
  flavor: FiniFlavor | null | undefined,
): void {
  if (!section || !flavor) return;

  const sizes = flavor.sizes ?? FINI_BASE_SIZES;

  section.style.setProperty(
    "--fini-center-width",
    sizes.centerWidth ?? FINI_BASE_SIZES.centerWidth,
  );
  section.style.setProperty(
    "--fini-center-img-scale",
    String(sizes.centerImgScale ?? FINI_BASE_SIZES.centerImgScale),
  );
  section.style.setProperty(
    "--fini-orbit-img-inner-width",
    sizes.orbitImgWidth ?? FINI_BASE_SIZES.orbitImgWidth,
  );

  const widths = Array.isArray(sizes.orbitWidths)
    ? sizes.orbitWidths
    : FINI_BASE_SIZES.orbitWidths;

  for (let i = 0; i < 4; i++) {
    section.style.setProperty(
      `--fini-orbit-${i + 1}-width`,
      widths[i] ?? FINI_BASE_SIZES.orbitWidths[i],
    );
  }
}

/**
 * Quebra a palavra de fundo em `<span>` por caractere, para animar um a um.
 * Devolve os spans de letra (espaços viram um span próprio, sem animação).
 */
export function splitFiniBgWordChars(
  el: HTMLElement,
  text: string | null | undefined,
): NodeListOf<HTMLSpanElement> {
  const str = text == null ? "" : String(text);
  el.replaceChildren();

  for (const ch of str) {
    const span = document.createElement("span");
    if (ch === " ") {
      span.className = "fini-bg-space";
      /* nbsp: um espaço comum colapsaria e a palavra perderia o respiro. */
      span.textContent = " ";
    } else {
      span.className = "fini-bg-char";
      span.textContent = ch;
    }
    el.appendChild(span);
  }

  return el.querySelectorAll<HTMLSpanElement>(".fini-bg-char");
}

/** Distância que os satélites percorrem ao entrar. */
export function finiHeroOrbitSlidePx(): number {
  if (typeof window === "undefined") return 260;
  return Math.min(window.innerWidth * 0.32, 280);
}

/** Altura de onde o produto central "cai" na entrada. */
export function finiHeroProductEnterY(): number {
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
