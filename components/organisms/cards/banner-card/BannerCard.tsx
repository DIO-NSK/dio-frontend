"use client"

import style from "./BannerCard.module.css"
import {useRouter} from "next/navigation";
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import {COLOR} from "@/components/colors";
import Image from "next/image";

import DIOLogo from "@/public/images/dio-logo.png"

const BannerCard = () => {

    const router = useRouter()

    return (
        <div
            className={style.wrapper}
            onClick={() => console.log("Все товары")}
        >
            <Image
                className={"w-[50px] h-[50px] object-cover"}
                src={DIOLogo.src}
                alt={'/'}
                width={60}
                height={60}
                quality={100}
            />
            <div className={style.textCol}>
                <Text2XL text={"DIO — Вода из Сибири для сибиряков"} color={COLOR["link-blue"]}/>
                <TextLg text={"Посмотреть все товары"} color={COLOR["text-gray"]}/>
            </div>
        </div>
    )
}

export default BannerCard
