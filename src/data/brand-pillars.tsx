import type { BrandPillar } from "@/types";

/** Os três pilares da marca, com os ícones de linha usados na seção. */
export const BRAND_PILLARS: BrandPillar[] = [
  {
    id: "cuidado",
    title: "Cuidado no dia a dia",
    text: "Fórmulas e texturas que acompanham a rotina — pele e lábios protegidos com a confiança de quem está há décadas no mercado.",
    icon: (
      <>
        <path d="M12 21s-7-4.5-7-11a7 7 0 1 1 14 0c0 6.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    id: "excelencia",
    title: "Excelência Cimed",
    text: "Integrada a uma das maiores farmacêuticas do país, a Carmed carrega rigor, inovação e responsabilidade em cada lançamento.",
    icon: <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />,
  },
  {
    id: "brasil",
    title: "Brasil em cada detalhe",
    text: "Presença nacional, parcerias com farmácias e o tom acolhedor que só uma marca brasileira constrói com o consumidor.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </>
    ),
  },
];
