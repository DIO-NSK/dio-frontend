import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {Side} from "@/data/enums/side";
import {TextLink} from "@/types/dto/text";
import React from "react";

export type IconHeaderCard = {
    icon : React.ReactNode,
    header : string
}

export type ImageHeaderDescrCard = {
    image: string
    header: string,
    descr: string,
}

export type FullwidthMainCardType = {
    side : Side,
    icon : string
} & ImageHeaderDescrCard

export type ServiceCardDTO = {
    header : string,
    descr : string,
    rentTime ?: {name : string, value : string}[],
    additional ?: string[],
    price ?: number
}

export type SaleCardDTO = {
    image : string | StaticImport,
    duration : string,
    header : string,
    descr : string
}

export type WaterCardDTO = {
    image: string,
    textLink : TextLink
}
