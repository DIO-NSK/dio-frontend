"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import {TextLink} from "@/types/dto/text";

import AboutCompanyBanner from "@/public/images/about-company-banner.png"
import Text from "@/components/atoms/text/text-base/Text";
import InfoCircleIcon from "@/components/atoms/svg/info-circle-icon/InfoCircleIcon";
import WaterCard from "@/components/organisms/cards/water-card/WaterCard";

import AdvantageCard from "@/components/organisms/cards/advantage-card/AdvantageCard";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {ContentImage} from "@/components/organisms/cards/fullwidth-main-card/content-image/ContentImage";
import SliderGroup from "@/components/wrappers/slider-group/SliderGroup";

import Water19LImage from "@/public/images/static/water-19l.png"
import Water5LImage from "@/public/images/static/water-5l.png"
import Water1LImage from "@/public/images/static/water-1l.png"
import Water05LImage from "@/public/images/static/water-05l.png"
import {IconHeaderCard, WaterCardDTO} from "@/types/cards";

import CrownIcon from "@/public/icons/crown-icon.png"
import WaterIcon from "@/public/icons/water-icon.png"
import SettingsIcon from "@/public/icons/settings-icon.png"

import ProductImage4 from "@/public/images/product-image-4.png";
import ProductImage5 from "@/public/images/product-image-5.png";
import {advantagesCardData} from "@/data/advantagesCardData";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";

const FirstBlock = () => {
    return (
        <div className={"col-span-full grid grid-cols-12 gap-5 pb-[50px] border-b-2 border-light-gray"}>
            <div className={"col-span-6 flex flex-col gap-[20px]"}>
                <Text
                    text={"Вода из Сибири для сибиряков"}
                    className={"text-[32px] font-semibold text-link-blue"}
                />
                <Text
                    className={"text-[22px] text-black"}
                    text={"С 2001 года мы занимаемся производством, розливом\n" +
                        "и доставкой артезианской питьевой воды в Новосибирске"}
                />
                <Text
                    className={"text-[18px] text-text-gray"}
                    text={"Главный принцип производства питьевой воды «DIO»  — сохранение\n" +
                        "природного микроэлементного состава артезианской воды"}
                />
            </div>
            <div className={"col-start-8 col-span-5 flex flex-col gap-[20px]"}>
                <InfoCircleIcon/>
                <Text
                    className={"text-[18px] text-black"}
                    text={"Артезианская вода «DIO» производится на полностью автоматической" +
                        "линии производства, проходит постоянный контроль качества — каждые 30" +
                        "минут вода исследуется сотрудниками лаборатории, каждая партия воды" +
                        "проверяется региональным центром Роспотребнадзора РФ"}
                />
            </div>
        </div>
    )
}

const SecondBlock = () => {
    return (
        <div className={"col-span-full grid grid-cols-12 gap-5 pb-[50px] border-b-2 border-light-gray"}>
            <Text
                text={"Дар природы с глубины 130 метров"}
                className={"col-span-6 text-[32px] font-semibold text-link-blue"}
            />
            <Text
                className={"col-start-8 col-span-5 text-[18px] text-black"}
                text={"Три артезианские скважины расположены на территории производства DIOGEN" +
                    "(«Диоген») в лесной зоне Академгородка и относятся к магниево-кальциевым " +
                    "гидрокарбонатным источникам, содержащим важные для организма вещества."}
            />
        </div>
    )
}

const WaterBlock = () => {

    const waterCardData: WaterCardDTO[] = [
        {
            image: Water19LImage.src,
            textLink: {
                text: "Вода «DIO» 19 л.",
                link: ""
            }
        },
        {
            image: Water5LImage.src,
            textLink: {
                text: "Вода «DIO» 5,5 л.",
                link: ""
            }
        },
        {
            image: Water1LImage.src,
            textLink: {
                text: "Вода «DIO» 1,5 л.",
                link: ""
            }
        },
        {
            image: Water05LImage.src,
            textLink: {
                text: "Вода «DIO» 0,7 л.",
                link: ""
            }
        },
    ]

    return (
        <div className={"col-span-full grid grid-cols-12 gap-x-5 gap-y-10 pb-[50px] border-b-2 border-light-gray"}>
            <Text
                text={"Большой выбор продукции"}
                className={"col-span-6 text-[32px] font-semibold text-link-blue"}
            />
            <Text
                className={"col-start-8 col-span-5 text-[18px] text-black"}
                text={"Для удобства пользования 19-литровыми бутылями предлагается" +
                    "специальное оборудование: кулеры и помпы различных моделей"}
            />
            <div className={"col-span-full grid grid-cols-12 gap-x-10"}>
                {
                    waterCardData.map((waterCard) => {
                        return <WaterCard waterCard={waterCard}/>
                    })
                }
            </div>
        </div>
    )

}

const FourthBlock = () => {

    const cardData: IconHeaderCard[] = [
        {icon: CrownIcon.src, header: "Поддерживает водно-солевой баланс минеральных и органических веществ"},
        {icon: WaterIcon.src, header: "При кипячении не теряет своих свойств, так как не оставляет накипи"},
        {icon: SettingsIcon.src, header: "Оптимальная для сибиряков. Обогащена кальцием, магнием и калием"},
    ]

    const wrapperCV : ClassValue[] = [
        "ml-[-100px] px-[100px] pt-[50px] bg-light-gray w-screen grid grid-cols-12 gap-x-5 gap-y-10 pb-[50px]",
        "border-b-2 border-light-gray"
    ]

    return (
        <div className={"relative col-span-full"}>
            <div className={cn(wrapperCV)}>
                {
                    cardData.map((item) => <AdvantageCard
                        classNames={{
                            wrapper: "border-2 border-white hover:bg-bg-light-blue" +
                                " hover:border-blue-200 col-span-4 bg-white",
                            text: "font-medium"
                        }}
                        card={item}
                    />)
                }
            </div>
        </div>
    )

}

const AboutCompanyPage = () => {

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "О компании", link: "/about-company"},
    ]

    return (
        <InnerPageWrapper className={"gap-y-[50px]"}>

            <div className={"col-span-full flex flex-col gap-[30px]"}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <img
                    className={"col-span-full rounded-2xl object-cover"}
                    src={AboutCompanyBanner.src}
                    alt={"/"}
                />
            </div>

            <FirstBlock/>
            <SecondBlock/>
            <WaterBlock/>
            <FourthBlock/>

            <SliderGroup header={"Фотографии"}>
                <ContentImage image={ProductImage4.src} />
                <ContentImage image={ProductImage5.src} />
            </SliderGroup>

            <HeaderGroup header={"Наши преимущества"}>
                {
                    advantagesCardData.map((card) => {
                        return <AdvantageCard
                            classNames={{
                                wrapper : "border-2 border-light-gray hover:bg-white",
                                text : "text-[18px] font-medium"
                            }}
                            card={card}
                        />
                    })
                }
            </HeaderGroup>

        </InnerPageWrapper>
    );
};

export default AboutCompanyPage;
