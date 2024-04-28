"use client"

import ProductImage4 from "@/public/images/product-image-4.png"
import ProductImage5 from "@/public/images/product-image-5.png"

import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";
import HeroSliderRow from "@/components/organisms/hero-slider-row/HeroSliderRow";
import WaterCard from "@/components/organisms/cards/water-card/WaterCard";
import ServiceCard from "@/components/organisms/cards/service-card/ServiceCard";
import BannerCard from "@/components/organisms/cards/banner-card/BannerCard";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import PageWrapper from "@/components/wrappers/page-wrapper/PageWrapper";
import SaleCard from "@/components/organisms/cards/sale-card/SaleCard";
import {bonusCardData} from "@/data/bonusCardData";
import BonusCard from "@/components/organisms/cards/bonus-card/BonusCard";
import WaveHeaderWrapper from "@/components/wrappers/wave-header-wrapper/WaveHeaderWrapper";
import {ContentImage} from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";
import WaterCoolerBlock from "@/components/organisms/blocks/water-cooler-block/WaterCoolerBlock";
import {mockCardArray} from "@/data/productCardData";
import MobilePhotoSlider from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";
import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import React, {useEffect} from "react";
import AdvantagesBlock from "@/components/organisms/blocks/advantages-block/AdvantagesBlock";
import {useUnit} from "effector-react";
import {
    $userOurWaters,
    $userPromotions,
    getUserOurWatersEvent,
    getUserPromotionsEvent
} from "@/app/(customer)/(site)/model";

const serviceDataList = [
    "Аренда кулеров и пурифаеров",
    "Бесплатное пользование кулеров",
    "Ремон кулеров пурифаеров и кофемашин",
    "Санитарная обработка кулеров и кофемашин",
    "Сервисное обслуживание пурифаеров",
]

const MainPageScreen = () => {

    const [ourWaters, getOurWaters] = useUnit([$userOurWaters, getUserOurWatersEvent])
    const [promotions, getPromotions] = useUnit([$userPromotions, getUserPromotionsEvent])

    useEffect(() => {
        getOurWaters()
        getPromotions()
    }, []);

    return (
        <React.Fragment>
            <PageWrapper>
                <MobilePhotoSlider/>
                <HeroSliderRow/>
                <SliderGroup id={"sale"} header={"Товары по акции"}>
                    {mockCardArray.map((productCard, key) => (
                        <ProductCard productCard={productCard} key={key}/>
                    ))}
                </SliderGroup>
                <section className={"w-full hidden sm:flex"}>
                    <SliderGroup header={"Наши воды"}>
                        {ourWaters.map((waterCard, key) => (
                            <WaterCard waterCard={waterCard} key={key}/>
                        ))}
                    </SliderGroup>
                </section>
                <MobileHeaderWrapper
                    header={"Наши воды"}
                    textLink={{text: "Смотреть все", link: "/our-waters"}}
                >
                    {ourWaters.map((waterCard, key) => {
                        return <WaterCard waterCard={waterCard} key={key}/>
                    })}
                </MobileHeaderWrapper>
                <HeaderGroup header={"Попробуйте наши услуги"}>
                    {serviceDataList.map((item, key) => {
                        return key !== serviceDataList.length - 1 ?
                            <ServiceCard number={key + 1} text={item} key={key}/> :
                            <BannerCard key={key}/>
                    })}
                </HeaderGroup>
                <section className={"w-full hidden sm:flex"}>
                    <SliderGroup desktopSlidesPerView={3} header={"Акции и предложения"}>
                        {promotions.map((promotion, key) => (
                            <SaleCard promotion={promotion} key={key}/>
                        ))}
                    </SliderGroup>
                </section>
                <MobileHeaderWrapper
                    header={"Акции и предложения"}
                    textLink={{text: "Смотреть все", link: "/our-waters"}}
                    classNames={{contentWrapper: "w-full pr-5 flex flex-col gap-3"}}
                >
                    {promotions.map((promotion, key) => (
                        <SaleCard promotion={promotion} key={key}/>
                    ))}
                </MobileHeaderWrapper>
                <HeaderGroup
                    header={"Бонусная программа"}
                    textLink={{text: "Подробнее", path: "/bonuses"}}
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