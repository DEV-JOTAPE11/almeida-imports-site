import Image from "next/image";

/** Arquivo original recortado no limite da arte (sem margem transparente). */
const LOGO_SRC = "/assets/logo-almeida-lockup.png";
const LOGO_WIDTH = 1200;
const LOGO_HEIGHT = 420;

/**
 * Assinatura da Almeida Imports — a arte oficial da loja.
 *
 * O lockup vem do PNG `logo-almeida.png` (recortado em
 * `logo-almeida-lockup.png`), com "ALMEIDA IMPORTES" em azul e
 * "CELULARES" bem espaçado embaixo.
 *
 * `size` continua sendo a altura total do lockup em px; a largura sai da
 * proporção da arte, então a marca nunca distorce.
 */
export function AlmeidaLogo({
  size = 46,
  priority = false,
  className,
}: {
  /** Altura total do lockup, em px. */
  size?: number;
  /** `true` no logo do topo, que aparece no primeiro paint. */
  priority?: boolean;
  className?: string;
}) {
  const classes = ["almeida-logo", className].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      style={{ "--logo-size": `${size}px` } as React.CSSProperties}
    >
      <Image
        className="almeida-logo__img"
        src={LOGO_SRC}
        alt="Almeida Importes Celulares"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        sizes={`${Math.round(size * (LOGO_WIDTH / LOGO_HEIGHT))}px`}
      />
    </span>
  );
}
