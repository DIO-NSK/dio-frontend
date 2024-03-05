import {ProductCardDTO} from "@/types/product";
import {ShoppingCartProductCardDTO} from "@/types/dto/admin/cards/ProductCard";

export type Order = {
    orderId: number
    status: OrderStatus,
    address: string,
    deliveryDate: string,
    deliveryTime: string,
    products: (ProductCardDTO | ShoppingCartProductCardDTO)[],
    totalPrice: number,
    creationDate ?: string,
    creationTime ?: string
}

export type OrderStatus = "pending" | "stale" | "processing" | "shipping" | "delivered"