"use client"

import MockWaterImage from "@/public/images/water-image.png"

import MockSaleImage1 from "@/public/images/sale-image-1.png"
import MockSaleImage2 from "@/public/images/sale-image-2.png"
import MockSaleImage3 from "@/public/images/sale-image-3.png"

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
import {ImageHeaderDescrCard, WaterCardDTO} from "@/types/cards";
import {bonusCardData} from "@/data/bonusCardData";
import BonusCard from "@/components/organisms/cards/bonus-card/BonusCard";
import WaveHeaderWrapper from "@/components/wrappers/wave-header-wrapper/WaveHeaderWrapper";
import {ContentImage} from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";
import WaterCoolerBlock from "@/components/organisms/blocks/water-cooler-block/WaterCoolerBlock";
import {mockCardArray} from "@/data/productCardData";
import MobilePhotoSlider from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";
import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import React from "react";
import AdvantagesBlock from "@/components/organisms/blocks/advantages-block/AdvantagesBlock";

const MainPageScreen = () => {

    const mockWaterCard: WaterCardDTO = {
        image: MockWaterImage.src,
        textLink: {
            text: "Вода «Evian»",
            link: "/mock-path"
        }
    }

    const mockWaterCardList = [
        mockWaterCard, mockWaterCard,
        mockWaterCard, mockWaterCard,
    ]

    const serviceDataList = [
        "Аренда кулеров и пурифаеров",
        "Бесплатное пользование кулеров",
        "Ремон кулеров пурифаеров и кофемашин",
        "Санитарная обработка кулеров и кофемашин",
        "Сервисное обслуживание пурифаеров",
    ]

    const mockSaleCardArray: ImageHeaderDescrCard[] = [
        {
            header: "Бесплатно",
            descr: "Минеральная вода «DIO»",
            image: MockSaleImage1.src
        }, {
            header: "Скидки до 50%",
            descr: `Для детских учреждений`,
            image: MockSaleImage2.src
        }, {
            header: "Бесплатное",
            descr: "Обслуживание при покупке кулера",
            image: MockSaleImage3.src
        },
    ]

    return (
        <React.Fragment>
            <PageWrapper>

                <MobilePhotoSlider/>
                <HeroSliderRow/>

                <SliderGroup id={"sale"} header={"Товары по акции"}>
                    {
                        mockCardArray.map((productCard) => {
                            return <ProductCard productCard={productCard}/>
                        })
                    }
                </SliderGroup>

                <section className={"w-full hidden sm:flex"}>
                    <SliderGroup header={"Наши воды"}>
                        {
                            mockWaterCardList.map((waterCard) => {
                                return <WaterCard waterCard={waterCard}/>
                            })
                        }
                    </SliderGroup>
                </section>

                <MobileHeaderWrapper
                    header={"Наши воды"}
                    textLink={{text: "Смотреть все", link: "/our-waters"}}
                >
                    {
                        mockWaterCardList.map((waterCard) => {
                            return <WaterCard waterCard={waterCard}/>
                        })
                    }
                </MobileHeaderWrapper>

                <HeaderGroup header={"Попробуйте наши услуги"}>
                    {
                        serviceDataList.map((item, index) => {
                            return index !== serviceDataList.length - 1 ?
                                <ServiceCard number={index + 1} text={item}/> :
                                <BannerCard/>
                        })
                    }
                </HeaderGroup>

                <section className={"w-full hidden sm:flex"}>
                    <SliderGroup header={"Акции и предложения"}>
                        {
                            mockSaleCardArray.map((saleCard) => {
                                return <SaleCard saleCard={saleCard}/>
                            })
                        }
                    </SliderGroup>
                </section>

                <MobileHeaderWrapper
                    header={"Акции и предложения"}
                    textLink={{text: "Смотреть все", link: "/our-waters"}}
                    classNames={{contentWrapper: "w-full pr-5 flex flex-col gap-3"}}
                >
                    {
                        mockSaleCardArray.map((saleCard) => {
                            return <SaleCard saleCard={saleCard}/>
                        })
                    }
                </MobileHeaderWrapper>

                <HeaderGroup
                    header={"Бонусная программа"}
                    textLink={{text: "Подробнее", path: "/bonuses"}}
                >
                    {
                        bonusCardData.map((bonusCard) => {
                            return <BonusCard bonusCard={bonusCard}/>
                        })
                    }
                </HeaderGroup>

                <WaveHeaderWrapper header={"Почему нам доверяют"}/>

                <SliderGroup header={"Посмотрите на наше производство"}>
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