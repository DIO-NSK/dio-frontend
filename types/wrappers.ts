import React from "react";
import {TextLink} from "@/types/links";

export type HeaderWrapperType = {
    header ?: string,
    children : React.ReactNode,
    className ?: string,
    id ?: string
}

export type HeaderLinkWrapperType = {
    textLink?: TextLink | null
} & HeaderWrapperType