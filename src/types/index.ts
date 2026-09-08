/**
 * Tipos compartilhados do site da Almeida Imports.
 */

/** Link de navegação (menu topo, colunas do rodapé). */
export interface NavLink {
  label: string;
  href: string;
}

/** Coluna de links do rodapé. */
export interface FooterColumn {
  title: string;
  links: NavLink[];
}

/** Card do catálogo exibido no grid Magic Bento. */
export interface CatalogItem {
  id: string;
  /** Linha/produto — vira o título do card. */
  name: string;
  /** Categoria curta exibida acima do título. */
  role: string;
  bio: string;
  photo: string;
  /** `object-position` custom da imagem, quando o enquadramento pede. */
  photoPosition?: string;
  social: {
    handle: string;
    href: string;
    ariaLabel: string;
  };
  /** Cards de destaque ocupam mais área no grid (classe `card-featured`). */
  featured?: boolean;
}

/** Estatística animada da seção Números. */
export interface Stat {
  id: string;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

/** Dimensões CSS específicas de cada produto da vitrine. */
export interface ShowcaseProductSizes {
  centerWidth: string;
  centerImgScale: number;
  orbitImgWidth: string;
  /** Larguras dos 4 satélites em órbita, na ordem 1..4. */
  orbitWidths: [string, string, string, string];
}

/** Aparelho em destaque na vitrine da home. */
export interface ShowcaseProduct {
  key: string;
  /** Cor de fundo da seção quando o produto está ativo. */
  bg: string;
  /** Cor de apoio: CTA, brilho do palco e detalhe do menu. */
  accent: string;
  /** Cor da palavra gigante ao fundo (fica atrás do aparelho). */
  wordColor: string;
  /** Palavra gigante de fundo. */
  word: string;
  /** Nome comercial completo, usado na legenda sob o palco. */
  label: string;
  /** Linha curta de apoio à legenda (cor, capacidade, destaque). */
  note: string;
  /** Aparelho central. */
  center: string;
  /** Acessório que orbita o aparelho. */
  orbit: string;
  alt: string;
  sizes: ShowcaseProductSizes;
}

/** Pilar da seção "A loja". */
export interface BrandPillar {
  id: string;
  title: string;
  text: string;
  /** Caminhos SVG do ícone (renderizados dentro de um viewBox 0 0 24 24). */
  icon: React.ReactNode;
}

/** Ícones disponíveis na linha de especificações do card de destaque. */
export type PhoneSpecIcon =
  | "storage"
  | "screen"
  | "camera"
  | "battery"
  | "seal"
  | "chip";

/** Uma especificação curta exibida no card de destaque. */
export interface PhoneSpec {
  icon: PhoneSpecIcon;
  label: string;
}

/**
 * Aparelho da vitrine "Destaques da semana".
 * Os campos `brand`, `model`, `storage`, `condition` e `price` também
 * alimentam a busca da seção (Marca / Modelo / Armazenamento + avançados).
 */
export interface FeaturedPhone {
  id: string;
  /** Marca comercial — opção do filtro "Marca". */
  brand: string;
  /** Nome do aparelho — opção do filtro "Modelo". */
  model: string;
  /** Cor de fábrica, exibida sob o nome. */
  color: string;
  /** Armazenamento — opção do filtro "Armazenamento". */
  storage: string;
  /** Estado do aparelho — filtro avançado "Condição". */
  condition: "Lacrado" | "Seminovo";
  /** Selo sobre a foto ("Novidade", "Mais vendido"...). */
  badge?: string;
  photo: string;
  alt: string;
  /**
   * Correção de escala da foto. Cada fabricante entrega o render com uma
   * margem interna diferente; sem isso um aparelho apareceria menor que o
   * vizinho só por causa do arquivo. `1` = sem correção.
   */
  photoScale?: number;
  /** Três specs curtas, no formato da ficha do card. */
  specs: [PhoneSpec, PhoneSpec, PhoneSpec];
  /** Preço à vista, em reais. */
  price: number;
  /** Loja que atende o aparelho — define o WhatsApp do CTA. */
  store: "buritis" | "arinos";
}

/** Card de cliente na esteira de depoimentos. */
export interface Testimonial {
  id: string;
  /** Foto do cliente na loja (recorte 3:4). */
  photo: string;
  alt: string;
  /** O que o cliente levou — vira o título do card. */
  purchase: string;
  /** Linha de apoio: loja / cidade. */
  place: string;
}
