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
