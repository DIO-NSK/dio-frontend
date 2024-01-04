"use client"

import TextNavbar from "@/components/moleculas/text-navbar/TextNavbar";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import IconButton from "@/components/atoms/buttons/icon-button/IconButton";

import WhatsAppIcon from "@/public/icons/whatsapp-icon.png"
import TelegramIcon from "@/public/icons/telegram-icon.png"

const Navbar = () => {
    return (
        <div className={"w-full px-[100px] py-[30px] flex flex-row justify-between items-center bg-bg-light-blue"}>
            <TextNavbar/>
            <div className={"flex flex-row items-center gap-[30px]"}>
                <TextBase text={"+7 (383) 333-99-00"}/>
                <div className={"flex flex-row items-center gap-[15px]"}>
                    <IconButton
                        src={WhatsAppIcon.src}
                        size={20}
                        onClick={() => {}}
                    />
                    <IconButton
                        src={TelegramIcon.src}
                        size={20}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar
