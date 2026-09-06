import type { CatalogItem } from "@/types";

const WHATSAPP_BURITIS = "https://wa.me/5538998040470";
const WHATSAPP_ARINOS = "https://wa.me/5538999597481";

/**
 * Catálogo exibido no grid Magic Bento.
 * A ordem importa: o layout desktop usa `nth-child` para os spans do grid
 * (3º e 4º cards ocupam 2 colunas, o 6º fecha a última linha).
 */
export const CATALOG: CatalogItem[] = [
  {
    id: "iphone",
    name: "iPhone",
    role: "Linha Apple",
    bio: "Do iPhone 13 ao 17 Pro Max, lacrados e com garantia. A gente confere o aparelho com você no balcão antes de fechar negócio.",
    photo: "/assets/p-iphone-duo.png",
    social: {
      handle: "Ver modelos",
      href: WHATSAPP_BURITIS,
      ariaLabel: "Falar no WhatsApp sobre iPhone",
    },
  },
  {
    id: "xiaomi",
    name: "Xiaomi & Redmi",
    role: "Android",
    bio: "Redmi Note, POCO e a linha Xiaomi completa — o custo-benefício que mais sai da loja, com versão global e nota fiscal.",
    photo: "/assets/p-redmi-note-14.png",
    social: {
      handle: "Ver modelos",
      href: WHATSAPP_BURITIS,
      ariaLabel: "Falar no WhatsApp sobre Xiaomi",
    },
  },
  {
    id: "jbl",
    name: "JBL",
    role: "Som",
    bio: "Boombox, Flip, Charge, Partybox e a linha de fones. Som para a caixa da caminhonete, para a praça e para a casa toda — original, com garantia JBL.",
    photo: "/assets/p-jbl-boombox.png",
    featured: true,
    social: {
      handle: "Ver caixas de som",
      href: WHATSAPP_BURITIS,
      ariaLabel: "Falar no WhatsApp sobre JBL",
    },
  },
  {
    id: "starlink",
    name: "Starlink",
    role: "Internet via satélite",
    bio: "Kit Starlink com instalação para quem mora na zona rural do noroeste mineiro. Internet rápida onde a fibra não chega — a gente configura e entrega funcionando.",
    photo: "/assets/p-starlink.png",
    featured: true,
    social: {
      handle: "Falar sobre Starlink",
      href: WHATSAPP_ARINOS,
      ariaLabel: "Falar no WhatsApp sobre Starlink",
    },
  },
  {
    id: "apple-watch",
    name: "Apple Watch",
    role: "Vestíveis",
    bio: "Series e SE nas cores e pulseiras que chegam toda semana. Configuramos e emparelhamos com o seu iPhone antes de você sair da loja.",
    photo: "/assets/p-apple-watch.png",
    social: {
      handle: "Ver modelos",
      href: WHATSAPP_BURITIS,
      ariaLabel: "Falar no WhatsApp sobre Apple Watch",
    },
  },
  {
    id: "acessorios",
    name: "AirPods e acessórios",
    role: "Acessórios",
    bio: "Fones, carregadores, capas, películas 3D e caixinhas. Aplicação de película na hora, sem bolha — feita por quem faz isso o dia inteiro.",
    photo: "/assets/p-airpods-pro.png",
    social: {
      handle: "Ver acessórios",
      href: WHATSAPP_ARINOS,
      ariaLabel: "Falar no WhatsApp sobre acessórios",
    },
  },
];
