import React from "react";
import {TableRow} from "@/types/dto/Table";

type TooltipItem<T> = any & TableRow<T>

export type TooltipProps<T> = {
    tableRow: TooltipItem<T>,
    onEdit?: (tableRow: TooltipItem<T>) => void,
    onDelete?: (tableRow: TooltipItem<T>) => void,
    children?: React.ReactNode,
    open?: boolean,
}