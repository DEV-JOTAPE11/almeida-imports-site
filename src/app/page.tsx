import { ClickSpark } from "@/components/effects/ClickSpark";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { FiniStageController } from "@/components/effects/FiniStageController";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopMenu } from "@/components/layout/TopMenu";
import { FiniStageProvider } from "@/components/providers/FiniStageProvider";
import { CarmedBrand } from "@/components/sections/CarmedBrand";
import { CarmedBrandBar } from "@/components/sections/CarmedBrandBar";
import { CarmedFiniHero } from "@/components/sections/CarmedFiniHero";
import { Numbers } from "@/components/sections/Numbers";
import { Team } from "@/components/sections/Team";

export default function HomePage() {
  return (
    <FiniStageProvider>
      <CustomCursor />
      <ClickSpark />

      <TopMenu />

      <CarmedFiniHero />
      <CarmedBrandBar />
      <CarmedBrand />
      <Team />
      <Numbers />

      <SiteFooter />

      {/* Animações que ligam a vitrine Fini à seção da marca. */}
      <FiniStageController />
    </FiniStageProvider>
  );
}
