import {ProductCardDTO} from "@/types/product";

export type Order = {
    orderId : number
    status : OrderStatus,
    address : string,
    deliverDate : string,
    deliveryTime : string,
    products : ProductCardDTO[],
    totalPrice : number
}

export type OrderStatus = "pending" | "stale" | "processing" | "shipping" | "delivered"