import {StaticImport} from "next/dist/shared/lib/get-img-props";

export type ImageHeaderDescrCard = {
    image: string | StaticImport
    header: string,
    descr: string,
}