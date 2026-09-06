import type { Stat } from "@/types";

/** Números do Grupo Cimed — contadores animados no scroll. */
export const STATS: Stat[] = [
  {
    id: "faturamento",
    target: 2,
    prefix: "R$",
    suffix: "bi+",
    label: "Faturamento",
    description:
      "Faturamento anual do Grupo Cimed — entre as maiores farmacêuticas do país.",
  },
  {
    id: "posicao",
    target: 3,
    suffix: "ª",
    label: "Posição nacional",
    description: "Maior farmacêutica de capital brasileiro e 3ª maior do Brasil.",
  },
  {
    id: "anos",
    target: 30,
    suffix: "+",
    label: "Anos de história",
    description:
      "Três décadas transformando uma empresa familiar em gigante nacional.",
  },
  {
    id: "marcas",
    target: 50,
    suffix: "+",
    label: "Marcas no portfólio",
    description:
      "De Lavitan a Carmed — produtos que estão na casa de todo brasileiro.",
  },
];
