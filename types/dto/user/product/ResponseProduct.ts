import {ProductCharacteristic} from "@/types/product";

export type ResponseProduct = {
    id: number,
    name: string,
    description: string,
    inFavourites : boolean,
    inCart : boolean,
    properties: ProductCharacteristic[],
    extraProperties: ProductCharacteristic[],
    discountPercent : number,
    price: number,
    inStock: boolean,
    photos: string[]
}