import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

export type AdminOrder = {
    id: number,
    orderStatus: string,
    fullName: string
    paymentMethod: string,
    created: string,
    deliveryDate: string,
    deliveryTime: string,
    count: number,
    price: number,
    products: ResponseCartItem[]

}