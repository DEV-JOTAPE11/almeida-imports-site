"use client";

import { useEffect } from "react";

import type { FiniStageRefs } from "@/components/providers/FiniStageProvider";
import { ScrollTrigger } from "@/lib/gsap";
import { clamp, prefersReducedMotion, smoothstep } from "@/lib/motion";

const HANDOFF_ID = "fini-brand-product-handoff";

/** Frações do progresso onde o voo muda de comportamento. */
const FLY_START = 0.012;
const UNCLAMP_START = 0.74;
const SNAP_START = 0.86;
const SNAP_END = 0.995;

/**
 * Handoff Fini → Marca.
 *
 * Enquanto a página rola, o produto do hero "voa" numa curva até o slot da
 * seção da marca. Quem se move é um clone `position: fixed`: o original some
 * no primeiro instante e o slot de destino só acende quando o clone pousa,
 * de modo que nunca existam dois produtos visíveis ao mesmo tempo.
 *
 * Durante o meio do trajeto o clone é preso à viewport (para não sair da
 * tela); perto do fim volta à trajetória real e interpola até o retângulo
 * exato do slot, evitando qualquer salto na troca.
 */
export function useFiniBrandHandoff(refs: FiniStageRefs) {
  useEffect(() => {
    const { finiSectionRef, finiProductImgRef, brandProductImgRef, brandSectionRef } =
      refs;

    const section = finiSectionRef.current;
    const finiImg = finiProductImgRef.current;
    const brandImg = brandProductImgRef.current;
    const brandSection = brandSectionRef.current;

    if (prefersReducedMotion() || !section || !finiImg || !brandImg || !brandSection) {
      return;
    }

    document.documentElement.dataset.finiBrandHandoff = "1";

    const flyImg = document.createElement("img");
    flyImg.className = "fini-to-brand-fly-img";
    flyImg.alt = "";
    flyImg.decoding = "async";
    document.body.appendChild(flyImg);

    function applyHandoff(self: ScrollTrigger) {
      const p = self.progress;
      const rF = finiImg!.getBoundingClientRect();
      const rB = brandImg!.getBoundingClientRect();

      if (rF.width < 4 || rB.width < 4) {
        flyImg.style.opacity = "0";
        finiImg!.style.removeProperty("opacity");
        brandImg!.style.opacity = "0";
        return;
      }

      const vw = window.innerWidth || document.documentElement.clientWidth || 0;
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;

      const cxF = rF.left + rF.width / 2;
      const cyF = rF.top + rF.height / 2;
      const cxB = rB.left + rB.width / 2;
      const cyB = rB.top + rB.height / 2;

      /* Linear em p: um smoothstep aqui travaria o início (derivada 0 em p=0). */
      const t = p;

      /* Curva quadrática: ponto de controle no centro horizontal da tela. */
      const cxMid = vw * 0.5;
      const cyMid = (cyF + cyB) * 0.5;
      const cxU = (1 - t) * (1 - t) * cxF + 2 * (1 - t) * t * cxMid + t * t * cxB;
      const cyU = (1 - t) * (1 - t) * cyF + 2 * (1 - t) * t * cyMid + t * t * cyB;

      const w = rF.width + (rB.width - rF.width) * t;
      const h = rF.height + (rB.height - rF.height) * t;

      /* Trecho do meio: preso à viewport, respeitando a altura do menu. */
      const padX = 20;
      const padBottom = 20;
      const topMenuEl = document.getElementById("top-menu");
      const padTop = (topMenuEl ? topMenuEl.getBoundingClientRect().height : 0) + 16;
      const halfW = w / 2;
      const halfH = h / 2;
      const minCx = halfW + padX;
      const maxCx = Math.max(minCx, vw - halfW - padX);
      const minCy = halfH + padTop;
      const maxCy = Math.max(minCy, vh - halfH - padBottom);
      const cxC = clamp(cxU, minCx, maxCx);
      const cyC = clamp(cyU, minCy, maxCy);

      /* Fim do trajeto: solta o clamp de volta para a trajetória real. */
      let uFree = 0;
      if (p > UNCLAMP_START) {
        uFree = smoothstep(Math.min(1, (p - UNCLAMP_START) / (1 - UNCLAMP_START)));
      }
      const cx = cxC + (cxU - cxC) * uFree;
      const cy = cyC + (cyU - cyC) * uFree;

      let left = cx - w / 2;
      let top = cy - h / 2;
      let fw = w;
      let fh = h;

      /* Aterrissagem: interpola até o retângulo exato do slot. */
      if (p >= SNAP_START) {
        const e = smoothstep(Math.min(1, (p - SNAP_START) / (SNAP_END - SNAP_START)));
        left = left + (rB.left - left) * e;
        top = top + (rB.top - top) * e;
        fw = w + (rB.width - w) * e;
        fh = h + (rB.height - h) * e;
      }

      if (p >= SNAP_END) {
        left = rB.left;
        top = rB.top;
        fw = rB.width;
        fh = rB.height;
      }

      const targetSrc = finiImg!.currentSrc || finiImg!.src || "";
      if (targetSrc && flyImg.src !== targetSrc) {
        flyImg.src = targetSrc;
      }

      flyImg.style.width = `${fw}px`;
      flyImg.style.height = `${fh}px`;
      flyImg.style.left = `${left}px`;
      flyImg.style.top = `${top}px`;

      /* Mesmo instante: a Fini some e o clone aparece — nunca os dois juntos. */
      const handoffDone = p >= SNAP_END;
      const flyOn = p >= FLY_START && !handoffDone;
      flyImg.style.opacity = flyOn ? "1" : "0";
      flyImg.style.visibility = flyOn ? "visible" : "hidden";

      if (p >= FLY_START) finiImg!.style.opacity = "0";
      else finiImg!.style.removeProperty("opacity");

      brandImg!.style.opacity = handoffDone ? "1" : "0";
    }

    const trigger = ScrollTrigger.create({
      id: HANDOFF_ID,
      trigger: section,
      start: "top top",
      endTrigger: "#carmed-brand-product-parallax",
      end: "center center",
      scrub: 0.45,
      invalidateOnRefresh: true,
      onUpdate: applyHandoff,
      onLeave: () => {
        const rB = brandImg!.getBoundingClientRect();
        if (rB.width < 4) return;
        flyImg.style.width = `${rB.width}px`;
        flyImg.style.height = `${rB.height}px`;
        flyImg.style.left = `${rB.left}px`;
        flyImg.style.top = `${rB.top}px`;
        flyImg.style.opacity = "0";
        brandImg!.style.opacity = "1";
        finiImg!.style.opacity = "0";
      },
      onLeaveBack: () => {
        brandImg!.style.opacity = "0";
        finiImg!.style.removeProperty("opacity");
      },
    });

    const raf = requestAnimationFrame(() => {
      const st = ScrollTrigger.getById(HANDOFF_ID);
      if (st) applyHandoff(st);
    });

    return () => {
      cancelAnimationFrame(raf);
      trigger.kill();
      flyImg.remove();
      delete document.documentElement.dataset.finiBrandHandoff;
      finiImg.style.removeProperty("opacity");
      brandImg.style.removeProperty("opacity");
    };
  }, [refs]);
}
