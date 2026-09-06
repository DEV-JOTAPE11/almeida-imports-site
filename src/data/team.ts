import type { TeamMember } from "@/types";

/**
 * Time exibido no grid Magic Bento.
 * A ordem importa: o layout desktop usa `nth-child` para os spans do grid
 * (3º e 4º cards ocupam 2 colunas, o 6º fecha a última linha).
 */
export const TEAM: TeamMember[] = [
  {
    id: "karla",
    name: "Karla Marques Felmanas",
    role: "Vice-Presidente",
    bio: "Co-líder do Grupo Cimed e irmã de João Adibe. Peça fundamental na construção da empresa desde o início, ao lado do irmão.",
    photo: "/assets/karla-carmed.jpg",
    social: { handle: "@karla", href: "#", ariaLabel: "Instagram de Karla" },
  },
  {
    id: "shibata",
    name: "Erich Shibata",
    role: "Comunicação & marca",
    bio: "Representa a Cimed em grandes eventos e na mídia, fortalecendo a voz da empresa junto a parceiros, torcedores e consumidores.",
    photo: "/assets/shibata-carmed.png",
    social: {
      handle: "@erichshibata",
      href: "#",
      ariaLabel: "Instagram de Erich Shibata",
    },
  },
  {
    id: "joao-adibe",
    name: "João Adibe Marques",
    role: "CEO & Presidente",
    bio: "Lidera a Cimed desde 2012. Transformou uma empresa familiar em uma das maiores farmacêuticas do Brasil, com faturamento de R$ 2 bi+. Forbes Bilionários 2024.",
    photo: "/assets/joao-carmed.png",
    photoPosition: "center 30%",
    featured: true,
    social: { handle: "@adibe", href: "#", ariaLabel: "Instagram de João Adibe" },
  },
  {
    id: "toguro",
    name: "Tiago Toguro",
    role: "Head de Marketing",
    bio: "Com mais de 10 anos de experiência no mercado, é responsável por estratégias de marketing e comunicação da empresa.",
    photo: "/assets/toguro-carmed.png",
    featured: true,
    social: {
      handle: "@tiagotoguro",
      href: "#",
      ariaLabel: "Instagram de Tiago Toguro",
    },
  },
  {
    id: "eduardo",
    name: "Eduardo Marques",
    role: "Liderança corporativa",
    bio: "Parte da família Marques na condução do Grupo Cimed, com olhar para cultura, pessoas e a nova geração dentro da empresa.",
    photo: "/assets/eduardo-carmed.png",
    photoPosition: "center 30%",
    social: {
      handle: "@eduardomarques",
      href: "#",
      ariaLabel: "Instagram de Eduardo Marques",
    },
  },
  {
    id: "adibe-marques",
    name: "Adibe Marques",
    role: "Liderança comercial",
    bio: "À frente de frentes comerciais estratégicas, alinha times de vendas e parceiros às metas de crescimento do Grupo Cimed.",
    photo: "/assets/adibe-carmed.png",
    photoPosition: "center 15%",
    social: {
      handle: "@adibemarques",
      href: "#",
      ariaLabel: "Instagram de Adibe Marques",
    },
  },
];
