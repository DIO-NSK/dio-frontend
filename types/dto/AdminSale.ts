export type AdminSale = {
    name : string,
    crmGroup : string,
    crmCode : string,
    deadline : string,
    description : string,
    products : ProductIdDto[],
    ruleList : string[]
}

type ProductIdDto = {
    productId : string,
    quantity : string
}