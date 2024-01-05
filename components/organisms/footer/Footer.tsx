"use client"

import style from "./Footer.module.css"
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {COLOR} from "@/components/colors";

import WhatsAppIcon from "@/public/icons/whatsapp-icon.png"
import TelegramIcon from "@/public/icons/telegram-icon.png"
import ViberIcon from "@/public/icons/viber-icon.png"
import IconButton from "@/components/atoms/buttons/icon-button/IconButton";
import {footerData} from "@/data/footerData";
import Image from "next/image";

const IconRow = () => {
    return (
        <div className={style.iconRow}>
            <IconButton src={WhatsAppIcon.src} size={24} onClick={() => console.log("WhatsApp")}/>
            <IconButton src={TelegramIcon.src} size={24} onClick={() => console.log("Telegram")}/>
            <IconButton src={ViberIcon.src} size={28} onClick={() => console.log("Viber")}/>
        </div>
    )
}

const LeftRow = () => {
    return (
        <div className={style.leftRow}>
            {
                Array.from({length: 4}).map((_, colIndex) => {
                    return <div className={style.infoCol}>
                        {
                            footerData.map((item, itemIndex) => {
                                if (itemIndex >= colIndex * 4 && itemIndex < colIndex * 4 + 4) {
                                    return <div className={"flex flex-row item-center gap-[15px]"}>
                                        {
                                            item.icon && <Image
                                                src={item.icon}
                                                className={"stroke-text-gray object-scale-down"}
                                                width={20}
                                                height={20}
                                                quality={100}
                                                alt={'/'}
                                            />
                                        }
                                        <TextBase
                                            text={item.text}
                                            className={"hoverable pointer text-text-gray hover:text-link-blue"}
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
    return (
        <div className={style.rightCol}>
            <RightCol.IconRow/>
            <TextBase text={"+7 (383) 333-99-00"}/>
            <div onClick={() => console.log("Заказать звонок")}>
                <TextBase text={"Заказать звонок"} color={COLOR["link-blue"]}/>
            </div>
        </div>
    )
}

const BottomRow = () => {
    return (
        <div className={style.bottomRow}>
            <TextBase
                text={"1998-2023 OOO «Интернет Решения». Все права защищены."}
                color={COLOR["text-gray"]}
            />
            <TextBase
                text={"Разработка сайта — SiberSite"}
                color={COLOR["text-gray"]}
            />
        </div>
    )
}

const TopCol = () => {
    return (
        <div className={style.topRow}>
            <TopCol.LeftRow/>
            <TopCol.RightCol/>
        </div>
    )
}

const Footer = () => {
    return (
        <div className={style.wrapper}>
            <Footer.TopCol/>
            <Footer.BottomRow/>
        </div>
    )
}

TopCol.RightCol = RightCol
TopCol.LeftRow = LeftRow
RightCol.IconRow = IconRow

Footer.TopCol = TopCol
Footer.BottomRow = BottomRow

export default Footer
