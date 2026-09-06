import type { Stat } from "@/types";

/** Números da Almeida Imports — contadores animados no scroll. */
export const STATS: Stat[] = [
  {
    id: "parcelamento",
    target: 24,
    suffix: "x",
    label: "No boleto bancário",
    description:
      "Parcelamento no boleto em até 24 vezes, sem precisar de cartão de crédito.",
  },
  {
    id: "lojas",
    target: 2,
    label: "Lojas físicas",
    description:
      "Buritis e Arinos, no noroeste de Minas — atendimento no balcão, não só online.",
  },
  {
    id: "marcas",
    target: 4,
    suffix: "+",
    label: "Marcas em destaque",
    description:
      "Apple, Xiaomi, JBL e Starlink, além da linha de acessórios que gira toda semana.",
  },
  {
    id: "seguidores",
    target: 7,
    suffix: "mil+",
    label: "Seguidores no Instagram",
    description:
      "A comunidade que acompanha lançamento, chegada de estoque e promoção pelos nossos perfis.",
  },
];
