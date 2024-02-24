"use client"

import {IconTextAction} from "@/types/dto/text";
import {FiGift, FiHeart, FiLogIn, FiMenu, FiShoppingCart, FiZap} from "react-icons/fi";
import WhatsAppIcon from "@/public/icons/whatsapp-icon.png";
import TelegramIcon from "@/public/icons/telegram-icon.png";
import ViberIcon from "@/public/icons/viber-icon.png";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import MobileFooterNavbar from "@/components/mobile/organisms/mobile-footer-navbar/MobileFooterNavbar";
import MobileNavbarWrapper from "@/components/mobile/wrappers/mobile-navbar-wrapper/MobileNavbarWrapper";
import {useRouter} from "next/navigation";
import {useNavigation} from "@/utlis/hooks/useNavigation";

const MobileMenuPage = () => {

    const navigation = useNavigation()
    const handleTabClick = (link: string) => navigation.push(link)

    const menuTabData: IconTextAction[] = [
        {icon: <FiLogIn className={"text-link-blue"}/>, text: "Войти", action: () => navigation.push("/mobile/authorization")},
        {icon: <FiMenu className={"text-link-blue"}/>, text: "Каталог", action: () => handleTabClick("/catalog")},
        {icon: <FiShoppingCart className={"text-link-blue"}/>, text: "Корзина", action: () => handleTabClick("/cart")},
        {icon: <FiHeart className={"text-info-red"}/>, text: "Избранное", action: () => handleTabClick("/favorites")},
        {icon: <FiZap className={"text-link-blue"}/>, text: "Услуги", action: () => handleTabClick("/services")},
        {icon: <FiGift className={"text-link-blue"}/>, text: "Акции", action: () => handleTabClick("/sales")},
    ]

    const infoData = [
        {icon: WhatsAppIcon.src, text: "WhatsApp"},
        {icon: TelegramIcon.src, text: "Telegram"},
        {icon: ViberIcon.src, text: "Viber", className: "w-6 h-6"},
    ]

    const rowCN = "w-full flex flex-row items-center gap-4"

    return (
        <MobileNavbarWrapper sticky={false}>

            <div className={cn(rowCN, "pb-7 border-b-2 border-light-gray")} onClick={menuTabData[0].action}>
                {menuTabData[0].icon}
                <Text text={menuTabData[0].text}/>

            </div>
            {
                menuTabData.slice(1).map((tab, tabIndex) =>
                    <div className={rowCN} onClick={tab.action} key={tabIndex}>
                        {tab.icon}
                        <Text text={tab.text}/>
                    </div>
                )
            }

            <Button
                text={"Заказать звонок"}
                onClick={() => console.log("Call request")}
                buttonType={"SECONDARY"}
            />

            <MobileFooterNavbar/>

            <div className={"w-full flex flex-col gap-2"}>
                <Text text={"Горячая линия"} className={"text-text-gray"}/>
                <Text text={"+7 (383) 333-99-00"}/>
            </div>

            <div className={"w-full flex flex-col gap-3"}>
                <Text text={"Связаться с нами"} className={"text-text-gray"}/>
                <div className={"w-full flex flex-col gap-5"}>
                    {
                        infoData.map((row, rowKey) =>
                            <div className={"w-full flex flex-row items-center gap-4"} key={rowKey}>
                                <img src={row.icon} className={cn("w-5 h-5", row?.className)} alt={"/"}/>
                                <Text text={row.text}/>
                            </div>
                        )
                    }
                </div>
            </div>

        </MobileNavbarWrapper>
    );

};

export default MobileMenuPage;
