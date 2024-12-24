import MobilePhotoSlider from "@/components/mobile/organisms/MobilePhotoSlider/MobilePhotoSlider";
import { AdvantagesBlock } from "@/components/organisms/blocks/AdvantagesBlock/AdvantagesBlock";
import WaterCoolerBlock from "@/components/organisms/blocks/water-cooler-block/WaterCoolerBlock";
import { HeroSliderRow } from "@/components/organisms/HeroSliderRow/HeroSliderRow";
import { PageWrapper } from "@/components/wrappers";

import { getSeoById } from "@/app/admin/seo/page.api";
import { ResponsiveContainer } from "@/components/wrappers";
import { Metadata } from "next";
import { Suspense } from "react";
import { BonusProgram } from "./components/BonusProgram/BonusProgram";
import { MobileHeader } from "./components/MobileHeader";
import { NewProducts } from "./components/NewProducts";
import { OurWaters } from "./components/OurWaters";
import { Promotions } from "./components/Promotions";
import { SaleProdcuts } from "./components/SaleProducts";
import { Services } from "./components/Services/Services";
import { getBanners, getDayProducts } from "./page.hooks";

const MAIN_PAGE_ID = 772;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoById(MAIN_PAGE_ID);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

const MainPageScreen = async () => {
  const dayProducts = await getDayProducts();
  const banners = await getBanners();

  return (
    <ResponsiveContainer>
      <PageWrapper>
        <Suspense fallback={<></>}>
          <MobileHeader />
        </Suspense>
        <MobilePhotoSlider photos={banners} />
        <HeroSliderRow dayProducts={dayProducts} banners={banners} />
        {/* Блок "Наши продукты" */}
        <NewProducts />
        {/* Блок "Товары по акции" */}
        <SaleProdcuts />
        {/* Блок "Наши воды" */}
        <OurWaters />
        {/* Блок "Акции и предложения" */}
        <Promotions />
        {/* Блок "Бонусная программа" */}
        <BonusProgram />
        {/* Блок "Наши услуги" */}
        <Services />
        {/* Блок "Преимущества" */}
        <AdvantagesBlock />
        <WaterCoolerBlock />
      </PageWrapper>
    </ResponsiveContainer>
  );
};

export default MainPageScreen;
