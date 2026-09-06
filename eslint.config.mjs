import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      /**
       * O site usa <img> nativas de propósito: as animações GSAP medem os
       * elementos com getBoundingClientRect e trocam o `src` no meio de um
       * timeline (troca de sabor, handoff Fini → marca). O wrapper do
       * next/image quebraria essas medições e a troca imperativa.
       */
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default config;
