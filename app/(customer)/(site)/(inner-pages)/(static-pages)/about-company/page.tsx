import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {TextLink} from "@/types/dto/text";

import AboutCompanyBanner from "@/public/images/dio-main-banner.png"

import AdvantageCard from "@/components/organisms/cards/advantage-card/AdvantageCard";
import {ContentImage} from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";

import ProductImage4 from "@/public/images/product-image-4.png";
import ProductImage5 from "@/public/images/product-image-5.png";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import React from "react";
import FirstBlock from "@/app/(customer)/(site)/(inner-pages)/(static-pages)/about-company/blocks/FirstBlock";
import SecondBlock from "@/app/(customer)/(site)/(inner-pages)/(static-pages)/about-company/blocks/SecondBlock";
import ThirdBlock from "@/app/(customer)/(site)/(inner-pages)/(static-pages)/about-company/blocks/ThirdBlock";
import FourthBlock from "@/app/(customer)/(site)/(inner-pages)/(static-pages)/about-company/blocks/FourthBlock";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import {
    CalendarCheckIcon,
    DropletsIcon,
    HandshakeIcon,
    HeadsetIcon,
    SearchCheckIcon,
    TimerResetIcon,
    TruckIcon,
    UsersIcon
} from "lucide-react";
import {cn} from "@/utlis/cn";
import AdvantagesBlock from "@/components/organisms/blocks/advantages-block/AdvantagesBlock";
import {Metadata} from "next";

const ICON_SIZE = 28

const imageCV = [
    "w-full h-[200px] col-span-full sm:rounded-2xl sm:h-fit",
    "object-scale-down sm:object-cover border-2 border-light-gray"
]

const advantagesCardData: { icon: React.ReactNode, header: string }[] = [
    {
        icon: <TimerResetIcon size={ICON_SIZE}/>,
        header: "Многолетний опыт работы"
    }, {
        icon: <DropletsIcon size={ICON_SIZE}/>,
        header: "Улучшение технологий"
    }, {
        icon: <TruckIcon size={ICON_SIZE}/>,
        header: "Доставка без выходных дней"
    }, {
        icon: <CalendarCheckIcon size={ICON_SIZE}/>,
        header: "Возможность доставки в день заказа"
    }, {
        icon: <SearchCheckIcon size={ICON_SIZE}/>,
        header: "Широкий ассортимент товаров и оборудования"
    }, {
        icon: <HeadsetIcon size={ICON_SIZE}/>,
        header: "Собственный сервис центр"
    }, {
        icon: <UsersIcon size={ICON_SIZE}/>,
        header: "Ответственные сотрудники"
    }, {
        icon: <HandshakeIcon size={ICON_SIZE}/>,
        header: "Демократичные цены"
    },
]

const breadcrumbs: TextLink[] = [
    {text: "Главная", link: "/"},
    {text: "О компании", link: "/about-company"},
]

export const metadata: Metadata = {
    title: 'О компании — доставка питьевой воды по Новосибирску и области DIO',
    keywords: advantagesCardData.map(item => item.header),
    openGraph: {
        title: 'О компании — доставка питьевой воды по Новосибирску и области DIO',
        images: [AboutCompanyBanner.src]
    }
}

const AboutCompanyPage = () => (
    <InnerPageWrapper classNames={{desktopWrapper: "gap-y-[50px]", mobileWrapper: "px-0 pt-0"}}>
        <div className={"w-full col-span-full flex flex-col gap-5 sm:gap-7"}>
            <CatalogBreadcrumbs breadcrumbs={breadcrumbs}/>
            <img
                className={cn(imageCV)}
                src={'https://storage.yandexcloud.net/dio-static-images/dio-main-banner.jpg'}
                alt={"Баннер «О компании»"}
            />
        </div>
        <FirstBlock/>
        <SecondBlock/>
        <ThirdBlock/>
        <FourthBlock/>
        <SliderGroup header={"Фотографии"} className={"sm:col-span-full"}>
            <ContentImage image={ProductImage4.src}/>
            <ContentImage image={ProductImage5.src}/>
        </SliderGroup>
        <div className={"hidden sm:flex sm:col-span-full"}>
            <HeaderGroup header={"Наши преимущества"}>
                {advantagesCardData.map((card) => {
                    return <AdvantageCard
                        classNames={{
                            wrapper: "border-2 border-light-gray hover:bg-white",
                            text: "text-[18px] font-medium"
                        }}
                        card={card}
                    />
                })}
            </HeaderGroup>
        </div>
        <div className={'sm:hidden w-full'}>
            <AdvantagesBlock/>
        </div>
    </InnerPageWrapper>
);

export default AboutCompanyPage;
