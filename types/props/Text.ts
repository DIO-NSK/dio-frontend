import { CSSProperties, PropsWithChildren } from "react";

export interface TextProps extends PropsWithChildren {
    text ?: string,
    className?: string,
    onClick?: () => void,
    style?: CSSProperties,
}