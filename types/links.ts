import {StaticImport} from "next/dist/shared/lib/get-img-props";
import React from "react";

export type ImageLink = {
    image: string | StaticImport,
    path: string
}

export type TextLink = {
    text : string,
    path : string
}

export type IconTextLink = TextLink & {icon? : string | StaticImport | React.ReactNode}