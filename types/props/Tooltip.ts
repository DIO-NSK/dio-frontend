import React from "react";
import {TableRow} from "@/types/dto/Table";

export type TooltipProps<T> = {
    tableRow : TableRow<T>,
    onEdit ?: (tableRow : TableRow<T>) => void,
    onDelete ?: (tableRow : TableRow<T>) => void,
    children?: React.ReactNode,
    open?: boolean,
}