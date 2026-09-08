import type { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /**
   * Quantas cópias do conteúdo entram na esteira. Duas já fecham o laço; três
   * evitam o vão quando os cards não preenchem a largura da tela.
   */
  repeat?: number;
  /** Duração de uma volta completa. */
  duration?: string;
  /** Espaço entre os cards — também entra no cálculo do laço. */
  gap?: string;
  /** Sentido invertido (da esquerda para a direita). */
  reverse?: boolean;
  /** Para a esteira enquanto o mouse estiver sobre ela. */
  pauseOnHover?: boolean;
}

/**
 * Esteira horizontal em loop, só com CSS.
 *
 * O truque é o de sempre: N cópias iguais do conteúdo lado a lado, e a faixa
 * inteira anda exatamente a largura de UMA cópia (`-100% - gap`) antes de
 * reiniciar. Como a cópia seguinte já está no lugar da anterior no instante do
 * salto, o corte não aparece.
 *
 * Sem `useEffect` e sem medir nada em JS: a animação é `transform`, roda na GPU
 * e não força layout. O `aria-hidden` nas cópias evita que o leitor de tela
 * anuncie o mesmo card três vezes.
 */
export function Marquee({
  children,
  className,
  repeat = 3,
  duration = "42s",
  gap = "22px",
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  const classes = [
    "marquee",
    reverse ? "marquee--reverse" : null,
    pauseOnHover ? "marquee--pause-hover" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    "--marquee-duration": duration,
    "--marquee-gap": gap,
  } as CSSProperties;

  return (
    <div className={classes} style={style}>
      {Array.from({ length: repeat }, (_, i) => (
        <div className="marquee__track" key={i} aria-hidden={i > 0}>
          {children}
        </div>
      ))}
    </div>
  );
}
