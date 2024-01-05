import style from "./IconTextButton.module.css"
import React from "react";
import Text from "@/components/atoms/text/text-base/Text";
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
            <Text text={text} color={color} />
        </div>
    )
}

export default IconTextButton
