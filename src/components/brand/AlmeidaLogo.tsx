/**
 * Assinatura da Almeida Imports.
 *
 * Reproduz o lockup que a loja usa nas artes: "ALMEIDA" pesado e o
 * "IMPORTS" fino, azul e bem espaçado logo abaixo, ocupando a mesma
 * largura. É texto (não bitmap) para ficar nítido em qualquer tamanho e
 * acompanhar as cores do tema.
 *
 * `tone="mono"` pinta tudo com a cor do contexto — usado sobre o hero,
 * onde o menu ainda é transparente.
 */
export function AlmeidaLogo({
  size = 46,
  tone = "brand",
  className,
}: {
  /** Altura total do lockup, em px. */
  size?: number;
  tone?: "brand" | "mono";
  className?: string;
}) {
  const classes = ["almeida-logo", `almeida-logo--${tone}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} style={{ "--logo-size": `${size}px` } as React.CSSProperties}>
      <span className="almeida-logo__name">Almeida</span>
      <span className="almeida-logo__sub">Imports</span>
    </span>
  );
}
