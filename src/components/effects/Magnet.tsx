"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap } from "@/lib/gsap";

type MagnetTag = "a" | "div" | "span" | "button";

interface MagnetProps {
  children: ReactNode;
  /** Elemento externo que define a área de atração. */
  as?: MagnetTag;
  /** Elemento interno que é deslocado. */
  innerAs?: "div" | "span";
  className?: string;
  innerClassName?: string;
  /** Margem, em px, além da caixa do elemento onde a atração já começa. */
  padding?: number;
  /** Divisor do deslocamento: quanto maior, mais sutil o movimento. */
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

/**
 * Botão magnético: o conteúdo interno é puxado na direção do cursor enquanto
 * ele estiver dentro da área de atração, e volta com um elástico ao sair.
 */
export function Magnet({
  children,
  as = "div",
  innerAs = "span",
  className,
  innerClassName,
  padding = 100,
  strength = 2,
  ...rest
}: MagnetProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;

    let isActive = false;

    function onMouseMove(e: MouseEvent) {
      const rect = root!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.abs(cx - e.clientX);
      const dy = Math.abs(cy - e.clientY);

      if (dx < rect.width / 2 + padding && dy < rect.height / 2 + padding) {
        isActive = true;
        gsap.to(inner, {
          x: (e.clientX - cx) / strength,
          y: (e.clientY - cy) / strength,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      } else if (isActive) {
        isActive = false;
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1,0.5)",
          overwrite: true,
        });
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.killTweensOf(inner);
    };
  }, [padding, strength]);

  const Root = as as "div";
  const Inner = innerAs as "span";

  return (
    <Root
      ref={rootRef as React.Ref<HTMLDivElement>}
      className={className ? `${className} magnet` : "magnet"}
      data-padding={padding}
      data-strength={strength}
      {...rest}
    >
      <Inner
        ref={innerRef as React.Ref<HTMLSpanElement>}
        className={
          innerClassName ? `${innerClassName} magnet-inner` : "magnet-inner"
        }
      >
        {children}
      </Inner>
    </Root>
  );
}
