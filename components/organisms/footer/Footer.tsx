"use client"

import Text from "@/components/atoms/text/text-base/Text";

import WhatsAppIcon from "@/public/icons/whatsapp-icon.png"
import TelegramIcon from "@/public/icons/telegram-icon.png"
import VKIcon from "@/public/icons/vk.png"
import IconButton from "@/components/atoms/buttons/icon-button/IconButton";
import {footerData} from "@/data/footerData";
import {useRouter} from "next/navigation";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import MailIcon from "@/public/icons/main-icon.png";
import GeoIcon from "@/public/icons/map-icon.png";
import {useUnit} from "effector-react";
import {toggleCallRequestOpenEvent} from "@/components/organisms/popups/call-request/model";
import Link from "next/link";
import {useNavigation} from "@/utlis/hooks/useNavigation";

const IconRow = () => {

    const iconData = [
        {src: WhatsAppIcon.src, href : "https://t.me/DioSiberianWater"},
        {src: TelegramIcon.src, href: "https://api.whatsapp.com/send?phone=79134869900&text=Здравствуйте%2C+у+меня+есть+вопрос"},
        {src: VKIcon.src, href: "https://vk.com/club31485239"},
    ]

    return (
        <div className={"flex flex-row items-center gap-[15px]"}>
            {
                iconData.map((iconButton, key) =>
                    <Link href={iconButton.href} target={"_blank"} rel={"noopener noreferer"}>
                        <img
                            src={iconButton.src}
                            alt={"Социальная сеть"}
                            className={"size-6"}
                            key={key}
                        />
                    </Link>
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
                                        {item.href ? (
                                                <Link href={item.href} rel={"noopener noreferer"} target={"_blank"}>
                                                    <Text
                                                        text={item.text}
                                                        className={"hoverable pointer text-text-gray hover:text-link-blue"}
                                                    />
                                                </Link>
                                            )
                                            : (
                                                <Text
                                                    text={item.text}
                                                    className={"hoverable pointer text-text-gray hover:text-link-blue"}
                                                    onClick={() => handleAnchorClick(item.path)}
                                                />
                                            )
                                        }
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
            <Link href={"tel:+733339900"}>
                <Text
                    className={"text-link-blue hoverable hover:text-blue-800 pointer"}
                    text={"+7 (383) 333-99-00"}
                />
            </Link>
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
        {icon: MailIcon.src, text: "info@3339900.ru", href: "mailto:info@3339900.ru"},
        {icon: GeoIcon.src, text: "Россия, г. Новосибирск, ул. Тимакова 6/1", href: "https://go.2gis.com/wjb501"}
    ]

    return (
        <>
            <section className={"mobileFooterRow flex-col gap-7"}>
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
