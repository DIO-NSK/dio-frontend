
export type RequestAdminProduct = {
    name : string,
    description : string,
    crmGroup : string,
    crmCode : string,
    price : number,
    taxPercent : number,
    discountPercent : number,
    isProductOfTheDay : boolean
}