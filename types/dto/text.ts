import React from "react";

export type Text = { text : string }
export type TextLink = { link : string | number} & Text
export type TextAction = { action : () => void } & Text
export type IconTextAction = {icon : React.ReactNode} & TextAction

export type InformationBlock = {
    blockHeader ?: string,
    blockContent : InformationBlockContent[]
}

type InformationBlockContent = {
    itemHeader ?: string,
    itemContent : string[]
}

export type InfoBlockElement = {
    className?: string
} & HeaderDescription

export type Text2XLTypes = {
    isUppercase?: boolean
}

export type HeaderDescription = {
    header: string,
    description: string
}