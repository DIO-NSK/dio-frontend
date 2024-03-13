import {StaticImport} from "next/dist/shared/lib/get-img-props";

enum ProductCardStatus {
    SALE = "sale",
    NEW = "new",
    DISCOUNT = "discount",
}

export type ProductCharacteristic = {
    name: string,
    value: string,
    valueName : string
}

export type ProductCardDTO = {
    tags: ProductCardStatus[],
    characteristics: ProductCharacteristic[],
    inStock: boolean,
    name: string,
    photos: (string | StaticImport)[],
    description: string[],
    price : number,
    oldPrice? : number | null
}