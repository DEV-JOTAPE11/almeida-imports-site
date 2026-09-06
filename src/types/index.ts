/**
 * Tipos compartilhados do site Carmed.
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

/** Integrante do time exibido no grid Magic Bento. */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  /** `object-position` custom da foto, quando o enquadramento pede. */
  photoPosition?: string;
  social: {
    handle: string;
    href: string;
    ariaLabel: string;
  };
  /** Cards de destaque ocupam mais área no grid (classe `card-ceo`). */
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

/** Dimensões CSS específicas de cada sabor Fini. */
export interface FiniFlavorSizes {
  centerWidth: string;
  centerImgScale: number;
  orbitImgWidth: string;
  /** Larguras dos 4 satélites em órbita, na ordem 1..4. */
  orbitWidths: [string, string, string, string];
}

/** Sabor da vitrine Carmed × Fini. */
export interface FiniFlavor {
  key: string;
  /** Cor de fundo da seção quando o sabor está ativo. */
  bg: string;
  /** Palavra gigante de fundo. */
  word: string;
  /** Produto central. */
  center: string;
  /** Imagem do doce que orbita o produto. */
  orbit: string;
  alt: string;
  sizes: FiniFlavorSizes;
}

/** Pilar da seção "A marca". */
export interface BrandPillar {
  id: string;
  title: string;
  text: string;
  /** Caminhos SVG do ícone (renderizados dentro de um viewBox 0 0 24 24). */
  icon: React.ReactNode;
}
