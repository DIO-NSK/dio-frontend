import React from "react";
import style from "./HeaderGroup.module.css"
import Title from "@/components/atoms/text/title/Title";
import {TextLink} from "@/types/links";
import Link from "next/link";
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import {COLOR} from "@/components/colors";


type HeaderGroupTypes = {
    textLink?: TextLink | null,
    header: string,
    children: React.ReactNode
}

const HeaderGroup = ({header, children, textLink = null}: HeaderGroupTypes) => {
    return (
        <div className={style.wrapper}>
            <div className={style.headerRow}>
                <Title text={header}/>
                {
                    textLink && <Link href={textLink.path}>
                        <TextLg text={textLink.text} color={COLOR["link-blue"]}/>
                    </Link>
                }
            </div>

            <div className={style.container}>
                {children}
            </div>
        </div>
    )
}

export default HeaderGroup
