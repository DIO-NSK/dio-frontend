import React from "react";
import {ResponseCallRequest} from "@/types/dto/admin/call-request/ResponseCallRequest";
import {AdminService} from "@/types/dto/admin/service/AdminService";
import {AdminOrder} from "@/types/dto/AdminOrder";

type TableWrapperClassNames = {
    content ?: string,
    header ?: string
}

export type TableWrapperProps = {
    children: React.ReactNode,
    tableHeader?: TableHeaderItem[],
    classNames?: TableWrapperClassNames
}

export type TableHeaderItem = {
    text: string,
    width: string
}

export type TextTableRow = { itemsWidth: string[] } & TableRow<string[]>

export type ProductTableRow<T> = TableRow<T> & { itemsWidth: Record<keyof Partial<T>, string> }

export type CallRequestTableRow = TableRow<ResponseCallRequest>
export type ServiceTableRow = TableRow<AdminService>
export type AdminOrderTableRow = TableRow<AdminOrder>

export type TableRow<T> = { item: T, id : number, sequenceNumber ?: number}