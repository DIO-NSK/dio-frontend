type ResponseAdminProperty = {
    name : string,
    value : string,
    valueName : string
}

export type ResponseAdminProduct = {
    name: string,
    description: string,
    crmCode: string,
    crmGroup: string,
    taxPercent: number,
    discountPercent: number,
    price: number,
    availableCount: number,
    sequenceNumber?: number,
    properties?: ResponseAdminProperty[],
    extraProperties?: ResponseAdminProperty[]
    images: string[],
    id: number
}