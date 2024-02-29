import {TableRow} from "@/types/dto/Table";

export type PopupProps = {
    onClose ?: () => void,
    placement ?: "center" | "default"
}

export type AddPromoPopup<T> = {
    onAddItem : (item : T) => void,
} & PopupProps

export type TableItemPopup<T> = {
    tableRow : TableRow<T>
} & PopupProps