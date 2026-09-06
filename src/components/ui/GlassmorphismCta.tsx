import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export type GlassmorphismCtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** A promessa que faz a pessoa clicar — uma linha só. */
  label?: string;
  /** Miniatura redonda à esquerda (o aparelho em oferta). */
  thumbSrc?: string;
  thumbAlt?: string;
  /** Ícone do selo à direita. */
  icon?: ReactNode;
  /** Abertura do brilho que gira na borda. */
  spread?: string;
  /** Cor desse brilho. */
  shimmerColor?: string;
  /** Duração de uma volta completa do brilho. */
  speed?: string;
};

/**
 * CTA de vidro: uma pílula escura translúcida com um brilho verde girando
 * na borda.
 *
 * O verde é o mesmo do WhatsApp — o botão puxa o olho no fim da vitrine,
 * onde o resto da tela é azul, e leva direto para a conversa com a loja.
 * O visual é todo CSS (nenhuma dependência nova); os parâmetros do brilho
 * viram custom properties inline, então dá para reaproveitar o botão com
 * outra cor sem tocar na folha de estilo.
 */
export function GlassmorphismCta({
  label = "Quero meu iPhone hoje",
  thumbSrc = "/assets/p-iphone-deep-blue.png",
  thumbAlt = "",
  icon,
  spread = "90deg",
  shimmerColor = "var(--accent-green-bright)",
  speed = "4s",
  className,
  ...props
}: GlassmorphismCtaProps) {
  return (
    <a
      className={className ? `glass-cta ${className}` : "glass-cta"}
      style={
        {
          "--glass-cta-spread": spread,
          "--glass-cta-shimmer": shimmerColor,
          "--glass-cta-speed": speed,
        } as CSSProperties
      }
      {...props}
    >
      <span className="glass-cta__ring" aria-hidden="true" />
      <span className="glass-cta__glass" aria-hidden="true" />

      <span className="glass-cta__content">
        <img className="glass-cta__thumb" src={thumbSrc} alt={thumbAlt} />

        <span className="glass-cta__label">{label}</span>

        <span className="glass-cta__icon" aria-hidden="true">
          {icon ?? <WhatsAppIcon />}
        </span>
      </span>
    </a>
  );
}

export default GlassmorphismCta;
