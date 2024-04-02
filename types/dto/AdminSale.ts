export type AdminSale = {
    name : string,
    crmGroup : string,
    cmrCode : string,
    deadline : string,
    description : string,
    products : ProductIdDto[],
    ruleList : string[]
}

type ProductIdDto = {
    productId : number,
    quantity : number
}