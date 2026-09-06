import type { BrandPillar } from "@/types";

/** Os três pilares da loja, com os ícones de linha usados na seção. */
export const BRAND_PILLARS: BrandPillar[] = [
  {
    id: "garantia",
    title: "Original, lacrado e com garantia",
    text: "Aparelho conferido na sua frente, nota fiscal e garantia de verdade. Você sai da loja com o celular configurado e com os dados do antigo já transferidos.",
    icon: (
      <>
        <path d="M12 3l7.5 3v5.4c0 4.4-3 8.3-7.5 9.6-4.5-1.3-7.5-5.2-7.5-9.6V6z" />
        <path d="M9 12.2l2.2 2.2L15.4 10" />
      </>
    ),
  },
  {
    id: "boleto",
    title: "Parcelamos no boleto em até 24x",
    text: "Sem cartão de crédito e sem limite travado. A gente monta o parcelamento no boleto bancário e você leva o aparelho no mesmo dia.",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
        <path d="M2.5 10h19M6 14.5h4" />
      </>
    ),
  },
  {
    id: "assistencia",
    title: "Assistência técnica especializada",
    text: "Troca de tela, bateria, conector e reparo de placa feitos aqui mesmo, em Buritis e Arinos. Orçamento antes, sem surpresa na retirada.",
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5.5 5.2L4 16.7 7.3 20l5.2-5.2a4 4 0 0 0 5.2-5.5l-2.6 2.6-2.2-.6-.6-2.2z" />
      </>
    ),
  },
];
