import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {Side} from "@/data/enums/side";

export type ImageHeaderDescrCard = {
    image: string | StaticImport
    header: string,
    descr: string,
}

export type FullwidthMainCardType = {
    side : Side,
    icon : string | StaticImport
} & ImageHeaderDescrCard