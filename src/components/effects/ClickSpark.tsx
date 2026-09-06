"use client";

import { useEffect, useRef } from "react";

const SPARK_COLOR = "#E31837";
const SPARK_COUNT = 8;
const SPARK_RADIUS = 22;
const SPARK_SIZE = 9;
const DURATION = 420;

interface Spark {
  x: number;
  y: number;
  angle: number;
  start: number;
}

function easeOut(t: number): number {
  return t * (2 - t);
}

/** Estrelinha de traços que explode a cada clique, desenhada num canvas fixo. */
export function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sparks: Spark[] = [];
    let frame = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();

    function onClick(e: MouseEvent) {
      const now = performance.now();
      for (let i = 0; i < SPARK_COUNT; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / SPARK_COUNT,
          start: now,
        });
      }
    }

    function draw(timestamp: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const elapsed = timestamp - s.start;
        if (elapsed >= DURATION) {
          sparks.splice(i, 1);
          continue;
        }

        const progress = elapsed / DURATION;
        const eased = easeOut(progress);
        const distance = eased * SPARK_RADIUS;
        const lineLen = SPARK_SIZE * (1 - eased);

        const x1 = s.x + distance * Math.cos(s.angle);
        const y1 = s.y + distance * Math.sin(s.angle);
        const x2 = s.x + (distance + lineLen) * Math.cos(s.angle);
        const y2 = s.y + (distance + lineLen) * Math.sin(s.angle);

        ctx!.globalAlpha = 1 - progress;
        ctx!.strokeStyle = SPARK_COLOR;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.stroke();
      }

      ctx!.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);
    frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas id="spark-canvas" ref={canvasRef} aria-hidden="true" />;
}
