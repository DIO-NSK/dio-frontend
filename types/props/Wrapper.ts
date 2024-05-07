import React from "react";
import {TextLink} from "@/types/dto/text";

export type WrapperProps = {
    children : React.ReactNode,
    className ?: string
}

type HeaderWrapperClassNames = {
    mainWrapper ?: string,
    contentWrapper ?: string
}

export type HeaderWrapperProps = {
    header ?: string,
    textLink ?: TextLink,
    classNames ?: HeaderWrapperClassNames,
    canSlide ? : boolean
} & WrapperProps