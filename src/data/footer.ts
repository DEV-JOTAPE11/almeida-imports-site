import type { FooterColumn, NavLink } from "@/types";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Catálogo",
    links: [
      { label: "iPhone", href: "#section-catalog" },
      { label: "Xiaomi & Redmi", href: "#section-catalog" },
      { label: "JBL", href: "#section-catalog" },
      { label: "Starlink", href: "#section-catalog" },
      { label: "Acessórios", href: "#section-catalog" },
    ],
  },
  {
    title: "Lojas",
    links: [
      {
        label: "Buritis — Av. Central, 1120",
        href: "https://www.google.com/maps/place/Almeida+Imports",
      },
      {
        label: "Arinos — R. Alcides Carneiro, 157",
        href: "https://www.google.com/maps/search/Almeida+Imports+Arinos+MG",
      },
      { label: "(38) 99804-0470", href: "https://wa.me/5538998040470" },
      { label: "(38) 99959-7481", href: "https://wa.me/5538999597481" },
      { label: "Assistência técnica", href: "#section-almeida-brand" },
    ],
  },
  {
    title: "Redes",
    links: [
      {
        label: "@almeidaimportss_",
        href: "https://www.instagram.com/almeidaimportss_/",
      },
      {
        label: "@almeidaimports.arinos",
        href: "https://www.instagram.com/almeidaimports.arinos/",
      },
      { label: "WhatsApp Buritis", href: "https://wa.me/5538998040470" },
      { label: "WhatsApp Arinos", href: "https://wa.me/5538999597481" },
      {
        label: "Google Maps",
        href: "https://www.google.com/maps/place/Almeida+Imports",
      },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "Trocas e garantia", href: "#" },
];
