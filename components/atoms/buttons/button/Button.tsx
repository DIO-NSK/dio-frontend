import style from "./Button.module.css"
import React from "react";
import {COLOR} from "@/components/colors";
import TextBase from "@/components/atoms/text/text-base/TextBase";

type ButtonTypes = {
    color?: COLOR,
    icon?: React.ReactNode,
    text: string,
    onClick: () => void
}

const Button = (
    {
        color = COLOR["link-blue"],
        icon = null,
        ...props
    }: ButtonTypes): React.ReactNode => {

    const textColor = color === COLOR["link-blue"]
        ? COLOR["white"] : COLOR["link-blue"]

    return (
        <div
            style={{backgroundColor: color}}
            className={style.wrapper}
            onClick={props.onClick}
        >
            {icon}
            <TextBase
                text={props.text}
                color={textColor}
            />
        </div>
    )
}

export default Button
