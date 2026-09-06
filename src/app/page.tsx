import { ClickSpark } from "@/components/effects/ClickSpark";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ShowcaseStageController } from "@/components/effects/ShowcaseStageController";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopMenu } from "@/components/layout/TopMenu";
import { ShowcaseStageProvider } from "@/components/providers/ShowcaseStageProvider";
import { AlmeidaBrand } from "@/components/sections/AlmeidaBrand";
import { AlmeidaBrandBar } from "@/components/sections/AlmeidaBrandBar";
import { ShowcaseHero } from "@/components/sections/ShowcaseHero";
import { Numbers } from "@/components/sections/Numbers";
import { Catalog } from "@/components/sections/Catalog";

export default function HomePage() {
  return (
    <ShowcaseStageProvider>
      <CustomCursor />
      <ClickSpark />

      <TopMenu />

      <ShowcaseHero />
      <AlmeidaBrandBar />
      <AlmeidaBrand />
      <Catalog />
      <Numbers />

      <SiteFooter />

      {/* Animações que ligam a vitrine Showcase à seção da marca. */}
      <ShowcaseStageController />
    </ShowcaseStageProvider>
  );
}
