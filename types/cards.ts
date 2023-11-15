import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {Side} from "@/data/enums/side";

export type IconHeaderCard = {
    icon : string | StaticImport,
    header : string
}

export type ImageHeaderDescrCard = {
    image: string | StaticImport
    header: string,
    descr: string,
}

export type FullwidthMainCardType = {
    side : Side,
    icon : string | StaticImport
} & ImageHeaderDescrCard

export type ServiceCardDTO = {
    header : string,
    descr : string,
    rentTime : {name : string, value : string}[],
    additional : string[],
    price : number
}

export type SaleCardDTO = {
    image : string | StaticImport,
    duration : string,
    header : string,
    descr : string
}
