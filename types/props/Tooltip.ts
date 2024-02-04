import {TableRow} from "@/types/dto/Table";
import React from "react";

export type TooltipProps<T> = {
    tableItem: TableRow<T>,
    children?: React.ReactNode,
    open?: boolean,
}