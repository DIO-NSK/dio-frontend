import {StaticImport} from "next/dist/shared/lib/get-img-props";

export type ImageLink = {
    image: string | StaticImport,
    path: string
}

export type TextLink = {
    text : string,
    path : string
}