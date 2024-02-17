import React from "react";
import {TextLink} from "@/types/dto/text";

export type WrapperProps = {
    children : React.ReactNode,
    className ?: string
}

export type HeaderWrapperProps = {
    header : string,
    textLink ?: TextLink
} & WrapperProps