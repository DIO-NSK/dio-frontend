import React from "react";

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
    items: string[]
}

export type ProductTableRow<T> = {
    product: T,
    itemsWidth: Record<keyof T, string>
}