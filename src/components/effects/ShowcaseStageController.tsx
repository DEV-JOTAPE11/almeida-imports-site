"use client";

import { useShowcaseStage } from "@/components/providers/ShowcaseStageProvider";
import { useShowcaseBrandHandoff } from "@/hooks/useShowcaseBrandHandoff";
import { useShowcaseProductCycle } from "@/hooks/useShowcaseProductCycle";

/**
 * Componente sem UI que instala as duas animações que cruzam a fronteira
 * entre a vitrine Showcase e a seção da marca. Fica no fim da página para que
 * os dois lados já estejam montados quando os efeitos rodam.
 */
export function ShowcaseStageController() {
  const refs = useShowcaseStage();

  useShowcaseProductCycle(refs);
  useShowcaseBrandHandoff(refs);

  return null;
}
