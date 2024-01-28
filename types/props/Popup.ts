import {TextTableRow} from "@/types/dto/Table";

export type PopupProps = {
    onClose ?: () => void,
    placement ?: "center" | "default"
}

export type TableItemPopup = {
    tableItem: TextTableRow
} & PopupProps