
export type AdminFilledProperty = {
    value : string,
    propertyId : number
}

export type AdminExternalProperty = {
    value : string,
    name : string
}

export type RequestAdminProduct = {
    name : string,
    description : string,
    crmGroup : string,
    crmCode : string,
    price : string,
    pricePackage ?: string,
    inPackage ?: boolean,
    taxPercent : string,
    discountPercent : number,
    isProductOfTheDay : boolean,
    filledProperties : AdminFilledProperty[],
    externalProperties ?: AdminExternalProperty[]
}