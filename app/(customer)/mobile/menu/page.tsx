"use client"

import {IconTextAction} from "@/types/dto/text";
import {
    FiFile,
    FiGift,
    FiHeart,
    FiLogIn,
    FiLogOut,
    FiMenu,
    FiSettings,
    FiShoppingCart,
    FiUser,
    FiZap
} from "react-icons/fi";
import WhatsAppIcon from "@/public/icons/whatsapp-icon.png";
import TelegramIcon from "@/public/icons/telegram-icon.png";
import VKIcon from "@/public/icons/vk.png"
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import MobileFooterNavbar from "@/components/mobile/organisms/mobile-footer-navbar/MobileFooterNavbar";
import MobileNavbarWrapper from "@/components/mobile/wrappers/mobile-navbar-wrapper/MobileNavbarWrapper";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {useUnit} from "effector-react";
import {$userCredentials, getUserCredentialsEvent, logoutUserFx} from "@/app/(customer)/model";
import React, {useEffect} from "react";
import Link from "next/link";

const MobileMenuPage = () => {

    const logout = useUnit(logoutUserFx)
    const [userCredentials, getUserCredentials]
        = useUnit([$userCredentials, getUserCredentialsEvent])

    const navigation = useNavigation()
    const handleTabClick = (link: string) => navigation.push(link)
    const handleOrderCallRequest = () => navigation.push("/mobile/call-request/order")

    const authorizedTabData: IconTextAction[] = [
        {
            icon: <FiUser className={"text-link-blue"}/>,
            text: "Мой профиль",
            action: () => navigation.push("/profile")
        }, {
            icon: <FiFile className={"text-link-blue"}/>,
            text: "Мои заказы",
            action: () => navigation.push("/profile/orders")
        }, {
            icon: <FiSettings className={"text-link-blue"}/>,
            text: "Настройки",
            action: () => navigation.push("/profile/settings")
        },
    ]

    const menuTabData: IconTextAction[] = [
        {
            icon: userCredentials ? <FiLogOut className={"text-info-red"}/> : <FiLogIn className={"text-link-blue"}/>,
            text: userCredentials ? "Выйти" : "Войти",
            action: userCredentials ? () => logout().then(_ => navigation.push('/'))
                : () => navigation.push("/mobile/authorization")
        },
        {
            icon: <FiMenu className={"text-link-blue"}/>,
            action: () => handleTabClick("/mobile/menu/catalog"),
            text: "Каталог",
        },
        {
            icon: <FiShoppingCart className={"text-link-blue"}/>,
            action: () => handleTabClick("/cart"),
            text: "Корзина",
        },
        {
            icon: <FiHeart className={"text-info-red"}/>,
            action: () => userCredentials
                ? handleTabClick("/favorites")
                : navigation.push("/mobile/authorization"),
            text: "Избранное",
        },
        {
            icon: <FiZap className={"text-link-blue"}/>,
            action: () => handleTabClick("/services"),
            text: "Услуги",
        },
        {
            icon: <FiGift className={"text-link-blue"}/>,
            action: () => handleTabClick("/sales"),
            text: "Акции",
        },
    ]

    useEffect(() => {
        getUserCredentials()
    }, [])

    const infoData = [
        {
            icon: WhatsAppIcon.src,
            text: "WhatsApp",
            href: 'https://api.whatsapp.com/send?phone=79134869900&text=Здравствуйте%2C+у+меня+есть+вопрос'
        },
        {
            icon: TelegramIcon.src,
            text: "Telegram",
            href: "https://t.me/DioSiberianWater"
        },
        {
            icon: VKIcon.src,
            text: "ВКонтакте",
            href: "https://vk.com/club31485239"
        },
    ]

    const rowCN = "w-full flex flex-row items-center gap-4"

    return (
        <MobileNavbarWrapper sticky={false}>

            <div className={cn(rowCN, "pb-7 border-b-2 border-light-gray")} onClick={menuTabData[0].action}>
                {menuTabData[0].icon}
                <Text text={menuTabData[0].text}/>
            </div>

            {
                userCredentials && <section className={"w-full flex flex-col gap-7 pb-7 border-b-2 border-light-gray"}>
                    {authorizedTabData.map((tab, tabIndex) => (
                        <div className={rowCN} onClick={tab.action} key={tabIndex}>
                            {tab.icon}
                            <Text text={tab.text}/>
                        </div>
                    ))}
                </section>
            }

            {menuTabData.slice(1).map((tab, tabIndex) =>
                <div className={rowCN} onClick={tab.action} key={tabIndex}>
                    {tab.icon}
                    <Text text={tab.text}/>
                </div>
            )}

            <Button
                text={"Заказать звонок"}
                onClick={handleOrderCallRequest}
                buttonType={"SECONDARY"}
            />

            <MobileFooterNavbar/>

            <div className={"w-full flex flex-col gap-2"}>
                <Text text={"Горячая линия"} className={"text-text-gray"}/>
                <Link href={"tel:+733339900"}>
                    <Text text={"+7 (383) 333-99-00"}/>
                </Link>
            </div>

            <div className={"w-full flex flex-col gap-3"}>
                <Text text={"Связаться с нами"} className={"text-text-gray"}/>
                <div className={"w-full flex flex-col gap-5"}>
                    {infoData.map((row, rowKey) =>
                        <Link
                            className={"w-full flex flex-row items-center gap-4"}
                            href={row.href} key={rowKey}
                        >
                            <img src={row.icon} className={"w-5 h-5"} alt={"/"}/>
                            <Text text={row.text}/>
                        </Link>
                    )}
                </div>
            </div>

        </MobileNavbarWrapper>
    );

};

export default MobileMenuPage;
