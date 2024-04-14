"use client"

import Text from "@/components/atoms/text/text-base/Text";

import WhatsAppIcon from "@/public/icons/whatsapp-icon.png"
import TelegramIcon from "@/public/icons/telegram-icon.png"
import ViberIcon from "@/public/icons/viber-icon.png"
import IconButton from "@/components/atoms/buttons/icon-button/IconButton";
import {footerData} from "@/data/footerData";
import {useRouter} from "next/navigation";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import MailIcon from "@/public/icons/main-icon.png";
import GeoIcon from "@/public/icons/map-icon.png";
import {useUnit} from "effector-react";
import {toggleCallRequestOpenEvent} from "@/components/organisms/popups/call-request/model";

const IconRow = () => {

    const imageCN = "sm:w-6 sm:h-6 w-5 h-5"

    const iconData = [
        {src: WhatsAppIcon.src, onClick: () => console.log("WhatsApp")},
        {src: TelegramIcon.src, onClick: () => console.log("Telegram")},
        {src: ViberIcon.src, onClick: () => console.log("Viber"), className : "w-6 h-6"},
    ]

    return (
        <div className={"flex flex-row items-center gap-[15px]"}>
            {
                iconData.map((iconButton, key) =>
                    <IconButton
                        src={iconButton.src}
                        onClick={iconButton.onClick}
                        className={cn(imageCN, iconButton?.className)} key={key}
                    />
                )
            }
        </div>
    )

}

const LeftRow = () => {

    const router = useRouter()
    const handleAnchorClick = (path: string) => router.push(path)

    return (
        <div className={"flex flex-row gap-[90px]"}>
            {
                Array.from({length: 4}).map((_, colIndex) => {
                    return <div className={"flex flex-col gap-[25px]"} key={colIndex}>
                        {
                            footerData.map((item, itemIndex) => {
                                if (itemIndex >= colIndex * 4 && itemIndex < colIndex * 4 + 4) {
                                    return <div className={"flex flex-row item-center gap-[15px]"} key={itemIndex}>
                                        {
                                            item.icon && <img
                                                src={item.icon as string}
                                                className={"stroke-text-gray object-scale-down w-5 h-5"}
                                                alt={'/'}
                                            />
                                        }
                                        <Text
                                            text={item.text}
                                            className={"hoverable pointer text-text-gray hover:text-link-blue"}
                                            onClick={() => handleAnchorClick(item.path)}
                                        />
                                    </div>
                                }
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}

const RightCol = () => {

    const togglePopupState = useUnit(toggleCallRequestOpenEvent)

    return (
        <div className={"flex flex-col gap-[25px]"}>
            <RightCol.IconRow/>
            <Text text={"+7 (383) 333-99-00"}/>
            <Text
                text={"Заказать звонок"}
                className={"text-link-blue hoverable hover:text-blue-800 pointer"}
                onClick={togglePopupState}
            />
        </div>
    )
}

const BottomRow = () => {
    return (
        <div className={"flex flex-row items-baseline justify-between"}>
            <Text
                text={"1998-2023 OOO «Интернет Решения». Все права защищены."}
                className={"text-text-gray"}
            />
            <Text
                text={"Разработка сайта — SiberSite"}
                className={"text-text-gray"}
            />
        </div>
    )
}

const TopCol = () => {

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row justify-between items-start",
        "pb-[50px] border-b-2 border-light-gray"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <TopCol.LeftRow/>
            <TopCol.RightCol/>
        </div>
    )
}

const MobileFirstRow = () => {
    return (
        <section className={"mobileFooterRow flex-row items-center justify-between"}>
            <div className={"flex flex-col gap-1"}>
                <Text text={"Заказать звонок"} className={"text-link-blue font-medium"}/>
                <Text text={"+7 (383) 333-99-00"} className={"text-[14px]"}/>
            </div>
            <IconRow/>
        </section>
    )
}

const MobileSecondRow = () => {

    const phoneData = [
        {phone: "+7 (383) 255-99-00", company: "Билайн"},
        {phone: "+7 (923) 775-99-00", company: "МегаФон"},
        {phone: "+7 (951) 378-99-00", company: "TELE2"},
        {phone: "+7 (913) 788-99-00", company: "МТС"},
    ]

    return (
        <section className={"mobileFooterRow flex-col gap-5"}>
            <Text text={"Ежедневно с 7:00 до 22:00"} className={"text-text-gray"}/>
            {
                phoneData.map((phoneRow, rowKey) =>
                    <div className={"w-full flex flex-row justify-between items-baseline"} key={rowKey}>
                        <Text text={phoneRow.phone} className={"text-text-gray"}/>
                        <Text text={phoneRow.company} className={"text-text-gray"}/>
                    </div>
                )
            }
        </section>
    )

}

const MobileThirdRow = () => {

    const blockData = [
        ["О компании", "Контакты", "Доставка", "Оплата"],
        ["Бонусная программа", "Возврат и обмен товара", "Сервисный центр",
            "Рассрочка", "Политика конфиденциальности"]
    ]

    return (
        <>
            {
                blockData.map((block, blockKey) =>
                    <section className={"mobileFooterRow flex-col gap-5"} key={blockKey}>
                        {
                            block.map((text, textKey) =>
                                <Text text={text} className={"text-text-gray"} key={textKey}/>
                            )
                        }
                    </section>
                )
            }
        </>
    )

}

const MobileFourthRow = () => {

    const iconTextData = [
        {icon: MailIcon.src, text: "info@dio.ru", path: "/about"},
        {icon: GeoIcon.src, text: "Россия, г. Новосибирск, ул. Тимакова 6/1", path: "/about"}
    ]

    return (
        <>
            <section className={"mobileFooterRow flex-col gap-7"}>
                <div className={"w-full flex flex-col gap-5"}>
                    {
                        iconTextData.map((iconRow, rowKey) =>
                            <div className={"w-full flex flex-row items-center gap-5"} key={rowKey}>
                                <img src={iconRow.icon} className={"w-5 h-5"} alt={"/"}/>
                                <Text text={iconRow.text} className={"text-text-gray"}/>
                            </div>
                        )
                    }
                </div>
            </section>
            <Text
                className={"text-text-gray"}
                text={"1998-2023 OOO «Интернет Решения» Все права защищены."}
            />
        </>

    )
}

const Footer = () => {

    const wrapperCV: ClassValue[] = [
        "w-full bg-bg-light-blue",
        "py-7 px-5 sm:py-[50px] sm:px-[100px]"
    ]

    return (
        <footer className={cn(wrapperCV)}>
            <section className={"w-full hidden sm:flex flex-col gap-[50px]"}>
                <Footer.TopCol/>
                <Footer.BottomRow/>
            </section>
            <section className={"sm:hidden flex flex-col gap-7"}>
                <Footer.MobileFirstRow/>
                <Footer.MobileSecondRow/>
                <Footer.MobileThirdRow/>
                <Footer.MobileFourthRow/>
            </section>
        </footer>
    )
}

TopCol.RightCol = RightCol
TopCol.LeftRow = LeftRow
RightCol.IconRow = IconRow

Footer.TopCol = TopCol
Footer.BottomRow = BottomRow

Footer.MobileFirstRow = MobileFirstRow
Footer.MobileSecondRow = MobileSecondRow
Footer.MobileThirdRow = MobileThirdRow
Footer.MobileFourthRow = MobileFourthRow

export default Footer
