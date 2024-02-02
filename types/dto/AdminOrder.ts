import {ShoppingCartProductCardDTO} from "@/types/dto/cards/ProductCard";
import {OrderStatus} from "@/types/dto/Order";
import {Customer} from "@/types/dto/CallRequest";

export type AdminOrder = {
    orderId: number
    status: OrderStatus,
    deliveryDate: string,
    products: ShoppingCartProductCardDTO[],
    totalPrice: number,
    creationDate ?: string,
    creationTime ?: string,
    customer : Customer
}