import React from "react";
import {CallRequest} from "@/types/dto/CallRequest";
import {ResponseCallRequest} from "@/types/dto/admin/call-request/ResponseCallRequest";

export type TableWrapperProps = {
    children: React.ReactNode,
    tableHeader?: TableHeaderItem[],
    className?: string
}

export type TableHeaderItem = {
    text: string,
    width: string
}

export type TextTableRow = { itemsWidth: string[] } & TableRow<string[]>

export type ProductTableRow<T> = TableRow<T> & { itemsWidth: Record<keyof T, string> }

export type CallRequestTableRow = TableRow<ResponseCallRequest>

export type TableRow<T> = { item: T, id : number}