import React from "react";
import {CallRequest} from "@/types/dto/CallRequest";

export type TableWrapperProps = {
    children: React.ReactNode,
    tableHeader?: TableHeaderItem[],
    className?: string
}

export type TableHeaderItem = {
    text: string,
    width: string
}

export type TextTableRow = {
    items: string[],
    itemsWidth: string[]
}

export type ProductTableRow<T> = TableRow<T> & { itemsWidth: Record<keyof T, string> }

export type CallRequestTableRow = TableRow<CallRequest>

export type TableRow<T> = { item: T }