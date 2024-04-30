import {SelectItem} from "@/types/props/SelectItem";

export type ResponseProfileOrder = {
    id: number,
    items: ProfileOrderItem[],
    deliveryDate: string,
    deliveryTime: string,
    address: string,
    status: OrderStatus
}

export type ProfileOrderItem = {
    id: number,
    name: string,
    price: number,
    description: string,
    discountPercent: number,
    quantity: number,
    mainImage: string
}

export type OrderStatus = "DRAFT" | "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED"
export const selectableOrderStatuses : SelectItem<OrderStatus>[] = [
    {name : "Черновик заказа", value : "DRAFT"},
    {name : "Ожидает обработки", value : "PENDING"},
    {name : "В процессе обработки", value : "PROCESSING"},
    {name : "Отправлен", value : "SHIPPED"},
    {name : "Доставлен", value : "DELIVERED"},
    {name : "Отменен", value : "CANCELED"}
]