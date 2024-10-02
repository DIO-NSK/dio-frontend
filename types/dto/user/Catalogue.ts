type CatalogItem = {
    id : number
    name: string,
    sequenceNumber: number,
    categories: CatalogItem[]
    urlMask : string;
}