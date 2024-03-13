import {ProductCharacteristic} from "@/types/product";

export type ResponseProduct = {
    id: number,
    name: string,
    description: string,
    properties: ProductCharacteristic[],
    newPrice: number,
    oldPrice: number,
    photos: string[]
}