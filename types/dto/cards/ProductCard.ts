import {StaticImport} from "next/dist/shared/lib/get-img-props";

export type ProductCard = {
    price: number,
    header: string,
    image: string | StaticImport,
    oldPrice?: number | undefined,
    productCode ?: number
}

export type ShoppingCartProductCardDTO = ProductCard & {amount : number}