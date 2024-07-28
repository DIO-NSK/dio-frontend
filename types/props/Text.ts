import {CSSProperties} from "react";

export type TextProps = {
    text: string,
    className?: string,
    onClick?: () => void,
    style?: CSSProperties
}