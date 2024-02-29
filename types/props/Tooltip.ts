import React from "react";
import {TableRow} from "@/types/dto/Table";

export type TooltipProps<T> = {
    tableRow : TableRow<T>,
    children?: React.ReactNode,
    open?: boolean,
}