import {ProductCharacteristic} from "@/types/product";

export type ResponseProduct = {
    id: number,
    name: string,
    description: string,
    properties: ProductCharacteristic[],
    extraProperties: ProductCharacteristic[],
    discountPercent : number,
    price: number,
    photos: string[]
}