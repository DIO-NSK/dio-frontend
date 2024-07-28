export type Category = {
    id ?: number,
    name: string,
    sequenceNumber: number,
    properties: CategoryProperty[],
    image : string,
    isNeedParsing ?: boolean
}

export type CategoryProperty = {
    id ?: number,
    name: string,
    valueType: string,
    valueName: string,
    sequenceNumber: number
}