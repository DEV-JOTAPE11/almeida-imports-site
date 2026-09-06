"use client";

import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Stat } from "@/types";

/**
 * Um número da seção "Em números". O valor conta de zero até o alvo na
 * primeira vez que entra na tela; prefixo e sufixo ficam fixos ao redor.
 */
export function StatCounter({ stat }: { stat: Stat }) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;

    const isDecimal = !Number.isInteger(stat.target);
    const parent = el.closest(".stat-number");

    const trigger = ScrollTrigger.create({
      trigger: parent ?? el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: stat.target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate() {
            el.textContent = isDecimal
              ? proxy.val.toFixed(1)
              : String(Math.round(proxy.val));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [stat.target]);

  return (
    <div className="stat-item">
      <div className="stat-number">
        {stat.prefix}
        <span className="stat-value" ref={valueRef}>
          0
        </span>
        {stat.suffix ? <span className="stat-suffix">{stat.suffix}</span> : null}
      </div>
      <p className="stat-label">
        <strong>{stat.label}</strong>
        {stat.description}
      </p>
    </div>
  );
}
