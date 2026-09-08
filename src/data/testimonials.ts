import type { Testimonial } from "@/types";

/**
 * Clientes atendidos na loja — as fotos são as do próprio perfil da Almeida
 * Imports no Instagram (@almeidaimportss_), do carrossel "Um cliente como você
 * é o que faz a diferença na nossa empresa".
 *
 * Os cards não trazem nome de cliente: identificam a compra e a loja, que é o
 * que a foto de fato mostra. Se a loja quiser creditar cada pessoa pelo nome,
 * basta acrescentar o campo aqui.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "cliente-01",
    photo: "/assets/cliente-01.jpg",
    alt: "Cliente com o iPhone novo no balcão da Almeida Imports",
    purchase: "iPhone",
    place: "Loja Buritis",
  },
  {
    id: "cliente-02",
    photo: "/assets/cliente-02.jpg",
    alt: "Cliente retirando a compra na loja, com a sacola da Almeida Imports",
    purchase: "Entrega na loja",
    place: "Loja Buritis",
  },
  {
    id: "cliente-03",
    photo: "/assets/cliente-03.jpg",
    alt: "Casal de clientes na frente do letreiro da Almeida Imports",
    purchase: "Aparelho novo",
    place: "Loja Buritis",
  },
  {
    id: "cliente-04",
    photo: "/assets/cliente-04.jpg",
    alt: "Cliente com a caixa da JBL Boombox entregue pela Almeida Imports",
    purchase: "JBL Boombox",
    place: "Loja Buritis",
  },
  {
    id: "cliente-05",
    photo: "/assets/cliente-05.jpg",
    alt: "Cliente atendida na frente do letreiro da Almeida Imports",
    purchase: "Troca com entrada",
    place: "Loja Buritis",
  },
  {
    id: "cliente-06",
    photo: "/assets/cliente-06.jpg",
    alt: "Cliente com dois iPhone 16 lacrados na Almeida Imports",
    purchase: "iPhone 16",
    place: "Loja Buritis",
  },
];
