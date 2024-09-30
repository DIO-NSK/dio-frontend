import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { TextLink } from "@/types/dto/text";

import AboutCompanyBanner from "@/public/images/dio-main-banner.png";

import AdvantageCard from "@/components/organisms/cards/advantage-card/AdvantageCard";
import { ContentImage } from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";

import FirstBlock from "@/app/(customer)/(site)/(inner-pages)/(static-pages)/about-company/blocks/FirstBlock";
import FourthBlock from "@/app/(customer)/(site)/(inner-pages)/(static-pages)/about-company/blocks/FourthBlock";
import SecondBlock from "@/app/(customer)/(site)/(inner-pages)/(static-pages)/about-company/blocks/SecondBlock";
import ThirdBlock from "@/app/(customer)/(site)/(inner-pages)/(static-pages)/about-company/blocks/ThirdBlock";
import { getBucketPhotos } from "@/app/(customer)/(site)/page.hooks";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import AdvantagesBlock from "@/components/organisms/blocks/advantages-block/AdvantagesBlock";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import { cn } from "@/utlis/cn";
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
import { Metadata } from "next";
import React from "react";
import { getSeoByUrlMask } from "@/app/admin/seo/page.api";

const ICON_SIZE = 28

const imageCV = [
    "w-full h-[200px] col-span-full sm:rounded-2xl sm:h-fit",
    "object-scale-down sm:object-cover border-2 border-light-gray"
]

const advantagesCardData: { icon: React.ReactNode, header: string }[] = [
    {
        icon: <TimerResetIcon size={ICON_SIZE} />,
        header: "Многолетний опыт работы"
    }, {
        icon: <DropletsIcon size={ICON_SIZE} />,
        header: "Улучшение технологий"
    }, {
        icon: <TruckIcon size={ICON_SIZE} />,
        header: "Доставка без выходных дней"
    }, {
        icon: <CalendarCheckIcon size={ICON_SIZE} />,
        header: "Возможность доставки в день заказа"
    }, {
        icon: <SearchCheckIcon size={ICON_SIZE} />,
        header: "Широкий ассортимент товаров и оборудования"
    }, {
        icon: <HeadsetIcon size={ICON_SIZE} />,
        header: "Собственный сервис центр"
    }, {
        icon: <UsersIcon size={ICON_SIZE} />,
        header: "Ответственные сотрудники"
    }, {
        icon: <HandshakeIcon size={ICON_SIZE} />,
        header: "Демократичные цены"
    },
]

const breadcrumbs: TextLink[] = [
    { text: "Главная", link: "/" },
    { text: "О компании", link: "/about-company" },
]

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoByUrlMask(__dirname.split('/').at(-1) as string);

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords
    }
}

// export const metadata: Metadata = {
//     title: 'О компании — доставка питьевой воды по Новосибирску и области DIO',
//     keywords: advantagesCardData.map(item => item.header),
//     openGraph: {
//         title: 'О компании — доставка питьевой воды по Новосибирску и области DIO',
//         images: [AboutCompanyBanner.src]
//     }
// }

const AboutCompanyPage = async () => {
    const photos = await getBucketPhotos()

    return (
        <InnerPageWrapper classNames={{ desktopWrapper: "gap-y-[50px]", mobileWrapper: "px-0 pt-0" }}>
            <div className={"w-full col-span-full flex flex-col gap-5 sm:gap-7"}>
                <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
                <img
                    className={cn(imageCV)}
                    src={'https://storage.yandexcloud.net/dio-static-images/dio-main-banner.jpg'}
                    alt={"Баннер «О компании»"}
                />
            </div>
            <FirstBlock />
            <SecondBlock />
            <ThirdBlock />
            <FourthBlock />
            <SliderGroup
                header={"Посмотрите на наше производство"}
                desktopSlidesPerView={2}
            >
                {photos.map((photo, index) => (
                    <ContentImage
                        image={`https://storage.yandexcloud.net/dio-company-images/${photo}`}
                        className={"w-[80vw] sm:w-full"}
                        key={index}
                    />
                ))}
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
                <AdvantagesBlock />
            </div>
        </InnerPageWrapper>
    )
}

export default AboutCompanyPage;
