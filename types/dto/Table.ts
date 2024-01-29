import React from "react";
import {AdminProduct} from "@/types/dto/AdminProduct";

export type TableWrapperProps = {
    children : React.ReactNode,
    tableHeader ?: TableHeaderItem[],
    className ?: string
}

export type TableHeaderItem = {
    text : string,
    width : string
}

export type TextTableRow = {
    items : string[]
}

export type ProductTableRow = {
    product : AdminProduct
}

export type DraggableTableRow = TableRow & {orderId : number}