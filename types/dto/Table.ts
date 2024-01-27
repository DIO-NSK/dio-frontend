import React from "react";

export type TableWrapper = {
    tableHeader : TableHeaderItem[],
    children : React.ReactNode,
}

export type TableHeaderItem = {
    text : string,
    width : string
}

export type TextTableRow = {
    items : string[]
}

export type DraggableTableRow = TableRow & {orderId : number}