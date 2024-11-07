import MobilePhotoSlider from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";
import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import AdvantagesBlock from "@/components/organisms/blocks/advantages-block/AdvantagesBlock";
import WaterCoolerBlock from "@/components/organisms/blocks/water-cooler-block/WaterCoolerBlock";
import BonusCard from "@/components/organisms/cards/bonus-card/BonusCard";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SaleCard from "@/components/organisms/cards/sale-card/SaleCard";
import ServiceCard from "@/components/organisms/cards/service-card/ServiceCard";
import WaterCard from "@/components/organisms/cards/water-card/WaterCard";
import HeroSliderRow from "@/components/organisms/hero-slider-row/HeroSliderRow";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import PageWrapper from "@/components/wrappers/page-wrapper/PageWrapper";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";
import { bonusCardData } from "@/data/bonusCardData";
import { TextLink } from "@/types/dto/text";
import { cn } from "@/utlis/cn";
import { HandshakeIcon, MicroscopeIcon, PencilRulerIcon, PercentIcon, StethoscopeIcon, WrenchIcon } from "lucide-react";

import { getSeoById } from "@/app/admin/seo/page.api";
import { ResponsiveContainer } from "@/components/wrappers/responsive-container/ResponsiveContainer";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { MobileHeader } from "./components/MobileHeader";
import {
    getBanners,
    getDayProducts,
    getNewProducts,
    getOurWaters,
    getPromotions,
    getSaleProducts
} from './page.hooks';

const ICON_SIZE = 28

const mainServiceCards: (TextLink & { icon: ReactNode })[] = [
    {
        text: "Аренда кулеров и пурифайеров",
        link: "rent",
        icon: <HandshakeIcon className={"stroke-link-blue"} size={ICON_SIZE} />
    },
    {
        text: "Ремонт и диагностика оборудования",
        link: "diagnostic",
        icon: <StethoscopeIcon className={"stroke-link-blue"} size={ICON_SIZE} />
    },
    {
        text: "Санитарная обработка оборудования",
        link: "sanitization",
        icon: <MicroscopeIcon className={"stroke-link-blue"} size={ICON_SIZE} />
    },
    {
        text: "Установка пурифайеров",
        link: "mount",
        icon: <PencilRulerIcon className={"stroke-link-blue"} size={ICON_SIZE} />
    },
    {
        text: "Сервисное обслуживание оборудования",
        link: "maintenance",
        icon: <WrenchIcon className={"stroke-link-blue"} size={ICON_SIZE} />
    },
    {
        text: "Бесплатное пользование",
        link: "free_use",
        icon: <PercentIcon className={"stroke-link-blue"} size={ICON_SIZE} />
    },
]

const productCardCV = {
    mainWrapper: cn([
        "sm:border-2 sm:border-light-gray sm:scale-[0.95]",
        "sm:hover:scale-[0.95] lg:-mr-5 xl:mr-0"
    ])
}

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoById(772);

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords
    }
}

const MainPageScreen = async () => {
    const newProducts = await getNewProducts()
    const dayProducts = await getDayProducts()
    const saleProducts = await getSaleProducts()
    const ourWaters = await getOurWaters()
    const promotions = await getPromotions()
    const banners = await getBanners()

    return (
        <ResponsiveContainer>
            <PageWrapper>
                <Suspense fallback={<></>}>
                    <MobileHeader />
                </Suspense>
                <MobilePhotoSlider photos={banners} />
                <HeroSliderRow dayProducts={dayProducts} banners={banners} />
                {
                    newProducts.length > 0 ? <SliderGroup header={"Новинки"} className={'-mt-8 md:mt-0'}>
                        {newProducts.map((productCard, key) => (
                            <ProductCard
                                classNames={productCardCV}
                                productCard={productCard}
                                key={key}
                            />
                        ))}
                    </SliderGroup> : null
                }
                <SliderGroup id={"sale"} header={"Товары по акции"} className="-mt-6 md:-mt-0 bg-bg-light-blue py-5 md:py-0 md:bg-white">
                    {saleProducts.filter(prod => prod.discountPercent !== 0)
                        .map((productCard, key) => (
                            <ProductCard
                                classNames={productCardCV}
                                productCard={productCard}
                                key={key}
                            />
                        ))}
                </SliderGroup>
                <section className={"w-full hidden md:flex"}>
                    <SliderGroup header={"Наши воды"}>
                        {ourWaters.map((waterCard, key) => (
                            <WaterCard waterCard={waterCard} key={key} />
                        ))}
                    </SliderGroup>
                </section>
                <MobileHeaderWrapper header={"Наши воды"}>
                    {ourWaters.map((waterCard, key) => {
                        return <WaterCard waterCard={waterCard} key={key} />
                    })}
                </MobileHeaderWrapper>
                <section className={"w-full hidden md:flex"}>
                    <SliderGroup desktopSlidesPerView={4} header={"Акции и предложения"} href={"/sales"}>
                        {promotions.map((promotion, key) => (
                            <SaleCard promotion={promotion} key={key} />
                        ))}
                    </SliderGroup>
                </section>
                <MobileHeaderWrapper
                    classNames={{ contentWrapper: "w-full pr-5 flex flex-col gap-3" }}
                    textLink={{ text: "Смотреть все", link: "/sales" }}
                    header={"Акции и предложения"}
                >
                    {promotions.map((promotion, key) => (
                        <SaleCard promotion={promotion} key={key} />
                    ))}
                </MobileHeaderWrapper>
                <HeaderGroup
                    textLink={{ text: "Подробнее", path: "/bonus-program" }}
                    header={"Бонусная программа"}
                >
                    {bonusCardData.map((bonusCard, key) => (
                        <BonusCard bonusCard={bonusCard} key={key} />
                    ))}
                </HeaderGroup>
                <HeaderGroup header={"Попробуйте наши услуги"} className="hidden md:flex">
                    {mainServiceCards.map((item, key) => (
                        <ServiceCard item={item} key={key} />
                    ))}
                </HeaderGroup>
                <MobileHeaderWrapper
                    classNames={{ contentWrapper: "md:hidden w-full pr-5 grid grid-cols-2 gap-3 mb-7" }}
                    header={"Попробуйте наши услуги"} canSlide={false}
                >
                    {mainServiceCards.map((item, key) => (
                        <ServiceCard item={item} key={key} />
                    ))}
                </MobileHeaderWrapper>
                <AdvantagesBlock />
                <WaterCoolerBlock />
            </PageWrapper>
        </ResponsiveContainer>
    )
}

export default MainPageScreen