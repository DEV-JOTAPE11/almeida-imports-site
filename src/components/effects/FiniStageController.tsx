"use client";

import { useFiniStage } from "@/components/providers/FiniStageProvider";
import { useFiniBrandHandoff } from "@/hooks/useFiniBrandHandoff";
import { useFiniFlavorCycle } from "@/hooks/useFiniFlavorCycle";

/**
 * Componente sem UI que instala as duas animações que cruzam a fronteira
 * entre a vitrine Fini e a seção da marca. Fica no fim da página para que
 * os dois lados já estejam montados quando os efeitos rodam.
 */
export function FiniStageController() {
  const refs = useFiniStage();

  useFiniFlavorCycle(refs);
  useFiniBrandHandoff(refs);

  return null;
}
