import {StaticImport} from "next/dist/shared/lib/get-img-props";
import React from "react";

export type ImageLink = {
    image: string | StaticImport,
    path: string
}

export type TextLink = {
    text : string,
    path : string,
    href ?: string
}

export type IconTextLink = TextLink & {icon? : string | React.ReactNode}