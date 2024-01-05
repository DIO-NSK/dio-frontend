
export type Text = { text : string }
export type TextLink = { link : string } & Text
export type TextAction = { action : () => void } & Text

export type InformationBlock = {
    blockHeader ?: string,
    blockContent : InformationBlockContent[]
}

type InformationBlockContent = {
    itemHeader ?: string,
    itemContent : string[]
}

export type Text2XLTypes = {
    isUppercase?: boolean
}

export type HeaderDesrcType = {
    header: string,
    descr: string
}