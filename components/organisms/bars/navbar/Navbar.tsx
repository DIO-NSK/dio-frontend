import TextNavbar from "@/components/moleculas/text-navbar/TextNavbar";
import Text from "@/components/atoms/text/text-base/Text";
import IconButton from "@/components/atoms/buttons/icon-button/IconButton";

import WhatsAppIcon from "@/public/icons/whatsapp-icon.png"
import TelegramIcon from "@/public/icons/telegram-icon.png"
import VKIcon from "@/public/icons/vk.png";
import Link from "next/link";
import React from "react";
import {cn} from "@/utlis/cn";

const iconData = [
    {
        src: WhatsAppIcon.src,
        href: "https://api.whatsapp.com/send?phone=79134869900&text=Здравствуйте%2C+у+меня+есть+вопрос"
    },
    {
        src: TelegramIcon.src,
        href: "https://t.me/DioSiberianWater"
    },
    {
        src: VKIcon.src,
        href: "https://vk.com/club31485239"
    },
]

const wrapperCN = [
    "hidden w-full xl:px-[100px] py-5 lg:flex flex-row justify-between",
    "items-center bg-bg-light-blue px-[90px]"
]

const Navbar = () => (
    <div className={cn(wrapperCN)}>
        <TextNavbar/>
        <div className={"flex flex-row items-center gap-[30px]"}>
            <Link href={"tel:+733339900"}>
                <Text className='xl:text-base text-sm' text={"+7 (383) 333-99-00"}/>
            </Link>
            <div className={"flex flex-row items-center gap-[15px]"}>
                {iconData.map((icon, key) => (
                    <Link
                        href={icon.href}
                        target={"_blank"}
                        rel={"noopener noreferer"}
                        key={key}
                    >
                        <img
                            src={icon.src}
                            alt={"Социальная сеть"}
                            className={"xl:size-6 size-[18px]"}
                            key={key}
                        />
                    </Link>
                ))}
            </div>
        </div>
    </div>
)

export default Navbar
