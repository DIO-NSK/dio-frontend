import React from "react";

export type TableWrapper = {
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

export type DraggableTableRow = TableRow & {orderId : number}