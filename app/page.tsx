"use client"

import MockImage from "@/public/images/card-image.png"
import MockWaterImage from "@/public/images/water-image.png"

import MockSaleImage1 from "@/public/images/sale-image-1.png"
import MockSaleImage2 from "@/public/images/sale-image-2.png"
import MockSaleImage3 from "@/public/images/sale-image-3.png"

import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";
import HeroSliderRow from "@/components/organisms/hero-slider-row/HeroSliderRow";
import WaterCard, {WaterCardDTO} from "@/components/organisms/cards/water-card/WaterCard";
import ServiceCard from "@/components/organisms/cards/service-card/ServiceCard";
import BannerCard from "@/components/organisms/cards/banner-card/BannerCard";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import PageWrapper from "@/components/wrappers/page-wrapper/PageWrapper";
import SaleCard from "@/components/organisms/cards/sale-card/SaleCard";
import {ImageHeaderDescrCard} from "@/types/cards";
import {bonusCardData} from "@/data/bonusCardData";
import BonusCard from "@/components/organisms/cards/bonus-card/BonusCard";

const MainPageScreen = () => {

    const mockProductCard = {
        price: 500,
        descr: "Кулер с длинным текстом чтобы показать ограничение по символам",
        image: MockImage
    }

    const mockWaterCard: WaterCardDTO = {
        image: MockWaterImage,
        textLink: {
            text: "Вода «Evian»",
            path: "/mock-path"
        }
    }

    const mockWaterCardList = [
        mockWaterCard, mockWaterCard,
        mockWaterCard, mockWaterCard,
    ]

    const mockCardArray = [
        mockProductCard, mockProductCard,
        mockProductCard, mockProductCard,
        mockProductCard,
    ]

    const serviceDataList = [
        "Аренда кулеров и пурифаеров",
        "Бесплатное пользование кулеров",
        "Ремон кулеров пурифаеров и кофемашин",
        "Санитарная обработка кулеров и кофемашин",
        "Сервисное обслуживание пурифаеров",
        ""
    ]

    const mockSaleCardArray : ImageHeaderDescrCard[] = [
        {
            header : "Бесплатно",
            descr : "Минеральная вода «DIO»",
            image : MockSaleImage1
        }, {
            header : "Скидки до 50%",
            descr : `Для детских учреждений`,
            image : MockSaleImage2
        }, {
            header : "Бесплатное",
            descr : "Обслуживание при покупке кулера",
            image : MockSaleImage3
        },

    ]

    return (
        <PageWrapper>
            <HeroSliderRow/>
            <SliderGroup header={"Товары по акции"}>
                {
                    mockCardArray.map((productCard) => {
                        return <ProductCard productCard={productCard}/>
                    })
                }
            </SliderGroup>
            <SliderGroup header={"Наши воды"}>
                {
                    mockWaterCardList.map((waterCard) => {
                        return <WaterCard waterCard={waterCard}/>
                    })
                }
            </SliderGroup>
            <HeaderGroup header={"Попробуйте наши услуги"}>
                {
                    serviceDataList.map((item, index) => {
                        return index !== serviceDataList.length - 1 ?
                            <ServiceCard number={index + 1} text={item}/> :
                            <BannerCard/>
                    })
                }
            </HeaderGroup>
            <SliderGroup header={"Акции и предложения"}>
                {
                    mockSaleCardArray.map((saleCard) => {
                        return <SaleCard saleCard={saleCard} />
                    })
                }
            </SliderGroup>
            <HeaderGroup
                header={"Бонусная программа"}
                textLink={{text : "Подробнее о программе", path : "/bonuses"}}
            >
                {
                    bonusCardData.map((bonusCard) => {
                        return <BonusCard bonusCard={bonusCard} />
                    })
                }
            </HeaderGroup>
        </PageWrapper>
    )
}

export default MainPageScreen