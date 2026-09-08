import { ClickSpark } from "@/components/effects/ClickSpark";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ShowcaseStageController } from "@/components/effects/ShowcaseStageController";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopMenu } from "@/components/layout/TopMenu";
import { ShowcaseStageProvider } from "@/components/providers/ShowcaseStageProvider";
import { AlmeidaBrand } from "@/components/sections/AlmeidaBrand";
import { AlmeidaBrandBar } from "@/components/sections/AlmeidaBrandBar";
import { ShowcaseHero } from "@/components/sections/ShowcaseHero";
import { FeaturedPhones } from "@/components/sections/FeaturedPhones";
import { Numbers } from "@/components/sections/Numbers";
import { Testimonials } from "@/components/sections/Testimonials";
import { Catalog } from "@/components/sections/Catalog";
import { IphoneReveal } from "@/components/sections/IphoneReveal";

export default function HomePage() {
  return (
    <ShowcaseStageProvider>
      <CustomCursor />
      <ClickSpark />

      <TopMenu />

      <ShowcaseHero />
      <AlmeidaBrandBar />
      <AlmeidaBrand />
      <FeaturedPhones />
      <Catalog />
      <IphoneReveal />
      <Numbers />
      <Testimonials />

      <SiteFooter />

      {/* Animações que ligam a vitrine Showcase à seção da marca. */}
      <ShowcaseStageController />
    </ShowcaseStageProvider>
  );
}
