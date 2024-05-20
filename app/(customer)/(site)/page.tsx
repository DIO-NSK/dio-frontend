"use client"

import ProductImage4 from "@/public/images/product-image-4.png"
import ProductImage5 from "@/public/images/product-image-5.png"

import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";
import HeroSliderRow from "@/components/organisms/hero-slider-row/HeroSliderRow";
import WaterCard from "@/components/organisms/cards/water-card/WaterCard";
import ServiceCard from "@/components/organisms/cards/service-card/ServiceCard";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import PageWrapper from "@/components/wrappers/page-wrapper/PageWrapper";
import SaleCard from "@/components/organisms/cards/sale-card/SaleCard";
import {bonusCardData} from "@/data/bonusCardData";
import BonusCard from "@/components/organisms/cards/bonus-card/BonusCard";
import WaveHeaderWrapper from "@/components/wrappers/wave-header-wrapper/WaveHeaderWrapper";
import {ContentImage} from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";
import WaterCoolerBlock from "@/components/organisms/blocks/water-cooler-block/WaterCoolerBlock";
import MobilePhotoSlider from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";
import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import React, {useEffect} from "react";
import AdvantagesBlock from "@/components/organisms/blocks/advantages-block/AdvantagesBlock";
import {useUnit} from "effector-react";
import {
    $saleProducts,
    $userBanners,
    $userOurWaters,
    $userPromotions,
    getBannersEvent,
    getSaleProductsEvent,
    getUserOurWatersEvent,
    getUserPromotionsEvent
} from "@/app/(customer)/(site)/model";
import {TextLink} from "@/types/dto/text";
import {HandshakeIcon, MicroscopeIcon, PencilRulerIcon, PercentIcon, StethoscopeIcon, WrenchIcon} from "lucide-react";
import {cn} from "@/utlis/cn";
import Loading from "@/components/mobile/loading/Loading";

const ICON_SIZE = 28

const productCardCV = {
    mainWrapper: cn([
        "sm:border-2 sm:border-light-gray sm:scale-[0.95]",
        "sm:hover:scale-[0.95]"
    ])
}

const MainPageScreen = () => {

    const [saleProducts, getSaleProducts] = useUnit([$saleProducts, getSaleProductsEvent])
    const [ourWaters, getOurWaters] = useUnit([$userOurWaters, getUserOurWatersEvent])
    const [promotions, getPromotions] = useUnit([$userPromotions, getUserPromotionsEvent])
    const [banners, getBanners] = useUnit([$userBanners, getBannersEvent])

    useEffect(() => {
        getBanners()
        getPromotions()
        getSaleProducts()
        getOurWaters()
    }, []);

    const mainServiceCards: (TextLink & { icon: React.ReactNode })[] = [
        {
            text: "Аренда кулеров и пурифайеров",
            link: "rent",
            icon: <HandshakeIcon className={"stroke-link-blue"} size={ICON_SIZE}/>
        },
        {
            text: "Ремонт и диагностика оборудования",
            link: "diagnostic",
            icon: <StethoscopeIcon className={"stroke-link-blue"} size={ICON_SIZE}/>
        },
        {
            text: "Санитарная обработка оборудования",
            link: "sanitization",
            icon: <MicroscopeIcon className={"stroke-link-blue"} size={ICON_SIZE}/>
        },
        {
            text: "Установка пурифаеров",
            link: "mount",
            icon: <PencilRulerIcon className={"stroke-link-blue"} size={ICON_SIZE}/>
        },
        {
            text: "Сервисное обслуживание оборудования",
            link: "maintenance",
            icon: <WrenchIcon className={"stroke-link-blue"} size={ICON_SIZE}/>
        },
        {
            text: "Бесплатное пользование",
            link: "free_use",
            icon: <PercentIcon className={"stroke-link-blue"} size={ICON_SIZE}/>
        },
    ]

    if (!banners.length) return (
        <Loading className={"h-[500px]"}/>
    )

    return (
        <React.Fragment>
            <PageWrapper>
                <MobilePhotoSlider/>
                <HeroSliderRow/>
                <SliderGroup id={"sale"} header={"Товары по акции"}>
                    {saleProducts.filter(prod => prod.discountPercent !== 0)
                        .map((productCard, key) => (
                            <ProductCard
                                classNames={productCardCV}
                                productCard={productCard}
                                key={key}
                            />
                        ))}
                </SliderGroup>
                <section className={"w-full hidden sm:flex"}>
                    <SliderGroup header={"Наши воды"}>
                        {ourWaters.map((waterCard, key) => (
                            <WaterCard waterCard={waterCard} key={key}/>
                        ))}
                    </SliderGroup>
                </section>
                <MobileHeaderWrapper header={"Наши воды"}>
                    {ourWaters.map((waterCard, key) => {
                        return <WaterCard waterCard={waterCard} key={key}/>
                    })}
                </MobileHeaderWrapper>
                <HeaderGroup header={"Попробуйте наши услуги"}>
                    {mainServiceCards.map((item, key) => (
                        <ServiceCard item={item} key={key}/>
                    ))}
                </HeaderGroup>
                <section className={"w-full hidden sm:flex"}>
                    <SliderGroup desktopSlidesPerView={3} header={"Акции и предложения"} href={"/sales"}>
                        {promotions.map((promotion, key) => (
                            <SaleCard promotion={promotion} key={key}/>
                        ))}
                    </SliderGroup>
                </section>
                <MobileHeaderWrapper
                    header={"Акции и предложения"}
                    textLink={{text: "Смотреть все", link: "/sales"}}
                    classNames={{contentWrapper: "w-full pr-5 flex flex-col gap-3"}}
                >
                    {promotions.map((promotion, key) => (
                        <SaleCard promotion={promotion} key={key}/>
                    ))}
                </MobileHeaderWrapper>
                <HeaderGroup
                    header={"Бонусная программа"}
                    textLink={{text: "Подробнее", path: "/bonus-program"}}
                >
                    {bonusCardData.map((bonusCard, key) => (
                        <BonusCard bonusCard={bonusCard} key={key}/>
                    ))}
                </HeaderGroup>
                <WaveHeaderWrapper header={"Почему нам доверяют"}/>
                <SliderGroup
                    header={"Посмотрите на наше производство"}
                    desktopSlidesPerView={2}
                >
                    <ContentImage image={ProductImage4.src} className={"w-[80vw] sm:w-full"}/>
                    <ContentImage image={ProductImage5.src} className={"w-[80vw] sm:w-full"}/>
                </SliderGroup>
                <AdvantagesBlock/>
                <WaterCoolerBlock/>
            </PageWrapper>
        </React.Fragment>
    )
}

export default MainPageScreen