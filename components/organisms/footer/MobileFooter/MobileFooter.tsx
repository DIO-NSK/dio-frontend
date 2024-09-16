import {useNavigation} from "@/utlis/hooks/useNavigation";
import Text from "@/components/atoms/text/text-base/Text";
import Link from "next/link";
import {TextLink} from "@/types/links";
import React from "react";
import MailIcon from "@/public/icons/main-icon.png";
import GeoIcon from "@/public/icons/map-icon.png";
import {cn} from "@/utlis/cn";
import {IconRow} from "../IconRow/IconRow";

const MobileFirstRow = () => {

    const navigation = useNavigation()
    const handleOrderCallRequest = () => navigation.push("/mobile/call-request/order")

    return (
        <section className={"mobileFooterRow flex-row items-center justify-between"}>
            <div className={"flex flex-col gap-1"}>
                <Text
                    text={"Заказать звонок"}
                    className={"text-link-blue font-medium"}
                    onClick={handleOrderCallRequest}
                />
                <Link href={"tel:+733339900"}>
                    <Text
                        className={"text-link-blue text-[14px]"}
                        text={"+7 (383) 333-99-00"}
                    />
                </Link>
            </div>
            <IconRow/>
        </section>
    )
}

const MobileSecondRow = () => {

    const phoneData = [
        {phone: "+7 (383) 255-99-00", company: "Билайн", tel: "tel:+73832559900"},
        {phone: "+7 (923) 775-99-00", company: "МегаФон", tel: "tel:+79237759900"},
        {phone: "+7 (951) 378-99-00", company: "TELE2", tel: "tel:+79513789900"},
        {phone: "+7 (913) 788-99-00", company: "МТС", tel: "tel:+79137889900"},
    ]

    return (
        <section className={"mobileFooterRow flex-col gap-5"}>
            <Text text={"Ежедневно с 7:00 до 22:00"} className={"text-text-gray"}/>
            {
                phoneData.map((phoneRow, rowKey) =>
                    <div className={"w-full flex flex-row justify-between items-baseline"} key={rowKey}>
                        <Link href={phoneRow.tel}>
                            <Text text={phoneRow.phone} className={"text-text-gray"}/>
                        </Link>
                        <Text text={phoneRow.company} className={"text-text-gray"}/>
                    </div>
                )
            }
        </section>
    )

}

const MobileThirdRow = () => {

    const blockData: TextLink[][] = [
        [
            {text: "О компании", path: "/about-company"},
            {text: "Контакты", path: "/contacts"},
            {text: "Доставка", path: "/payment"},
            {text: "Оплата", path: "/payment"},
            {text: "Товары по акции", path: "/#sales"},
            {text: "Акции", path: "/sales"},
            {text: "Услуги", path: "/services"},
        ],
        [
            {text: "Бонусная программа", path: "/bonus-program"},
            {text: "Возврат и обмен товара", path: "/returning"},
            {text: "Сервисный центр", path: "/service-center"},
            {text: "Рассрочка", path: "/installment-plan"},
            {text: "Политика конфиденциальности", path: "/policy"}
        ]
    ]

    return (
        <React.Fragment>
            {blockData.map((block, blockKey) =>
                <section className={"mobileFooterRow flex-col gap-5"} key={blockKey}>
                    {block.map((link, textKey) =>
                        <Link href={link.path} target={"_self"} key={textKey}>
                            <Text text={link.text} className={"text-text-gray"}/>
                        </Link>
                    )}
                </section>
            )}
        </React.Fragment>
    )

}

const MobileFourthRow = () => {

    const iconTextData = [
        {icon: MailIcon.src, text: "info@3339900.ru", href: "mailto:info@3339900.ru"},
        {icon: GeoIcon.src, text: "Россия, г. Новосибирск, ул. Тимакова 6/1", href: "https://go.2gis.com/wjb501"}
    ]

    return (
        <>
            <section className={cn("mobileFooterRow flex-col gap-7", "border-b-0")}>
                <div className={"w-full flex flex-col gap-5"}>
                    {
                        iconTextData.map((iconRow, rowKey) =>
                            <div className={"w-full flex flex-row items-center gap-5"} key={rowKey}>
                                <img src={iconRow.icon} className={"w-5 h-5"} alt={"/"}/>
                                <Link rel={"noopener noreferer"} target={"_blank"} href={iconRow.href}>
                                    <Text text={iconRow.text} className={"text-text-gray"}/>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </section>
        </>

    )
}

export const MobileFooter = () => (
    <section id={'footer'} className={"md:hidden flex flex-col gap-7"}>
        <MobileFirstRow/>
        <MobileSecondRow/>
        <MobileThirdRow/>
        <MobileFourthRow/>
    </section>
);