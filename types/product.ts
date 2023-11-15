import {StaticImport} from "next/dist/shared/lib/get-img-props";

enum ProductTagStatus {
    SALE = "sale",
    NEW = "new",
    DISCOUNT = "discount",
}

export type ProductCharacteristic = {
    name: string,
    value: string
}

export type ProductTagDTO = {
    tags: ProductTagStatus[],
    characteristics: ProductCharacteristic[],
    inStock: boolean,
    name: string,
    photos: (string | StaticImport)[],
    description: string[],
    price : number,
    oldPrice? : number | null
}

export type ProductCardDTO = {
    oldPrice?: number | undefined,
    price: number,
    descr: string,
    image: string | StaticImport
}