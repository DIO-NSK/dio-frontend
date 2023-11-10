import style from "./IconTextButton.module.css"
import React from "react";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {COLOR} from "@/components/colors";

type IconTextButtonTypes = {
    color? : COLOR,
    icon : React.ReactNode,
    text : string,
    onClick : () => void
}

const IconTextButton = ({color = COLOR["text-gray"], icon, text, onClick} : IconTextButtonTypes) => {
    return (
        <div
            className={style.wrapper}
            onClick={onClick}
        >
            {icon}
            <TextBase text={text} color={color} />
        </div>
    )
}

export default IconTextButton
