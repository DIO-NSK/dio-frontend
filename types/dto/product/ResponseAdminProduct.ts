export type ResponseAdminProduct = {
    name: string,
    description: string,
    crmCode: string,
    crmGroup: string,
    taxPercent: number,
    discountPercent: number,
    price: number,
    availableCount: number,
    images: string[],
    id : number
}