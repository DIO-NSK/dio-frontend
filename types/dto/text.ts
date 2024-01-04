
export type Text = { text : string }
export type TextLink = { link : string } & Text
export type TextAction = { action : () => void } & Text

export type Text2XLTypes = {
    isUppercase?: boolean
}

export type HeaderDesrcType = {
    header: string,
    descr: string
}