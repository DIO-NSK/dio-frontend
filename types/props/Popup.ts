import {TableRow} from "@/types/dto/Table";

export type PopupProps = {
    onClose ?: () => void,
    placement ?: "center" | "default"
}

export type TableItemPopup<T> = {
    tableRow : TableRow<T>
} & PopupProps