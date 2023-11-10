"use client"


import style from "./Navbar.module.css"
import TextNavbar from "@/components/moleculas/text-navbar/TextNavbar";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import IconButton from "@/components/atoms/buttons/icon-button/IconButton";

import WhatsAppIcon from "@/public/icons/whatsapp-icon.png"
import TelegramIcon from "@/public/icons/telegram-icon.png"

const Navbar = () => {
    return (
        <div className={style.wrapper}>
            <TextNavbar />
            <div className={style.rightRow}>
                <TextBase text={"+7 (383) 333-99-00"} />
                <div className={style.iconRow}>
                    <IconButton src={WhatsAppIcon.src} size={20} onClick={() => {}} />
                    <IconButton src={TelegramIcon.src} size={20} onClick={() => {}} />
                </div>
            </div>
        </div>
    )
}

export default Navbar
