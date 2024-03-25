import React from "react";
import {ResponseCallRequest} from "@/types/dto/admin/call-request/ResponseCallRequest";
import {AdminService} from "@/types/dto/admin/service/AdminService";

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
export type ServiceTableRow = TableRow<AdminService>

export type TableRow<T> = { item: T, id : number}