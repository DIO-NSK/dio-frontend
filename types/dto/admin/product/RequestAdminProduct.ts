
export type AdminFilledProperty = {
    value : string,
    propertyId : number
}

export type RequestAdminProduct = {
    name : string,
    description : string,
    crmGroup : string,
    crmCode : string,
    price : string,
    taxPercent : string,
    discountPercent : number,
    isProductOfTheDay : boolean,
    filledProperties : AdminFilledProperty[],
    externalProperties : []
}