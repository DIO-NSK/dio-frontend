import {COLOR} from "@/components/colors";

export type TextTypes = {
    text : string | number,
    weight? : "regular" | "medium" | "semibold",
    color? : COLOR
}

export type Text2XLTypes = {
    isUppercase? : boolean
} & TextTypes

export type HeaderDesrcType = {
    header: string,
    descr: string
}