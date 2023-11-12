import React from "react";
import style from "./HeaderGroup.module.css"
import Title from "@/components/atoms/text/title/Title";
import Link from "next/link";
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import {COLOR} from "@/components/colors";
import {HeaderLinkWrapperType} from "@/types/wrappers";

const HeaderGroup = ({header, children, textLink = null}: HeaderLinkWrapperType) => {
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
