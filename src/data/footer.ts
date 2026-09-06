import type { FooterColumn, NavLink } from "@/types";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Produtos",
    links: [
      { label: "Carmed", href: "#" },
      { label: "Lavitan", href: "#" },
      { label: "Super", href: "#" },
      { label: "Cimegripe", href: "#" },
      { label: "Genéricos", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre a Cimed", href: "#" },
      { label: "Liderança", href: "#" },
      { label: "Investidores", href: "#" },
      { label: "Imprensa", href: "#" },
      { label: "Carreiras", href: "#" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "SAC", href: "#" },
      { label: "Distribuidores", href: "#" },
      { label: "Farmácias", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "Cookies", href: "#" },
];
